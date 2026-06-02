<script setup>
import { ref } from "vue";

// Recupero token
const token = localStorage.getItem("token");

// Campi del form
const titolo = ref("");
const descrizione = ref("");
const categoria = ref("");
const quantita = ref("");
const zona = ref("");
const data_scadenza = ref("");
const orario_ritiro_inizio = ref("");
const orario_ritiro_fine = ref("");

// Stati per l'autocompletamento geografico
const suggerimenti = ref([]);
let debounceTimer = null;

// Funzione per cercare la zona in tempo reale mentre l'utente digita
function cercaZona() {
  clearTimeout(debounceTimer);
  
  if (zona.value.trim().length < 3) {
    suggerimenti.value = [];
    return;
  }

  // Attende 400ms dall'ultimo tasto premuto prima di effettuare la chiamata API
  debounceTimer = setTimeout(async () => {
    try {
      const url = `https://openstreetmap.org{encodeURIComponent(
        zona.value + ", Italia"
      )}&limit=5`;
      
      const res = await fetch(url, {
        headers: { 'User-Agent': 'antispreco-app-frontend (contatto-sviluppo@tuodominio.com)' }
      });
      
      if (res.ok) {
        suggerimenti.value = await res.json();
      }
    } catch (error) {
      console.error("Errore durante l'autocompletamento:", error);
    }
  }, 400);
}

// Funzione per impostare la zona selezionata dalla tendina
function selezionaSuggerimento(item) {
  zona.value = item.display_name;
  suggerimenti.value = []; // Chiude la tendina
}

async function inviaAnnuncio() {
  if (!token) {
    alert("Devi essere loggato per pubblicare un annuncio.");
    return;
  }

  const nuovoAnnuncio = {
    titolo: titolo.value,
    descrizione: descrizione.value,
    categoria: categoria.value,
    quantita: quantita.value,
    zona: zona.value,
    data_scadenza: data_scadenza.value,
    orario_ritiro_inizio: orario_ritiro_inizio.value,
    orario_ritiro_fine: orario_ritiro_fine.value
  };

  const res = await fetch("https://antispreco-app-2.onrender.com/api/annunci", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(nuovoAnnuncio)
  });

  const data = await res.json();
  console.log("Dati inviati:", nuovoAnnuncio);
  console.log("Risposta backend:", data);

  if (res.ok) {
    alert("Annuncio pubblicato!");
    titolo.value = "";
    descrizione.value = "";
    categoria.value = "";
    quantita.value = "";
    zona.value = "";
    data_scadenza.value = "";
    orario_ritiro_inizio.value = "";
    orario_ritiro_fine.value = "";
  } else {
    // Mostra anche i dettagli dell'errore se presenti (es. Geocoding fallito)
    const messaggioErrore = data.dettagli ? `${data.error}: ${data.dettagli}` : (data.error || "Errore sconosciuto");
    alert("Errore durante la pubblicazione: " + messaggioErrore);
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Pubblica un nuovo annuncio</h2>

    <!-- BLOCCO SE NON LOGGATO -->
    <div v-if="!token">
      <p>Devi essere registrato per pubblicare un annuncio.</p>
      <router-link to="/login">Vai al login</router-link>
    </div>

    <!-- FORM SOLO SE LOGGATO -->
    <form v-else @submit.prevent="inviaAnnuncio">

      <label>Categoria</label>
      <select v-model="categoria" required>
        <option value="">Seleziona categoria</option>
        <option value="pane">Pane</option>
        <option value="dolci">Dolci</option>
        <option value="frutta">Frutta</option>
        <option value="verdura">Verdura</option>
        <option value="pasti_pronti">Pasti pronti</option>
        <option value="bevande">Bevande</option>
        <option value="altro">Altro</option>
      </select>

      <label>Titolo</label>
      <input v-model="titolo" type="text" required />

      <label>Descrizione</label>
      <textarea v-model="descrizione" required></textarea>

      <label>Quantità</label>
      <input v-model="quantita" type="text" required />

      <!-- CAMPO ZONA CON AUTOCOMPLETAMENTO -->
      <label for="zona">Zona (Città, Via o Provincia)</label>
      <div class="autocomplete-container">
        <input 
          v-model="zona" 
          type="text" 
          @input="cercaZona" 
          placeholder="Es: Grassobbio, Bergamo" 
          autocomplete="off" 
          required 
        />
        
        <!-- Menu a tendina dei suggerimenti geografici -->
        <ul v-if="suggerimenti.length > 0" class="autocomplete-dropdown">
          <li 
            v-for="(item, index) in suggerimenti" 
            :key="index" 
            @click="selezionaSuggerimento(item)"
          >
            {{ item.display_name }}
          </li>
        </ul>
      </div>

      <label>Data di scadenza</label>
      <input v-model="data_scadenza" type="date" required />

      <label>Orario ritiro (inizio)</label>
      <input v-model="orario_ritiro_inizio" type="time" required />

      <label>Orario ritiro (fine)</label>
      <input v-model="orario_ritiro_fine" type="time" required />

      <button type="submit">Pubblica annuncio</button>
    </form>
  </div>
</template>

<style>
.form-container {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 6px;
  background: #f9f9f9;
}

form label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #2d7d46;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* STILI PER L'AUTOCOMPLETAMENTO */
.autocomplete-container {
  position: relative;
  width: 100%;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 0 0 4px 4px;
}

.autocomplete-dropdown li {
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #333;
}

.autocomplete-dropdown li:hover {
  background-color: #f1f1f1;
}
</style>
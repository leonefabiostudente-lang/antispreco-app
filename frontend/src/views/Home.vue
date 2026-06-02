<template>
  <div class="home-root">
    <section class="card hero-card" aria-labelledby="hero-title">
      <div class="hero-left">
        <h3 id="hero-title">Cos'è <span class="brand">Antispreco</span>?</h3>

        <p class="hero-desc">
          Antispreco è una piattaforma per condividere prodotti alimentari in scadenza e ridurre gli sprechi.
          Metti in condivisione ciò che non useresti, ritira ciò che ti serve: semplice, sicuro e gratuito.
        </p>

   <nav class="hero-links" aria-label="Azioni principali">
  <router-link class="btn-primary" to="/annunci">Vai agli annunci</router-link>
  <router-link class="btn-primary" to="/nuovo-annuncio">Pubblica un annuncio</router-link>

  <router-link
  v-if="!isLogged"
  class="btn-outline"
  to="/login"
>
  Login
</router-link>

<router-link
  v-if="!isLogged"
  class="btn-outline"
  to="/register"
>
  Registrati
</router-link>

</nav>


        <p class="hero-note">
          Aiuta la tua comunità: ritira o dona cibo vicino a te. Nessun costo, solo solidarietà.
        </p>
      </div>

      <div class="hero-right" aria-hidden="false">
        <div class="img-grid" role="list">
<img
  role="listitem"
  src="@/assets/images/pomodorini.webp"
  alt="Volontario che tiene una scatola di donazioni"
  loading="lazy"
/>

<img
  role="listitem"
  src="@/assets/images/buste_cibo.webp"
  alt="Scatola di donazioni alimentari per ridurre lo spreco"
  loading="lazy"
/>

<img
  role="listitem"
  src="@/assets/images/donazione.webp"
  alt="Mele e banane in scatola di cartone"
  loading="lazy"
/>

<img
  role="listitem"
  src="@/assets/images/unione.webp"
  alt="Gruppo di volontari che lavorano nel centro di donazione"
  loading="lazy"
/>

</div>


      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isLogged = ref(!!localStorage.getItem("token"));
</script>
<template>
  <div>
    <h2 class="page-title">Benvenuto su Antispreco</h2>

    <div class="home-grid">

      <div class="card">
        <h3>Cos'è Antispreco?</h3>
        <p>
          Una piattaforma per condividere prodotti alimentari in scadenza
          e ridurre gli sprechi.
        </p>
      </div>

      <div class="card">
        <h3>Vai agli annunci</h3>
        <p>Scopri cosa è disponibile nella tua zona.</p>
        <router-link to="/annunci">
          <button class="btn-primary">Apri gli annunci</button>
        </router-link>
      </div>

      <div class="card">
        <h3>Pubblica un annuncio</h3>
        <p>Hai prodotti in eccesso? Condividili qui.</p>
        <router-link to="/nuovo-annuncio">
          <button class="btn-primary">Nuovo annuncio</button>
        </router-link>
      </div>

      <div class="card">
        <h3>Accedi o Registrati</h3>
        <p>Gestisci i tuoi annunci.</p>
        <router-link to="/login">
          <button class="btn-primary">Login</button>
        </router-link>
      </div>

    </div>
  </div>
</template>

<style>
.home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.btn-primary {
  margin-top: 10px;
  padding: 10px 15px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-dark);
}
</style>

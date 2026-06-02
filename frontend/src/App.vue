<template>
  <div class="app-container" :class="{ 'dark-mode': dark }">
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="brand-wrap">
        <h1 class="logo" aria-label="Antispreco">
          <span class="leaf" aria-hidden="true">🍃</span>
          <span class="brand">Antispreco</span>
        </h1>

        <!-- HAMBURGER -->
        <button class="mobile-toggle" @click="open = !open" :aria-expanded="open" aria-label="Apri menu">
          <span v-if="!open">☰</span>
          <span v-else>✕</span>
        </button>
      </div>

      <!-- MENU -->
      <div class="nav-links" :class="{ open: open }">
        <router-link to="/" @click="open = false">Home</router-link>
        <router-link to="/annunci" @click="open = false">Annunci</router-link>
        <router-link to="/nuovo-annuncio" @click="open = false">Nuovo annuncio</router-link>
        <router-link to="/login" @click="open = false">Login</router-link>
        <router-link to="/register" @click="open = false">Registrati</router-link>

        <button
          class="dark-toggle"
          @click="toggleDarkMode"
          :aria-pressed="dark"
          aria-label="Toggle dark mode"
        >
          <span v-if="!dark">🌙</span>
          <span v-else>☀️</span>
        </button>
      </div>
    </nav>

    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      © 2026 Antispreco – Progetto scolastico
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dark = ref(false);
const open = ref(false);


const isLogged = ref(!!localStorage.getItem("token"));

function toggleDarkMode() {
  dark.value = !dark.value;
  document.body.classList.toggle('dark-mode', dark.value);
}
</script>
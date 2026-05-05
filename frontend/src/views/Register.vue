<template>
  <div>
    <h2 class="page-title">Registrazione</h2>

    <form class="form-box" @submit.prevent="register">
      <input
        type="text"
        v-model="nome"
        placeholder="Nome"
        required
      />

      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />

      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <button>Registrati</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const nome = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

async function register() {
  try {
    await axios.post(
      "https://antispreco-app-2.onrender.com/api/register",
      {
        nome: nome.value,
        email: email.value,
        password: password.value,
      }
    );

    alert("Registrazione completata");
    router.push("/login");
  } catch (err) {
    alert("Errore nella registrazione");
  }
}
</script>

<style scoped>
/* Lo stile principale è già in App.vue */
/* Qui puoi aggiungere personalizzazioni se vuoi */
</style>



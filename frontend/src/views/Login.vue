<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">

        <h2 class="text-center mb-4">Accedi</h2>

        <div class="card shadow-sm p-4">

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control">
          </div>

          <button @click="login" class="btn btn-primary w-100">
            Accedi
          </button>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../services/authService";

const email = ref("");
const password = ref("");
const router = useRouter();

async function login() {
  try {
    const res = await loginUser(email.value, password.value);

    localStorage.setItem("token", res.data.token);
    router.push("/annunci");

  } catch (err) {
    console.error(err);
    alert("Credenziali non valide");
  }
}
</script>




<style scoped>
/* Lo stile principale è già in App.vue */
/* Qui aggiungo solo eventuali personalizzazioni */

</style>

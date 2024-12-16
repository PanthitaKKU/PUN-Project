<template>
  <div
    class="h-screen bg-[url('/image/Loginbg.png')] bg-cover bg-center flex items-center justify-center"
  >
    <div
      class="border-2 border-solid border-white/60 rounded-2xl w-[700px] h-[800px] mt-16 bg-black/50"
    >
      <div class="flex justify-center m-10">
        <img src="/public/image/Grit Electronic(white).png" class="mt-7" />
      </div>
      <div class="flex justify-center m-4 text-3xl font-normal text-white">
        <h1>Log in</h1>
      </div>

      <div class="m-9 mt-12 font-medium text-lg text-white">
        <label for="username"> Username : </label> <br />
        <input
          type="text"
          id="username"
          v-model="login.username"
          class="w-full h-[50px] rounded-xl mt-5 bg-gray-300 shadow-lg text-black/80"
          required
          placeholder="Enter your username"
        />
      </div>

      <div class="m-9 mt-12 font-medium text-lg text-white">
        <label for="password"> Password </label> <br />
        <input
          type="text"
          id="password"
          v-model="login.password"
          class="w-full h-[50px] rounded-xl mt-5 bg-gray-300 shadow-lg text-black/80"
          required
          placeholder="Enter your password"
        />
      </div>

      <div class="mt-3 m-10 flex justify-end">
        <h1 class="text-red-500 font-medium">Forget Password?</h1>
      </div>

      <div class="m-9">
        <div
          class="w-full h-[55px] bg-indigo-400 hover:bg-blue-400 text-white font-medium text-lg px-4 rounded-xl flex justify-center"
        >
          <button type="submit" @click="addLogin">
            <p>Log in</p>
          </button>
        </div>
      </div>

      <hr class="border-white m-9" />

      <div class="flex justify-center font-medium mt-4">
        <div class="mr-4 text-white">
          <h1>Don’t have an account ?</h1>
        </div>
        <div class="text-red-500">
          <h1>Register now</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { routerKey } from "vue-router";
import auth from "~/layouts/auth.vue";
import type { Login } from "~/models/page.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
const store = useIndexStore();
const router = useRouter();

definePageMeta({
  layout: "auth",
});

const login = ref<Login>({
  username: "",
  password: "",
});

const addLogin = async () => {
  await service.login
    .addLogin(login.value)
    .then((resp: any) => {

      
      const refToken = useStatefulCookie("token");
      refToken.value = resp.data.token;
      console.log(resp.data);
      store.$state.token = resp.data.token;


      if (store.$state.token != null) {
        router.push("/");
      }
    })
    .catch((error: any) => {
      console.log(error.data);
    })
    .finally(() => {});
};
</script>

<style scoped></style>

<!-- const addLogin = async () => {
  await axios
    .post("https://fakestoreapi.com/auth/login", login.value)
    .then((resp: any) => {
      console.log(resp.data);
      // Redirect to dashboard
    })
    .catch((error: any) => {
      console.log(error.data);
    })
    .finally(() => {});
}; -->

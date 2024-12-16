<template>
  <div>
    <div class="px-20 ml-20 mt-16" v-if="product.id !=0">
    <h1><span class="text-gray-400"> อุปกรณ์เสริม > </span> คีย์บอร์ด</h1>

    
    <div class="flex">
      <div
        class="w-[700px] h-[450px] border-2 border-solid border-black/10 rounded-md mt-14 shadow-xl"
      >
        <!-- img -->
        <div
          class="w-full h-full object-cover rounded-t-xl flex justify-between ml-32"
        >
          <img :src="product.img" />
        </div>
      </div>
      <!-- content -->
      <div class="w-[700px] h-[450px] ml-10 mt-10">
        <div class="ml-5 mt-6">
          <h2 class="text-3xl font-bold mt-8">{{ product.name }}</h2>
          <p class="font-semibold mt-8 text-3xl text-red-600">
            ฿ {{ product.price }}
          </p>
          <p class="text-gray-400 text-xl mt-6">{{ product.detail }}</p>
          <p class="text-gray-400 text-xl mt-3">จำนวน : {{ product.amount }}</p>
        </div>

        <div>
          <div class="selector">
            <input
              type="number"
              class="ml-5 mt-6 border-2 border-solid rounded-lg border-black/50 w-[200px] h-9"
            />
          </div>
        </div>

        <div
          class="w-[200px] h-9 bg-blue-400 hover:bg-indigo-400 text-white font-bold px-4 rounded-xl flex justify-center ml-5 mt-10"
        >
          <button type="button">
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </div>

    <!-- ด้านล่าง -->

    <div>
      <div class="w-full h-full mt-20">
        <div>
          <h2 class="text-xl ml-2 font-bold mt-8 border-b-2">รีวิวสินค้า</h2>

          <div class="flex justify-center px-6">
            <div class="grid grid-cols-3 mt-4">
              <div class="m-6 border-black/40 border rounded-md">
                <p class="font-semibold mt-8 text-xl m-3">Name : PUN</p>
                <p class="m-3 text-lg">ได้กดถูกใจ</p>
                <p class="text-gray-400 text-lg m-3">
                  คีย์บอร์ดที่ใช้งานได้บนมือถือได้ดีเยี่ยม ควบคุมที่สะดวก
                  ใช้เล่นเกมส์สนุกขึ้น และ แข็งแรง ทนทาน ใช้ได้นาน
                  เสียงพิมพ์นุ่มเพราะหู
                </p>
              </div>

              <div class="m-6 border-black/40 border rounded-md">
                <p class="font-semibold mt-8 text-xl m-3">Name : PUN</p>
                <p class="m-3 text-lg">ได้กดถูกใจ</p>
                <p class="text-gray-400 text-lg m-3">
                  คีย์บอร์ดที่ใช้งานได้บนมือถือได้ดีเยี่ยม ควบคุมที่สะดวก
                  ใช้เล่นเกมส์สนุกขึ้น และ แข็งแรง ทนทาน ใช้ได้นาน
                  เสียงพิมพ์นุ่มเพราะหู
                </p>
              </div>

              <div class="m-6 border-black/40 border rounded-md">
                <p class="font-semibold mt-8 text-xl m-3">Name : PUN</p>
                <p class="m-3 text-lg">ได้กดถูกใจ</p>
                <p class="text-gray-400 text-lg m-3">
                  คีย์บอร์ดที่ใช้งานได้บนมือถือได้ดีเยี่ยม ควบคุมที่สะดวก
                  ใช้เล่นเกมส์สนุกขึ้น และ แข็งแรง ทนทาน ใช้ได้นาน
                  เสียงพิมพ์นุ่มเพราะหู
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-full mb-10">
      <p class="text-xl ml-2 font-bold mt-8 border-b-2 w-[1300px]">
        สินค้าใกล้เคียง
      </p>

      <div class="flex ml-12 w-full">
        <div class="gap-8 grid lg:grid-cols-6 mt-10">
          <!-- Product List -->
          <!-- <div v-for="(item, index) in product" :key="index" class="border rounded-md">
            <NuxtLink :to="`/product/${item.id}`">
              <CardProduct product="item" />
            </NuxtLink> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
  <div v-else>

    <span>Loading...</span>

  </div>
  </div>
</template>

<script setup lang="ts">
import type { Products } from "~/models/product.model";
// import service from "~/plugins/axios";
import axios from "axios";
import service from "~/service";

definePageMeta({
  middleware: 'auth',
})

const route = useRoute();

const loading = ref<boolean>(false);
const product = ref<Products>({
  id: 0,
  name: "Air60 Wireless",
  detail:
    "RK61 Plus Royal Kludge RK61 Plus Wireless คีย์บอร์ดที่ใช้งานได้บนมือถือได้ดีเยี่ยม ควบคุมที่สะดวกใช้เล่นเกมส์สนุกขึ้น และ แข็งแรง",
  price: 4390,
  amount: 5,
  img: "https://mediam.dotlife.store/media/catalog/product/cache/3b7e899159f673788675d87d1d929a98/n/u/nuphy_air60_ultra-slim_keyboard.001_1_2.jpeg",
});

const getProductById = async () => {
  await service.product.getProductById(route.params.id)
    .then((resp: any) => {
      loading.value = true;
      const data = resp.data;
      const products: Products = {
        id: data.id,
        name: data.title,
        price: data.price,
        amount: data.rating.count,
        detail: data.description,
        img: data.image,
      };
      product.value = products;
    })
    .catch((error: any) => {
      console.log(error.response);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  // use func
  getProductById();
});
</script>

<style scoped></style>

// connect API
// try { const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
// if (!response.ok) {
//   throw new Error(`HTTP error! status: ${response.status}`);
// }
// const data = await response.json();
// product.value = data;
// } catch (error) {
//   console.error(error);
// }



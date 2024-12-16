<template>
  <div class="p-10">
    <div class="px-14 ml-10">
      <h1>หน้าหลัก</h1>
    </div>
    <div>
      <div class="text-black font-semibold text-lg ml-10 px-20 mt-7">
        สินค้าแนะนำ
      </div>
      <div
        class="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 px-20 ml-10"
      >
        <!-- Product List -->
        <div v-for="(item, index) in products" :key="index">
          <!-- <NuxtLink :to="`/product/${item.id}`"> -->
          <CardProduct :product="item" @product-delete="deleteProduct" />
          <!-- </NuxtLink> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();

const clickHandler = () => {
  router.push("/home");
};

const num = ref<number>(0);
const text = ref<string>("");

// import service from "~/plugins/axios";
import axios from "axios";
import { errorMessages } from "vue/compiler-sfc";
import type { Products } from "~/models/product.model";
import service from "~/service";

definePageMeta({
  middleware: 'auth',
})

const loading = ref<boolean>(false);
const products = ref<Products[]>([
  {
    id: 0,
    name: "",
    detail: "",
    price: 0,
    amount: 0,
    img: "",
  },
]);

const getProductList = async () => {
  await service.product.getProductList()
  
    .then((resp: any) => {
      loading.value = true;
      const data = resp.data;
      const productList: Products[] = [];

      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const product: Products = {
          id: e.id,
          name: e.title,
          price: e.price,
          amount: e.rating.count,
          detail: e.description,
          img: e.image,
        };
        // เพิ่มproductใส่ใน productList
        productList.push(product);
      }
      products.value = productList;
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteProduct = async (id: string) => {
  loading.value = true;
  await service.product.deleteProduct(id)
    .then((resp: any) => {
      const data = resp.data;
      console.log(data);
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {});
};

// function ทำการโหลดข้อมูล
onMounted(async () => {
  await getProductList();
});
</script>

<style scoped></style>

<style></style>

// Example1
// const rep = await axios.get("https://fakestoreapi.com/products");
// const data = rep.data;
// const productList: Products[] = [];

// console.log(data);

<!-- // for (let i = 0; i < data.length; i++) { -->
//   const e = rep.data[i];
//   const product: Products = {
//     id: e.id,
//     name: e.title,
//     price: e.price,
//     amount: e.rating.count,
//     detail: e.description,
//     img: e.image,
//   }
//   productList.push(product)
<!-- // } -->

// product.value = productList

// Example2

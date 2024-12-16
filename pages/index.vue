<template>
  <div>
    <pre>{{ store.$state.token }}</pre>
    <div
      class="h-[600px] grid grid-cols-2 justify-center items-center gap-10 border-b-2 border-gray-400"
    >
      <div class="text-5xl font-bold grid justify-end mr-[150px]">
        อุปกรณ์อิเล็กทรอนิกส์ <br />
        <span class="text-3xl font-thin mt-4">และสินค้าอื่นๆอีกมากมาย</span>
        <div class="mt-20 flex justify-center items-center">
          <!-- button -->
          <div
            class="w-[430px] h-[70px] hover:bg-indigo-300 hover:text-white hover:border-gray-400 hcursor-pointer px-4 rounded-xl text-2xl font-medium flex justify-center items-center border-black border-2"
          >
            <div>
              <button>
                <p>รายละเอียด</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[1200px] h-[500px] drop-shadow-xl ml-[50px]">
        <img
          src="/public/image/bannertest.webp"
          class="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>

    <div>
      <div class="flex justify-center mt-20 text-4xl">
        <h1>หมวดหมู่สินค้า</h1>
      </div>

      <div class="flex justify-center items-center m-14">
        <!-- category -->
        <div v-for="(item, index) in cate" :key="index">
          <div class="px-10 m-4">
            <div class="h-[170px] w-[170px]">
              <img
                :src="item.image"
                class="w-full h-full object-cover p-4 hover:bg-indigo-300 rounded-full border-2 border-solid border-gray-400 cursor-pointer"
              />
              <div class="mt-10">
                <div class="text-center text-2xl font-normal">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div class="m-14">
        <div class="mt-10 text-3xl font-medium mb-10">
          <h1>สินค้าแนะนำ - Recommend</h1>
        </div>

        <div>
          <div class="gap-8 grid grid-cols-4">
            <!-- Product List -->
            <div v-for="(item, index) in products" :key="index">
              <CardProduct :product="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { errorMessages } from "vue/compiler-sfc";
import auth from "~/middleware/auth";
import type { Pages } from "~/models/page.model";
import type { Cate, Products } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";


definePageMeta({
  middleware: 'auth',
})


const store = useIndexStore();
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

const cate = ref<Cate[]>([
  {
    id: 1,
    name: "คอมพิวเตอร์",
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/LqL4C2aWe/product_02/81da352a8903ac87a4216e2eb925275b.png",
    path: "/product",
    active: false,
  },
  {
    id: 2,
    name: "โน๊ตบุ๊ค",
    image:
      "https://cdn11.bigcommerce.com/s-n9k8zf78ld/images/stencil/1280x1280/products/877/2293/w800-36__02556.1730708315.png?c=1",
    path: "/product",
    active: false,
  },
  {
    id: 3,
    name: "อุปกรณ์เสริม",
    image:
      "https://png.pngtree.com/png-vector/20241203/ourmid/pngtree-gaming-wireless-keyboard-mouse-combo-png-image_14519921.png",
    path: "/product",
    active: false,
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

onMounted(async () => {
  await getProductList();
});
</script>

<style scoped></style>

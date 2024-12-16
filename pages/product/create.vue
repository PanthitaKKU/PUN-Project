<template>
  <div class="flex justify-center p-4">
    <div
      class="border-2 border-solid border-black/60 rounded-xl w-[620px] h-full"
    >
      <div class="font-semibold">
        <p class="mb-5 ml-6 mt-4">Create a new product</p>
      </div>

      <div class="ml-6">
        <div>
          <label for="title"> Title :</label> <br />
          <input
            type="text"
            id="title"
            class="border-2 border-solid border-black/60 w-[550px] h-[40px] rounded-xl mt-3 bg-gray-200"
            v-model="product.title"
            required
          />
        </div>
      </div>

      <div class="ml-6">
        <div>
          <label for="price"> Price :</label> <br />
          <input
            type="number"
            id="price"
            class="border-2 border-solid border-black/60 w-[550px] h-[40px] rounded-xl mt-3 bg-gray-200"
            v-model="product.price"
            required
          />
        </div>
      </div>

      <div class="ml-6">
        <div>
          <div>
            <label for="description"> Description :</label> <br />
            <textarea
              type="text area"
              id="description"
              class="border-2 border-solid border-black/60 w-[550px] h-[40px] rounded-xl mt-3 bg-gray-200"
              v-model="product.description"
            ></textarea>
          </div>
        </div>

        <div>
          <div>
            <div>
              <label for="image"> Image :</label> <br />
              <input
                type="url"
                id="image"
                class="border-2 border-solid border-black/60 w-[550px] h-[40px] rounded-xl mt-3 bg-gray-200"
                v-model="product.image"
              />
            </div>
          </div>

          <div>
            <div>
              <label for="category"> Category :</label> <br />
              <select
                class="border-2 border-solid border-black/60 w-[550px] h-[40px] rounded-xl mt-3 bg-gray-200"
                id="category"
                v-model="product.category"
                required
              >
                <option value="">Select Category</option>
                <option value="electronic">electronic</option>
                <option value="2">Laptop</option>
                <option value="3">Accessories</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center mb-4">
            <div
              class="w-[200px] h-9 bg-blue-400 hover:bg-indigo-400 text-white font-bold px-4 rounded-xl flex justify-center ml-5 mt-10"
            >
              <button type="submit" @click="addProduct">
                <p>Add Product</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2>Result :</h2>
      <div>
        <p>ID : {{ productRes.id }}</p>
        <p>Title : {{ productRes.title }}</p>
        <p>Price : {{ productRes.price }}</p>
        <p>Description : {{ productRes.description }}</p>
        <p>Image : {{ productRes.image }}</p>
        <p>Category : {{ productRes.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import type { ProductCreate, ProductRes } from "~/models/product.model";
import service from "~/service";

const product = ref<ProductCreate>({
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
});

const productRes = ref<ProductRes>({
  id: 0,
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
});

const addProduct = async () => {
  // post - method
  await service.product
    .addProduct(product.value)
    .then((resp: any) => {
      console.log(resp.data);

      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "Add Product Success!",
          text: " Add Success!",
          icon: "success",
        });
      }

      const product: ProductRes = {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
      };
      productRes.value = product;
    })
    .catch((error: any) => {
      console.log(error.data);
    })
    .finally(() => {});
};
</script>

<style scoped></style>

<!-- ,{ กรณียังไม่ประกาศตัวแปร
 const addProduct = async () => {
  // post - method
 await axios.post('https://fakestoreapi.com/products'),{
    title: product.value.title,
    price: product.value.price,
    description: product.value.description,
    image: product.value.image,
    category: product.value.category,
} -->

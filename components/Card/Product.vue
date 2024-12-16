<template>
  <div>
    <div class="flex justify-center">
      <div class="w-[600px] h-[1000px] border-2 border-solid border-gray-400 m-4">
        <div>
          <!-- img -->
          <div class="w-[600px] h-[600px] p-10">
            <img
              :src="product.img"
              class="object-scale-down w-full h-full flex justify-between"
            />
          </div>

          <div class="flex justify-end mb-4 mr-5">
            <NuxtLink :to="`/product/edit/${product.id}`">
              <img
                src="/public/image/edit-246.png"
                class="w-8 object-cover cursor-pointer"
              />
            </NuxtLink>

            <div>
              <img
                src="/public/image/delete-295.png"
                class="w-8 object-cover cursor-pointer ml-3"
                @click="emit('product-delete', product.id)"
              />
            </div>
          </div>

          <div class="flex justify-between h-[80px] text-ellipsis overflow-hidden">
            <!-- name -->
            <div class="font-semibold text-xl ml-4 m-3 mt-5">
              {{ product.name }}
            </div>
            <!-- price -->
            <div class="font-semibold text-xl mt-5 mr-4">
              ฿{{ product.price }}
            </div>
          </div>

          <!-- info -->
          <div class="p-4 h-[150px] text-ellipsis overflow-hidden">
            <div class="text-black/50">
              <span class="font-medium text-black/70">รายละเอียด :</span>
              {{ product.detail }}
            </div>

            <!-- amount -->
            <div>
              <div class="text-black/50 text-sm">
                <span v-if="product.amount > 0 && product.amount < 10"
                  >( จำนวนสินค้า :{{ product.amount }} ชิ้น)</span
                >
                <span v-else-if="product.amount >= 10"> มีสินค้ามากเกิน </span>
                <span v-else> สินค้าหมด </span>

                <!-- <span v-show="product.amount >= 10"> มีสินค้า </span> -->
              </div>
            </div>
          </div>

          <br>
          
          <div class="flex justify-between p-4 px-10 h-[80px]">
            <!-- button -->
            <div
              class="w-40 h-9 bg-blue-400 hover:bg-indigo-400 hover:text-white font-bold rounded-xl flex justify-center items-center"
            >
              <NuxtLink :to="`/product/${product.id}`">
                <button>
                  <p>รายละเอียด</p>
                </button>
              </NuxtLink>
            </div>

            <!-- button -->
            <div
              class="w-40 h-9 bg-blue-400 hover:bg-indigo-400 hover:text-white font-bold rounded-xl flex justify-center items-center"
            >
              <NuxtLink :to="`/product/${product.id}`">
                <button>
                  <p>เพิ่มลงตะกร้า</p>
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Products } from "~/models/product.model";

const emit = defineEmits(["product-delete"]);

const props = defineProps({
  product: {
    type: Object as PropType<Products>,
    required: true,
  },
});
</script>

<style scoped></style>

<script setup>
import { ref, onMounted,watch } from "vue";
import { useRoute } from "vue-router";

const photo = ref({ title: "", thumbnailUrl: "" });
const isLoading = ref(false);

const route = useRoute();

const fetchPhoto = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${route.params.id}`
    );
    photo.value = await response.json();
  } catch (error) {
    console.error("Error fetching photo:", error);
  } finally {
    isLoading.value = false;
  }
};


watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    fetchPhoto();
  }
}, { immediate: true });
</script>

<template>
  <main>
    <h1>写真詳細ID:{{ route.params.id }}</h1>
    <div v-if="isLoading">ローディング中...</div>
    <div v-if="!isLoading">
      <h2>{{ photo.title }}</h2>
      <img :src="photo.thumbnailUrl" :alt="photo.title" />
    </div>
    <!---次と前の写真-->
    <!-- <router-link  v-if="Number(route.params.id) > 1" :to="{ name: 'photo', params: { id: Number(route.params.id) - 1 } }"> 前の写真</router-link>
    <router-link :to="{ name: 'photo', params: { id: Number(route.params.id) + 1 } }"> 次の写真</router-link> -->
  </main>
</template>

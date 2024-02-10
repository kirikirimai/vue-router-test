<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import PaginationComposable from '../components/PaginationComposable.vue'

const post = ref({ title: '', body: '' })
const isLoading = ref(false);  // ローディング状態のリアクティブな変数
const route = useRoute()
const currentPageId = ref(0)

const fetchPost = async (id) => {

  isLoading.value = true;  // データ取得前にローディングを有効にする
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    post.value = await response.json()
  } catch (error) {
    console.error('Error fetching post:', error)
  } finally {
    isLoading.value = false;  // データ取得後にローディングを無効にする
  }
}

onBeforeMount(() => {
  currentPageId.value = route.params.id

  fetchPost(currentPageId.value)
})

const goToPageHandler = (page) => {
  currentPageId.value = page
  fetchPost(currentPageId.value)
}

</script>

<template>
  <main>
    <!-- ローディングが有効な場合はローディングコンポーネントを表示 -->
    <div v-if="isLoading">
      ローディング中...
    </div>
    <!-- ローディングが無効な場合は記事を表示 -->
    <div v-else>
      <h1>記事詳細：{{ currentPageId }}</h1>
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <p><router-link :to="{name:'photo',params:{id:route.params.id}}">写真はこちら</router-link></p>
      <!-- ネストされたルートの表示 -->
      <RouterView />
    </div>
    <PaginationComposable :currentPage="Number(currentPageId)" :totalPages=10 @goToPage="goToPageHandler" />
  </main>
</template>

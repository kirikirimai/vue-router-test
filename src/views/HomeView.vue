<script setup>
import { onBeforeMount, ref } from 'vue'
const posts = ref([])
const loading = ref(false)

const fetchArticles = async () => {
  loading.value = true
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  posts.value = await response.json()
  loading.value = false
}

// ページが読み込まれた時に記事を取得
onBeforeMount(fetchArticles)
</script>

<template>
  <main>
    <h1>記事一覧</h1>
    <ul>
      <!-- router-linkを使用して記事詳細へのリンクを作成 -->
      <li v-for="post in posts.slice(0,10)" :key="post.id">
        <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<!-- PaginationComposable.vue -->
<template>
  <div>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

// defineProps で props を受け取る
const { currentPage, totalPages } = defineProps(['currentPage', 'totalPages'])

// defineEmits を使用してイベントを発火するための emit を取得
const emit = defineEmits(["goToPage"])

const goToPage = (page) => {

  if (Number(page) >= 1 && Number(page) <= totalPages) {
    // イベントを発火して親コンポーネントに通知
    emit('goToPage', Number(page))
  }
}

// 他のロジックがあれば追加
</script>

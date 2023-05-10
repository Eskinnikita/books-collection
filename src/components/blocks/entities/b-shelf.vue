<template>
  <div class="shelf">
    <div class="shelf__books-container">
      <book
        v-for="(book, index) in bookStore.books"
        :key="index"
        :book="book"
      />
    </div>
  </div>
</template>

<script setup>
import Book from '@/components/blocks/entities/b-book.vue';
import { useBookStore } from '@/stores/book';
import { useUserStore } from '@/stores/user';

const bookStore = useBookStore();
const userStore = useUserStore();

bookStore.getUserBooks(userStore.user._id);

</script>

<style lang="scss" scoped>
.shelf {
  padding: 50px;

  &__books-container {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100%;
    padding-left: 185px;
  }
}
</style>

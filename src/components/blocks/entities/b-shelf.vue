<template>
  <div class="shelf">
    <div class="shelf__books-container">
      <book
        class="shelf__book"
        v-for="(book, index) in bookStore.books"
        :key="index"
        :book="book"
        @click="setOpenedBook(book._id)"
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

if (userStore.user) {
  bookStore.getUserBooks(userStore.user._id);
}

const setOpenedBook = (id) => {
  bookStore.openedBookId = id;
};

</script>

<style lang="scss" scoped>
.shelf {
  padding: 50px;

  &__book {
    margin-left: -110px;
  }

  &__books-container {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100%;
    padding-left: 175px;
  }
}
</style>

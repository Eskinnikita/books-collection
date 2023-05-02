<template>
  <div class="shelf">
    <div class="shelf__books-container">
      <book v-for="(book, index) in books" :key="index" :book="book"/>
    </div>
  </div>
</template>

<script setup>
import Book from '@/components/blocks/entities/b-book.vue';

const books = [
  {
    id: 1123123,
    title: 'НАРУТО',
    subtitle: '',
    volume: 1,
    cover: 'https://static.insales-cdn.com/images/products/1/6586/394738106/1.jpg',
  },
  {
    id: 1123123,
    title: 'НАРУТО',
    subtitle: '',
    volume: 2,
    cover: 'https://static.insales-cdn.com/images/products/1/4330/410644714/1.jpg',
  },
  {
    id: 1123123,
    title: 'НАРУТО',
    subtitle: '',
    volume: 3,
    cover: 'https://static.insales-cdn.com/images/products/1/5862/439301862/1.jpg',
  },
  {
    id: 1123123,
    title: 'НАРУТО',
    subtitle: '',
    volume: 4,
    cover: 'https://static.insales-cdn.com/images/products/1/4027/452120507/If2_nOoiCko.jpg',
  },
];
</script>

<style lang="scss">
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

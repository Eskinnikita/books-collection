<template>
  <div class="book-container">
    <div class="book">
      <div class="book__side book__title">
        <div class="book__title-text">
          <span class="book__title-name">{{ book.title }}</span>
          <div class="book__title-volume">
            <span>{{ book.volume }}</span>
          </div>
        </div>
      </div>
      <div class="book__side book__cover">
        <img class="book__cover-image" :src="book.cover" alt="cover"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  book: Object,
});
const { book } = toRefs(props);
</script>

<style lang="scss" scoped>
$title-side-width: 30px;
$title-side-translate: $title-side-width / 2 - 1;

.book-container {
  height: 300px;
  width: 200px;
  margin-bottom: 50px;
  margin-left: -110px;
  perspective: 1000px;
  transition: 0.3s;

  &:hover {
    z-index: 9999;
    transform: translateX(-40px);
    & > .book {
      transform: rotateY(0) scale(1.15);
    }
  }
}

.book {
  display: flex;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: 0.3s;
  transform: rotateY(45deg);
  cursor: pointer;

  &__side {
    height: 300px;
    width: 200px;
    position: absolute;
  }

  &__cover {
    border: 1px solid #cecece;
    background-color: #fff;
    border-radius: 0 4px 4px 0;
    transform: translateZ($title-side-translate);
  }

  &__cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-backface-visibility: hidden;
  }

  &__title {
    display: flex;
    justify-content: flex-end;
    width: $title-side-width;
    transform: rotateY(-90deg) translateZ($title-side-translate);
  }

  &__title-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #cecece;
    border-radius: 4px 0 0 4px;
  }

  &__title-name {
    height: 100%;
    padding-bottom: 5px;
    margin-bottom: -10px;
    text-align: center;
    font-size: 13px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  &__title-volume {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin: 10px 0;
    border: 1px solid #777;
    border-radius: 50%;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>

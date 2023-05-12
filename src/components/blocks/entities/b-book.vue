<template>
  <div class="book-container">
    <div class="book" :class="bookClasses">
      <div class="book__side book__title">
        <div
          class="book__title-text"
          :style="{backgroundColor: book.primaryColor, color: book.textColor}"
        >
          <span v-if="book?.series?.name" class="book__title-name">
            <span>{{ book.series.name }}</span>
            <span v-if="book.subtitle">:{{ book.subtitle }}</span>
          </span>
          <div v-if="book.volume && !book.isSingle" class="book__title-volume">
            <span>{{ book.volume }}</span>
          </div>
        </div>
      </div>
      <div class="book__side book__cover">
        <img v-if="book.cover" class="book__cover-image" :src="book.cover" alt="cover"/>
        <div v-else>Обложка не загружена</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue';

const props = defineProps({
  book: Object,
  preview: {
    type: Boolean,
    default: false,
  },
});
const { book, preview } = toRefs(props);

const bookClasses = computed(() => {
  let classes = '';
  const format = book.value?.series?.format;
  if (format >= 1 && format < 2) {
    classes += 'book--small';
  } if (format >= 2 && format < 3) {
    classes += 'book--med';
  } else if (format >= 3) {
    classes += 'book--fat';
  }

  if (preview.value) {
    classes += ' book-preview';
  }

  return classes;
});
</script>

<style lang="scss" scoped>
$book-width: 200px;
$book-height: 300px;

$title-side-width: 30px;
$title-side-translate: $title-side-width / 2 - 0.5;

@mixin setBookWidth($width, $font-size) {
  .book__cover {
    transform: translateZ($width / 2 - 0.5);
  }
  .book__title {
    width: $width;
    transform: rotateY(-90deg) translateZ($width / 2 - 0.5);
  }
  .book__title-name {
    font-size: $font-size;
  }
}

.book-container {
  height: $book-height;
  width: $book-width;
  margin-bottom: 50px;
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
  transform: rotateY(35deg);
  cursor: pointer;

  &--small {
    @include setBookWidth(30px, 15px);
  }

  &--med {
    @include setBookWidth(40px, 18px);
  }

  &--fat {
    @include setBookWidth(55px, 19px);
  }

  &__side {
    height: $book-height;
    width: $book-width;
    position: absolute;
  }

  &__cover {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cecece;
    background-color: #fff;
    border-radius: 0 4px 4px 0;
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
  }

  &__title-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    background-color: #fff;
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
    font-size: 14px;
    font-weight: bold;
  }
}
</style>

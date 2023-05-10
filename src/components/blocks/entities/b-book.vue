<template>
  <div class="book-container">
    <div class="book" :class="bookClasses">
      <div class="book__side book__title">
        <div class="book__title-text">
          <span class="book__title-name">
            {{ book.series.name }}:{{ book.subtitle }}
          </span>
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
import { defineProps, toRefs, computed } from 'vue';

const props = defineProps({
  book: Object,
});
const { book } = toRefs(props);

const bookClasses = computed(() => {
  const format = book.value?.series?.format;
  console.log(format);
  if (format >= 1 && format < 2) {
    return 'book--small';
  } if (format >= 2 && format < 3) {
    return 'book--med';
  }
  return 'book--fat';
});
</script>

<style lang="scss" scoped>
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
  transform: rotateY(40deg);
  cursor: pointer;

  &--small {
    @include setBookWidth(30px, 15px);
  }

  &--med {
    @include setBookWidth(50px, 18px);
  }

  &--fat {
    @include setBookWidth(80px, 21px);
  }

  &__side {
    height: 300px;
    width: 200px;
    position: absolute;
  }

  &__cover {
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

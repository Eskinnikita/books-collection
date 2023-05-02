<template>
  <b-header/>
  <b-login-modal/>
  <router-view/>
</template>

<script setup>
import BHeader from '@/components/blocks/global/b-header.vue';
import BLoginModal from '@/components/blocks/modals/b-login-modal.vue';
</script>

<style lang="scss">
@import "src/assets/scss/reset";

#app {
  font-family: v-mono, sans-serif;
}
</style>

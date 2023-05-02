<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <b-header/>
    <b-login-modal/>
    <router-view/>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from 'naive-ui';
import BHeader from '@/components/blocks/global/b-header.vue';
import BLoginModal from '@/components/blocks/modals/b-login-modal.vue';

const themeOverrides = {
  common: {
    primaryColor: '#187CA0FF',
    primaryColorHover: '#377099FF',
    primaryColorPressed: '#2B53AAFF',
    primaryColorSuppl: '#3689ADFF',
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/reset";

body {
  font-family: v-mono, sans-serif;
}
</style>

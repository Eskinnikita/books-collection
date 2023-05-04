<template>
  <div class="header">
    <div class="header__user-info">
      <template v-if="userStore?.user">
        {{ userStore.user.username }}
        <n-button type="info" @click="userStore.logout">
          Выйти
        </n-button>
      </template>
      <template v-else>
        <n-button type="info" @click="appStore.toggleLoginModal(true)">
          Войти
        </n-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useMessage } from 'naive-ui';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

window.$message = useMessage();

const appStore = useAppStore();
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 10px;
  display: flex;
  justify-content: flex-end;
}
</style>

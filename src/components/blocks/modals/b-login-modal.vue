<template>
  <n-modal
    v-model:show="appStore.isLogModalShown"
    class="b-login-modal"
    preset="card"
    :style="bodyStyle"
    title="Войти"
    :bordered="false"
    size="huge"
  >
    <b-login-form v-if="formType === 'login'" @change-modal-form="changeFormType"/>
    <b-reg-form v-else @change-modal-form="changeFormType"/>
  </n-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAppStore } from '@/stores/app';
import BLoginForm from '@/components/blocks/global/forms/b-login-form.vue';
import BRegForm from '@/components/blocks/global/forms/b-reg-form.vue';

const appStore = useAppStore();

const formType = ref('login');
const changeFormType = (type) => {
  formType.value = type;
};

// change modal type to login on modal close
watch(() => appStore.isLogModalShown, (newVal) => {
  if (newVal === false) {
    setTimeout(() => {
      formType.value = 'login';
    }, 200);
  }
});

const bodyStyle = {
  width: '600px',
};
</script>

<style lang="scss" scoped>
.b-login-modal {
  &__controls {
    margin-top: 20px;
  }
}

</style>

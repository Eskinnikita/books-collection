<template>
  <n-modal
    v-model:show="appStore.isLogModalShown"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="Войти"
    :bordered="false"
    size="huge"
  >
    <n-form ref="loginForm" :model="formValue" :rules="valRules">
      <n-form-item path="email" label="Электронная почта">
        <n-input
          v-model:value="formValue.email"
          placeholder="example@mail.ru"
          type="text"
        />
      </n-form-item>
      <n-form-item path="password" label="Пароль">
        <n-input
          v-model:value="formValue.password"
          placeholder="12341234"
          type="password"
        />
      </n-form-item>
      <n-space justify="space-between">
        <n-button @click="sendLoginData">
          Войти
        </n-button>
        <n-button type="text">
          Зарегистрироваться
        </n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

const appStore = useAppStore();
const userStore = useUserStore();

// login form setup
const formValue = ref({
  username: '',
  email: '',
  password: '',
});

// login form validation rules
const valRules = {
  username: {
    required: true,
    message: 'Введите ваше имя!',
    trigger: 'blur',
  },
  email: {
    required: true,
    message: 'Введите вашу почту!',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: 'Введите пароль!',
    trigger: 'blur',
  },
};

const sendLoginData = async () => {
  userStore.loginUser(formValue.value)
    .then(() => appStore.toggleLoginModal(false));
};

const bodyStyle = {
  width: '600px',
};
</script>

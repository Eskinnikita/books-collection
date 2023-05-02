<template>
  <n-form ref="loginForm" :model="formValue" :rules="valRules">
    <n-form-item path="email" label="Электронная почта">
      <n-input
        v-model:value="formValue.email"
        placeholder="example@mail.ru"
        type="text"
      />
    </n-form-item>
    <n-form-item path="username" label="Отображаемое имя">
      <n-input
        v-model:value="formValue.username"
        placeholder="Вася пупкин"
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
    <n-space justify="space-between" class="b-login-modal__controls">
      <n-button type="info" @click="sendRegData">
        Создать аккаунт
      </n-button>
      <n-button type="text" @click="$emit('change-modal-form', 'login')">
        Войти
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

defineEmits(['change-modal-form']);

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
    trigger: ['blur', 'input'],
  },
  email: {
    required: true,
    message: 'Введите вашу почту!',
    trigger: ['blur', 'input'],
  },
  password: {
    required: true,
    message: 'Введите пароль!',
    trigger: ['blur', 'input'],
  },
};

// reset form data on login success
const resetForm = () => {
  formValue.value = {
    username: '',
    email: '',
    password: '',
  };
};

const sendRegData = async () => {
  userStore.regUser(formValue.value)
    .then(() => {
      appStore.toggleLoginModal(false);
      resetForm();
    });
};
</script>

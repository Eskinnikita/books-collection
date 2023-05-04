<template>
  <n-form ref="formRef" :model="formValue" :rules="valRules">
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
    <n-space justify="space-between" class="b-login-modal__controls">
      <n-button
        @click="sendLoginData"
        type="info"
      >
        Войти
      </n-button>
      <n-button @click="$emit('change-modal-form', 'reg')" type="text">
        Зарегистрироваться
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

defineEmits(['change-modal-form']);

const appStore = useAppStore();
const userStore = useUserStore();

const formRef = ref(null);
const formValue = ref({
  email: '',
  password: '',
});

function validatePassLength(rule, value) {
  return value.trim().length && value.length >= 6 && value.length <= 10;
}

function validateEmailFormat(rule, value) {
  const emailRegExp = /^(?![^\w"])("(.*?)"|[\w.,_%+\-/!;]+)(\.[\w.,_%+\-/!;]+)*@[a-zA-Z0-9.[\]\-:]+$/;
  if (value.trim().length) {
    return emailRegExp.test(value);
  }
  return true;
}

// login form validation rules
const valRules = {
  email: [
    {
      required: true,
      message: 'Введите вашу почту!',
      trigger: ['blur', 'input'],
    },
    {
      validator: validateEmailFormat,
      message: 'Введите корректный адрес почты!',
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    {
      required: true,
      message: 'Введите пароль!',
      trigger: ['blur', 'input'],
    },
    {
      validator: validatePassLength,
      message: 'Длина пароля от 5 до 10 символов!',
      trigger: ['blur', 'input'],
    },
  ],
};

// reset form data on login success
const resetForm = () => {
  formValue.value = {
    email: '',
    password: '',
  };
};

const sendLoginData = async () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      userStore.loginUser(formValue.value)
        .then(() => {
          appStore.toggleLoginModal(false);
          resetForm();
        })
        .catch(() => {});
    }
  });
};
</script>

<style lang="scss" scoped>
.b-login-modal {
  &__controls {
    margin-top: 20px;
  }
}
</style>

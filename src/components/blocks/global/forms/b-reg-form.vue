<template>
  <n-form class="b-reg-modal" ref="formRef" :model="formValue" :rules="valRules">
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
        placeholder="Вася Пупкин"
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
    <n-space justify="space-between" class="b-reg-modal__controls">
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
import { validatePassLength, validateEmailFormat } from '@/helpers/validators';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

defineEmits(['change-modal-form']);

const appStore = useAppStore();
const userStore = useUserStore();

// reg form setup
const formRef = ref(null);
const formValue = ref({
  username: '',
  email: '',
  password: '',
});

// reg form validation rules
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
  username: {
    required: true,
    message: 'Введите ваше имя!',
    trigger: ['blur', 'input'],
  },
  password: [
    {
      required: true,
      message: 'Введите пароль!',
      trigger: ['blur', 'input'],
    },
    {
      validator: validatePassLength,
      message: 'Длина пароля от 4 до 10 символов!',
      trigger: ['blur', 'input'],
    },
  ],
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
  formRef.value?.validate((errors) => {
    if (!errors) {
      userStore.regUser(formValue.value)
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
.b-reg-modal {
  &__controls {
    margin-top: 20px;
  }
}
</style>

<template>
  <n-form ref="formRef" :model="formValue" :rules="valRules">
    <n-form-item path="name" label="Название издательства">
      <n-input
        v-model:value="formValue.name"
        placeholder="Азбука-аттикус, Истари комикс и т.д."
        type="text"
      />
    </n-form-item>
    <n-space justify="flex-start">
      <n-button @click="sendRegData" type="info">
        Добавить
      </n-button>
      <n-button @click="closeAddItemForm" type="text">
        Отменить
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import { useBookStore } from '@/stores/book';

const emits = defineEmits(['close-add-item-form', 'on-pub-add']);

const bookStore = useBookStore();

// reg form setup
const formRef = ref(null);
const formValue = ref({
  name: '',
});

// reg form validation rules
const valRules = {
  name: {
    required: true,
    message: 'Введите название издательства!',
    trigger: ['blur', 'input'],
  },
};

// reset form data on login success
const resetForm = () => {
  formValue.value = {
    name: '',
  };
};

const sendRegData = async () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      bookStore.addPublisher(formValue.value)
        .then((res) => {
          if (res) emits('on-pub-add', res);
          emits('close-add-item-form');
          resetForm();
        })
        .catch(() => {});
    }
  });
};

const closeAddItemForm = () => {
  emits('close-add-item-form');
  resetForm();
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <n-form ref="formRef" :model="formValue" :rules="valRules">
    <n-form-item path="name" label="Название серии">
      <n-input
        v-model:value="formValue.name"
        placeholder="Наруто, Большой куш, Нелюдь и т.д."
        type="text"
      />
    </n-form-item>
    <n-form-item
      path="format"
      label="Формат издания (сколько танкобонов или выпусков содержит делюкс издание)"
    >
      <n-input-number
        v-model:value="formValue.format"
        :validator="(x) => x > 0"
        :step="0.5"
        placeholder="1, 1.5, 2..."
      />
    </n-form-item>
    <n-form-item label="Тип серии">
      <n-radio-group v-model:value="formValue.type" name="radiogroup">
        <n-space>
          <n-radio
            v-for="type in types"
            :key="type.value"
            :value="type.value"
            :label="type.label"
          />
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-space justify="flex-start">
      <n-button type="info" @click="sendData">
        Добавить
      </n-button>
      <n-button type="text" @click="closeAddItemForm">
        Отменить
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup>
import {
  ref, defineEmits, defineProps, toRefs,
} from 'vue';
import { validateSeriesFormat } from '@/helpers/validators';
import { useBookStore } from '@/stores/book';

const emits = defineEmits(['close-add-item-form', 'on-ser-add']);
const props = defineProps({
  publisherId: {
    type: String,
    required: true,
  },
});
const { publisherId } = toRefs(props);
const bookStore = useBookStore();

const types = [
  {
    label: 'Манга',
    value: 1,
  },
  {
    label: 'Ранобэ',
    value: 2,
  },
  {
    label: 'Европейский комикс',
    value: 3,
  },
];

// reg form setup
const formRef = ref(null);
const formValue = ref({
  publisher_id: publisherId.value,
  name: '',
  format: 1,
  type: 1,
});

// reg form validation rules
const valRules = {
  name: {
    required: true,
    message: 'Введите название серии!',
    trigger: ['blur', 'input'],
  },
  format: [
    {
      type: 'number',
      required: true,
      message: 'Укажите формат издания!',
      trigger: ['blur'],
    },
    {
      validator: validateSeriesFormat,
      message: 'Число должно быть больше 0 и кратно 0.5',
      trigger: ['blur', 'input'],
    },
  ],
};

// reset form data on login success
const resetForm = () => {
  formValue.value = {
    publisher_id: null,
    name: '',
    format: 1,
    type: 1,
  };
};

const sendData = async () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      bookStore.addSeries(formValue.value)
        .then((res) => {
          if (res) emits('on-ser-add', res);
          emits('close-add-item-form');
          resetForm();
        })
        .catch(() => {});
    }
  });
};

const closeAddItemForm = () => {
  emits('close-add-item-form');
  formValue.value = {
    name: '',
    format: 1,
    type: 1,
  };
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <n-button
    v-if="userStore.canEdit"
    @click="showModal = true"
    class="add-btn"
    size="large"
    type="info"
    ghost
    circle
  >
    <template #icon>
      <n-icon><add-icon /></n-icon>
    </template>
  </n-button>
  <n-modal
    v-model:show="showModal"
    :bordered="false"
    :style="bodyStyle"
    class="b-book-modal"
    preset="card"
    title="Добавить издание"
    size="huge"
  >
    <n-form ref="formRef" :rules="valRules">
      <!-- Publisher select -->
      <n-form-item v-if="!showForm.pub" path="publisher_id" label="Издатель">
        <n-select
          v-model:value="book.publisher_id"
          filterable
          placeholder="Азбука-Аттикус, Истари Комикс и т.д."
        />
        <n-button
          @click="toggleAddForm('pub', true)"
          type="info"
          quaternary
        >
          Добавить
        </n-button>
      </n-form-item>
      <b-publisher-form
        @close-add-item-form="toggleAddForm('pub', false)"
        class="b-book-modal__add-item"
        v-else
      />
      <!-- Series select -->
      <n-form-item v-if="!showForm.series" path="series_id" label="Серия">
        <n-select
          v-model:value="book.series_id"
          filterable
          placeholder="Наруто, Bleach, One Piece"
        />
        <n-button
          @click="toggleAddForm('series', true)"
          type="info"
          quaternary
        >
          Добавить
        </n-button>
      </n-form-item>
      <b-series-form
        @close-add-item-form="toggleAddForm('series', false)"
        class="b-book-modal__add-item"
        v-else
      />
      <!-- Additional options -->
      <n-form-item label="Тип издания">
        <n-checkbox v-model:checked="book.isSingle">
          Внесерийное издание (нет номера тома, есть подзаголовок)
        </n-checkbox>
      </n-form-item>
      <n-form-item path="subtitle" label="Подзаголовок">
        <n-input
          v-model:value="book.subtitle"
          placeholder="Отображается через : после названия серии"
        />
      </n-form-item>
      <n-form-item v-if="!book.isSingle" path="volume" label="Номер тома">
        <n-input-number
          v-model:value="book.volume"
          placeholder="0,1,2,3,4"
          path="volume"
          clearable />
      </n-form-item>
      <n-form-item label="Обложка">
        <n-upload
          list-type="image-card"
        >
          Нажмите для загрузки
        </n-upload>
      </n-form-item>
    </n-form>
    <n-button @click="addBook" style="width: 100%; margin-bottom: 20px;" type="info">
      Добавить
    </n-button>
    <n-button style="width: 100%" type="text">
      Посмотреть превью
    </n-button>
  </n-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Add as AddIcon } from '@vicons/ionicons5';
import BPublisherForm from '@/components/blocks/global/forms/b-publisher-form.vue';
import BSeriesForm from '@/components/blocks/global/forms/b-series-form.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const formRef = ref(null);
const showModal = ref(false);

const showForm = ref({
  pub: false,
  series: false,
});

const toggleAddForm = (type, value) => {
  showForm.value[type] = value;
};

const book = ref({
  isSingle: false,
  subtitle: '',
  volume: 1,
  cover: '',
});

const valRules = {
  volume: [
    {
      type: 'number',
      required: true,
      message: 'Укажите формат издания!',
      trigger: ['blur'],
    },
  ],
};

const bodyStyle = {
  width: '800px',
};

const addBook = () => {
  formRef.value?.validate(() => {
    // if (!errors) {
    // }
  });
};

const clearForm = () => {
  showForm.value = {
    pub: false,
    series: false,
  };
};

watch(showModal, (newVal) => {
  if (newVal === false) {
    clearForm();
  }
});

</script>

<style scoped lang="scss">
.add-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.b-book-modal {
  &__add-item {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 5px;
  }
}
</style>

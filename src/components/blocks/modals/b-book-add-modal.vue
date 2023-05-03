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
    preset="card"
    :style="bodyStyle"
    title="Добавить издание"
    :bordered="false"
    size="huge"
  >
    <n-form ref="loginForm">
      <n-form-item label="Серия">
        <n-select
          v-model:value="book.series_id"
          filterable
          placeholder="Наруто, Bleach, One Piece"
        />
      </n-form-item>
      <n-form-item label="Тип издания">
        <n-checkbox v-model:checked="book.isSingle">
          Внесерийное издание (нет номера тома, есть подзаголовок)
        </n-checkbox>
      </n-form-item>
      <n-form-item label="Подзаголовок">
        <n-input
          v-model:value="book.subtitle"
          placeholder="Отображается через : после названия серии"
        />
      </n-form-item>
      <n-form-item v-if="!book.isSingle" label="Номер тома">
        <n-input-number
          v-model:value="book.volume"
          :validator="volumeNumValidator"
          placeholder="0,1,2,3,4"
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
import { ref } from 'vue';
import { Add as AddIcon } from '@vicons/ionicons5';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const showModal = ref(false);

const book = ref({
  series_id: null,
  isSingle: false,
  subtitle: '',
  volume: null,
  cover: '',
});

const volumeNumValidator = (x) => x > 0;

const bodyStyle = {
  width: '800px',
};

const addBook = () => {

};

</script>

<style scoped lang="scss">
.add-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
</style>

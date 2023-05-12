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
      <div v-show="!showPreview">
        <n-form ref="formRef" :model="book" :rules="valRules">
        <!-- Publisher select -->
        <n-form-item v-if="!showForm.pub" path="publisher_id" label="Издатель">
          <n-select
            v-model:value="publisherId"
            :options="publishers"
            filterable
            placeholder="Азбука-Аттикус, Истари Комикс и т.д."
          />
          <n-button
            @click="toggleAddForm('pub', true)"
            :disabled="showForm.series"
            type="info"
            quaternary
          >
            Добавить
          </n-button>
        </n-form-item>
        <b-publisher-form
          @close-add-item-form="toggleAddForm('pub', false)"
          @on-pub-add="onNewPubAdded"
          class="b-book-modal__add-item"
          v-else
        />
        <!-- Series select -->
        <n-form-item v-if="!showForm.series" path="series_id" label="Серия">
          <n-select
            v-model:value.trim="book.series_id"
            :options="series"
            filterable
            placeholder="Наруто, Bleach, One Piece"
          />
          <n-button
            @click="toggleAddForm('series', true)"
            :disabled="showForm.pub"
            type="info"
            quaternary
          >
            Добавить
          </n-button>
        </n-form-item>
        <b-series-form
          :publisher-id="publisherId"
          @close-add-item-form="toggleAddForm('series', false)"
          @on-ser-add="onNewSeriesAdd"
          class="b-book-modal__add-item"
          v-else
        />
        <!-- Additional options -->
        <n-form-item label="Тип издания" path="isSingle">
          <n-checkbox v-model:checked="book.isSingle">
            Внесерийное издание (нет номера тома, есть подзаголовок)
          </n-checkbox>
        </n-form-item>
        <n-form-item label="Подзаголовок" path="subtitle">
          <n-input
            v-model:value.trim="book.subtitle"
            placeholder="Отображается через : после названия серии"
          />
        </n-form-item>
        <n-form-item v-if="!book.isSingle" label="Номер тома" path="volume">
          <n-input-number
            v-model:value.trim="book.volume"
            :validator="(x) => x > -1"
            placeholder="0,1,2,3,4"
            clearable />
        </n-form-item>
        <n-form-item label="Обложка" path="cover">
          <n-upload
            :action="imUploadUrl"
            :max="1"
            @remove="book.cover = ''"
            @finish="setUploadedImage"
            @error="showErrorMessage"
          >
            <n-button>Загрузить обложку</n-button>
          </n-upload>
        </n-form-item>
        </n-form>
        <n-button
          @click="addBook"
          :disabled="showForm.pub || showForm.series"
          style="width: 100%; margin-bottom: 20px;"
          type="info"
        >
          Добавить
        </n-button>
        <n-button
          @click="() => showPreview = true"
          :disabled="!book.series_id"
          style="width: 100%"
          text
        >
          Посмотреть превью
        </n-button>
      </div>
    <div class="preview" v-if="showPreview">
      <b-book :book="book"/>
      <n-button @click="() => showPreview = false" style="width: 100%">
        Вернуться к редактированию
      </n-button>
    </div>
  </n-modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Add as AddIcon } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import BPublisherForm from '@/components/blocks/global/forms/b-publisher-form.vue';
import BSeriesForm from '@/components/blocks/global/forms/b-series-form.vue';
import BBook from '@/components/blocks/entities/b-book.vue';
import { useUserStore } from '@/stores/user';
import { useBookStore } from '@/stores/book';

const message = useMessage();

const userStore = useUserStore();
const bookStore = useBookStore();

const formRef = ref(null);
const showModal = ref(false);
const showPreview = ref(false);

const showForm = ref({
  pub: false,
  series: false,
});

const toggleAddForm = (type, value) => {
  showForm.value[type] = value;
};

const bookSchema = {
  series_id: null,
  user_id: userStore.user?._id ?? null,
  isSingle: false,
  subtitle: '',
  volume: 1,
  cover: '',
  primaryColor: '#fff',
  textColor: '#000',
};

const book = ref(JSON.parse(JSON.stringify(bookSchema)));

watch(() => book.value.series_id, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const seriesInfo = bookStore.series.find((el) => el._id === newValue);
    if (seriesInfo?.lastVolume !== null && seriesInfo?.lastVolume > -1) {
      book.value.volume = seriesInfo.lastVolume + 1;
      return;
    }
    book.value.volume = 1;
  }
});

const validateExistedVolume = (rule, value) => {
  if (book.value.series_id) {
    const seriesInfo = bookStore.series.find((el) => el._id === book.value.series_id);
    return seriesInfo?.volumes?.length ? !seriesInfo.volumes.includes(value) : true;
  }
  return true;
};

const valRules = {
  series_id: {
    required: true,
    message: 'Укажите серию!',
  },
  volume: [
    {
      type: 'number',
      required: true,
      message: 'Укажите номер тома!',
      trigger: ['blur'],
    },
    {
      validator: validateExistedVolume,
      message: 'Том с таким номером уже существует!',
      trigger: ['blur', 'input'],
    },
  ],
};

const resetForm = () => {
  book.value = JSON.parse(JSON.stringify(bookSchema));
};

const addBook = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (book.value.isSingle) {
        book.value.volume = -1;
      }
      bookStore.addBook(book.value)
        .then(() => {
          showModal.value = false;
          resetForm();
        })
        .catch(() => {});
    }
  });
};

const clearForm = () => {
  showForm.value = {
    pub: false,
    series: false,
  };
};

const series = ref([]);

const onNewSeriesAdd = (ser) => {
  series.value.push({ label: ser.name, value: ser._id });
  book.value.series_id = ser._id;
};

const getSeriesByPublisher = async (id) => {
  await bookStore.getSeriesByPublisher(id);
  series.value = bookStore.series.map((el) => ({ label: el.name, value: el._id }));
  book.value.series_id = series.value.length ? series.value[0].value : null;
};

const publishers = ref([]);
const publisherId = ref(null);

const onNewPubAdded = (pub) => {
  publishers.value.push({ label: pub.name, value: pub._id });
  publisherId.value = pub._id;
};

watch(publisherId, (newVal) => {
  getSeriesByPublisher(newVal);
});

const getPublishers = async () => {
  await bookStore.getPublishers();
  if (bookStore.publishers.length) {
    publishers.value = bookStore.publishers.map((el) => ({ label: el.name, value: el._id }));
    publisherId.value = publishers.value.length ? publishers.value[0].value : null;
  }

  if (publisherId.value) {
    await getSeriesByPublisher(publisherId.value);
  }
};

watch(showModal, (newVal) => {
  if (newVal === false) {
    clearForm();
    resetForm();
    showPreview.value = false;
  } else {
    getPublishers();
  }
});

const imUploadUrl = computed(() => `${process.env.VUE_APP_API_BASEURL}/service/image/imgur/${userStore.user._id}`);

const setUploadedImage = ({ event }) => {
  const response = event?.target?.response;
  const resultJson = JSON.parse(response);
  book.value.cover = resultJson.result.imagePreview ?? '';
  book.value.primaryColor = resultJson.result.colors.bg ?? '#fff';
  book.value.textColor = resultJson.result.colors.text ?? '#000';
};

const showErrorMessage = ({ event }) => {
  const error = event?.target?.response;
  const resultJson = JSON.parse(error);
  message.error(resultJson.message);
};

// Add series to book on preview show
watch(showPreview, (newValue) => {
  if (newValue) {
    const tempSeries = bookStore.series.find((el) => el._id === book.value.series_id);
    book.value.series = tempSeries ?? {};
  } else {
    delete book.value.series;
  }
});

const bodyStyle = {
  width: '800px',
};
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

.preview {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
}
</style>

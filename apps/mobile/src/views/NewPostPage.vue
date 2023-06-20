<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New post</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row v-if="formError" style="margin-bottom: 15px;">
          <ion-col size="12" class="ion-text-center">
            <ion-text color="danger">{{ formError }}</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input v-model="formData.title" type="text" placeholder="Title" clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-textarea placeholder="Description" v-model="formData.description"></ion-textarea>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <ion-item>
              <ion-button color="light" @click="openCamera">Take picture</ion-button>
            </ion-item>
            <ion-item>
              <ion-text>OR</ion-text>
            </ion-item>
            <ion-item>
              <ion-button color="light" @click="openFilePicker">Select from file storage</ion-button>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-button expand="full" style="margin: 20px;" :disabled="!formValid" @click="save">Create</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonInput,
  IonButton,
  IonTextarea,
} from '@ionic/vue';
import { ref, computed } from 'vue';
import { Camera } from '@capacitor/camera';
import { v4 as uuidv4 } from 'uuid';
import { API_POSTS_URL } from '../constants';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const formError = ref(null);

const formData = ref({
  title: '',
  description: '',
  file: '',
});

const formValid = computed(() => {
  return formData.value.title !== ''
    && formData.value.description !== ''
    && formData.value.file !== '';
});

function getMimeTypeFromFormat(format) {
  switch (format) {
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/jpeg';
  }
}

function transformFile(path, format) {
  return fetch(path)
    .then(res => res.blob())
    .then(blob => {
      const fileName = `${uuidv4()}.${format}`;
      const file = new File([blob], fileName, { type: getMimeTypeFromFormat(format) });
      formData.value.file = file;
    });
}

function openCamera() {
  Camera.getPhoto({}).then((result) => {
    const file = result;
    transformFile(file.webPath, file.format);
  });
}

function openFilePicker() {
  Camera.pickImages({}).then((result) => {
    const file = result.photos[0];
    transformFile(file.webPath, file.format);
  });
}

function save() {
  const { title, description, file } = formData.value;

  const data = new FormData();
  data.append('title', title);
  data.append('description', description);
  data.append('file', file);

  axios.post(API_POSTS_URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(() => {
      router.push({ path: '/home' });
    })
    .catch((error) => {
      formError.value = error.response.data.message;
    });
}
</script>

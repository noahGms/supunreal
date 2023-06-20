<template>
  <ion-page>
    <ion-header class="header-fixed">
      <ion-toolbar>
        <ion-title style="text-transform: uppercase; font-weight: bold;">Supunreal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="content-centered">
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <h1 style="margin-bottom: 30px;">Create an account</h1>
          </ion-col>
        </ion-row>
        <ion-row v-if="formError" style="margin-bottom: 15px;">
          <ion-col size="12" class="ion-text-center">
            <ion-text color="danger">{{ formError }}</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input v-model="newUser.email" type="email" placeholder="Email" clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input v-model="newUser.username" type="text" placeholder="Username" clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input v-model="newUser.password" type="password" placeholder="Password" clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input v-model="newUser.password_confirmation" type="password" placeholder="Password confirmation"
                clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-button expand="full" @click="register" :disabled="!formValid">Register</ion-button>
          </ion-col>
        </ion-row>
        <ion-row style="margin-top: 30px;">
          <ion-col size="12" class="ion-text-center">
            <ion-text>Already an account ? <ion-text color="primary" style="cursor: pointer;"
                @click="router.push({ name: 'Login' })">Login</ion-text></ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonPage, IonHeader, IonToolbar, IonRow, IonCol, IonInput, IonTitle, IonButton, IonGrid, IonItem, IonText } from '@ionic/vue';
import { API_AUTH_URL } from '../../constants';

const router = useRouter();

const newUser = ref({
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
});

const formValid = computed(() => {
  return newUser.value.email !== ''
    && newUser.value.username !== ''
    && newUser.value.password !== ''
    && newUser.value.password_confirmation !== '';
});

const formError = ref(null);
function register() {
  formError.value = null;

  if (newUser.value.password !== newUser.value.password_confirmation) {
    formError.value = 'Password confirmation does not match';
    return;
  }

  axios.post(`${API_AUTH_URL}/register`, newUser.value)
    .then(() => {
      router.push({ name: 'Login' });
    })
    .catch(error => {
      formError.value = error.response.data.message;
    });
}
</script>

<style scoped>
.content-centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
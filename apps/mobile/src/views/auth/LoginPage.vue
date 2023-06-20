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
            <h1 style="margin-bottom: 30px;">Login to your account</h1>
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
              <ion-input v-model="credentials.email" type="email" placeholder="Email" clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input v-model="credentials.password" type="password" placeholder="Password" clearInput></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-button expand="full" @click="login" :disabled="!formValid">Login</ion-button>
          </ion-col>
        </ion-row>
        <ion-row style="margin-top: 30px;">
          <ion-col size="12" class="ion-text-center">
            <ion-text>You don't have an account ? <ion-text color="primary" style="cursor: pointer;"
                @click="router.push({ name: 'Register' })">Register</ion-text></ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonPage, IonHeader, IonToolbar, IonRow, IonCol, IonInput, IonTitle, IonButton, IonGrid, IonItem, IonText } from '@ionic/vue';

const store = useStore();
const router = useRouter();

const credentials = ref({
  email: '',
  password: '',
});

const formValid = computed(() => {
  return credentials.value.email !== ''
    && credentials.value.password !== ''
});

const formError = ref(null);
function login() {
  formError.value = null;

  store.dispatch('auth/login', credentials.value)
    .then(() => {
      router.push({ name: 'Home' });
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
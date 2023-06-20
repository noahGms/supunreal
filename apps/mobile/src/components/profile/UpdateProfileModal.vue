<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="close">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Update profile</ion-title>
      <ion-buttons slot="end">
        <ion-button :strong="true" :disabled="!formValid">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form>
      <ion-item v-if="formError" class="ion-text-center">
        <ion-text color="danger">{{ formError }}</ion-text>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Username</ion-label>
        <ion-input label="" type="text" v-model="formData.username"></ion-input>
      </ion-item>
    </form>
  </ion-content>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  modalController,
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.getters['auth/getAuthenticatedUser']);

function close() {
  modalController.dismiss();
  formData.value.username = '';
  formError.value = null;
}

const formData = ref({
  username: '',
});

const formValid = computed(() => {
  return formData.value.username !== user.value.username
});

const formError = ref(null);

onMounted(() => {
  formData.value.username = user.value.username;
});
</script>
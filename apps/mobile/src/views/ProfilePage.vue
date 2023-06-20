<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title style="display: flex; justify-content: space-between;">
                  <div>{{ user?.username }}</div>
                  <div>
                    <ion-button size="small">Update profile</ion-button>
                    <ion-button size="small" color="danger" @click="logout">Logout</ion-button>
                  </div>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from '@ionic/vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters['auth/getAuthenticatedUser']);

function logout() {
  store.dispatch('auth/logout')
    .then(() => {
      router.push({ name: 'Login' });
    });
}
</script>

<style scoped></style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile page</ion-title>
        <ion-progress-bar v-if="loadingMyPosts" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="!loadingMyPosts">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
                  <div>{{ user?.username }}</div>
                  <div>
                    <ion-button size="small" @click="openUpdateProfileModal">Update profile</ion-button>
                    <ion-button size="small" color="danger" @click="logout">Logout</ion-button>
                  </div>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row class="ion-text-center">
          <ion-col size="12">
            <ion-text>My posts</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <post-list :posts="myPosts" />
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
  IonText,
  IonProgressBar,
  modalController,
} from '@ionic/vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { API_POSTS_URL } from '../constants';
import PostList from '@/components/posts/PostList.vue';
import UpdateProfileModal from '@/components/profile/UpdateProfileModal.vue';

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters['auth/getAuthenticatedUser']);

function logout() {
  store.dispatch('auth/logout')
    .then(() => {
      router.push({ name: 'Login' });
    });
}

const myPosts = ref([]);
const loadingMyPosts = ref(false);

function getMyPosts() {
  loadingMyPosts.value = true;

  axios.get(`${API_POSTS_URL}/my-posts`)
    .then((response) => {
      myPosts.value = response.data.data;
    })
    .finally(() => {
      loadingMyPosts.value = false;
    });
}

async function openUpdateProfileModal() {
  const modal = await modalController.create({
    component: UpdateProfileModal,
  });
  modal.present();
}

onMounted(() => {
  getMyPosts();
});
</script>

<style scoped></style>

<template>
  <div>
    <ion-item v-for="(post, idx) in props.posts" :key="idx">
      <ion-card>
        <ion-card-content>
          <ion-img :src="getPostFileLink(post)" :alt="post.title" style="width: 100%;">
          </ion-img>
          <ion-card-header>
            <ion-card-title class="ion-text-center">{{ post.title }}</ion-card-title>
          </ion-card-header>
        </ion-card-content>
      </ion-card>
    </ion-item>
  </div>
</template>

<script setup>
import {
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonImg
} from '@ionic/vue';
import { defineProps } from 'vue';
import { API_POSTS_URL } from '../../constants';

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

function getPostFileLink(post) {
  return `${API_POSTS_URL}/${post.id}/file/${post.file.id}`;
}
</script>

<style scoped></style>
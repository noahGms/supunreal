<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">Home page</div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
</script>

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

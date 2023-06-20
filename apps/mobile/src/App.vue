<template>
  <ion-app>
    <template v-if="isLoggedIn || currentRouteIsNotLoginOrRegister">
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ pageTitle }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-tabs>
            <ion-router-outlet />
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home">
                <ion-icon :icon="home" />
                <ion-label>Home</ion-label>
              </ion-tab-button>
            </ion-tab-bar>
          </ion-tabs>
        </ion-content>
      </ion-page>
    </template>
    <template v-else>
      <ion-router-outlet />
    </template>
  </ion-app>
</template>

<script setup>
import { IonApp, IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { home } from 'ionicons/icons';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const currentRouteIsNotLoginOrRegister = computed(() => router.currentRoute.value.name !== 'Login' && router.currentRoute.value.name !== 'Register');

const pageTitle = computed(() => {
  switch (router.currentRoute.value.name) {
    case 'Home':
      return 'Home';
    default:
      return 'Unknown page';
  }
});
</script>

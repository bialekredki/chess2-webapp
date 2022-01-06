<template>
  <v-app>
      <v-app-bar app color="primary" dark clipped-left>
        <v-app-bar-nav-icon>
          <v-icon @click="drawer = !drawer">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
        <v-tabs>
          <v-tab to="Home"><v-icon>mdi-home</v-icon> Home</v-tab>
          <v-tab to="Play"><v-icon>mdi-chess-knight</v-icon> Play</v-tab>
          <v-tab><v-icon>mdi-book-open-page-variant</v-icon> Learn</v-tab>
          <v-tab><v-icon>mdi-message-badge</v-icon>Inbox</v-tab>
          <v-tab><v-icon>mdi-account-group</v-icon>Social</v-tab>
        </v-tabs>
    </v-app-bar>
    <v-navigation-drawer  app absolute clipped v-if="drawer">
      <v-list nav >
        <v-list-item
          v-for="item in items[itemsKey]"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>



    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private items: any = {
    home: [{ title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
    play: [{ title: 'Play', icon: 'mdi-chess-king' },
          {title: 'Computer', icon: 'mdi-laptop'},
          {title: 'Puzzles', icon: 'mdi-puzzle'},
        ],
  };
  private drawer = true;

  get itemsKey(): any {
    if (this.$route.name) return this.$route.name.toLowerCase();
    return 'home';
  }
}
</script>

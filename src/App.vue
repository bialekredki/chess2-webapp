<template>
  <v-app>
      <v-app-bar app color="primary" dark clipped-left>
        <v-app-bar-nav-icon>
          <v-icon @click="drawer = !drawer">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
        <v-tabs>
          <v-tab to="/"><v-icon>mdi-home</v-icon> Home</v-tab>
          <v-tab to="/play"><v-icon>mdi-chess-knight</v-icon> Play</v-tab>
          <v-tab to="/learn"><v-icon>mdi-book-open-page-variant</v-icon> Learn</v-tab>
          <v-tab v-if="this.$store.getters['auth/isLoggedIn']"><v-icon>mdi-message-badge</v-icon>Inbox</v-tab>
          <v-tab><v-icon>mdi-account-group</v-icon>Social</v-tab>
          <v-tab 
          v-if="this.$store.getters['auth/isLoggedIn'] && this.$store.getters['auth/canAccessAdminPanel']"
          to="/admin"
          ><v-icon>mdi-shield-crown</v-icon>
          Admin
          </v-tab>
        </v-tabs>
    </v-app-bar>
    <v-navigation-drawer  app absolute clipped v-if="drawer">
      <v-list nav >
        <v-list-item
          v-for="item in items[itemsKey]"
          :key="item.title"
          :to="item.to"
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
      <template v-slot:append>
        <div class="pa-2">
          <SidePanelOptions />
        </div>
      </template>
    </v-navigation-drawer>



    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SidePanelOptions from "@/components/SidePanelOptions.vue";
import axios, { AxiosResponse } from "axios";

@Component({
    components: {
        SidePanelOptions
    }
})
export default class App extends Vue {
  private items: any = {
    home: [{ title: 'Dashboard', icon: 'mdi-view-dashboard', to:'' },
          { title: 'Photos', icon: 'mdi-image', to:'' },
          { title: 'About', icon: 'mdi-help-box', to:'' },
        ],
    play: [{ title: 'Play', icon: 'mdi-chess-king', to:'' },
          {title: 'Computer', icon: 'mdi-laptop', to:'' },
          {title: 'Puzzles', icon: 'mdi-puzzle', to:'' },
        ],
    learn: [{ title: 'Lessons', icon: 'mdi-school', to:'' },
          {title: 'Analyse', icon: 'mdi-magnify', to:'' },
          {title: 'Openings', icon: 'mdi-book-open-blank-variant', to:'' },
        ],
    admin: [{ title: 'Users', icon: 'mdi-account', to:'/admin/users' },
          {title: 'Games', icon: 'mdi-chess-queen', to:'' },
          {title: 'Reports', icon: 'mdi-chart-bell-curve', to:'/admin/reports' },
        ],
  };

  private drawer = true;

  get itemsKey(): any {
    if (this.$route.name && this.$route.name.toLowerCase() in this.items) return this.$route.name.toLowerCase();
    return 'home';
  }
  
  get k(): any {
    return this.$route.name;
  }
}
</script>

<template>
    <v-list dense nav>
        <v-list-item
          v-for="item in filteredItems"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            <v-avatar size="32">
            <v-img
            :v-if="item.title==='Me'"
            :lazy-src="avatarURL"
            :src="avatarURL"
            width="32"
            height="32"
            ></v-img></v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-caption">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

@Component
export default class UserPanel extends Vue {
    get items(): any { return [
        {title: this.$store.getters['user/getName'], icon: '' , route: `/me/${this.userName}`, whenLogged: true},
        {title: 'Login', icon: '' , route: '/login', whenLogged: false},
        {title: 'Logout', icon: '', route: '/logout', whenLogged: true},
        {title: 'Register', icon: '', route: '/signup', whenLogged: false},
    ];
    }

    get isLoggedIn(): boolean {
      return this.$store.getters['auth/isLoggedIn'];
    }

    get userName(): string {
      if (this.isLoggedIn) return this.$store.getters['user/getName'];
      return ''
    }

    get avatarURL(): string {
      if (this.isLoggedIn) return `${axios.defaults.baseURL}me/${this.$store.getters['auth/getToken']}/avatar`
      return ''
    }

    get filteredItems(): Array<{[key:string]: string|boolean}> {
      const f:boolean = this.$store.getters['auth/isLoggedIn'];
      return this.items.filter((item:{[key:string]: string|boolean}) => {
        return f === item.whenLogged;
      })
    }
}
</script>

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
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

@Component
export default class UserPanel extends Vue {
    private items = [
        {title: 'Me', icon: '' , route: '/me', whenLogged: true},
        {title: 'Login', icon: '' , route: '/login', whenLogged: false},
        {title: 'Logout', icon: '', route: '/logout', whenLogged: true},
        {title: 'Register', icon: '', route: '/signup', whenLogged: false},
    ];

    get avatarURL(): string {
      if (this.$store.getters['auth/isLoggedIn']) return `${axios.defaults.baseURL}me/${this.$store.getters['auth/getToken']}/avatar`
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

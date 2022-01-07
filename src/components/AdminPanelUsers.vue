<template>
  <v-container>
      <h3>Users</h3>
      <v-data-table
      :headers="headers"
      :items="allUsers"
      :loading="loading"
      multi-sort
      >
      <template v-slot:item.avatar="{ item }">
          <v-avatar size="32">
              <v-img :src="item.avatar" :lazy-src="item.avatar">
          </v-img></v-avatar>    
      </template>
      <template v-slot:item.banned="{ item }">
          <v-icon>{{ item.banned ? 'mdi-check' : 'mdi-close'}}</v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <span v-for="action in item.actions" :key="action.name" style="margin-right:2%;">
        <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
          :color="!!action.color ? action.color : 'grey'"
          dark
          v-bind="attrs"
          v-on="on"
          @click.stop="actionHandler(action.id, item.username)"
          >{{ action.icon }}</v-icon>
      </template>
      <span>{{action.name}}</span>
    </v-tooltip>
    </span>
      </template>
      </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from "axios";

@Component
export default class AdminPanelUsers extends Vue {
    private allUsers: Array<{[key:string]: string|Array<any>}> = [];
    private headers: any = [];
    private loading = true;

    public getData(): void {
        this.loading = true;
        axios.get('/admin/users', {headers: {Authorization: this.$store.getters['auth/authHeader']}}).then((response:AxiosResponse) => {
            this.allUsers = response.data.data;
            this.headers = response.data.headers;
            this.loading = false;
        })
    }

    mounted() {
        this.getData();
    }

    public actionHandler(id:number, username:string): void {
        axios.post('admin/privilege', { username: username, id:id }).then((response:AxiosResponse) => {
            this.getData();
        });
    }
}
</script>

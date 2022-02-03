<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
    <v-card>
      <v-card-title>
            <v-avatar size="32">
            <v-img
            :class="isEditable ? 'editableImage' : ''"
            :lazy-src="avatarURL"
            :src="avatarURL"
            width="32"
            height="32"
            ></v-img></v-avatar>
        {{username}}
      </v-card-title>
      <v-card-subtitle>
        Joined : {{joinedParsed}}
      </v-card-subtitle>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import UserPanel from "@/components/UserPanel.vue";

@Component({
    components: {
        UserPanel
    }
})
export default class User extends Vue {
  public username: string = this.$route.params.name;

  public joined = 0;

  get avatarURL(): string {
    return `http://localhost:5000/api/avatar/${this.username}`;
  }

  get isEditable(): boolean {
    return this.$store.getters['auth/isLoggedIn'] && this.$store.getters['user/getName'] === this.username;
  }

  get joinedParsed(): string {
    if (this.joined > 24*60*60*1000){
      return `${Math.round(this.joined / (24*60*60*1000))} days ago`
    }
    else if (this.joined > 60*60*1000) {
      return `${Math.round(this.joined / (60*60*1000))} hours ago`
    }
    else {
      return `${Math.round(this.joined / (60*1000))} minutes ago`
    }
  }

  created() {
    axios.get(`me/${this.username}`).then((response) => {
      this.joined = Date.now() - Date.parse(response.data.timestamp_creation);
    }).catch((error) => {
      this.$router.push('/*');
    });
  }
}

</script>

<style lang="scss" scoped>
  .editableImage:hover {
    border: 1px solid black;
    opacity: 0.4;
  }
</style>
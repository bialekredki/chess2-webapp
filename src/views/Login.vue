<template>
  <v-container fluid>
      <v-row align="center" justify="center" ><v-col cols="6" class="border-form">
      <h3>Sign in</h3>
      <v-form ref='singin' v-model="valid">
          <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          placeholder="yourname@example.com"
          ></v-text-field>
          <v-text-field
          v-model="password"
          label="Password"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
          :type="show_password ? 'text' : 'password'"
          :rules="passwordRules"
          ></v-text-field>
          <v-btn color="primary" @click="submit">Submit</v-btn>
      </v-form>
      </v-col></v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

@Component
export default class Login extends Vue {
    private email = '';

    private password = '';

    private valid = '';

    private show_password = false;

    public emailRules:Array<any> = [
        (v:any) => !!v || 'Email is required.',
        (v:any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]

    public passwordRules:Array<any> = [
        (v:any) => !!v || 'Password is required.',
    ]

    public submit(): void {
        if (!this.valid) return;
        axios.post('auth', { email: this.email, password: this.password })
        .then((response:AxiosResponse) => {
            this.$store.dispatch('auth/updateToken', response.data.token);
            this.$router.back();
        });
    }
}
</script>

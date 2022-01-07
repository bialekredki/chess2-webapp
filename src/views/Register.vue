<template>
  <v-container fluid>
      <v-row align="center" justify="center" ><v-col cols="6" class="border-form">
      <h3>Sign up</h3>
      <v-divider></v-divider>
      <v-form ref="signin" v-model="valid">
          <v-text-field
          label="Email"
          :rules="[rules.required, rules.emailValid]"
          v-model="email"
          ></v-text-field>
          <v-text-field
          label="Username"
          :rules="[rules.required]"
          v-model="username"
          ></v-text-field>
          <v-text-field
          v-model="password"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
          :type="show_password ? 'text' : 'password'"
          label="Password"
          :rules="[rules.required, passwordMatch, rules.min, rules.password]"
          ></v-text-field>
          <v-text-field
          v-model="rePassword"
          :append-icon="show_repassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_repassword = !show_repassword"
          :type="show_repassword ? 'text' : 'password'"
          label="Confirm password"
          :rules="[rules.required, passwordMatch, rules.min, rules.password]"
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
    private password = '';
    private rePassword = '';
    private username = '';
    private email = ''
    private show_password = false;
    private show_repassword = false;
    private valid = false;
    public rules:{[key:string]:any} = {
        required: (v:string) => !!v || 'Required',
        min: (v:string) => v.length >= 8 || 'Min 8 characters',
        emailValid: (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        password: (v:string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v) || 'Password must contain at least one lower case letter and one higher case letter and number and special character'
        }

    get passwordMatch(): string|boolean {
        return this.password === this.rePassword || "Password must match";
    }

    public submit(): void {
        if (!this.valid) return;
        axios.post('auth/create', {username: this.username, email:this.email, password:this.password})
        .then((response:AxiosResponse) => {
            console.log(response.data);
        });
    }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
$g: map-get($map: $colors, $key: 'green');
    .border-form {
        border: 0.01em  solid map-get($map: $g, $key: 'base');
        border-bottom: 2px solid map-get($map: $g, $key: 'base');
        border-right: 2px solid map-get($map: $g, $key: 'base');
        border-radius: 12px;
        margin-top: 1%;
        box-shadow: 12px 12px 20px #00000040;
    }
</style>
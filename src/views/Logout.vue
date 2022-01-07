<template>
  <div>Play</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Logout extends Vue {
    created() {
        this.$store.dispatch('auth/updateToken', '');
        this.$router.push('/');
    }
}
</script>

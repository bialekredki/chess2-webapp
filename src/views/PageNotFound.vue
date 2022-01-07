<template>
  <v-container fluid fill-height>
      <v-row align="center" justify="center">
          <v-col cols="3" class="cntr primary--text">
              <div class="code">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
              </div>
              <h1>Page not found</h1>
              <h5>Looks like you got lost.</h5>
                <v-btn to="/" color="primary">Go home</v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageNotFound extends Vue {
}
</script>

<style lang="scss" scoped>

.cntr {
    transition: 0.6s cubic-bezier(0.64, 0.01, 0.07, 1.65);
}

.code {
   $size: 80px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: $size;
    margin-bottom: 50%;
    text-shadow: 0 0px #f3c623, 0 0px #f2aaaa;
    transform: translate(0, 100%) rotate(4deg);
    animation: jump 2s ease-in-out infinite;
    display: inline-block;
    @for $i from 1 through 7 {
      &:nth-child(#{$i}) {
        animation-delay: 120ms * $i;
      }
    }
}

@keyframes jump {
  33% {
    text-shadow: 0 60px #f37121, 0 150px #f2aaaa;
  }
  50% {
    transform: translate(0, 0) rotate(-4deg);
    text-shadow: 0 0px #8fc0a9, 0 0px #84a9ac;
  }
  66.67% {
    text-shadow: 0 -60px #d54062, 0 -150px #8fc0a9;
  }
}
</style>

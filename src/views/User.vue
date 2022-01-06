<template>
  <hello-world />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserPanel from "@/components/UserPanel.vue";

@Component({
    components: {
        UserPanel
    }
})
export default class User extends Vue {

}

</script>

<template>
  <InfoRail />
</template>

<script>
import InfoRail from "@/components/InfoRail.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    InfoRail,
  },
  created() {
    const route = useRoute();
    this.$store.dispatch("getUser", route.params.user);
  },
};
</script>

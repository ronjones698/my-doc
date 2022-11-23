<script>
import { collapsed } from "./state";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    text: { type: String, required: true },
  },
  name: "SideBarItem",
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path == props.to);
    return { isActive, collapsed };
  },
};
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <font-awesome-icon
      class="icons"
      :class="{ active: isActive }"
      :icon="icon"
    />
    <transition name="fade">
      <span class="icons" v-if="!collapsed">
        {{ text }}
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  border-radius: 0.25em;
  height: 2.5em;
  color: #fff;
  text-decoration: none;
  width: 100%;
  padding: 10px;
}
.link:hover {
  background-color: #44916a;
}
.link.active {
  background-color: var(--sidebar-hover);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.icons {
  color: #fff;
  font-size: 18px;
  float: left;
  font-weight: bold;
}
</style>

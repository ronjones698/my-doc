<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <span class="Logo" v-if="collapsed">
      <div>MD</div>
    </span>
    <span class="Logo" v-else>
      <div>MydocKe</div>
    </span>
    <SideBarItem
      to="/dashboard"
      text="Dashboard"
      icon="fa-solid fa-dashboard"
    />
    <SideBarItem to="/about" text="Billing" icon="fa-regular fa-bell" />

    <span
      class="collapse-icon"
      :class="{ rotate: collapsed }"
      @click="toogleCollapsed"
    >
      <font-awesome-icon class="icons" icon="fa-solid fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import { collapsed, sidebarWidth, toogleCollapsed } from "./state";
import SideBarItem from "./SideBarItem.vue";
export default {
  name: "SideBar",
  components: {
    SideBarItem,
  },
  setup() {
    return { collapsed, sidebarWidth, toogleCollapsed };
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-hover: #2a6649;
}
</style>
<style scoped>
.sidebar {
  background-color: var(--sidebar-bg-color);
  color: #fff;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  height: 100vh;
  left: 0;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  transition: 0.3s ease;
  align-items: center;
}
.icons {
  color: #fff;
}
.collapse-icon {
  position: absolute;
  padding: 0.75em;
  cursor: pointer;
  transition: 0.2s linear;
  bottom: 0;
  font-size: 3px;
}
.rotate {
  transform: rotate(180deg);
  transition: 0.2s linear;
  font-size: 3px;
  padding: 0.75em;
}
.Logo {
  height: 8%;
  font-size: 24px;
  font-weight: bold;
}
</style>

<template>
  <div class="dashboard">
    <div class="medical">
      <DetailsRail />
    </div>
    <div class="profile">
      <router-link class="label" to="/visits">
        <StattsLabel digit="340" tittle="Accounts" icon="fa-regular fa-bell" />
      </router-link>
      <router-link class="label" to="/claims">
        <StattsLabel digit="410" tittle="Claims" icon="fa-regular fa-bell" />
      </router-link>
      <router-link
        v-if="OrganizationType === 'Hospital'"
        class="label"
        to="/triager"
      >
        <StattsLabel digit="40" tittle="Insurance" icon="fa-regular fa-bell" />
      </router-link>
      <router-link v-else class="label" to="/triager">
        <StattsLabel digit="40" tittle="Hospital" icon="fa-regular fa-bell" />
      </router-link>
    </div>
    <AppointmentTable />
  </div>
</template>
<script>
import DetailsRail from "@/components/DetailsRail.vue";
import StattsLabel from "@/components/StattsLabel.vue";
import AppointmentTable from "@/components/ApointmentTable.vue";
import { loggedOrganizationType } from "@/components/state";

export default {
  name: "HelloBody",
  components: {
    DetailsRail,
    StattsLabel,
    AppointmentTable,
  },
  setup() {
    return { loggedOrganizationType };
  },
  data() {
    return {
      OrganizationType: loggedOrganizationType.value,
    };
  },
};
</script>
<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  width: 99%;
  justify-content: center;
}
.medical {
  width: 98.3%;
}
.profile {
  display: flex;
}
.label {
  width: 95%;
}
</style>

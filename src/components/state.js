import { ref, computed } from "vue";

export const collapsed = ref(false);
export const loggedIn = ref(false);
export const loggedInUsername = ref("");
export const loggedOrganizationType = ref("Insurance");
export const loggedUserPriviledge = ref("Claims");
export const loggedInUserObject = ref({});
export const Hospitals = ref([]);

export const myURL = ref("/home");
export const toogleCollapsed = () => (collapsed.value = !collapsed.value);
export const setRoute = (url) => (myURL.value = url);
export const SIDEBAR_WIDTH = 185;
export const SIDEBAR_COLLAPSED_WIDTH = 50;
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px`
);
export const link = computed(() => myURL.value);
export const Hospital_list = computed(() => Hospitals.value);
export const setLoggedin = computed(() => (loggedIn.value = true));
export const setLoggedInUser = computed(
  (username) => (loggedInUsername.value = username)
);

export const setUserPriviledge = computed(
  (priviledge) => (loggedUserPriviledge.value = priviledge)
);

export const setOrganizationType = computed(
  (organization) => (loggedOrganizationType.value = organization)
);
export const setHospitals = computed(
  (hospitals) => (Hospitals.value = hospitals)
);

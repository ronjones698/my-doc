import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";

function decideRoute(to, from, next) {
  const user_type = localStorage.getItem("userType");
  const organization_type = localStorage.getItem("organizationType");
  if (organization_type == "Insurance") {
    console.log(user_type);
    if (user_type == "admin") {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    if (user_type == "admin") {
      next("/dashboard");
    } else {
      next();
    }
  }
}

function checkIfInsurance(to, from, next) {
  const user_type = localStorage.getItem("userType");
  const organization_type = localStorage.getItem("organizationType");
  if (organization_type == "Insurance") {
    if (user_type == "Claims") {
      next();
    } else {
      next("/dashboard");
    }
  } else {
    if (user_type == "Reception" || user_type == "Doctor") {
      next("/reception");
    } else {
      next("/dashboard");
    }
  }
}
function checkIfHospital(to, from, next) {
  const user_type = localStorage.getItem("userType");
  const organization_type = localStorage.getItem("organizationType");
  if (organization_type == "Hospital") {
    if (user_type == "Reception" || user_type == "Doctor") {
      next();
    } else {
      next("/dashboard");
    }
  } else {
    if (user_type == "Claims") {
      next("/recieved_claims");
    } else {
      next("/dashboard");
    }
  }
}
function checkIfAdmin(to, from, next) {
  const user_type = localStorage.getItem("userType");
  const organization_type = localStorage.getItem("organizationType");
  if (user_type == "admin") {
    next();
  } else {
    if (organization_type == "Hospital") {
      next("/reception");
    } else {
      next("/recieved_claims");
    }
  }
}

const routes = [
  {
    path: "/dashboard",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/HelloBody.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },

  {
    path: "/about",
    beforeEnter: decideRoute,
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/body",
    component: () => import("../views/HelloBody.vue"),
  },
  {
    path: "/visits",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/VisitsPage.vue"),
  },
  {
    path: "/lab_techs",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/LabPage.vue"),
  },
  {
    path: "/triager",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/TriagePage.vue"),
  },

  {
    path: "/details/:user",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/VisitDetails.vue"),
  },
  {
    path: "/hospitaldetails/:hospital_id",
    name: "hospitaldetails",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/HospitalDetails.vue"),
  },
  {
    path: "/addvisit",
    name: "addvisit",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/VisitForm.vue"),
  },
  {
    path: "/addhospital",
    name: "addhospital",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/AddHospitals.vue"),
  },
  {
    path: "/claims",
    name: "claimslist",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/ClaimsPage.vue"),
  },
  {
    path: "/accesslogs",
    name: "logs",
    beforeEnter: checkIfAdmin,
    component: () => import("../views/AccessPage.vue"),
  },
  {
    path: "/recieved_claims",
    beforeEnter: checkIfInsurance,
    component: () => import("../views/InsuranceClaimView.vue"),
  },
  {
    path: "/view_claim/:visit_id",
    component: () => import("../views/ClaimView.vue"),
  },
  {
    path: "/reception",
    beforeEnter: checkIfHospital,
    component: () => import("../views/ReceptionDashboard.vue"),
  },
  {
    path: "/add_claim",
    beforeEnter: decideRoute,
    component: () => import("../views/ClaimForm.vue"),
  },
  {
    path: "/visit_details/:visit_id",
    component: () => import("../views/ClaimForm.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

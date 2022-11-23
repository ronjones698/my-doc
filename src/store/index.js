import { createStore } from "vuex";
//1451257960
export default createStore({
  state: {
    hospitals: [],
    user: {},
    count: 0,
    organization: "Radiant Group of Hospitals",
    insurer: "Radiant Group of Hospitals",
    users: [],
    organization_type: "Insurance",
    logged_in_user_email: "jonesRon@gmail.com",
    hospital: {},
    visits: [],
    user_type: "Reception",
    visit: {},
    consultation: {},
    drugs: [],
    tests: [],
    scans: [],
    isAuthenticated: false,
    authenticatedUser: {},
    totalVisits: 0,
    forms: [],
    popup_url: "",
    popUp: false,
  },
  getters: {},
  mutations: {
    setHospitals(state, Hospitals) {
      state.hospitals = Hospitals;
    },
    setForms(state, Forms) {
      state.forms = Forms;
    },
    setUsers(state, Users) {
      state.users = Users;
    },
    setAuthenticated(state, authenticated) {
      state.isAuthenticated = authenticated;
    },
    setOrganizationType(state, organization_type) {
      state.organization_type = organization_type;
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthenticatedUser(state, authenticatedUser) {
      state.authenticatedUser = authenticatedUser;
    },
    setHospital(state, hospital) {
      state.hospital = hospital;
    },
    setVisits(state, visits) {
      state.visits = visits;
    },
    setVisit(state, visit) {
      state.visit = visit;
    },
    setConsultation(state, consultation) {
      state.consultation = consultation;
    },
    setDrugs(state, drugs) {
      state.drugs = drugs;
    },
    setTests(state, tests) {
      state.tests = tests;
    },
    setScans(state, scans) {
      state.scans = scans;
    },
    setTotalVisits(state, total) {
      state.totalVisits = total;
    },
    setUrl(state, url) {
      state.popup_url = url;
    },
    setPopUp(state) {
      state.popUp = true;
    },
    closePopUp(state) {
      state.popUp = false;
    },
  },
  actions: {
    getHospitals({ commit }) {
      fetch("http://127.0.0.1:8000/api/hospital/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setHospitals", data);
        });
    },
    getUsers({ commit }, organization) {
      const url =
        "http://127.0.0.1:8000/api/user/" + organization + "/get_users/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setUsers", data);
        });
    },
    getUser({ commit }, id) {
      const url = "http://127.0.0.1:8000/api/user/" + id + "/get_user/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.Message);
          commit("setUser", data.Message);
        });
    },
    getHospital({ commit }, id) {
      const url = "http://127.0.0.1:8000/api/hospital/" + id + "/get_hospital/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.Message);
          commit("setHospital", data.Message);
        });
    },
    getVisits({ commit }, id) {
      console.log(id);
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" +
        id +
        "/get_hospital_visits/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          commit("setTotalVisits", data.length);
          commit("setVisits", data);
        });
    },
    getIdVisits({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" +
        id +
        "/get_hospital_id_visits/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          commit("setVisits", data);
        });
    },
    getVisit({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" + id + "/get_visit_by_id/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setVisit", data);
        });
    },
    getConsultation({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" + id + "/get_consultation/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setConsultation", data);
        });
    },
    getDrugs({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" + id + "/get_prescriptions/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setDrugs", data);
        });
    },
    getScans({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" + id + "/get_Imaging_tests/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setScans", data);
        });
    },
    getTests({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" + id + "/get_lab_tests/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setTests", data);
        });
    },
    getAuthenticatedUser({ commit }, stub) {
      const url =
        "http://127.0.0.1:8000/api/user/" + stub + "/get_user_by_email/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("user", data.Message);
          localStorage.setItem("userType", data.Message.user_type);
          localStorage.setItem(
            "organizationType",
            data.Message.organization_type
          );
          commit("setAuthenticatedUser", data.Message);
        });
    },
    getFormScans({ commit }, id) {
      const url =
        "http://127.0.0.1:8000/api/claims/forms/" + id + "/get_form_scans/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("setForms", data);
        });
    },
    getPopUp({ commit }, url) {
      commit("setUrl", url);
      commit("setPopUp");
    },
  },
  modules: {},
});

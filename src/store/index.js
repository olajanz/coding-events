import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let nextId = 1;

function getNewId() {
  const id = nextId;
  nextId += 1;
  return id;
}

export default new Vuex.Store({
  state: {
    notifications: [],
    userData: null,
  },

  mutations: {
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notificationToRemove) {
      const index = state.notifications.findIndex(
        notification => notification.id == notificationToRemove.id
      );
      state.notifications.splice(index, 1);
    },
    SET_USER_DATA(state, userData) {
      state.userData = userData;
      localStorage.setItem("userData", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.jwt}`;
    },
    REMOVE_USER_DATA(state) {
      state.userData = null;
      localStorage.removeItem("userData");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  actions: {
    pushNotification(context, { type, message }) {
      const notification = {
        id: getNewId(),
        type: type || "success",
        message,
      };
      context.commit("PUSH_NOTIFICATION", notification);

      setTimeout(() => {
        context.commit("REMOVE_NOTIFICATION", notification);
      }, 6000);
    },
    async login(context, { email, password }) {
      console.log("login", email, password);

      // make a POST request
      const res = await axios.post(
        process.env.VUE_APP_API_URL + "/auth/local",
        {
          identifier: email,
          password,
        }
      );

      context.commit("SET_USER_DATA", res.data);
    },
    loadUserData(context) {
      //get the userData as a string from the localStorage
      //check if the userData exists
      //parse the userData
      //commit SET_USER_DATA mutation
      const userDataAsJsonString = localStorage.getItem("userData");
      if (userDataAsJsonString) {
        const userData = JSON.parse(userDataAsJsonString);
        context.commit("SET_USER_DATA", userData);
      }
    },
    logout(context) {
      context.commit("REMOVE_USER_DATA");
    },
  },
});

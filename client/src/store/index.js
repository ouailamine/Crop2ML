import Vue from "vue";
import Vuex from "vuex";
import CropDataServices from '../services/CropDataServices';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);


const getDefaultState = () => {
   return {

      activedNavbar: "",
      navbarModel: '',
      mailpresent: '',
      PasswordRequire: '',
      loggedUserEmail: "",
      demoUserEMail:"",
      userDataObj: null,
      selectedParcelIdx: 0,
      selectedYearIdx: 0,
      selectedWeekIdx: 0,
      userModifiedWeekMetrics: new Map(),
      forceComponentUpdateCounter:0,
      viewMode: "developpement",
      strict: true,
      plugins: [createPersistedState()]

   };
};

export default new Vuex.Store({

   state: {

      
      navbarModel: "",
      activedNavbar: ""
      , mailpresent: ''
      , PasswordRequire: ''
      , loggedUserEmail: ""

      , demoUserEmail:""

      // MonitoredUser Object computed and reorganised logged-in user data pour from the database 
      , userDataObj: null // in a component call: this.$store.state.userDataObj

      

      // selected index mapping to the MonitoredWeek state.userDataObj.parcels[selectedYearIdx].parcelYears[selectedYearIdx].yearWeeks[selectedWeekIdx]
      

      , forceComponentUpdateCounter:0

      , viewMode: "developpement" // viewMode in debug, developpement, production

      , strict: true

      , plugins: [createPersistedState()]

   },




   
   getters: { // computed methods

   },

   mutations: { // synchronous  commit of changes of state

      RESET: state => {
         Object.assign(state, getDefaultState());
      },

      initNavbarModel(state, navbarModel) {
         state.navbarModel = navbarModel;
      },

      initActivedNavbar(state, activedNavbar) {
         state.activedNavbar = activedNavbar;
      },

      initPasswordRequire(state, PasswordRequire) {
         state.PasswordRequire = PasswordRequire;
      },

      initmailpresent(state, mailpresent) {
         state.mailpresent = mailpresent;
      },

      initLoggedUserEmail(state, userMail) {
         state.loggedUserEmail = userMail;
      },

      initDemoUserEmail(state, userMail) {
         state.demoUserEmail = userMail;
      },

      // in component uses: this.$store.commit("initUserDataObj", usrDataObj);
      initUserDataObj(state, usrDataObj) {
         state.userDataObj = usrDataObj;
      },

      // TODO chack that pIdx is not out of range
      

   },

   actions: { // assynchronous commit of changes
      login({ commit }, { loggedUserEmail }) {

         commit('initLoggedUserEmail', loggedUserEmail);
         


      },

      logout: ({ commit }) => {
         commit('RESET', '');
      },
   }
});





 
import Vue from 'vue'
import Router from 'vue-router'

import Edit from '../components/Edit.vue';
import Consultation from '../components/Consultation';
import Modification from '../components/Modification';
import Profil from '../components/Profile.vue';
import Guide from '../components/Guide.vue';
import LegalMentions from '../components/LegalMentions.vue';
import Login from '../components/Login.vue';
import Addpsw from '../components/Addpsw';
import ResetP from '../components/ResetPassword';
import Welcome from '../components/Welcome';
import Admin from '../components/Admin';
import User from '../components/User';
import Visiteur from '../components/Visiteur';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/visiteur',
      name: 'visiteur',
      component: Visiteur
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: Consultation
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/modification',
      name: 'modification',
      component: Modification
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '/guide',
      name: 'guide',
      component: Guide
    },
    {
      path: '/legalMentions',
      name: 'LegalMentions',
      component: LegalMentions
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/addpsw',
      name: 'addpsw',
      component: Addpsw
    },
    {
      path: '/resetp',
      name: 'resetp',
      component: ResetP
    },

  ]
})

import Vue from 'vue';
import VueRouter from 'vue-router';
import BreadDashboard from '../components/BreadDashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Bread Calculator',
    component: BreadDashboard,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '../views/About.vue');
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
//import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  {
    path: '/nyuka',
    name: 'nyuka',
    component: () => import('../components/pages/NyukaJissekiSearchView.vue'),
  },
  {
    path: '/nyuka_dtl',
    name: 'nyuka_dtl',
    component: () => import('../components/pages/NyukaJissekiDetailView.vue'),
  },
  {
    path: '/zaiko_hikiate',
    name: 'zaiko_hikiate',
    component: () => import('../components/pages/ZaikoHikiate.vue'),
  },
  {
    path: '/zaiko_hikiate_kobetsu/:id',
    name: 'zaiko_hikiate_kobetsu_4_id',
    props: true,
    component: () => import('../components/pages/ZaikoHikiateKobetsu.vue'),
  },
  {
    path: '/zaiko_hikiate_kakutei',
    name: 'zaiko_hikiate_kakutei',
    component: () => import('../components/pages/ZaikoHikiateKakutei.vue'),
  },
  {
    path: '/keppin_add',
    name: 'keppin_add',
    component: () => import('@/components/pages/KeppinNyukaYoteiAdd.vue'),
  },
  {
    path: '/haisya_add',
    name: 'haisya_add',
    component: () => import('../components/pages/HaisyaInfoAdd.vue'),
  },
  // {
  //   path: '/test', name: 'test', component: () => import('../components/pages/TsujiTest.vue')
  // },
  {
    path: '/2-13s',
    name: '2-13s',
    component: () => import('../views/SuisyoIdouSakiTourokuSearchView.vue'),
  },
  {
    path: '/2-13m',
    name: '2-13m',
    component: () => import('../views/SuisyoIdouSakiTourokuModifyView.vue'),
  },
  {
    path: '/2-13n',
    name: '2-13n',
    component: () => import('../views/SuisyoIdouSakiTourokuNewView.vue'),
  },
  {
    path: '/2-13w',
    name: '2-13w',
    component: () => import('../views/SuisyoIdouSakiTourokuWasteView.vue'),
  },
  {
    path: '/2-13i',
    name: '2-13i',
    component: () => import('../views/SuisyoIkatuNyuryokuView.vue'),
  },
  {
    path: '/arrivalReport',
    name: 'arrivalReport',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/pages/ArrivalReport.vue'
      ),
  },
  // {
  //   path: '/nyuka_setting',
  //   name: 'nyuka_setting',
  //   component: () => import('../views/NyukaJissekiSearchSettingView.vue'),
  //   props: true,
  // },
  // {
  //   path: '/zaiko_hikiate_kobetsu',
  //   name: 'zaiko_hikiate_kobetsu',
  //   component: () => import('../components/pages/ZaikoHikiateKobetsu.vue'),
  // },
  // {
  //   path: '/zaiko_hikiate_kobetsu1',
  //   name: 'zaiko_hikiate_kobetsu1',
  //   component: () => import('../views/ZaikoHikiateKobetsu1.vue'),
  // },
  // {
  //   path: '/zaiko_hikiate_kobetsu2',
  //   name: 'zaiko_hikiate_kobetsu2',
  //   component: () => import('../views/ZaikoHikiateKobetsu2.vue'),
  // },
  // {
  //   path: '/zaiko_hikiate_kobetsu3',
  //   name: 'zaiko_hikiate_kobetsu3',
  //   component: () => import('../views/ZaikoHikiateKobetsu3.vue'),
  // },
  // {
  //   path: '/zaiko_hikiate_kobetsu4',
  //   name: 'zaiko_hikiate_kobetsu4',
  //   component: () => import('../views/ZaikoHikiateKobetsu4.vue'),
  // },
  // {
  //   path: '/test0824',
  //   name: 'test0824',
  //   component: () => import('../views/test0824.vue'),
  // },
  // {
  //   path: '/ab',
  //   name: 'ab',
  //   component: () => import('../components/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

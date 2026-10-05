const routes = [
  {
    path: '/login',
    name: "login",
    meta: { title: "Unite.Login", anonymous: true },
    component: () => import(/* webpackChunkName: "login" */ '../LoginPage.vue')
  },
  {
    path: '/register',
    name: "register",
    meta: { title: "Unite.Register", anonymous: true },
    component: () => import(/* webpackChunkName: "register" */ '../RegisterPage.vue')
  },
  {
    path: '/account',
    name: "account",
    meta: { title: "Unite.Account", authorize: true },
    component: () => import(/* webpackChunkName: "account" */ '../AccountPage.vue')
  },
  {
    path: '/reset-request',
    name: "reset-request",
    meta: { title: "Unite.Reset.Request", anonymous: true },
    component: () => import(/* webpackChunkName: "reset-request" */ '../ResetRequestPage.vue')
  },
  {
    path: '/reset-confirm/:token',
    name: "reset-confirm",
    meta: { title: "Unite.Reset.Confirm", anonymous: true },
    component: () => import(/* webpackChunkName: "reset-confirm" */ '../ResetConfirmPage.vue')
  }
];

export default routes;
import Permissions from "@/identity/models/permissions";

const routes = [
  {
    path: "/admin/:tab?",
    name: "admin",
    meta: { title: "UNITE- Admin", authorize: { permissions: Permissions.Admin }, tab: "users" },
    component: () => import(/* webpackChunkName: "admin" */ "../AdminPage.vue")
  }
];

export default routes;
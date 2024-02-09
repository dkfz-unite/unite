const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "donors" },
    meta: { title: "UNITE", authorize: false }
  }
];

export default routes;
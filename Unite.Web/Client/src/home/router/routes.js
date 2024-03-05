import Settings from "../settings";

const routes = [
  {
    path: "/",
    name: Settings.domain,
    redirect: { name: "donors" },
    meta: { title: "UNITE", authorize: false }
  }
];

export default routes;
export function setPageTitle(hook) {
  const { to, from, next } = hook;
  document.title = to.meta?.title || "UNITE";
}

export default {
  setPageTitle
}
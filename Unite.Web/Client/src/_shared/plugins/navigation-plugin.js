const plugin = {
  install: (app, options) => {
    const { router } = options;

    app.config.globalProperties.$router1 = {
      push: (route) => {
        window.location.href = router.resolve(route).href;
      }
    }
  }
};

export default plugin;
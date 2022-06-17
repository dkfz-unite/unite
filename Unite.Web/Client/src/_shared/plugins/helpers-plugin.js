import contentHelpers from "../helpers/content-helpers";
import stringHelpers from "../helpers/string-helpers";
import enumHelpers from "../helpers/enum-helpers";
import tokenHelpers from "../helpers/token-helpers";

const plugin = {
  install: (app, options) => {
    app.config.globalProperties.$helpers = {
      content: contentHelpers,
      string: stringHelpers,
      enum: enumHelpers,
      token: tokenHelpers
    };
  }
};

export default plugin;
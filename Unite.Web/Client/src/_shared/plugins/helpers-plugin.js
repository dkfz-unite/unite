import contentHelpers from "../helpers/content-helpers";
import stringHelpers from "../helpers/string-helpers";
import enumHelpers from "../helpers/enum-helpers";

const plugin = {
  install: (app, options) => {
    app.config.globalProperties.$helpers = {
      content: contentHelpers,
      string: stringHelpers,
      enum: enumHelpers
    };
  }
};

export default plugin;
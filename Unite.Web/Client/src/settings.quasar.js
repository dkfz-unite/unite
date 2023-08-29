import { Notify, LoadingBar } from 'quasar'

import '@quasar/extras/line-awesome/line-awesome.css'
import 'quasar/src/css/index.sass'

// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Notify,
    LoadingBar
  },
  config: {
    // notify: { }
    // loadingBar: { }
  },
}
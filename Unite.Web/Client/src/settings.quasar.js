import { Notify } from 'quasar';
import './styles/app.scss'
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/line-awesome/line-awesome.css'

// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Notify
  },
  config: {
    // notify: { }
  },
}
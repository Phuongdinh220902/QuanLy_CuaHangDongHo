import { createApp} from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/CSS/dichvu.css';
import './assets/CSS/form-login-logout.css';
import './assets/CSS/form-main.css';
import './assets/CSS/form-tuyendung.css';
import './assets/CSS/gioithieu.css';
import './assets/CSS/khuyenmai.css';
import './assets/CSS/lienhe.css';
import './assets/CSS/main.css';
import './assets/CSS/responsive-dichvu.css';
import './assets/CSS/responsive-form-tuyendung.css';
import './assets/CSS/responsive-gioithieu.css';
import './assets/CSS/responsive-header-footer.css';
import './assets/CSS/responsive-khuyenmai.css';
import './assets/CSS/responsive-lienhe.css';
import './assets/CSS/responsive-thanhtoan.css';
import './assets/CSS/responsive-thucdon.css';
import './assets/CSS/responsive-trangchu.css';
import './assets/CSS/responsive-tuyendung.css';
import './assets/CSS/thanhtoan.css';
import './assets/CSS/thucdon.css';
import './assets/CSS/tuyendung.css';
import './assets/CSS/trangchu.css';

// import './assets/JS/main.js'
// import '../assets/JS/main.js'

import router from "./router";

createApp(App).use(router).mount("#app");
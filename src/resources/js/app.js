import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faJs, faLaravel, faPhp, faDocker,
    faVuejs, faHtml5, faReact, faAws, faGithub
} from '@fortawesome/free-brands-svg-icons';

// アイコンをライブラリに追加
library.add(faJs, faLaravel, faPhp, faDocker, faVuejs, faHtml5, faReact, faAws, faGithub);

const app = createApp(App);

// FontAwesomeコンポーネントをグローバル登録
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/monment'
import 'amfe-flexible'
import './style/index.scss'
import './style/markdown.css'
import { Image as VanImage } from 'vant';
import { Button, ImagePreview, Icon, search, Popup, PullRefresh, List, Tabs, Tab, Dialog, Tag, Grid, GridItem, Cell, CountDown, Form, NavBar, Toast, Tabbar, CellGroup, TabbarItem, Field, } from 'vant';
Vue.use(Field);
Vue.use(ImagePreview);
Vue.use(Popup);
Vue.use(search);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CountDown);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(CellGroup);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

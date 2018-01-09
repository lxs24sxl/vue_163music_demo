// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Icon from 'vue2-svg-icon/Icon.vue'
import VueCookies from 'vue-cookies'
import touch from 'vue-directive-touch'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//使用Vuex
Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(touch)
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/blank.gif',
  loading: '../static/img/loading.gif',
  attempt: 1,
  lazyComponent: true
})
Vue.component('icon',Icon)

var that = this;
const store = new Vuex.Store({
	state: {
		isNewSong: true,
		currentIndex:0,
		historySearch:[
			"林晓舜"
		],
		Value:[

		],
		currentSongName:"",
		currentSongArtists:""
	},
	mutations:{
		Change_isNewSong(state, isNewSong){
			state.isNewSong = isNewSong;
		},
		Add_historySearch(state, historySearch){
			state.historySearch= historySearch;
			// JSON.parse(this.$cookies.get("searchResult-cookies"))；
		},
		Del_historySearch(state, historySearchIndex){
			// console.log(historySearchIndex);
			state.historySearch.splice(historySearchIndex,1)
		},
		Change_currentId(state, currentIndex){
			state.currentIndex = currentIndex;
		},
		Change_currentSongName(state, currentSongName) {
			state.currentSongName = currentSongName;
		},
		Change_currentSongArtists(state, currentSongArtists) {
			state.currentSongArtists = currentSongArtists;
		}
	},
	action: {

	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

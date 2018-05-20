import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _290d4f90 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _511feec0 = () => import('../pages/_id.vue' /* webpackChunkName: "pages/_id" */).then(m => m.default || m)



const scrollBehavior = function (to, from, savedPosition){
      if(savedPosition){
	return savedPosition
      }else{
	let position = {}
	if(to.matched,length < 2){
	  position = {x: 0, y: 0}
	}else if(to.matched.some(v => v.components.default.options.scrollTop)){
	  position = {x: 0, y: 0}
	}
	if(to.hash){
	  position = {selector: to.hash}
	}
	return position
      }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _290d4f90,
			name: "index"
		},
		{
			path: "/:id",
			component: _511feec0,
			name: "id"
		}
    ],
    
    
    fallback: false
  })
}

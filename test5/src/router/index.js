import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
			path: '/',
			name: 'Login',
			component: resolve => require(['@/pages/login/index'], resolve)
    },
    {
			path: '/home',
			name: 'Home',
			component: resolve => require(['@/pages/home/index'], resolve),
			children: [
			{
				path: '/home/people',
				name: 'People',
				component: resolve => require(['@/pages/people/index'], resolve)
			},
			{
				path: '/home/people_manager',
				name: 'PeopleManager',
				component: resolve => require(['@/pages/people/people_manager'], resolve)
			},
			{
				path: '/home/equipment',
				name: 'Equipment',
				component: resolve => require(['@/pages/equipment/index'], resolve)
			},
			{
				path: '/home/batch',
				name: 'Batch',
				component: resolve => require(['@/pages/batch/index'], resolve)
			},
			{
				path: '/home/write',
				name: 'Write',
				component: resolve => require(['@/pages/write/index'], resolve)
			},
		],
		}
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import NewsHeader from '../components/Main/NewsHeader' // 首页头部
import NewsType from '../components/Main/NewsType' // 首页新闻分类ul
import NewsLable from '../components/Main/NewsLable' // 首页
import ChooseType from '../components/ChooseType' // // 首页新闻选择显示与否
import AreaName from '../components/Area/AreaName' // 地区新闻
import AreaNews from '../components/Area/AreaNews' // 地区新闻
import Person from '../components/Nom/Person' // 个人页
import ExpressDelivery from '../components/Nom/ExpressDelivery'	 // 个人页-快递查询
import TelephoneBill from '../components/Nom/TelephoneBill'	 // 个人页-手机号充值
import Tao from '../components/TaoBao/Tao'	 // 淘宝页-淘宝券
import Shop from '../components/TaoBao/Shop' // 淘宝页-商品详情页
import SearchList from '../components/TaoBao/SearchList' // 淘宝页-商品列表页
import Author from '../components/TaoBao/Author' // 淘宝页-作者页
import List from '../components/TaoBao/List' // 淘宝页-喵喵说详情页

import Mms from '../components/TaoBao/Mms'	 // 淘宝页-喵喵说
import Tickets from '../components/TaoBao/Tickets'	 // 淘宝页-8.8包邮
import Grabtickets from '../components/TaoBao/Grabtickets'	 // 淘宝页-抢券
import SearchTickets from '../components/TaoBao/SearchTickets'	 // 淘宝页-查券
import Course from '../components/TaoBao/Course'	 // 淘宝页-指南

import Freeshipping from '../components/TaoBao/Freeshipping'	 // 淘宝页-包邮
import Ju from '../components/TaoBao/Ju'	 // 淘宝页-聚划算
import Video from '../components/TaoBao/Video'	 // 淘宝页-看货



import Login from '../components/Login/Login' // 个人页-登录
import Reg from '../components/Login/Reg' // 个人页-注册

import Search from '../components/Search/Search' // 首页-查询新闻
import Funny from '../components/Funny/Funny' // 段子

Vue.use(Router)

export default new Router({
	linkExactActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'NewsLable',
			redirect: '/news/top'
		},
// 		{
// 			path: '/new/',
// 			name: 'news',
// 			redirect: '/news/top'
// 		},
		{ // 首页
			path: '/news/:type',
			name: 'news',
			component: NewsLable
		},
		{
			path: '/type',
			name: 'ChooseType',
			component: ChooseType
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
		{
			path: '/area',
			name: 'AreaName',
			component: AreaName
		},
		{
			path: '/Person',
			name: 'Person',
			component: Person
		},
		{
			path: '/funny',
			name: 'Funny',
			component: Funny
		},
// 		{
// 			path: '/login',
// 			name: 'Login',
// 			redirect: '/login/pwd'
// 		},
		{
			path: '/login/:type',
			name: 'Login',
			component: Login
		},
// 		{
// 			path: '/reg',
// 			name: 'Reg',
// 			redirect: '/reg/pwd'
// 		},
		{
			path: '/reg/:type',
			name: 'Reg',
			component: Reg
		},
		{
			path: '/taobao',
			name: 'Tao',
			component: Tao,
			children: [
				{
					path: 'mms',
					name: 'Mms',
					redirect: '/mms'
				},
//				{
//					path: '/mms/:type/:id',
//					name: 'Mms',
//					component: Mms
//				},
				{
					path: 'tickets',
					name: 'Tickets',
					component: Tickets
				},
				{
					path: 'freeshipping',
					name: 'Freeshipping',
					component: Freeshipping
				},
				{
					path: 'ju',
					name: 'Ju',
					component: Ju
				},
				{
					path: 'video',
					name: 'Video',
					component: Video
				}
			]
		},
		{
			path: '/mms',
			name: 'Mms',
			redirect: '/mms/category'
		},
		{
			path: '/mms/category',
			redirect: '/mms/category/0'
		},
		{
			path: '/mms/:type/:id',
			name: 'Mms',
			component: Mms
		},
		{
			path: '/tickets',
			name: 'Tickets',
			component: Tickets
		},
		{
			path: '/course',
			name: 'Course',
			component: Course
		},
		{
			path: '/grabtickets',
			name: 'Grabtickets',
			component: Grabtickets
		},
		{
			path: '/freeshipping',
			name: 'Freeshipping',
			component: Freeshipping
		},
		{
			path: '/searchTickets',
			name: 'SearchTickets',
			component: SearchTickets
		},
		{
			path: '/ju',
			name: 'Ju',
			component: Ju
		},
		{
			path: '/video',
			name: 'Video',
			component: Video
		},
		{
			path: '/searchList/:keyworld',
			name: 'SearchList',
			component: SearchList
		},
		{
			path: '/shop/:id',
			name: 'Shop',
			component: Shop
		},
		{
			path: '/author/:id',
			name: 'Author',
			component: Author
		},
		{
			path: '/list/:id',
			name: 'List',
			component: List
		},
		
		
	]
})

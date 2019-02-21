import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入图标字体的sass文件
import './assets/sass/_index.scss'

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
		uname:null,
    	classMap : [ // 首页
    		{type:'top',title:'头条'},
    		{type:'shehui',title:'社会'},
    		{type:'guonei',title:'国内'},
    		{type:'guoji',title:'国际'},
    		{type:'yule',title:'娱乐'},
    		{type:'tiyu',title:'体育'},
    		{type:'junshi',title:'军事'},
    		{type:'keji',title:'科技'}
    	],
		decMap:[
			{type:'caijing',title:'财经'},
			{type:'shishang',title:'时尚'}
		],
		lang : [ // 新闻页
			{lang:'zh',name:'中文'},
			{lang:'en',name:'英语'},
			{lang:'yue',name:'粤语'},
			// {lang:'wyw',name:'文言文'},
			// {lang:'jp',name:'日语'},
			// {lang:'kor',name:'韩语'},
			// {lang:'fra',name:'法语'},
			// {lang:'spa',name:'西班牙语'},
			// {lang:'th',name:'泰语'},
			// {lang:'ara',name:'阿拉伯语'},
			// {lang:'ru',name:'俄语'},
			// {lang:'pt',name:'葡萄牙语'},
			// {lang:'de',name:'德语'},
			// {lang:'it',name:'意大利语'},
			// {lang:'el',name:'希腊语'},
			// {lang:'nl',name:'荷兰语'},
			// {lang:'pl',name:'波兰语'},
			// {lang:'bul',name:'保加利亚语'},
			// {lang:'est',name:'爱沙尼亚语'},
			// {lang:'dan',name:'丹麦语'},
			// {lang:'fin',name:'芬兰语'},
			// {lang:'cs',name:'捷克语'},
			// {lang:'rom',name:'罗马尼亚语'},
			// {lang:'slo',name:'斯洛文尼亚语'},
			// {lang:'swe',name:'瑞典语'},
			// {lang:'hu',name:'匈牙利语'},
			// {lang:'cht',name:'繁体中文'},
			// {lang:'vie',name:'越南语'}
		],
		express:[
			{name:'顺丰快递',code:'SF'},
			{name:'百世快递',code:'HTKY'},
			{name:'中通',code:'ZTO'},
			{name:'申通',code:'sTO'},
			{name:'圆通',code:'YTO'},
			{name:'韵达',code:'YD'},
			{name:'邮政平邮',code:'YZPY'},
			{name:'EMS',code:'EMS'},
			{name:'天天',code:'HHTT'},
			{name:'全峰',code:'QFKD'},
			{name:'国通',code:'GTO'},
			{name:'优速',code:'Uc'},
			{name:'德邦',code:'DBL'},
			{name:'JD',code:'JD'},
			{name:'百世快运',code:'BTWL'},
			{name:'宅急送',code:'ZJS'},
			{name:'如风达',code:'RFD'},
			{name:'广东邮政',code:'GDEMS'},
			{name:'营米滴答',code:'YIMIDIDA'},
			{name:'快捷',name:'FAST'},
			{name:'亚马逊',code:'AMAZON'},
			{name:'安捷快递',code:'AJ'},
			{name:'澳门邮政',code:'AOMENYZ'},
			{name:'安能物流',code:'ANE'},
			{name:'安信达快递',code:'AXD'},
			{name:'澳邮专线',code:'AYCA'},
			{name:'八达通',code:'BDT'},
			{name:'百福东方',code:'BFDF'},
			{name:'贝海国际',code:'BHGJ'},
			{name:'比青小红帽',code:'BQXHM'},
			{name:'CCES快递',code:'CCES'},
			{name:'程光',code:'cG'},
			{name:'城市100',code:'CITY100'},
			{name:'城际快递',code:'CJKD'},
			{name:'CNPEX中邮快递',code:'CNPEX'},
			{name:'COE东方快递',code:'COE'},
			{name:'长沙创一',code:'CSCY'},
			{name:'成都善途速运',code:'CDSTKY'},
			{name:'联合运通',code:'CTG'},
			{name:'D速物流',code:'DSWL'},
			{name:'递四方速递',code:'D4PX'},
			{name:'大田物流',code:'DTWL'},
			{name:'EWE',code:'EWE'},
			{name:'FEDEX联邦（国内件）',code:'FEDEX'},
			{name:'FEDEX联邦（国际件）',code:'FEDEX_GJ'},
			{name:'飞康达',code:'FKD'},
			{name:'富腾达',code:'FTD'},
			{name:'冠达',code:'GD'},
			{name:'共速达',code:'GSD'},
			{name:'广通',code:'GTONG'},
			{name:'高铁速递',code:'GTSD'},
			{name:'汇丰物流',code:'HFWL'},
			{name:'黑狗冷链',code:'HGLL'},
			{name:'恒路物流',code:'HLWL'},
			{name:'天地华宇',code:'HOAU'},
			{name:'鸿桥供应链',code:'HOTSCM'},
			{name:'海派通物流公司',code:'HPTEX'},
			{name:'体强物流',code:'hq568'},
			{name:'环球速运',code:'HQSY'},
			{name:'体夏龙物流',code:'HXLWL'},
			{name:'豪翔物流',code:'HXWL'},
			{name:'好来运快递',code:'HYLSD'},
			{name:'捷安达',code:'JAD'},
			{name:'京广速递',code:'JGSD'},
			{name:'九曳供应链',code:'JIUYE'},
			{name:'链吉快运',code:'JJKY'},
			{name:'嘉里物流',code:'JLDT'},
			{name:'捷特快递',code:'JTKD'},
			{name:'急先达',code:'JXD'},
			{name:'晋越快递',code:'JYKD'},
			{name:'景光物流',code:'JGWL'},
			{name:'佳怡物流',code:'JYWL'},
			{name:'跨越速运',code:'KYsY'},
			{name:'龙邦快递',code:'LB'},
			{name:'联昊通速递',code:'LHT'},
			{name:'民邦快递',code:'MB'},
			{name:'民航快递',code:'MHKD'},
			{name:'美快',code:'MK'},
			{name:'明亮物流MLWL'},
			{name:'南方',code:'NF'},
			{name:'能达速递',code:'NEDA'},
			{name:'平安达腾飞快递',code:'PADTF'},
			{name:'泛捷快递',code:'PANEX'},
			{name:'PCA Express ',code:'PCA'},
			{name:'全晨快递',code:'QCKD'},
			{name:'全日通快递',code:'QRT'},
			{name:'全信通',code:'QXT'},
			{name:'端丰速递',code:'RFEX'},
			{name:'瑞丰速递',code:'RFEX'},
			{name:'赛澳递',code:'SAD'},
			{name:'怪安物流',code:'SAWL'},
			{name:'盛邦物流',code:'SBWL'},
			{name:'上大物流',code:'SDWL'},
			{name:'盛丰物流',code:'SFWL'},
			{name:'盛辉物流',code:'SHWL'},
			{name:'速通物流',code:'ST'},
			{name:'速腾快递',code:'STWL'},
			{name:'速必达物流',code:'SUBIDA'},
			{name:'速递e站',code:'SDEZ'},
			{name:'速尔快递',code:'SURE'},
			{name:'台湾邮政',code:'TAIWANYZ'},
			{name:'全一快递',code:'UAPEX'},
			{name:'UEQ Express',code:'UEQ'},
			{name:'历家康',code:'WJK'},
			{name:'历家物流',code:'WJWL'},
			{name:'历象物流',code:'WXWL'},
			{name:'新邦物流',code:'KBWL'},
			{name:'迅驰物流',code:'KCWL'},
			{name:'信丰快递',code:'KFEX'},
			{name:'希优特',code:'XYT'},
			{name:'所杰物流',code:'xJ'},
			{name:'源安达快递',code:'YADEX'},
			{name:'远成物流',code:'YCL'},
			{name:'义达国际物流',code:'YDH'},
			{name:'易达通',code:'YDT'},
			{name:'越丰物流',code:'YFEX'},
			{name:'原飞航物流',code:'YFHEX'},
			{name:'亚风快递',code:'YFSD'},
			{name:'运通快递',code:'YTKD'},
			{name:'Z翔快递',code:'YXKD'},
			{name:'运东西',code:'YUNDX'},
			{name:'馅益快递',code:'ZENY'},
			{name:'汇强快递',code:'ZHQKD'},
			{name:'众通快递',code:'ZTE'},
			{name:'中铁快运',code:'ZTKY'},
			{name:'中通快运',code:'ZTo56'},
			{name:'中铁物流',code:'ZTWL'},
			{name:'中邮物流',code:'zYWL'}
		],
		column: [{ // 个人页
				column: [
					{name:'我的关注',news:'',click:''},
					{name:'消息通知',news:'',click:''},
					{name:'阅读公益',news:'今日阅读1小时',click:''}
				]
			},
			{
				column:[{name:'我的钱包',news:'手机充值',click:'TelephoneBill'},
				{name:'我的快递',news:'点我查快递',click:'express'},
				{name:'今有淘',news:'淘宝优惠券',click:'taobao'},
				{name:'京东特工',news:'新人领188红包',click:''},
				{name:'广告投放',news:'',click:''}
				]
			},
			
			{
				column:[{name:'扫一扫',news:'',click:''},
				{name:'用户反馈',news:'',click:''},
				{name:'系统设置',news:'',click:''}
				]
			}
		],
		tbappkey:'cdf111c9dfce070bc1dbc820209c288a',
		taoBaoFooterMenu: [ // 淘宝页底部
					{name:'首页',icon:'&#xe61e;',link:'taobao'},
					{name:'8.8包邮',icon:'&#xe614;',link:'Freeshipping'},
					{name:'查券',icon:'&#xe60b;',link:'Tickets'},
					{name:'聚划算',icon:'&#xe615;',link:'ju'},
					{name:'看货',icon:'&#xe62c;',link:'video'}
		],
		videoToShop:null // 看货跳商品页传视频连接
  },
  mutations: {
		dec(state,val){
			state.decMap.push(state.classMap[val])
			state.classMap.splice(val,1)
			// console.log(state.decMap)
		},
		add(state,val){
			state.classMap.push(state.decMap[val])
			state.decMap.splice(val,1)
			// console.log(state.classMap)
		},
		getuname(state,val){
			state.uname=val;
			console.log(val)
		},
		getVideoUrl(state,val){
			state.videoToShop = val
		},
		clearVideoUrl(state,val){
			state.videoToShop = null
		}
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

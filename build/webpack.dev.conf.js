'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
// 安装服务端做网络请求的三方模块$ npm install superagent --save-dev
const superagent = require('superagent')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
		before: function (app) {
			// 服务器请求外网数据
			app.get('/api/top', function (req, res) {
				superagent.get('http://toutiao-ali.juheapi.com/toutiao/index')
				.query({type:'top'})
				.set({'Host':'toutiao-ali.juheapi.com','gateway_channel':'http','X-Ca-Request-Mode':'debug','X-Ca-Key':'25478632','X-Ca-Stage':'RELEASE','Content-Type':'application/json; charset=utf-8','Authorization':'APPCODE ad787fb706aa49b280107716a838cc37'})
				.end((err, data) => {
					if(err) {	console.log(err) }
					res.json(data)//如果是json数据res.json()
				})
			})
			//热点新闻列表
			app.get('/api/hot', function (req, res) {
				superagent.get('http://route.showapi.com/1071-1')
				.query({showapi_appid:'3928',showapi_sign:'55545c364a0f4e42aee9ac59e6a93a2f'})
				.end((err, data) => {
					if(err) { console.log(err)	}
					res.json(data)
					console.log(err)
				})
			})
			//热点新闻列表
			app.get('/api/search', function (req, res) {
				superagent.get('http://route.showapi.com/109-35')
				.query({showapi_appid:'84546',showapi_sign:'83c384f0fcf849fcba1f25e114c7e523',title:'关键词'})
				.end((err, data) => {
					if(err) { console.log(err)	}
					res.json(data)
					console.log(err)
				})
			})
			//段子
			app.get('/api/funny', function (req, res) {
				superagent.get('https://www.apiopen.top/satinGodApi')
				// .query({type:'1',page:'1'})
				.end((err, data) => {
					if(err) { console.log(err)	}
					res.json(data)
					console.log(err)
				})
			})
			//淘宝-大牌
			app.get('/api/dapai', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({appkey:'cdf111c9dfce070bc1dbc820209c288a',type:'dapai',page:'1'})
				.end((err, data) => {
					if(err) { console.log(err)	}
					res.json(data)
					// console.log(err)
				})
			})
			// 喵喵说推荐
			app.get('/api/mmsClassPro', function (req, res) {
				superagent.get('http://api.tkjidi.com/mmsClassPro')
				.query({id:req.query.id,appkey:'cdf111c9dfce070bc1dbc820209c288a'})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			// 喵喵说文章列表
			app.get('/api/mmsList', function (req, res) {
				superagent.get('http://api.tkjidi.com/mmsList')
				.query({
					category_id:req.query.id,
					author_id:req.query.aid,
					appkey:'cdf111c9dfce070bc1dbc820209c288a'})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			// 喵喵说文章详情
			app.get('/api/mmsInfo', function (req, res) {
				superagent.get('http://api.tkjidi.com/mmsInfo')
				.query({
					id:req.query.id,
					appkey:'cdf111c9dfce070bc1dbc820209c288a'})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			
			// 商品查询-大额
			app.get('/api/findGoods', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
					type:req.query.type,
					keyword:req.query.keyworld,
					page:req.query.page,
					sort:req.query.sort,
					sort_type:req.query.sort_type
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			// 商品查询-全网
			app.get('/api/checkWhole', function (req, res) {
				superagent.get('http://api.tkjidi.com/checkWhole')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
					k:req.query.keyworld,
					page:req.query.page,
					sort:req.query.sort,
					sort_type:req.query.sort_type
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			// 商品详情
			app.get('/api/getGoodInfo', function (req, res) {
				superagent.get('http://gw.api.taobao.com/router/rest')
				.query({
					sign:req.query.sign,
					timestamp:req.query.timestamp,
					num_iids:req.query.id,
					v:'2.0',
					app_key:'25526389',
					method:'taobao.tbk.item.info.get',
					sign_method:'md5',
					partner_id:'top-apitools',
					format:'json',
					simplify:'true',
					force_sensitive_param_fuzzy:'true'
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			// 商品详情3
			app.get('/api/getGoodInfo3', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodInfo')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
					id:req.query.id
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			// 商品详情1
			app.get('/api/getGoodInfo1', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
	   				type:'so',
	   				price:req.query.price,
	   				keyword:req.query.keyword
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
//			http://open.taobao.com/doc.htm?spm=a219a.7386653.0.0.ae96669a5V9cbE&docId=1&docType=15&apiName=taobao.tbk.tpwd.create
//http://gw.api.taobao.com/router/rest?sign=37E88DAD3E067EF8C36BA561CBEE4C0D&timestamp=2019-01-16+15%3A28%3A01&v=2.0&app_key=25526389&method=taobao.tbk.tpwd.create&sign_method=hmac&partner_id=top-apitools&format=json&simplify=true&text=%E9%95%BF%E5%BA%A6%E5%A4%A7%E4%BA%8E5%E4%B8%AA%E5%AD%97%E7%AC%A6&force_sensitive_param_fuzzy=true&url=https%3A%2F%2Fuland.taobao.com%2Fquan%2Fdetail%3FsellerId%3D598479347%26activityId%3Dc696e1c39cc14cf292c292277da1e46b
// 短链接
//https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=%7B%22itemNumId%22%3A%22579634785271%22%7D&qq-pf-to=pcqq.group
//商品详情
		// 商品详情2（图）
   			app.get('/api/getGoodInfo2', function (req, res) {
   				superagent.get('http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/')
   				.query({
   					jsv:'2.4.11',
	   				appKey:'12574478',
	   				t:req.query.time,
	   				sign:'ead209edb5586f023813d8d3a60c265b',
	   				api:'mtop.taobao.detail.getdesc',
	   				v:'6.0',
	   				type:'jsonp',
	   				dataType:'jsonp',
	   				timeout:'20000',
//	   				callback:'mtopjsonp1',
	   				data:req.query.data,
	   				_:req.query.time
   				})
   				.end((err, data) => {
   					if(err) { console.log(err)}
   					res.json(data)
   				})
   			})
   			
   			// 淘口令生成
   			app.get('/api/getGoodCode', function (req, res) {
   				superagent.get('http://47.96.238.217:30006/get_taokouling')
   				.query({
   					item:req.query.link,
	   				pid:'mm_120565831_43316300_311728644'
   				})
   				.end((err, data) => {
   					if(err) { console.log(err)}
   					res.json(data)
   				})
   			})
   			// 8.8包邮
			app.get('/api/getGood88', function (req, res) {
				console.log(req)
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
	   				type:'www_lingquan',
	   				sort:'price',
	   				sort_type:'asc',
	   				page:req.query.page
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
				})
			})
			//大额券
			app.get('/api/getGoodCoupon', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
	   				type:'www_lingquan',
	   				sort:'coupon',
	   				sort_type:'desc'
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
					console.log(err)
				})
			})
			//商品分类券
			app.get('/api/getGoodType', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
	   				type:'classify',
	   				cid:req.query.cid
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
				})
			})
			//看货
			app.get('/api/getVideo', function (req, res) {
				superagent.get('http://api.tkjidi.com/getGoodsLink')
				.query({
					appkey:'cdf111c9dfce070bc1dbc820209c288a',
	   				type:'video',
	   				page:req.query.page
				})
				.end((err, data) => {
					if(err) { console.log(err)}
					res.json(data)
				})
			})
		},
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: {
// 			'/top': {
// 				changeOrigin: true,
// 				target: "http://v.juhe.cn/toutiao/index?type=&key=4d97ac1dbb14cab22f3400c6852e0474",
// 				pathRewrite: {'^/top': ''}
// 			}
		},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

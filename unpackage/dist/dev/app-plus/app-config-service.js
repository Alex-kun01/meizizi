
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/mine/login/login","pages/index/index","pages/nearbystore/nearbystore","pages/shopcart/shopcart","pages/mine/mine","pages/index/search","pages/index/productlist","pages/index/productdetails","pages/index/confirmorder","pages/index/orderdetails","pages/index/pay","pages/index/shoplist/hufuarea","pages/index/shoplist/meirongarea","pages/index/shoplist/caizhuangvenue","pages/index/shoplist/huodongarea","pages/index/shoplist/caizhuangxilie","pages/index/shoplist/maijiashow","pages/index/shoplist/pingjia","pages/mine/member/menber","pages/mine/member/myteam","pages/mine/member/memberteam","pages/mine/member/regionset","pages/mine/member/shenregion","pages/mine/member/teacher","pages/mine/member/storeinfo","pages/mine/merchant/mymerchant","pages/mine/merchant/mymerchantinfo","pages/mine/merchant/mymerchantx","pages/mine/merchant/receipt","pages/mine/merchant/shipper","pages/mine/merchant/waitship","pages/mine/merchant/jiaoyirecord","pages/mine/join/quyujoin","pages/mine/join/tuijianjoinmember","pages/mine/join/quyujoinmember","pages/mine/join/teammentmy","pages/mine/join/joinmyteamtuijian","pages/mine/member/memberinfo","pages/mine/member/membermyteam","pages/mine/member/tuijianmember","pages/mine/set/setup","pages/mine/set/personalinfo","pages/mine/set/helpcenter","pages/mine/set/news","pages/mine/set/accountsecurity","pages/mine/set/version","pages/mine/set/changepassword","pages/mine/set/changephone","pages/mine/set/bandnewphone","pages/mine/set/insetpassword","pages/mine/set/setpassword","pages/shopcart/allorder","pages/shopcart/follwshop","pages/shopcart/collect","pages/shopcart/comment","pages/shopcart/myfootprint","pages/shopcart/account/myallet","pages/shopcart/account/topup","pages/shopcart/account/billdetails","pages/shopcart/account/withdraw","pages/mine/login/invitationcode","pages/mine/login/register","pages/mine/member/teacherregion","pages/mine/set/bindaccount","pages/mine/login/storeregin","pages/mine/login/chooseregin"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#8a8a8a","selectedColor":"#FAAF05","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/index/shouye@2yx.png","selectedIconPath":"static/index/homexx.png"},{"pagePath":"pages/nearbystore/nearbystore","text":"附近店铺","iconPath":"static/index/dianpu@2x.png","selectedIconPath":"static/nearbystore/mendian@3x.png"},{"pagePath":"pages/shopcart/shopcart","text":"购物车","iconPath":"static/index/gouwuche@2x.png","selectedIconPath":"static/index/gouwuche@8x.png"},{"pagePath":"pages/mine/mine","text":"我的","iconPath":"static/index/wode@2x.png","selectedIconPath":"static/mine/wode@2x.png"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"miiiiizi","compilerVersion":"2.6.16","entryPagePath":"pages/mine/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/mine/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/nearbystore/nearbystore","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"附近店铺","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/shopcart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/search","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/productlist","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/index/productdetails","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/confirmorder","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/orderdetails","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/pay","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/hufuarea","meta":{},"window":{"navigationBarTitleText":"护肤专区","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/meirongarea","meta":{},"window":{"navigationBarTitleText":"美容专区","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/caizhuangvenue","meta":{},"window":{"navigationBarTitleText":"彩妆会场","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/huodongarea","meta":{},"window":{"navigationBarTitleText":"活动专区","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/caizhuangxilie","meta":{},"window":{"navigationBarTitleText":"彩妆系列","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/maijiashow","meta":{},"window":{"navigationBarTitleText":"买家秀","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/shoplist/pingjia","meta":{},"window":{"navigationBarTitleText":"评价","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/mine/member/menber","meta":{},"window":{"navigationBarTitleText":"会员成员","navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/myteam","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/memberteam","meta":{},"window":{"navigationBarTitleText":"成员","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/regionset","meta":{},"window":{"navigationBarTitleText":"总监","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/shenregion","meta":{},"window":{"navigationBarTitleText":"省区经理","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/teacher","meta":{},"window":{"navigationBarTitleText":"讲师","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/storeinfo","meta":{},"window":{"navigationBarTitleText":"店铺信息","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/mymerchant","meta":{},"window":{"navigationBarTitleText":"我的商家","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/mymerchantinfo","meta":{},"window":{"navigationBarTitleText":"我的商家","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/mymerchantx","meta":{},"window":{"navigationBarTitleText":"我的商家","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/receipt","meta":{},"window":{"navigationBarTitleText":"收货单","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/shipper","meta":{},"window":{"navigationBarTitleText":"出货单","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/waitship","meta":{},"window":{"navigationBarTitleText":"待发货","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/merchant/jiaoyirecord","meta":{},"window":{"navigationBarTitleText":"交易记录","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/join/quyujoin","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/join/tuijianjoinmember","meta":{},"window":{"navigationBarTitleText":"会员","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/join/quyujoinmember","meta":{},"window":{"navigationBarTitleText":"会员","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/join/teammentmy","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/join/joinmyteamtuijian","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/memberinfo","meta":{},"window":{"navigationBarTitleText":"会员信息","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/membermyteam","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/tuijianmember","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/setup","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/personalinfo","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/helpcenter","meta":{},"window":{"navigationBarTitleText":"帮助中心","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/mine/set/news","meta":{},"window":{"navigationBarTitleText":"通知","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/mine/set/accountsecurity","meta":{},"window":{"navigationBarTitleText":"账户安全","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/version","meta":{},"window":{"navigationBarTitleText":"版本更新","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/changepassword","meta":{},"window":{"navigationBarTitleText":"修改密码","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/changephone","meta":{},"window":{"navigationBarTitleText":"换绑手机号","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/bandnewphone","meta":{},"window":{"navigationBarTitleText":"绑定新手机号","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/insetpassword","meta":{},"window":{"navigationBarTitleText":"手机号验证","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/setpassword","meta":{},"window":{"navigationBarTitleText":"设置密码","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/allorder","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/follwshop","meta":{},"window":{"navigationBarTitleText":"关注店铺","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/collect","meta":{},"window":{"navigationBarTitleText":"收藏","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/shopcart/comment","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/myfootprint","meta":{},"window":{"navigationBarTitleText":"我的足迹","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/shopcart/account/myallet","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/account/topup","meta":{},"window":{"navigationBarTitleText":"充值","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/account/billdetails","meta":{},"window":{"navigationBarTitleText":"账单明细","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/shopcart/account/withdraw","meta":{},"window":{"navigationBarTitleText":"提现","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/login/invitationcode","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/login/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/member/teacherregion","meta":{},"window":{"navigationBarTitleText":"讲师","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/set/bindaccount","meta":{},"window":{"navigationBarTitleText":"账号绑定","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/login/storeregin","meta":{},"window":{"navigationBarTitleText":"商家注册","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/login/chooseregin","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import xhr from './fun/RqAxios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import BottomNav from './components/publicComponents/BottomNav.vue'
Vue.component('BottomNav', BottomNav)
Vue.use(Mint)
Vue.use(BottomNav)
Vue.config.productionTip = false
Vue.prototype.$http = xhr
/* eslint-disable no-new */
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.localStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.localStorage.userInfo))
}
if (window.localStorage.userToken) {
  store.dispatch('setuserToken', JSON.parse(window.localStorage.userToken))
}
if (window.sessionStorage.ActiveArticleNav) {
  store.dispatch('SetActiveArticleNav', window.sessionStorage.ActiveArticleNav)
}
if (window.localStorage.phone) {
  store.dispatch('SetPhone', window.sessionStorage.phone)
}
// 登录中间验证，页面需要vip权限而没有vip权限的情况直接跳转开通vip
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.userInfo.phone&&!window.localStorage.phone) {
            if(to.path=="/personalziliao"||from.path=='/personalziliao'){
            }else {
                Vue.$messagebox.prompt(
                    store.state.userInfo.user_name,
                    '亲，完善资料，让客户主动找到你！',
                    {
                        inputPlaceholder: '请输入电话号码',
                        inputValidator: (val) => {
                            if (val === null) {
                                return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
                            }
                            return (/^1[34578]\d{9}$/.test(val))
                        },
                        inputErrorMessage: '请输入11位电话号码'
                    }).then(
                        ({ value, action }) => {
                            xhr({method:"post",url:"/index.php/index/user/save_user_phone",data:Object.assign({},store.state.userToken,{phone:value})
                        }).then((res)=>{
                            if(res.data.code==200){
                                if(res.data.data.phone){
                                    store.dispatch('SetPhone',res.data.data.phone)
                                }else {
                                   Vue.$toast("服务器错误")
                                }
                            }else {
                                Vue.$toast(res.data.msg)
                            }
                            })
                        },
                        () => {
                        console.log('cancel')
                        })
            }
         next()
    } else {
            next()
      /*next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })*/
    }
    console.log('ok')
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

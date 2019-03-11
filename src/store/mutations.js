export default {
/*   showLoading: (state) => {
    state.isShow = true
  },
  hideLoading: (state) => {
    state.isShow = false
  },
  showNav: (state) => {
    state.isNavShow = true
  },
  hideNav: (state) => {
    state.isNavShow = false
  }, */
  setUserInfo: (state, userInfo) => {
    state.userInfo = Object.assign({},state.userInfo,userInfo)
      window.localStorage.userInfo=JSON.stringify(state.userInfo)
  },
    setuserToken: (state, userToken) => {
    state.userToken = userToken
    window.localStorage.userToken=JSON.stringify(state.userToken)
  },
  SetActiveArticleNav:(state,index)=>{
      state.ActiveArticleNav = index;
      window.sessionStorage.ActiveArticleNav=index;
  },
    SetPhone:(state,phone)=>{
        state.userInfo.phone =phone;
        window.localStorage.phone=phone;
    }

}

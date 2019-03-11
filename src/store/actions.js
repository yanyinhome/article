export default {
/*  showLoading: ({
    commit
  }) => {
    commit('showLoading')
  },
  hideLoading: ({
    commit
  }) => {
    commit('hideLoading')
  },
  showNav: ({
    commit
  }) => {
    commit('showNav')
  },
  hideNav: ({
    commit
  }) => {
    commit('hideNav')
  }, */
  setUserInfo: ({commit}, userInfo) => {
    commit('setUserInfo', userInfo)
  },
  SetActiveArticleNav: ({commit}, index) => {
    commit('SetActiveArticleNav', index)
  } ,
  setuserToken: ({commit}, userToken) => {
    commit('setuserToken', userToken)
  },
  SetPhone:({commit}, phone) => {
        commit('SetPhone', phone)
    },
}

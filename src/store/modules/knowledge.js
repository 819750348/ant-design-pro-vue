const knowledge = {
  state: {
    privateTreeData: '',
    privateKnowledgeList: '',
    professionalNavigation: '',
    navigationDetail: '',
    knowledgeBase: '',
    searchList: '',
    knowledgeBaseList: '',
    recentlyViewList: ''
  },

  mutations: {
    savePrivateTree: (state, data) => {
      state.privateTreeData = data
    },
    savePrivateKnowledgeList: (state, data) => {
      state.privateKnowledgeList = data
    },
    saveProfessionalNavigation: (state, data) => {
      state.professionalNavigation = data
    },
    saveNavigationDetail: (state, data) => {
      state.navigationDetail = data
    },
    saveKnowledgeBase: (state, data) => {
      state.knowledgeBase = data
    },
    saveSearchList: (state, data) => {
      state.searchList = data
    },
    saveKnowledgeBaseList: (state, data) => {
      state.knowledgeBaseList = data
    },
    saveRecentlyViewList: (state, data) => {
      state.recentlyViewList = data
    }
  },

  actions: {}
}

export default knowledge

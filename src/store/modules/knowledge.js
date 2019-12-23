const knowledge = {
  state: {
    privateTreeId: '',
    privateTreeData: '',
    privateKnowledgeList: '',
    professionalNavigation: '',
    navigationDetail: '',
    knowledgeBase: '',
    searchList: '',
    knowledgeBaseList: '',
    recentlyViewList: '',
    flashconvert: '',
    kType: '',
    saveState: ''
  },

  mutations: {
    savePrivateTreeId: (state, data) => {
      state.privateTreeId = data
    },
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
    },
    saveFlashconvert: (state, data) => {
      state.flashconvert = data
    },
    saveKType: (state, data) => {
      state.kType = data
    },
    saveState: (state, data) => {
      state.saveState = data
    }
  },
  actions: {}
}

export default knowledge

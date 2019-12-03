const knowledge = {
  state: {
    privateTreeData: '',
    privateKnowledgeList: '',
    professionalNavigation: '',
    navigationDetail: '',
    knowledgeBase: '',
    searchList: ''
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
    }
  },

  actions: {}
}

export default knowledge

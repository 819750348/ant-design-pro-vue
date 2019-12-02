const knowledge = {
  state: {
    privateTreeData: '',
    privateKnowledgeList: '',
    professionalNavigation: '',
    navigationDetail: ''
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
    }
  },

  actions: {}
}

export default knowledge

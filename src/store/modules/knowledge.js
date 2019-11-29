const knowledge = {
  state: {
    privateTreeData: '',
    privateKnowledgeList: ''
  },

  mutations: {
    savePrivateTree: (state, data) => {
      state.privateTreeData = data
    },
    savePrivateKnowledgeList: (state, data) => {
      state.privateKnowledgeList = data
    }
  },

  actions: {}
}

export default knowledge

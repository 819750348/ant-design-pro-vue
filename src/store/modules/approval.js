import Vue from 'vue'

const approval = {
  state: {
    majorName: '',
    personnel: ''
  },
  mutations: {
    SET_MAJORNAME: (state, typekey, typename) => {
      state.majorName = typename
    },
    SET_PERSONNEL: (state, type) => {
      state.personnel = type
    }
  }
}

export default approval

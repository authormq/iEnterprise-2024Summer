import { createStore } from 'vuex'

const store = createStore({
  state: {
    // Example
    isAdmin: false,
    showTestListImmediately: false,
    UserId: -1,
  },
  // 状态的 getter
  getters: {
    // Example
    isAdmin: (state) => state.isAdmin
  },
  // 状态的 setter
  mutations: {
    setIsAdmin(state, newValue) {
      state.isAdmin = newValue
    }
  },
})

export default store

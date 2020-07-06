import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: null,
    vip: -1,
    money: 0,
}

const mutations = {
    setUser(state, user) {
        state.user = user
        localStorage.setItem('token', 'ImLogin')
    },

    logoutUser() {
        state.user = null
        state.vip = -1
        state.money = 0
        
        localStorage.removeItem('token')
    },

    addMoney(state, money) {
        state.money += money

        store.commit('setVip')
    },

    setVip() {
        if(state.money > 20000)
            state.vip = 8
        else if(state.money > 10000)
            state.vip = 7
        else if(state.money > 5000)
            state.vip = 6
        else if(state.money > 2000)
            state.vip = 5
        else if(state.money > 1000)
            state.vip = 4
        else if(state.money > 500)
            state.vip = 3
        else if(state.money > 100)
            state.vip = 2  
        else if(state.money > 10)
            state.vip = 1
        else
            state.vip = -1
    },
}

const actions = {
    setUser ({ commit }, payload) {
        commit('setUser', payload)
    },
    
    logoutUser ({ commit }) {
        commit('logoutUser')
    },

    addMoney ({ commit }, payload) {
        commit('addMoney', payload)
    },
}

const getters = {
    getUser() {
        return state.user
    },

    getMoney() {
        return state.money
    },

    getVip() {
        return state.vip
    },
}

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
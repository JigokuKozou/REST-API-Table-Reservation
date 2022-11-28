import firebase from '../util/firebase.js'

export default {
    state: {
        user: null,
    },
    mutations: {},
    actions: {
        async registerUser ({commit}, {email, password}) {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log(user );
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        checkUser(state) {
            return state.user !== null
        }
    }
}
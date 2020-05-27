import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: '',
        quads: [],
        quadString: '',
        applicationProfiles: []
    },

    getters: {
        // Here we will create a getter
        ApplicationProfiles: state => {
            return state.applicationProfiles
        }
    },

    mutations: {
        updateData(state, input){
            state.data = input;
        },
        updateQuads(state, quads){
            state.quads = quads;
        },
        updateQuadString(state, string){
            state.quadString = string;
        },
        setApplicationProfiles(state, body){
            state.applicationProfiles = body;
        }
    },
});

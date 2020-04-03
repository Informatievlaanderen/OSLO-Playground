import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: '',
        quads: [],
        quadString: '',
    },

    getters: {
        // Here we will create a getter
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
        }
    },

    actions: {
    }
});

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    number : 1,
    angry_Count: 0,
    disgusted_Count: 0,
    fearful_Count: 0,
    happy_Count: 0,
    neutral_Count: 0,
    sad_Count: 0,
    surprised_Count: 0,
    male_Count: 0,
    female_Count: 0,
    voiceTexts : [],
    positionGuide: 0,
  },
  mutations: {
    increment(state){
      state.number++;
    },
    popUp(state){
      state.positionGuide++;
    },
    save_FaceData(state, payload) {
      state.angry_Count = payload.angry_Count;
      state.disgusted_Count = payload.disgusted_Count;
      state.fearful_Count = payload.fearful_Count;
      state.happy_Count = payload.happy_Count;
      state.neutral_Count = payload.neutral_Count;
      state.sad_Count = payload.sad_Count;
      state.surprised_Count = payload.surprised_Count;
      state.male_Count = payload.male_Count;
      state.female_Count = payload.female_Count;
      state.voiceTexts = payload.voiceTexts;
    }
  },
  actions: {

  },
  modules: {

  }
})

import { MutationsHelper } from "@/store/helper";

const state = {
  //state: null
};

const mutations = {
  //setState: MutationsHelper.set("state"),
};

const actions = {
  // SetProperty({commit}, property){
  //     commit("setProperty", property);
  // },
  // GetPropertyFromLocalStorage({commit}){
  //     const data = localStorage.getItem(storageKeys.pokemonList);
  //     let list = data != "undefined" || !data ? JSON.parse(data) : null;
  //     commit("setState", data);
  // }
};

//-- Not Exported --//
const storageKeys = {};
//-----------------//

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

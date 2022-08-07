import holidayService from "../../services/holidayService";
import { MutationsHelper } from "../helper";

const state = {
  events: [],
  countryCodes: [],
  countryHolidays: [],
};

const mutations = {
  SetEvents: MutationsHelper.set("events"),
  PushEvent: MutationsHelper.pushTo("events"),
  SetCountryCodes: MutationsHelper.set("countryCodes"),
  SetCountryHolidays: MutationsHelper.set("countryHolidays"),
};

const actions = {
  PushEvent({ commit, state }, event) {
    commit("PushEvent", event);
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(state.events));
  },

  EditEvent({ commit, state }, [event, index]) {
    let fEvents = state.events.map((val, i) => {
      if (i === index) {
        return event;
      }
      return val;
    });
    commit("SetEvents", fEvents);
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(fEvents));
  },

  GetEventsFromLocalStorage({ commit }) {
    const data = localStorage.getItem(STORAGE_KEYS.events);
    let list = data != "undefined" || !data ? JSON.parse(data) : [];
    if (list.length) {
      list = list.map((event) => {
        return {
          ...event,
          end: new Date(event.end),
          start: new Date(event.start),
        };
      });
    }
    commit("SetEvents", list);
  },

  async GetAvailableCountries({ commit }) {
    let countryCodes = localStorage.getItem(STORAGE_KEYS.countryCodes);
    if (!countryCodes) {
      countryCodes = await holidayService.GetCountryCodes();
      localStorage.setItem(STORAGE_KEYS.countryCodes, JSON.stringify(countryCodes));
    } else {
      countryCodes = JSON.parse(countryCodes);
    }
    commit("SetCountryCodes", countryCodes);
  },

  async GetHolidays({ commit }, [year, countryCode]) {
    const holidays = await holidayService.GetHolidays(year, countryCode);
    const dateList = holidays.map((item) => ({ date: item.date, localName: item.localName }));
    commit("SetCountryHolidays", dateList);
  },
};

const STORAGE_KEYS = {
  events: "events",
  countryCodes: "countryCodes",
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

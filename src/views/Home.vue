<template>
  <div class="grey lighten-5">
    <HomeHeader
      :currentView="selectedView"
      @showCalendarView="() => (selectedView = 'Calendar')"
      @showNoteListView="() => (selectedView = 'NotesList')"
    />
    <KeepAlive>
      <component :is="selectedView"></component>
    </KeepAlive>
  </div>
</template>

<script>
import { Calendar, HomeHeader, NotesList } from "../components";
import { mapActions } from "vuex";

export default {
  name: "Home",

  components: {
    Calendar,
    HomeHeader,
    NotesList,
  },

  data() {
    return {
      selectedView: "Calendar",
    };
  },

  methods: {
    ...mapActions("calendar", ["GetEventsFromLocalStorage", "GetAvailableCountries"]),
  },

  mounted() {
    this.GetEventsFromLocalStorage();
    this.GetAvailableCountries();
  },
};
</script>
<style lang="less">
@import (less) "../styles/views/home.less";
</style>

<template>
  <div class="wrapper">
    <div class="page-title">
      <v-icon color="green">mdi-calendar</v-icon>
      <strong class="pl-2">Kawak Calendar Notes</strong>
    </div>
    <div class="d-flex justify-center">
      <v-btn small class="mr-2" @click="showCalendarView" :depressed="currentView === 'Calendar'">Calendar</v-btn>
      <v-btn small @click="showNoteListView" :depressed="currentView === 'NotesList'">Note List</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  props: {
    currentView: String,
  },

  methods: {
    showCalendarView() {
      this.$emit("showCalendarView");
    },
    showNoteListView() {
      this.$emit("showNoteListView");
    },
  },
};
</script>

<style lang="less" scoped>
@import (less) "../styles/components/homeHeader.less";
</style>

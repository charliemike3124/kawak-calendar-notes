<template>
  <v-row>
    <v-col>
      <v-data-table :headers="headers" :items="dataItems"></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NotesList",
  computed: {
    ...mapState("calendar", ["events"]),
    dataItems() {
      return this.events.map((event) => ({
        ...event,
        end: event.end.toLocaleString("en-US"),
        start: event.start.toLocaleString("en-US"),
      }));
    },
  },

  data() {
    return {
      headers: [
        {
          text: "Start date",
          value: "start",
        },
        {
          text: "End date",
          value: "end",
        },
        {
          text: "Note",
          value: "name",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="less">
@import (less) "../styles/components/notesList.less";
</style>

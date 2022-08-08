<template>
  <div class="wrapper">
    <v-row align="center">
      <v-col class="mr-12">
        <div>
          <v-select
            label="Holidays Country"
            :items="countryCodes"
            item-text="name"
            item-value="countryCode"
            @change="selectCountry"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="6">
        <v-btn icon class="ma-2" @click="changeMonth(false)">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span>{{ $refs.calendar?.title }}</span>
        <v-btn icon class="ma-2" @click="changeMonth(true)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-calendar
      class="calendar"
      ref="calendar"
      v-model="value"
      :weekdays="weekday"
      :events="events"
      @click:event="editNote"
      @click:date="setNote"
    >
      <template #day="props">
        <div v-if="countryHolidays.some((item) => item.date === props.date)" class="holiday">
          <CVTooltip :text="countryHolidays.find((item) => item.date === props.date).localName">
            <v-icon color="green">mdi-beach</v-icon>
          </CVTooltip>
        </div>
      </template>
    </v-calendar>
    <NotesModal ref="notesModal" @confirmSetNote="confirmSetNote" @confirmEditNote="confirmEditNote" />
  </div>
</template>

<script>
import NotesModal from "./NotesModal.vue";
import CVTooltip from "./common/CVTooltip.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Calendar",
  components: {
    NotesModal,
    CVTooltip,
  },

  computed: {
    ...mapState("calendar", ["events", "countryCodes", "countryHolidays"]),
  },

  data() {
    return {
      value: "",
      weekday: [0, 1, 2, 3, 4, 5, 6],
      seletedDate: null,
      selectedEditEvent: null,
      currentCalendarYear: null,
      currentCountryCode: null,
    };
  },

  methods: {
    ...mapActions("calendar", ["PushEvent", "EditEvent", "GetHolidays"]),
    changeMonth(next) {
      if (next) {
        this.$refs.calendar.next();
      } else {
        this.$refs.calendar.prev();
      }

      this.$nextTick(() => {
        const title = this.$refs.calendar.title;
        const year = title.substring(title.length - 4, title.length);
        if (this.currentCalendarYear && year !== this.currentCalendarYear) {
          this.GetHolidays([year, this.currentCountryCode]);
        }
        this.currentCalendarYear = year;
      });
    },

    setNote(props) {
      this.seletedDate = props.date;
      this.$refs.notesModal.showModal();
    },

    confirmSetNote(note) {
      const dStart = new Date(`${this.seletedDate}T${note.startHour}:00`);
      const dEnd = new Date(`${this.seletedDate}T${note.endHour}:00`);
      this.PushEvent({
        name: note.name,
        start: dStart,
        end: dEnd,
        timed: true,
      });
      this.$refs.notesModal.hideModal();
    },

    editNote(event) {
      this.selectedEditEvent = event.eventParsed.index;
      this.$refs.notesModal.showEditing(event.event);
    },

    confirmEditNote(note) {
      const dStart = new Date(`${this.seletedDate}T${note.startHour}:00`);
      const dEnd = new Date(`${this.seletedDate}T${note.endHour}:00`);
      const event = {
        name: note.name,
        start: dStart,
        end: dEnd,
        timed: true,
      };
      this.EditEvent([event, this.selectedEditEvent]);
      this.$refs.notesModal.hideModal();
    },

    selectCountry(countryCode) {
      const title = this.$refs.calendar.title;
      const year = title.substring(title.length - 4, title.length);
      this.GetHolidays([year, countryCode]);

      this.currentCalendarYear = year;
      this.currentCountryCode = countryCode;
    },
  },
};
</script>

<style lang="less" scoped>
@import (less) "../styles/components/calendar.less";
</style>

<template>
  <v-dialog v-model="show" width="450">
    <v-card class="pa-4">
      <v-card-title class="text-h5">{{ editing ? "Edit Note" : "Add note" }}</v-card-title>

      <v-card-text class="mt-2">
        <v-form>
          <v-text-field label="Title" v-model="form.name" :rules="[(val) => !!val || 'Required.']"></v-text-field>
          <div class="d-flex flex-row">
            <v-text-field class="mr-2" label="Start date" :value="today" disabled></v-text-field>
            <v-select :items="startHourRange" label="Start hour" v-model="form.startHour"></v-select>
          </div>
          <div class="d-flex flex-row">
            <v-text-field class="mr-2" label="End date" :value="today" disabled></v-text-field>
            <v-select :items="endHourRange" label="End hour" v-model="form.endHour"></v-select>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="show = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="confirm" color="primary" :disabled="!form.name">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NotesModal",
  computed: {
    startHourRange() {
      return this.hourRange.filter((hour) => this.hourRange.indexOf(hour) < this.hourRange.indexOf(this.form.endHour));
    },
    endHourRange() {
      return this.hourRange.filter(
        (hour) => this.hourRange.indexOf(hour) > this.hourRange.indexOf(this.form.startHour)
      );
    },
  },

  data() {
    return {
      show: false,
      today: new Date().toLocaleDateString(),
      editing: false,
      form: {
        name: "",
        startHour: "00:00",
        endHour: "23:00",
      },
      hourRange: [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
      ],
    };
  },

  methods: {
    confirm() {
      if (this.editing) {
        this.$emit("confirmEditNote", this.form);
      } else {
        this.$emit("confirmSetNote", this.form);
      }
    },
    showModal() {
      this.editing = false;
      this.form = {
        name: "",
        startHour: "00:00",
        endHour: "23:00",
      };
      this.show = true;
    },
    hideModal() {
      this.show = false;
    },
    showEditing(event) {
      const sHour = event.start.getHours() <= 9 ? "0" + event.start.getHours() : event.start.getHours();
      const eHour = event.end.getHours() <= 9 ? "0" + event.end.getHours() : event.end.getHours();
      const sMinutes = event.start.getMinutes() <= 9 ? "0" + event.start.getMinutes() : event.start.getMinutes();
      const eMinutes = event.end.getMinutes() <= 9 ? "0" + event.end.getMinutes() : event.end.getMinutes();

      const startHour = `${sHour}:${sMinutes}`;
      const endHour = `${eHour}:${eMinutes}`;

      this.form = {
        name: event.name,
        startHour,
        endHour,
      };
      this.editing = true;
      this.show = true;
    },
  },
};
</script>

<style lang="less"></style>

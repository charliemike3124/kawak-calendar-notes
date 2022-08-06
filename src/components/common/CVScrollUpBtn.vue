<template>
  <v-scale-transition>
    <v-btn v-show="showScrollUpBtn" fab small dark class="scroll-up-btn" @click="scrollToTop">
      <v-icon>mdi-arrow-up-bold</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
export default {
  name: "CVScrollUpBtn",
  props: {
    elementId: {
      type: String,
      required: true,
    },
  },
  computed: {
    showScrollUpBtn() {
      return this.scrollY > 200;
    },
  },
  data: () => ({
    scrollY: 0,
  }),
  methods: {
    scrollToTop() {
      const el = document.querySelector(`#${this.elementId}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    handleScrollEvent() {
      this.scrollY = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrollEvent);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrollEvent);
  },
};
</script>

<style scoped>
.scroll-up-btn {
  position: fixed;
  bottom: 50px;
  right: 25px;
}
</style>

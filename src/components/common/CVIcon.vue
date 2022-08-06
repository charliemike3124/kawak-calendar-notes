<template>
  <div>
    <!--If tooltip property has any text, render this instead-->
    <v-tooltip bottom v-if="tooltip">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="onClick" v-bind="attrs" v-on="on">
          <v-icon>
            <slot></slot>
          </v-icon>
        </v-btn>
      </template>
      {{ tooltip }}
    </v-tooltip>
    <!--Button without tooltip-->
    <v-btn v-else icon @click="onClick">
      <v-icon>
        <slot></slot>
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CVIcon",
  props: {
    tooltip: String,
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style></style>

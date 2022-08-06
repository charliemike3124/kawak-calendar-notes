export default {
  methods: {
    callMethodByName(name, params = null) {
      if (params) {
        this[name](...params);
      } else {
        this[name]();
      }
    },

    requireImage(path) {
      let src = "";
      try {
        src = require("@/assets/" + path);
      } catch (err) {
        console.log(`Image not able to load - ${path}`);
      }
      return src;
    },

    deepCopy(object) {
      //-- Does not work if the object is or contains classes.
      return JSON.parse(JSON.stringify(object));
    },

    preLoadImage(src) {
      return new Promise((resolve, reject) => {
        try {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
        } catch (ex) {
          reject(ex);
        }
      });
    },
  },
};

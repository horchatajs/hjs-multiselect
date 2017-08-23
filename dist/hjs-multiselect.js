(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global.HjsMultiselect = factory(global.Vue));
}(this, (function (vue) { 'use strict';

vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;

var Multiselect$1;

Multiselect$1 = {
  template: "<div class=\"hjs-multiselect\">\n  <div class=\"hjs-multiselect-selected-items\" @click=\"toggleList()\">\n    <div class=\"hjs-multiselect-placeholder\" v-if=\"showPlaceholder()\" >{{placeholder}}</div>\n    <ul>\n      <li v-for=\"item in items\" v-if=\"isSelected(item)\" >\n      {{ item.text }}\n      <span @click.stop=\"removeSelectedItem(item)\">x</span>\n      </li>\n    </ul>\n  </div>\n  <div class=\"hjs-multiselect-items\" v-if=\"showList\">\n    <ul>\n      <li v-for=\"item in items\" v-bind:class=\"{ disabled: isSelected(item) }\" @click=\"addSelectedItem(item)\">\n      {{ item.text }}\n      </li>\n    </ul>\n  </div>\n</div>",
  name: "hjs-multiselect",
  computed: {
    selectedItems: {
      get: function() {
        return this.select;
      },
      set: function(value) {
        return this.select = value;
      }
    }
  },
  methods: {
    toggleList: function() {
      if (this.showList === true) {
        return this.showList = false;
      } else {
        return this.showList = true;
      }
    },
    isSelected: function(item) {
      var values;
      values = this.values();
      return values.indexOf(item.value) >= 0;
    },
    showPlaceholder: function() {
      return this.selectedItems.length === 0;
    },
    addSelectedItem: function(item) {
      var items;
      items = this.selectedItems.filter((function(_this) {
        return function(i) {
          return item.value === i.value;
        };
      })(this));
      if (items.length === 0) {
        this.selectedItems.push(item);
        return this.$emit("change", item, this.select);
      }
    },
    removeSelectedItem: function(item) {
      var index, values;
      values = this.values();
      index = values.indexOf(item.value);
      if (index >= 0) {
        this.select.splice(index, 1);
        this.$emit("change", item, this.select);
        if (values.length === 1) {
          return this.showList = false;
        }
      }
    },
    values: function() {
      var j, len, ref, s, values;
      values = [];
      if (this.selectedItems instanceof Array) {
        ref = this.selectedItems;
        for (j = 0, len = ref.length; j < len; j++) {
          s = ref[j];
          values.push(s.value);
        }
      }
      return values;
    }
  },
  props: {
    items: {
      type: Array,
      "default": (function(_this) {
        return function() {
          return [];
        };
      })(undefined)
    },
    select: {
      type: Array,
      "default": (function(_this) {
        return function() {
          return [];
        };
      })(undefined)
    },
    placeholder: {
      type: String,
      "default": "Please select items"
    }
  },
  data: function() {
    var opts;
    return opts = {
      showList: false
    };
  }
};

var Multiselect$2 = Multiselect$1;

Multiselect$2.install = function(Vue) {
  return Vue.component(Multiselect$2.name, Multiselect$2);
};

return Multiselect$2;

})));
//# sourceMappingURL=hjs-multiselect.js.map

// modified version of https://github.com/paulcollett/vue-masonry-css
// LICENSE: https://github.com/paulcollett/vue-masonry-css/blob/master/LICENSE

const props = {
  tag: {
    type: [String],
    default: "div",
  },
  cols: {
    type: [Number],
    default: 2,
  },
  gutter: {
    type: [Number],
    default: 0,
  },
  css: {
    type: [Boolean],
    default: true,
  },
  columnTag: {
    type: [String],
    default: "div",
  },
  columnClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  columnAttr: {
    type: [Object],
    default: () => ({}),
  },
};

const component = {
  props,
  methods: {
    _getChildItemsInColumnsArray() {
      const columns = [];
      let childItems = this.$slots.default || [];

      // This component does not work with a child <transition-group /> ..yet,
      // so for now we think it may be helpful to ignore until we can find a way for support
      if (
        childItems.length === 1 &&
        childItems[0].componentOptions &&
        childItems[0].componentOptions.tag == "transition-group"
      ) {
        childItems = childItems[0].componentOptions.children;
      }

      // Loop through child elements
      for (
        let i = 0, visibleItemI = 0;
        i < childItems.length;
        i++, visibleItemI++
      ) {
        // skip Vue elements without tags, which includes
        // whitespace elements and also plain text
        if (!childItems[i].tag) {
          visibleItemI--;

          continue;
        }

        // Get the column index the child item will end up in
        const columnIndex = visibleItemI % this.cols;

        if (!columns[columnIndex]) {
          columns[columnIndex] = [];
        }

        columns[columnIndex].push(childItems[i]);
      }

      return columns;
    },
  },

  render(createElement) {
    const columnsContainingChildren = this._getChildItemsInColumnsArray();
    const gutterSizeWithUnit = `${this.gutter}px`;

    const columnStyle = {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      width: `${100 / this.cols}%`,
      border: "0 solid transparent",
      borderLeftWidth: gutterSizeWithUnit,
    };

    const columns = columnsContainingChildren.map((children, index) => {
      /// Create column element and inject the children
      return createElement(
        this.columnTag,
        {
          key: index + "-" + columnsContainingChildren.length,
          style: this.css ? columnStyle : null,
          class: this.columnClass,
          attrs: this.columnAttr,
        },
        children
      );
    });

    const containerStyle = {
      display: ["-webkit-box", "-ms-flexbox", "flex"],
      marginLeft: `-${gutterSizeWithUnit}`,
    };

    // Return wrapper with columns
    return createElement(
      this.tag,
      this.css ? { style: containerStyle } : null,
      columns
    );
  },
};

const Plugin = function () {};

Plugin.install = function (Vue) {
  if (Plugin.installed) {
    return;
  }
  Vue.component("masonry", component);
};

export default Plugin;

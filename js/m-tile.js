xtag.register("m-tile", {
    mixins: ["m-element"],
    content: "<m-image></m-image>\
              <m-text-view class='primary' text-style='subheading'></m-text-view>\
              <m-text-view class='hint' text-style='caption'></m-text-view>",
    lifecycle: {
        created: function () {
            this.textView = this.querySelector("m-text-view.primary");
            this.hintView = this.querySelector("m-text-view.hint");
            this.imageView = this.querySelector("m-image");
            this.tabIndex = 0;
            this.render();
        }
    },
    accessors: {
        src: {
            attribute: {},
            get: function () {
                return this.imageView.src;
            },
            set: function (value) {
                this.imageView.src = value;
            }
        },
        text: {
            attribute: {},
            get: function() {
                return this.textView.textContent;
            },
            set: function(value) {
                this.textView.textContent = value;
            }
        },
        hint: {
            attribute: {},
            get: function() {
                return this.hintView.textContent;
            },
            set: function(value) {
                this.hintView.textContent = value;
            }
        }
    },
    methods: {
        render: function () {
            // Default to grey theme
            var themeColor = this.tint in colors ? this.tint : "grey";
            var style = this.theme in colors ? this.theme : xm.current.style;
            // Setup the tile & label backgrounds
            this.style.backgroundColor = colors[themeColor][500];
            this.textView.style.backgroundColor = colors[themeColor][700];
            this.pressedColor = colors[themeColor][500];
            this.textView.style.color = this.hintView.style.color = colors[style][500];
        }
    },
    events: {
        tapstart: function (e) {
            // Animate ripple
            xm.ripple.make(e, this);
        },
        tapend: function () {
            xm.ripple.reset(this);
        },
        focus: function () {
            xm.focus.make(this);
        },
        blur: function () {
            xm.focus.reset(this);
        },
        leave: function () {
            xm.ripple.reset(this);
        },
        keydown: function (e) {
            if (xm.input.isActionKey(e.keyCode) && !this.focused) {
                xtag.fireEvent(this, "tapstart");
                this.focused = true;
            }
        },
        keyup: function (e) {
            if (xm.input.isActionKey(e.keyCode)) {
                xtag.fireEvent(this, "tapend");
                this.focused = false;
            }
        }
    }
});
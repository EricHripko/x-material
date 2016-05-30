xtag.register("m-switch", {
    mixins: ["m-element"],
    content: "<div class='track'></div>\
              <div class='thumb'><div class='slider' elevation=1></div></div>",
    lifecycle: {
        created: function () {
            this.tabIndex = 0;
            this.track = this.querySelector(".track");
            this.thumb = this.querySelector(".thumb");
            this.slider = this.querySelector(".slider");
            this.render();
        }
    },
    accessors: {
        active: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._active;
            },
            set: function (value) {
                this._active = value;
                this.render();
            }
        },
        inactive: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._inactive;
            },
            set: function (value) {
                this._inactive = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            var tint = this.tint in colors ? this.tint : xm.current.color;
            var style = this.theme in colors ? this.theme : xm.current.style;

            if(style == "dark") {
                this.track.style.background = this.active ? colors[tint][200] : colors[style][300];
                this.slider.style.background = this.active ? colors[tint][200] : colors["grey"][400];
            }
            else {
                this.track.style.background = this.active ? colors[tint][500] : colors[style][300];
                this.slider.style.background = this.active ? colors[tint][500] : colors["grey"][50];
            }

            this.pressedColor = this.active ? this.getPressedColor(tint) : this.getPressedColor(style);
        }
    },
    events: {
        tapstart: function (e) {
            if(this.inactive)
                return;

            this.thumb.pressedColor = this.pressedColor;
            xm.ripple.make(e, this.thumb);
        },
        tapend: function () {
            if(this.inactive)
                return;

            xm.ripple.reset(this.thumb);

            this.active = !this.active;
            xtag.fireEvent(this, "MaterialButtonSelected");
        },
        focus: function () {
            xm.focus.make(this.thumb);
        },
        blur: function () {
            xm.focus.reset(this.thumb);
        },
        leave: function () {
            xm.ripple.reset(this.thumb);
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
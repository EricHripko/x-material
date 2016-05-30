xtag.register("m-toggle", {
    mixins: ["m-element"],
    content: "<m-icon class='background' src='check_box_outline_blank'></m-icon>\
              <m-icon class='foreground' src='check_box'></m-icon>",
    lifecycle: {
        created: function () {
            this.tabIndex = 0;
            // Create a text view to go inside the element
            this.background = this.querySelector("m-icon.background");
            this.icon = this.querySelector("m-icon.foreground");
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
        },
        radio: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._radio;
            },
            set: function (value) {
                this._radio = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            this.icon.tint = this.active && !this.inactive ? this.tint : undefined;
            this.icon.inactive = this.inactive;
            this.icon.src = this.radio ? "radio_button_checked" : "check_box";
            this.background.src = this.radio ? "radio_button_unchecked" : "check_box_outline_blank";
            this.background.inactive = this.inactive;
        }
    },
    events: {
        tapstart: function (e) {
            if(this.inactive)
                return;

            xm.ripple.make(e, this);
        },
        tapend: function () {
            if(this.inactive)
                return;

            xm.ripple.reset(this);

            this.active = !this.active;
            xtag.fireEvent(this, "MaterialButtonSelected");
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
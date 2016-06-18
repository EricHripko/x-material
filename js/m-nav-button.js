xtag.register("m-nav-button", {
    mixins: ["m-element"],
    content: "<m-icon></m-icon>\
              <m-text-view text-style='body1'></m-text-view>",
    lifecycle: {
        created: function () {
            // Identify subcomponents
            this.iconView = this.querySelector("m-icon");
            this.textView = this.querySelector("m-text-view");
            // Make selectable
            this.pressedColor = "#E0E0E0";
            this.selectable = true;
            this.tabIndex = 0;

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
        colored: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._colored;
            },
            set: function (value) {
                this._colored = value;
                this.render();
            }
        },
        icon: {
            attribute: {},
            get: function () {
                return this.iconView.src;
            },
            set: function (value) {
                this.iconView.src = value;
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
        }
    },
    methods: {
        render: function () {
            // Default to current theme
            var background = this.tint in colors ? colors[this.tint][400] : xm.current.card;
            // Identify the pressed colours
            var pressedTint = this.getAttribute("selected-tint") || this.tint;
            var pressed = this.tint in colors ? colors[pressedTint][600] : xm.current.flatPressed;
            this.pressedColor = pressed;
            // Setup styles
            if(this.colored) {
                // Colour background: secondary by default, primary when selected
                var style = this.theme in colors ? this.theme : xm.current.toolbar;
                style = style == "dark" ? "light" : "dark";

                if(this.active) {
                    this.style.backgroundColor = background;
                    this.style.color = colors[style][500];
                    this.iconView.tint = xm.current.appBarIcon;
                    this.iconView.inactive = false;
                }
                else {
                    this.style.backgroundColor = background;
                    this.style.color = colors[style][400];
                    this.iconView.tint = xm.current.appBarIcon;
                    this.iconView.inactive = true;
                }
            }
            else {
                // White background: normal by default, coloured when selected
                if(this.active) {
                    this.style.backgroundColor = xm.current.card;
                    this.style.color = background;
                    this.iconView.tint = this.tint;
                }
                else {
                    this.style.backgroundColor = xm.current.card;
                    this.style.color = xm.current.textSecondary;
                    this.iconView.tint = undefined;
                }
            }
        },
        activate: function () {
            this.classList.toggle("active");
        }
    },
    events: {
        tapstart: function (e) {
            if(!this.selectable)
                return;

            // Animate ripple
            xm.ripple.make(e, this);
        },
        tapend: function () {
            if(!this.selectable)
                return;

            xm.ripple.reset(this);

            // Activate the button
            this.active = !this.active;
            xtag.fireEvent(this, "MaterialButtonSelected");
        },
        focus: function () {
            if(!this.selectable)
                return;

            xm.focus.make(this);
        },
        blur: function () {
            if(!this.selectable)
                return;

            xm.focus.reset(this);
        },
        leave: function () {
            if(!this.selectable)
                return;

            xm.ripple.reset(this);
        },
        keydown: function (e) {
            if(!this.selectable)
                return;

            if (xm.input.isActionKey(e.keyCode) && !this.focused) {
                xtag.fireEvent(this, "tapstart");
                this.focused = true;
            }
        },
        keyup: function (e) {
            if(!this.selectable)
                return;

            if (xm.input.isActionKey(e.keyCode)) {
                xtag.fireEvent(this, "tapend");
                this.focused = false;
            }
        }
    }
});
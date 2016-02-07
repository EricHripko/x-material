xtag.register("m-icon", {
    mixins: ["m-element"],
    content: "<i class='material-icons'></i>",
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.icon = this.querySelector("i");
            this.render();
        }
    },
    accessors: {
        src: {
            attribute: {},
            get: function () {
                return this.icon.textContent;
            },
            set: function (value) {
                this.icon.textContent = value;
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
        selectable: {
            attribute: {
                boolean: true
            },
            get: function() {
                return this._selectable;
            },
            set: function(value) {
                this._selectable = value;
                this.tabIndex = value ? 0 : -1;
            }
        }
    },
    methods: {
        /*
         * Set the pressed colour for the icon based on selected settings.
         */
        setPressedColor : function () {
            var color, alpha;
            if(this.tint == "dark" || this.icon.style.color.indexOf("rgba(0") != -1) {
                color = [0, 0, 0];
                alpha = .12;
            }
            else if(this.tint == "light" || this.icon.style.color == "white") {
                color = [255, 255, 255];
                alpha = .30;
            }
            else if(this.tint in colors) {
                color = xm.palette.hex2rgb(colors[this.tint][500]);
                alpha = .26;
            }

            this.pressedColor = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + alpha + ")";
        },
        render: function () {
            if(this.inactive) {
                this.icon.style.color = xm.current.iconInactive;
                return;
            }

            if(this.tint in colors) {
                this.icon.style.color = colors[this.tint][500];
                this.setPressedColor();
                return;
            }

            this.icon.style.color = xm.current.iconActive;
            this.setPressedColor();
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
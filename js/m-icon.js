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
        render: function () {
            var tint = this.tint;
            if(tint === "dark" || tint === "light")
                tint += "-icon";

            if(this.inactive) {
                this.icon.style.color = tint in colors ? colors[tint][400] : xm.current.iconInactive;
                return;
            }

            if(this.tint in colors) {
                this.icon.style.color = colors[tint][500];
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
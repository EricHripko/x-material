xtag.register("m-button", {
    mixins: ["m-element"],
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.text = document.createElement("m-text-view");
            this.text.textContent = this.textContent;
            this.text.setAttribute("text-style", "button");
            // Insert it
            this.textContent = "";
            this.appendChild(this.text);
            // Setup default properties
            this.defaultElevation = 2;
            this.pressedColor = "#E0E0E0";
            this.render();
            // Make focusable
            this.tabIndex = 0;
            xm.focus.create(this);
        }
    },
    accessors: {
        flat: {
            attribute: {
                boolean: true
            },
            get: function() {
                return this._flat;
            },
            set: function(value) {
                this._flat = value;
                this.defaultElevation = value ? 0 : 2;
                this.render();
            }
        },
        disabled: {
            attribute: {
                boolean: true
            },
            get: function() {
                return this._disabled;
            },
            set: function(value) {
                this._disabled = value;

                // Make button non-focusable and adjust the appearance
                this.tabIndex = value ? -1 : 0;
                this.render();
            }
        },
        displayText: {
            get: function() {
                return this.text.textContent;
            },
            set: function(value) {
                this.text.textContent = value;
            }
        }
    },
    methods: {
        resetElevation: function() {
            // Disable events
            if(this.disabled)
                return;

            this.elevation = this.defaultElevation;
            xm.ripple.reset(this);
        },
        render: function() {
            if(this.disabled) {
                if(this.flat) {
                    this.style.backgroundColor = "transparent";
                    this.text.style.color = xm.current.disabledFlatFore;
                }
                else {
                    this.style.backgroundColor = xm.current.disabledElevatedBack;
                    this.text.style.color = xm.current.disabledElevatedFore;
                    this.elevation = 0;
                }
                return;
            }

            if(this.themeColor in colors) {
                if(this.flat) {
                    this.style.backgroundColor = "transparent";
                    this.text.style.color = colors[this.themeColor][500];
                    this.pressedColor = colors[this.themeColor][600];
                }
                else {
                    this.style.backgroundColor = colors[this.themeColor][500];
                    this.text.style.color = xm.current.appBarFore;
                    this.pressedColor = colors[this.themeColor][600];
                }
                this.elevation = this.defaultElevation;
                return;
            }

            if(this.flat) {
                this.style.backgroundColor = "transparent";
                this.text.style.color = xm.current.text;
                this.pressedColor = xm.current.flatPressed;
            }
            else {
                this.style.backgroundColor = xm.current.elevatedBack;
                this.text.style.color = xm.current.style == "light" ? xm.current.text : xm.current.appBarFore;
                this.pressedColor = xm.current.elevatedPressed;
                this.elevation = this.defaultElevation;
            }
            this.elevation = this.defaultElevation;
        }
    },
    events: {
        tapstart: function(e) {
            // Disable events
            if(this.disabled)
                return;

            // Animate ripple
            xm.ripple.make(e, this);

            if(!this.flat)
                this.elevation = 8;
        },
        tapend: function() {
            this.resetElevation();
        },
        focus: function() {
            // Disable events
            if(this.disabled)
                return;

            xm.focus.make(this);
        },
        blur: function() {
            xm.focus.reset(this);
        },
        leave: function() {
            this.resetElevation();
        },
        keyup: function(e) {
            if(xm.input.isActionKey(e.keyCode)) {
                xtag.fireEvent(this, "tapstart");
                xtag.fireEvent(this, "tapend");
            }
        }
    }
});

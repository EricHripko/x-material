xtag.register("m-button", {
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.text = document.createElement("m-text-view");
            this.text.innerText = this.innerText;
            this.text.setAttribute("text-style", "button");
            // Insert it
            this.innerText = "";
            this.appendChild(this.text);
            // Setup default properties
            this.defaultElevation = 2;
            this.pressedColor = "#E0E0E0";
            this.render();
        }
    },
    accessors: {
        elevation: {
            attribute: {},
            get: function() {
                return this._elevation;
            },
            set: function(value) {
                this._elevation = value;
            }
        },
        flat: {
            attribute: {},
            get: function() {
                return this._flat;
            },
            set: function(value) {
                this._flat = value;
                this.defaultElevation = hasValue(value) ? 0 : 2;
                this.render();
            }
        },
        primary: {
            attribute: {},
            get: function() {
                return this._primary;
            },
            set: function(value) {
                this._primary = value;
                this.themeColor = hasValue(value) ? theme.color : undefined;
                this.render();
            }
        },
        disabled: {
            attribute: {},
            get: function() {
                return this._disabled;
            },
            set: function(value) {
                this._disabled = value;
                this.render();
            }
        },
        displayText: {
            get: function() {
                return this.text.innerText;
            },
            set: function(value) {
                this.text.innerText = value;
            }
        },
        themeColor: {
            attribute: {},
            get: function() {
                return this._themeColor;
            },
            set: function(value) {
                this._themeColor = value;
                this.render();
            }
        }
    },
    methods: {
        resetElevation: function() {
            // Disable events
            if(hasValue(this.disabled))
                return;

            this.elevation = this.defaultElevation;
            resetRipple(this);
        },
        render: function() {
            if(hasValue(this.disabled)) {
                if(hasValue(this.flat)) {
                    this.style.backgroundColor = "transparent";
                    this.text.style.color = theme.disabledFlatFore;
                }
                else {
                    this.style.backgroundColor = theme.disabledElevatedBack;
                    this.text.style.color = theme.disabledElevatedFore;
                    this.elevation = 0;
                }
                return;
            }

            if(hasValue(this.themeColor)) {
                if(hasValue(this.flat)) {
                    this.style.backgroundColor = "transparent";
                    this.text.style.color = colors[this.themeColor][700];
                    this.pressedColor = colors[this.themeColor][700];
                }
                else {
                    this.style.backgroundColor = colors[this.themeColor][500];
                    this.text.style.color = "white";
                    this.pressedColor = colors[this.themeColor][700];
                }
                this.elevation = this.defaultElevation;
                return;
            }

            if(hasValue(this.flat)) {
                this.style.backgroundColor = "transparent";
                this.text.style.color = theme.text;
                this.pressedColor = theme.flatPressed;
            }
            else {
                this.style.backgroundColor = theme.elevatedBack;
                this.text.style.color = theme.text;
                this.pressedColor = theme.elevatedPressed;
                this.elevation = this.defaultElevation;
            }
            this.elevation = this.defaultElevation;
        }
    },
    events: {
        tapstart: function() {
            // Disable events
            if(hasValue(this.disabled))
                return;

            // Animate ripple
            makeRipple(this);

            if(!hasValue(this.flat))
                this.elevation = 8;
        },
        tapend: function() {
            this.resetElevation();
        },
        leave: function() {
            this.resetElevation();
        }
    }
});

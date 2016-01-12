xtag.register("m-toolbar", {
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.textView = document.createElement("m-text-view");
            this.textView.textStyle = "title";
            // Insert it
            this.appendChild(this.textView);
            // Setup styles
            this.setAttribute("elevation", 4);
            this.render();
        }
    },
    accessors: {
        themeColor: {
            attribute: {},
            get: function() {
                return this._themeColor;
            },
            set: function(value) {
                this._themeColor = value;
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
                this.themeColor = theme.color;
                this.render();
            }
        },
        text: {
            attribute: {},
            get: function() {
                return this.textView.innerText;
            },
            set: function(value) {
                this.textView.innerText = value;
            }
        },
        navIcon: {
            attribute: {},
            get: function() {
                if(this.icon != undefined)
                    return this.icon.src;

                return undefined;
            },
            set: function(value) {
                // Add an icon
                if(hasValue(value)) {
                    this.icon = document.createElement("m-icon");
                    this.icon.classList.add("nav");
                    this.icon.src = value;
                    this.icon.themeColor = theme.appBarIcon;

                    // Setup events
                    var themeColor = this.themeColor;
                    xtag.addEvents(this.icon, {
                        tapstart: function () {
                            // Animate ripple
                            this.pressedColor = colors[themeColor][400];
                            makeRipple(this);
                        },
                        tapend: function() {
                            resetRipple(this);
                        },
                        leave: function() {
                            resetRipple(this);
                        }
                    });
                    this.insertBefore(this.icon, this.textView);
                    return;
                }

                // Remove the icon
                if(this.icon != undefined) {
                    this.removeElement(this.icon);
                    this.icon = undefined;
                }
            }
        }
    },
    methods: {
        render: function() {
            this.style.background = hasValue(this.primary) ? colors[this.themeColor][500] : theme.appBarBack;
            this.textView.style.color = theme.appBarFore;
        }
    }
});

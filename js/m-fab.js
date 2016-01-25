xtag.register("m-fab", {
    mixins: ["m-element"],
    lifecycle: {
        created: function() {
            // Elevate the control
            this.elevation = this.defaultElevation = 6;
            // Make selectable
            this.tabIndex = 0;
            // Render the control
            this.render();
        }
    },
    accessors: {
        toggle: {
            attribute: {},
            get: function () {
                return this._toggle;
            },
            set: function (value) {
                this._toggle = value;
            }
        },
        src: {
            attribute: {},
            get: function () {
                return this._src;
            },
            set: function (value) {
                this._src = value;
                // Add or update an icon
                if(value) {
                    // Display the icon
                    if(!this.iconView) {
                        this.iconView = document.createElement("m-icon");
                        this.appendChild(this.iconView);
                    }

                    // Set icon source, animate and render
                    this.iconView.src = value;
                    this.render();
                    this.spinIcon();
                }
            }
        }
    },
    methods: {
        render: function () {
            if(this.themeColor in colors) {
                this.style.backgroundColor = colors[this.themeColor][500];
                if(this.iconView)
                    this.iconView.themeColor = xm.current.appBarIcon;
                this.pressedColor = colors[this.themeColor][600];
                return;
            }

            this.style.backgroundColor = xm.current.elevatedBack;
            if(this.iconView)
                this.iconView.themeColor = "dark";
            this.pressedColor = xm.current.elevatedPressed;
        },
        resetAnimation: function () {
            // Reset ripple and return to lower the element
            xm.ripple.reset(this);
            this.elevation = this.defaultElevation;
        },
        spinIcon: function () {
            // Spin the icon
            this.classList.remove("spin");
            // Need delay for animation to play
            var component = this;
            setTimeout(function () { component.classList.add("spin"); }, 10);
        }
    },
    events: {
        tapstart: function (e) {
            // Animate ripple
            xm.ripple.make(e, this);
            this.elevation = 12;
        },
        tapend: function () {
            this.resetAnimation();

            if(this.toggle) {
                // Swap icons if button is toggleable
                var old = this.src;
                this.src = this.toggle;
                this.toggle = old;
                // Display ink wash
                xm.wash.toggle();
                // Bring button above the wash layer
                this.classList.toggle("active");
            }
        },
        leave: function () {
            this.resetAnimation();
        },
        focus: function() {
            xm.focus.make(this);
        },
        blur: function(e) {
            xm.focus.reset(this);
        },
        keydown: function(e) {
            if(xm.input.isActionKey(e.keyCode) && !this.focused) {
                xtag.fireEvent(this, "tapstart");
                this.focused = true;
            }
        },
        keyup: function(e) {
            if(xm.input.isActionKey(e.keyCode)) {
                xtag.fireEvent(this, "tapend");
                this.focused = false;
            }
        }
    }
});
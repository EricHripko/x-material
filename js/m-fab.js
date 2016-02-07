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
            if(this.tint in colors) {
                this.style.backgroundColor = colors[this.tint][500];
                if(this.iconView)
                    this.iconView.tint = xm.current.appBarIcon;
                this.pressedColor = colors[this.tint][600];
                return;
            }

            this.style.backgroundColor = xm.current.elevatedBack;
            if(this.iconView)
                this.iconView.tint = "dark";
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
        },
        flingActions: function () {
            // Size of the mini-FAB
            var fabSize = 40;
            // Gap between actions
            var gap = 16;
            // Delay between actions appearing
            var delay = 100;

            // Fling actions out
            var action, i;
            if(this._actions == undefined) {
                // Find all associated actions
                this._actions = this.querySelectorAll("m-fab");
                if (this._actions.length == 0) {
                    this._actions = undefined;
                    return;
                }

                // Get the bounds of the current button
                var bounds = this.getBoundingClientRect();

                // Fling them out
                for (i = 0; i < this._actions.length; i++) {
                    action = this._actions[i];

                    // Setup the action position
                    action.style.position = "absolute";
                    action.style.top = (bounds.bottom + gap * (i + 1) + fabSize * i) + "px";
                    action.style.left = (bounds.left + (bounds.width - fabSize) / 2) + "px";
                    // Display above ink wash layer and ensure that mini-FAB is displayed
                    action.classList.add("active");
                    action.classList.add("mini");
                    action.classList.add("hidden");
                    // Add the button
                    document.body.appendChild(action);

                    // Animate it
                    (function (context) {
                        setTimeout(function () {
                            context.classList.remove("hidden");
                        }, i * delay);
                    })(action);
                }

                return;
            }

            // Hide the actions
            for (i = 0; i < this._actions.length; i++) {
                action = this._actions[i];

                // Fold back to parent FAB, hide underneath the ink wash
                action.classList.remove("active");
                this.appendChild(action);
            }
            this._actions = undefined;
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

            // Change icon and display screen ink wash
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

            // Display FAB actions
            this.flingActions();
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
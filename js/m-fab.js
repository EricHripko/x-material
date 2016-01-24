xtag.register("m-fab", {
    mixins: ["m-element"],
    lifecycle: {
        created: function() {
            this.elevation = this.defaultElevation = 6;
            this.tabIndex = 0;
            this.render();
        }
    },
    accessors: {
        src: {
            attribute: {},
            get: function () {
                return this.iconView.src;
            },
            set: function (value) {
                // Add an icon
                if(value) {
                    this.iconView = document.createElement("m-icon");
                    this.iconView.classList.add("nav");
                    this.iconView.src = value;

                    this.appendChild(this.iconView);
                    this.render();
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
            xm.ripple.reset(this);
            this.elevation = this.defaultElevation;
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
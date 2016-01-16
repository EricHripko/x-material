// Define the components
xtag.register("m-text-view", {
    accessors: {
        textStyle: {
            attribute: {},
            get: function () {
                return this._textStyle;
            },
            set: function (value) {
                this._textStyle = value;
            }
        },
        textColor: {
            attribute: {},
            get: function () {
                return this._textStyle;
            },
            set: function (value) {
                this._textStyle = value;
                switch(value) {
                    default:
                        this.style.color = xm.current.text;
                        break;
                    case "secondary":
                        this.style.color = xm.current.textSecondary;
                        break;
                    case "disabled":
                        this.style.color = xm.current.disabled;
                        break;
                }
            }
        }
    }
});
xtag.register("m-ink", {});
xtag.register("m-divider", {
    lifecycle: {
        created: function () {
            // Setup styles
            this.style.borderBottom = "solid 1px " + xm.current.divider;
        }
    }
});
xtag.register("m-card", {
    lifecycle: {
        created: function () {
            // Setup styles
            this.style.backgroundColor = xm.current.card;
        }
    }
});
xtag.register("m-image-view", {
    lifecycle: {
        created: function () {
            this.style.backgroundColor = "#757575";
        }
    },
    accessors: {
        src: {
            attribute: {},
            get: function () {
                return this._src;
            },
            set: function (value) {
                this._src = value;
                this.style.background = "url('" + value + "')";
            }
        },
        themeColor: {
            attribute: {},
            get: function() {
                return this._themeColor;
            },
            set: function(value) {
                this._themeColor = value;
                this.style.backgroundColor = colors[this.themeColor][300];
            }
        }
    }
});

xtag.register("m-icon", {
    mixins: ["m-element"],
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.icon = document.createElement("i");
            this.icon.textContent = this.textContent;
            this.icon.classList.add("material-icons");
            // Insert it
            this.textContent = "";
            this.appendChild(this.icon);
            // Setup styles
            this.icon.style.color = xm.current.iconActive;
        }
    },
    accessors: {
        src: {
            attribute: {},
            get: function() {
                return this.icon.textContent;
            },
            set: function(value) {
                this.icon.textContent = value;
            }
        }
    },
    methods: {
        render: function() {
            if(hasValue(this.themeColor)) {
                this.icon.style.color = colors[this.themeColor][500];
                return;
            }

            this.icon.style.color = xm.current.iconActive;
        }
    }
});
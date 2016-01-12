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
        }
    }
});
xtag.register("m-ink", {});
xtag.register("m-divider", {
    lifecycle: {
        created: function () {
            // Setup styles
            this.style.borderBottom = "solid 1px " + theme.divider;
        }
    }
});
xtag.register("m-card", {
    lifecycle: {
        created: function () {
            // Setup styles
            this.style.backgroundColor = theme.card;
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
        },
    }
});

xtag.register("m-icon", {
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.icon = document.createElement("i");
            this.icon.innerText = this.innerText;
            this.icon.classList.add("material-icons");
            // Insert it
            this.innerText = "";
            this.appendChild(this.icon);
            // Setup styles
            this.icon.style.color = theme.iconActive;
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
                this.icon.style.color = colors[this.themeColor][500];
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
            }
        },
        src: {
            attribute: {},
            get: function() {
                return this.icon.innerText;
            },
            set: function(value) {
                this.icon.innerText = value;
            }
        }
    }
});
xtag.register("m-avatar", {
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
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
xtag.register("m-avatar", {
    mixins: ["m-element"],
    lifecycle: {
        created: function () {
            this.render();
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
        }
    },
    methods: {
        render: function () {
            this.style.backgroundColor = this.tint in colors ? colors[this.tint][400] : "#757575";
        }
    }
});
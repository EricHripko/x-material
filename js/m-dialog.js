xtag.register("m-dialog", {
    mixins: ["m-element"],
    content: "<m-text-view class='title' text-style='title' text-color='primary'></m-text-view>",
    lifecycle: {
        created: function () {
            this.titleView = this.querySelector("m-text-view.title");
            // Setup the default appearance
            this.elevation = 24;
            this.classList.add("no-title");
        }
    },
    accessors: {
        title: {
            attribute: {},
            get: function() {
                return this.titleView.textContent;
            },
            set: function(value) {
                this.titleView.textContent = value;

                // Accommodate title if it's not empty
                if(value)
                    this.classList.remove("no-title");
                else
                    this.classList.add("no-title");
            }
        }
    },
    methods: {
        render: function () {
            // Default to current theme
            var background = this.tint in colors ? colors[this.tint][400] : xm.current.card;
            var style = this.theme in colors ? this.theme : xm.current.style;
            // Setup styles
            this.style.backgroundColor = background;
            this.style.color = colors[style][500];
        }
    }
});
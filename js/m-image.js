xtag.register("m-image", {
    mixins: ["m-element"],
    content: "<div class='image'></div>",
    lifecycle: {
        created: function () {
            this.imageView = this.querySelector("div.image");
            this.loader = new Image();
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

                // Loader for the image
                var component = this;
                this.loader.addEventListener("load", function () {
                    component.imageView.style.backgroundImage = "url('" + value + "')";
                    component.imageView.classList.add("show");
                });
                this.loader.src = value;
            }
        }
    },
    methods: {
        render: function () {
            this.style.backgroundColor = colors[this.themeColor in colors ? this.themeColor : "grey"][400];
        }
    }
});
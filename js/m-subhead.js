xtag.register("m-subhead", {
    mixins: ["m-element"],
    content: "<m-text-view text-style='body2' text-color='secondary'></m-text-view>",
    lifecycle: {
        created: function() {
            this.textView = this.querySelector("m-text-view");
        }
    },
    accessors: {
        text: {
            attribute: {},
            get: function() {
                return this.textView.textContent;
            },
            set: function(value) {
                this.textView.textContent = value;
            }
        }
    },
    methods: {
        render: function () {
            if(this.tint in colors) {
                this.textView.style.color = colors[this.tint][500];
                return;
            }

            this.textView.textColor = "secondary";
        }
    }
});
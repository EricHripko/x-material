xtag.register("m-subhead", {
    mixins: ["m-element"],
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.textView = document.createElement("m-text-view");
            this.textView.textStyle = "body2";
            // Insert it
            this.textContent = "";
            this.appendChild(this.textView);
            // Setup styles
            this.textView.textColor = "secondary";
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
            if(this.themeColor) {
                this.textView.style.color = colors[this.themeColor][500];
                return;
            }

            this.textView.textColor = "secondary";
        }
    }
});
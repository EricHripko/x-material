xtag.register("m-text-field", {
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.textView = document.createElement("input");
            this.textView.classList.add("subheading");
            this.labelView = document.createElement("m-text-view");
            this.labelView.textStyle = "subheading";
            this.labelView.classList.add("hint");
            this.labelView.style.color = theme.textSecondary;
            // Insert it
            this.innerText = "";
            this.appendChild(this.labelView);
            this.appendChild(this.textView);
            // Setup styles
            this.textView.style.color = theme.text;
            this.labelView.style.color = theme.textSecondary;

            this.collapsed = false;
        }
    },
    accessors: {
        text: {
            attribute: {},
            get: function () {
                return this.textView.value;
            },
            set: function (value) {
                this.textView.value = value;
            }
        },
        hint: {
            attribute: {},
            get: function () {
                return this.labelView.innerText;
            },
            set: function (value) {
                this.labelView.innerText = value;
            }
        },
        primary: {
            attribute: {},
            get: function () {
                return this._primary;
            },
            set: function (value) {
                this._primary = value;
                this.themeColor = theme.color;
                this.render();
            }
        },
        themeColor: {
            attribute: {},
            get: function () {
                return this._themeColor;
            },
            set: function (value) {
                this._themeColor = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            if (this.collapsed) {
                // Collapse the label
                this.labelView.textStyle = "caption";
                this.labelView.classList.add("collapsed");
                if(hasValue(this.themeColor))
                    this.labelView.style.color = colors[this.themeColor][500];

                // Display the input
                this.textView.classList.add("visible");
                return;
            }

            this.labelView.textStyle = "subheading";
            this.labelView.classList.remove("collapsed");
            this.labelView.style.removeProperty("color");
        }
    },
    events: {
        "focus": function () {
            this.collapsed = true;
            this.render();
        }
    }
});
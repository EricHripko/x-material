xtag.register("m-text-field", {
    mixins: ["m-element"],
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.textView = document.createElement("input");
            this.textView.classList.add("subheading");
            this.labelView = document.createElement("m-text-view");
            this.labelView.textStyle = "subheading";
            this.labelView.classList.add("hint");
            this.defaultBorder = document.createElement("div");
            this.defaultBorder.classList.add("border-default");
            this.activeBorder = document.createElement("div");
            this.activeBorder.classList.add("border-active");
            // Insert it
            this.textContent = "";
            this.appendChild(this.labelView);
            this.appendChild(this.textView);
            this.appendChild(this.defaultBorder);
            this.appendChild(this.activeBorder);
            // Setup styles
            this.textView.style.color = xm.current.text;
            this.labelView.style.color = xm.current.textSecondary;
            this.defaultBorder.style.borderBottomColor = xm.current.divider;
            this.activeBorder.style.borderBottomColor = xm.current.divider;

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
                return this.labelView.textContent;
            },
            set: function (value) {
                this.labelView.textContent = value;
            }
        }
    },
    methods: {
        render: function () {
            this.activeBorder.style.borderBottomColor = hasValue(this.themeColor)
                ? colors[this.themeColor][500]
                : xm.current.divider;

            if (this.collapsed) {
                // Collapse the label
                this.labelView.textStyle = "caption";
                this.labelView.classList.add("collapsed");
                if(hasValue(this.themeColor))
                    this.labelView.style.color = colors[this.themeColor][500];

                // Display the outline
                this.activeBorder.classList.add("shown");

                // Display the input
                this.textView.classList.add("visible");
                return;
            }

            // Expand the label
            this.labelView.textStyle = "subheading";
            this.labelView.classList.remove("collapsed");
            this.labelView.style.color = xm.current.textSecondary;

            // Hide the outline
            this.activeBorder.classList.remove("shown");

            // Hide the input
            this.textView.classList.remove("visible");
        }
    },
    events: {
        "focus": function () {
            this.collapsed = true;
            this.render();
        },
        "blur": function () {
            this.collapsed = this.text != "";
            this.render();
        }
    }
});
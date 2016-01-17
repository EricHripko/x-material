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
            this.labelView.style.color = xm.current.textHint;
            this.defaultBorder.style.borderBottomColor = xm.current.divider;
            this.activeBorder.style.borderBottomColor = xm.current.divider;
            // Set the initial state
            this.collapsed = false;
            this.primary = "";

            this.textView.addEventListener("input", function () {
                if(!hasValue(this.parentNode.floating))
                    this.parentNode.labelView.style.visibility = "hidden";
            });
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
        },
        disabled: {
            attribute: {},
            get: function() {
                return this._disabled;
            },
            set: function(value) {
                this._disabled = value;
                this.render();
            }
        },
        floating: {
            attribute: {},
            get: function() {
                return this._floating;
            },
            set: function(value) {
                this._floating = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            if(hasValue(this.floating)) {
                this.renderFloating();
                return;
            }

            this.renderSingle();
        },
        renderSingle: function () {
            // Set disabled border style if necessary
            this.defaultBorder.style.borderBottomStyle = hasValue(this.disabled) ? "dashed" : "solid";
            if(hasValue(this.disabled)) {
                this.labelView.style.color = xm.current.textHint;
                return;
            }

            // Animate bottom border
            this.activeBorder.style.borderBottomColor = hasValue(this.themeColor)
                ? colors[this.themeColor][500]
                : xm.current.divider;

            if (this.collapsed) {
                // Display the outline
                this.activeBorder.classList.add("shown");

                // Display the input
                this.textView.classList.add("visible");
                this.textView.style.color = xm.current.text;
                return;
            }

            // Recover label
            if(!this.text) {
                this.labelView.style.removeProperty("visibility");
            }
            // Remove the label and text highlight
            this.textView.style.color = xm.current.textSecondary;

            // Hide the outline
            this.activeBorder.classList.remove("shown");
        },
        renderFloating: function () {
            // Set disabled border style if necessary
            this.defaultBorder.style.borderBottomStyle = hasValue(this.disabled) ? "dashed" : "solid";
            if(hasValue(this.disabled)) {
                this.labelView.style.color = xm.current.textHint;
                return;
            }

            // Animate bottom border
            this.activeBorder.style.borderBottomColor = hasValue(this.themeColor)
                ? colors[this.themeColor][500]
                : xm.current.divider;

            // Switch to active state
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
                this.textView.style.color = xm.current.text;
                return;
            }

            // Expand the label if no input was given
            if(!this.text) {
                this.labelView.textStyle = "subheading";
                this.labelView.classList.remove("collapsed");

                // Hide the input
                this.textView.classList.remove("visible");
            }

            // Remove the label and text highlight
            this.labelView.style.color = xm.current.textHint;
            this.textView.style.color = xm.current.textSecondary;

            // Hide the outline
            this.activeBorder.classList.remove("shown");
        }
    },
    events: {
        "focus": function () {
            this.collapsed = true;
            this.render();
        },
        "blur": function () {
            this.collapsed = false;
            this.render();
        }
    }
});
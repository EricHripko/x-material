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

            this.textView.addEventListener("input", function () {
                if(!this.parentNode.floating)
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
            attribute: {
                boolean: true
            },
            get: function() {
                return this._disabled;
            },
            set: function(value) {
                this._disabled = value;
                this.render();
            }
        },
        floating: {
            attribute: {
                boolean: true
            },
            get: function() {
                return this._floating;
            },
            set: function(value) {
                this._floating = value;
                this.render();
            }
        },
        type: {
            attribute: {},
            get: function() {
                return this.textView.type;
            },
            set: function(value) {
                this.textView.type = value;
            }
        },
        inputIcon: {
            attribute: {},
            get: function() {
                if(this.icon != undefined)
                    return this.icon.src;

                return undefined;
            },
            set: function(value) {
                // Add an icon
                if(value) {
                    this.icon = document.createElement("m-icon");
                    this.icon.src = value;
                    this.icon.inactive = this.disabled;
                    this.classList.add("with-icon");

                    this.insertBefore(this.icon, this.textView);
                    return;
                }

                // Remove the icon
                if(this.icon != undefined) {
                    this.removeElement(this.icon);
                    this.icon = undefined;
                    this.classList.remove("with-icon");
                }
            }
        }
    },
    methods: {
        render: function () {
            if(this.floating) {
                this.renderFloating();
                return;
            }

            this.renderSingle();
        },
        renderSingle: function () {
            // Set disabled border style and icon if necessary
            if(this.icon)
                this.icon.inactive = this.disabled;
            if(this.disabled) {
                this.labelView.style.color = xm.current.textHint;
                return;
            }

            if (this.collapsed) {
                // Lazy initialise the theme
                if(!this.themeColor)
                    this.themeColor = xm.current.color;

                // Display the outline
                this.activeBorder.style.borderBottomColor = this.themeColor
                    ? colors[this.themeColor][500]
                    : xm.current.divider;
                this.activeBorder.classList.add("shown");

                // Display the input
                this.textView.classList.add("visible");
                this.textView.style.color = xm.current.text;

                // Highlight the icon if there's one
                if(this.themeColor && this.icon)
                    this.icon.themeColor = this.themeColor;
                return;
            }

            // Recover label
            if(!this.text) {
                this.labelView.style.removeProperty("visibility");
            }
            // Remove the label and text/icon highlight
            this.textView.style.color = xm.current.textSecondary;
            if(this.icon)
                this.icon.themeColor = undefined;

            // Hide the outline
            this.activeBorder.classList.remove("shown");
        },
        renderFloating: function () {
            // Set disabled border style and icon if necessary
            this.defaultBorder.style.borderBottomStyle = this.disabled ? "dashed" : "solid";
            if(this.icon)
                this.icon.inactive = this.disabled;
            if(this.disabled) {
                this.labelView.style.color = xm.current.textHint;
                return;
            }

            // Switch to active state
            if (this.collapsed) {
                // Lazy initialise the theme
                if(!this.themeColor)
                    this.themeColor = xm.current.color;

                // Collapse the label
                this.labelView.textStyle = "caption";
                this.labelView.classList.add("collapsed");
                if(this.themeColor)
                    this.labelView.style.color = colors[this.themeColor][500];

                // Display the outline
                this.activeBorder.style.borderBottomColor = this.themeColor
                    ? colors[this.themeColor][500]
                    : xm.current.divider;
                this.activeBorder.classList.add("shown");

                // Display the input
                this.textView.classList.add("visible");
                this.textView.style.color = xm.current.text;

                // Highlight the icon if there's one
                if(this.themeColor && this.icon)
                    this.icon.themeColor = this.themeColor;
                return;
            }

            // Expand the label if no input was given
            if(!this.text) {
                this.labelView.textStyle = "subheading";
                this.labelView.classList.remove("collapsed");

                // Hide the input
                this.textView.classList.remove("visible");
            }

            // Remove the label and text/icon highlight
            this.labelView.style.color = xm.current.textHint;
            this.textView.style.color = xm.current.textSecondary;
            if(this.icon)
                this.icon.themeColor = undefined;

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
        },
        "tapend": function () {
            // Focus on input when label or icon was clicked
            if(document.activeElement != this.textView) {
                this.textView.focus();
            }
        }
    }
});
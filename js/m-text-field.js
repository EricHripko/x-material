xtag.register("m-text-field", {
    mixins: ["m-element"],
    content:
        "<input class='subheading'>\
        <m-text-view text-style='subheading' class='hint'></m-text-view>\
        <div class='border-default'></div>\
        <div class='border-active'></div>\
        <m-text-view text-style='caption' text-color='disabled' class='counter'></m-text-view>\
        <m-text-view text-style='caption' text-color='disabled' class='message'></m-text-view>",
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.textView = this.querySelector("input");
            this.labelView = this.querySelector("m-text-view.hint");
            this.defaultBorder = this.querySelector("div.border-default");
            this.activeBorder = this.querySelector("div.border-active");
            this.counter = this.querySelector("m-text-view.counter");
            this.message = this.querySelector("m-text-view.message");
            // Setup styles
            this.textView.style.color = xm.current.text;
            this.labelView.style.color = xm.current.textHint;
            this.defaultBorder.style.borderBottomColor = xm.current.divider;
            this.activeBorder.style.borderBottomColor = xm.current.divider;
            // Set the initial state
            this.collapsed = false;
        }
    },
    accessors: {
        value: {
            attribute: {},
            get: function () {
                return this.textView.value;
            },
            set: function (value) {
                this.textView.value = value;
                this.render();
            }
        },
        hint: {
            attribute: {},
            get: function () {
                return this.labelView.textContent;
            },
            set: function (value) {
                if(value[value.length - 1] == "*")
                    this.labelView.innerHTML = value.substring(0, value.length - 1) + "<sup class=\"asterisk\">*</sup>";
                else
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

                // Disable the input and adjust the appearance
                if(value)
                    this.textView.setAttribute("disabled", "disabled");
                else
                    this.textView.removeAttribute("disabled");
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
        },
        maxLength: {
            attribute: {},
            get: function () {
                return this._maxLength;
            },
            set: function(value) {
                this._maxLength = value;

                // Set the initial message
                if (this.maxLength > 0)
                    this.counter.innerText = this.textView.value.length + " / " + this.maxLength;
            }
        },
        validationMessage: {
            attribute: {},
            get: function () {
                return this.message.textContent;
            },
            set: function(value) {
                this.message.textContent = value;
            }
        },
        validationRule: {
            attribute: {},
            get: function () {
                return this._rule ? this._rule.toString() : undefined;
            },
            set: function(value) {
                if(value)
                    this._rule = new RegExp(value);
            }
        },
        invalid: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._invalid;
            },
            set: function (value) {
                // Re-render only if value actually changed
                if(this._invalid != value) {
                    this._invalid = value;
                    this.render();
                }
            }
        }
    },
    methods: {
        revealInput: function () {
            // Collapse the label if floating
            if(this.floating) {
                this.labelView.textStyle = "caption";
                this.labelView.classList.add("collapsed");
                this.labelView.style.color = colors[this.themeColor][500];
            }
            // Hide the label if not floating
            else {
                this.labelView.classList.add("hidden");
            }

            // Display the input
            this.textView.classList.add("visible");
            this.textView.style.color = xm.current.text;
        },
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

            // Choose red theme colour if input is in invalid state
            var themeColor = !this.invalid ? this.themeColor : "red";

            // Highlight message and counter in invalid state
            if(this.invalid) {
                this.counter.style.color = colors[themeColor][500];
                this.message.style.color = colors[themeColor][500];
                this.message.classList.add("visible");
            }
            else {
                this.counter.textColor = "disabled";
                this.message.classList.remove("visible");
            }

            // Lazy initialise the theme
            if(!(this.themeColor in colors))
                themeColor = this.themeColor = xm.current.color;

            // Switch to active state
            if (this.collapsed || this.invalid) {

                // Display the outline
                this.activeBorder.style.borderBottomColor = themeColor in colors
                    ? colors[themeColor][500]
                    : xm.current.divider;
                this.activeBorder.classList.add("shown");

                // Display the input
                this.textView.classList.add("visible");
                this.textView.style.color = xm.current.text;

                // Highlight the icon if there's one
                if(themeColor in colors && this.icon)
                    this.icon.themeColor = themeColor;
                return;
            }
            if(this.value)
                this.revealInput();

            // Recover label
            if(!this.value) {
                this.labelView.classList.remove("hidden");
            }
            // Remove the label and text/icon highlight
            this.textView.style.color = xm.current.textSecondary;
            if(this.icon)
                this.icon.themeColor = undefined;

            // Hide the outline
            this.activeBorder.classList.remove("shown");
        },
        renderFloating: function () {
            // Choose red theme colour if input is in invalid state
            var themeColor = !this.invalid ? this.themeColor : "red";

            // Set disabled border style and icon if necessary
            this.defaultBorder.style.borderBottomStyle = this.disabled ? "dashed" : "solid";
            if(this.icon)
                this.icon.inactive = this.disabled;
            if(this.disabled) {
                this.labelView.style.color = xm.current.textHint;
                return;
            }

            // Highlight message and counter in invalid state
            if(this.invalid) {
                this.counter.style.color = colors[themeColor][500];
                this.message.style.color = colors[themeColor][500];
                this.message.classList.add("visible");
            }
            else {
                this.counter.textColor = "disabled";
                this.message.classList.remove("visible");
            }

            // Lazy initialise the theme
            if(!(this.themeColor in colors))
                themeColor = this.themeColor = xm.current.color;

            // Switch to active state
            if (this.collapsed || this.invalid) {
                // Collapse label and reveal input
                this.revealInput();

                // Display the outline
                this.activeBorder.style.borderBottomColor = themeColor in colors
                    ? colors[themeColor][500]
                    : xm.current.divider;
                this.activeBorder.classList.add("shown");


                // Highlight the icon if there's one
                if(themeColor in colors && this.icon)
                    this.icon.themeColor = themeColor;
                return;
            }
            if(this.value)
                this.revealInput();

            // Expand the label if no input was given
            if(!this.value) {
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
            if (document.activeElement != this.textView) {
                this.textView.focus();
            }
        },
        'input:delegate(input.subheading)': function (e) {
            var component = e.currentTarget;
            // Hide hint when the user started entering the text
            if (!component.floating)
                component.labelView.classList.add("hidden");

            // Whether the input is valid
            var valid = true;

            // Update counter and verify length
            if (component.maxLength > 0) {
                var current = this.value.length;
                component.counter.innerText = current + " / " + component.maxLength;

                if (current > component.maxLength)
                    valid = false;
            }


            // Run the validation
            if (component._rule instanceof RegExp) {
                // Highlight the error
                if (!component._rule.test(this.value))
                    valid = false;
            }

            // Identify whether the input is valid
            component.invalid = !valid;
        }
    }
});
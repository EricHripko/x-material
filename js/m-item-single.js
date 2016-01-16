xtag.register("m-item-single", {
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.text = document.createElement("m-text-view");
            this.text.innerHTML = this.innerHTML;
            this.text.textStyle = "subheading";
            // Insert it
            this.innerHTML = "";
            this.appendChild(this.text);
            // Setup styles
            this.text.style.color = xm.current.text;
            this.pressedColor = xm.current.elevatedPressed;
        }
    },
    accessors: {
        displayText: {
            get: function() {
                return this.text.innerHTML;
            },
            set: function(value) {
                this.text.innerHTML = value;
            }
        }
    },
    methods: {
        resetAnimation: function () {
            xm.ripple.reset(this);
        }
    },
    events: {
        tapstart: function (e) {
            // Animate ripple
            xm.ripple.make(e, this);
        },
        tapend: function () {
            this.resetAnimation();
        },
        leave: function () {
            this.resetAnimation();
        }
    }
});
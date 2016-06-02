xm.snackbar = {};

/**
 * Queue of snackbars to be displayed.
 * @type {Array}
 */
xm.snackbar.queue = [];
/**
 * Currently displayed snackbar.
 * @type {Element}
 */
xm.snackbar.current = null;

/**
 * Display the snackbar.
 * @param element Snackbar element.
 */
xm.snackbar.show = function (element) {
    element.addEventListener("MaterialSnackbarHidden", xm.snackbar._showNext);

    if(xm.snackbar.current)
        // Another snackbar is already displayed
        xm.snackbar.queue.push(element);
    else {
        // Display the snackbar
        xm.snackbar.current = element;
        element.show();
    }
};

/**
 * Display the next snackbar when the current one is hidden.
 * @param event Event.
 * @private
 */
xm.snackbar._showNext = function (event) {
    event.target.removeEventListener("MaterialSnackbarHidden", xm.snackbar._showNext);

    // Display the next snackbar if there's something in the queue
    var element = xm.snackbar.queue.shift();
    if(element) {
        xm.snackbar.current = element;
        element.show();
    }
    else
        xm.snackbar.current = null;
};

xtag.register("m-snackbar", {
    mixins: ["m-element"],
    content: "<m-text-view text-style='body1'></m-text-view>\
              <m-button flat></m-button>",
    lifecycle: {
        created: function () {
            this.textView = this.querySelector("m-text-view");
            this.actionButton = this.querySelector("m-button");
            this.elevation = 6;
            // Make sure that specifying "primary" will create use an accent color
            this.alternative = true;
            this.render();
        }
    },
    accessors: {
        text: {
            attribute: {},
            get: function () {
                return this.textView.textContent;
            },
            set: function (value) {
                this.textView.textContent = value;
            }
        },
        action: {
            attribute: {},
            get: function () {
                return this.actionButton.text;
            },
            set: function (value) {
                this.actionButton.text = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            var style = this.theme in colors ? this.theme : xm.current.style;
            if(style == "light") {
                this.actionButton.setAttribute("tint", this.tint);
                this.style.background = "#323232";
            }
            else {
                this.actionButton.setAttribute("tint", undefined);
                this.style.background = colors[xm.current.accent][700];
            }

            // Show or hide button depending on whether the action was specified
            if(this.actionButton.text)
                this.classList.remove("collapsed");
            else
                this.classList.add("collapsed");
        },
        /**
         * Display the snack bar.
         */
        show: function () {
            this.classList.add("show");

            // Center
            var bounds = this.getBoundingClientRect();
            this.style.left = ((window.innerWidth - bounds.width) / 2) + "px";

            // Hide after timeout
            var snackbar = this;
            setTimeout(function () {
                snackbar.hide();
            }, 3000);
        },
        hide: function () {
            this.classList.remove("show");
            xtag.fireEvent(this, "MaterialSnackbarHidden");
        }
    }
});
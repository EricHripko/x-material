// Create namespaces
var xm = {};
xm.ripple = {};

// Set the background for the screen when ready
document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = xm.current.background;
    document.body.classList.add("fouc");
});

// Material colour palette
var colors = {
    red: {
        300: "#F44336"
    },
    pink: {
        300: "#F06292"
    },
    indigo: {
        500: "#3F51B5",
        700: "#303F9F"
    },
    "blue-grey": {
        400: "#78909C",
        500: "#607D8B",
        700: "#455A64"
    },
    "teal": {
        300: "#4DB6AC",
        400: "#26A69A",
        500: "#009688",
        700: "#00796B"
    },
    "blue": {
        500: "#2196F3",
        700: "#1976D2"
    },
    "light": {
        500: "white"
    },
    "dark": {
        500: "rgba(0, 0, 0, .87)"
    }
};

// Material theme
xm.Theme = function(color, style, toolbarStyle) {
    // Setup general styles
    switch (style) {
        default:
            this.disabledElevatedFore = "rgba(0, 0, 0, 0.26)";
            this.disabledElevatedBack = "rgba(0, 0, 0, 0.12)";
            this.disabledFlatFore = "rgba(153, 153, 153, 0.40)";
            this.flatPressed = "rgba(153, 153, 153, 0.40)";
            this.elevatedBack = "white";
            this.elevatedPressed = "rgb(224, 224, 224)";
            this.background = "#fafafa";
            this.text = "rgba(0, 0, 0, .87)";
            this.textSecondary = "rgba(0, 0, 0, 0.54)";
            this.iconActive = "rgba(0, 0, 0, 0.54)";
            this.iconInactive = "rgba(0, 0, 0, 0.26)";
            this.divider = "rgba(0, 0, 0, 0.12)";
            this.card = "white";
            break;
        case "dark":
            this.disabledElevatedFore = "rgba(255, 255, 255, 0.30)";
            this.disabledElevatedBack = "rgba(255, 255, 255, 0.12)";
            this.disabledFlatFore = "rgba(255, 255, 255, 0.30)";
            this.flatPressed = "rgba(204, 204, 204, 0.25)";
            this.elevatedBack = colors[color][500];
            this.elevatedPressed = colors[color][700];
            this.background = "#303030";
            this.text = "white";
            this.textSecondary = "rgba(255, 255, 255, 0.70)";
            this.iconActive = "white";
            this.iconInactive = "rgba(255, 255, 255, 0.30)";
            this.divider = "rgba(255, 255, 255, 0.12)";
            this.card = "#424242";
            break;
    }
    // Setup toolbar styles
    switch(toolbarStyle) {
        default:
            this.appBarBack = "#212121";
            this.appBarFore = "white";
            this.appBarIcon = "dark";
            break;
        case "light":
            this.appBarBack = "#f5f5f5";
            this.appBarFore = "rgba(0, 0, 0, .87)";
            this.appBarIcon = "dark";
            break;
        case "dark":
            this.appBarBack = "#212121";
            this.appBarFore = "white";
            this.appBarIcon = "light";
            break;
    }

    // Set theme primary and accent colours
    this.color = color;
};

// Get the user-configured with a fallback
xm.getTheme = function () {
    // Have a go at detecting the theme
    function metaValue(name) {
        var metas = document.getElementsByName(name);
        return metas.length > 0 ? metas[0].content : undefined;
    }

    // Set default options if nothing found
    var primary = metaValue("xm:primary") || "indigo";
    var style = metaValue("xm:style") || "light";
    var toolbar = metaValue("xm:toolbar") || "dark";

    return new xm.Theme(primary, style, toolbar);
};

// Setup the default current theme
xm.current = xm.getTheme();

// Reset the ripple in the element
xm.ripple.reset = function (element) {
    if(element.ink)
        element.ink.style.opacity = 0;
};
// Create the ripple in the element
xm.ripple.make = function (event, element) {
    // Initialise the animation
    if(element.ink)
        element.removeChild(element.ink);
    element.ink = document.createElement("m-ink");
    element.appendChild(element.ink);

    // Calculate the positions of the ripple
    var offset = element.getBoundingClientRect();
    element.ink.style.width = element.ink.style.height = Math.max(offset.width, offset.height) + "px";
    x = event.clientX - offset.left - element.ink.offsetWidth / 2;
    y = event.clientY - offset.top - element.ink.offsetHeight / 2;

    // Start the new animation
    element.ink.style.top = y + "px";
    element.ink.style.left = x + "px";
    element.ink.style.backgroundColor = element.pressedColor;
    element.ink.classList.add("animate");
};

function hasValue(value) {
    return value !== undefined;
}

// Mixin that provides the way to access
xtag.mixins["m-element"] = {
    accessors: {
        elevation: {
            attribute: {},
            get: function() {
                return this._elevation;
            },
            set: function(value) {
                this._elevation = value;
            }
        },
        primary: {
            attribute: {},
            get: function() {
                return this._primary;
            },
            set: function(value) {
                this._primary = value;
                this.themeColor = hasValue(value) ? xm.current.color : undefined;

                if(this.render instanceof Function)
                    this.render();
            }
        },
        themeColor: {
            attribute: {},
            get: function() {
                return this._themeColor;
            },
            set: function(value) {
                this._themeColor = value;

                if(this.render instanceof Function)
                    this.render();
            }
        }
    }
};

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
            if(hasValue(this.themeColor)) {
                this.textView.style.color = colors[this.themeColor][500];
                return;
            }

            this.textView.textColor = "secondary";
        }
    }
});


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


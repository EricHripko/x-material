// Create namespaces
var xm = {};
xm.ripple = {};
xm.focus = {};
xm.input = {};
xm.wash = {};
xm.morph = {};

// Set the background for the screen when ready
document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = xm.current.background;
    document.body.classList.add("fouc");
});
// Disable space bar scrolling
window.addEventListener("keydown", function (e) {
    if(e.keyCode == 32 && e.target.tagName.toLowerCase() != "input")
        e.preventDefault();
});

// Material colour palette
var colors = {
    "green": {
        400: "#66BB6A",
        500: "#4CAF50",
        600: "#43A047"
    },
    "red": {
        300: "#E57373",
        400: "#EF5350",
        500: "#F44336",
        600: "#E53935",
        700: "#D32F2F"
    },
    "pink": {
        300: "#F06292",
        400: "#EC407A",
        500: "#E91E63",
        600: "#D81B60",
        700: "#C2185B"
    },
    "pink-accent": {
        500: "#F50057",
        600: "#C51162",
        700: "#C51162"
    },
    "yellow": {
        300: "#FFF176",
        400: "#FFEE58",
        500: "#FFEB3B",
        600: "#FDD835",
        700: "#FBC02D"
    },
    "indigo": {
        500: "#3F51B5",
        700: "#303F9F"
    },
    "blue-grey": {
        400: "#78909C",
        500: "#607D8B",
        600: "#546E7A",
        700: "#455A64"
    },
    "teal": {
        300: "#4DB6AC",
        400: "#26A69A",
        500: "#009688",
        600: "#00897B",
        700: "#00796B"
    },
    "blue": {
        400: "#42A5F5",
        500: "#2196F3",
        600: "#1E88E5",
        700: "#1976D2"
    },
    "grey": {
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161"
    },
    "lime": {
        500: "#CDDC39",
        600: "#C0CA33",
        700: "#AFB42B"
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
            this.textHint = "rgba(0, 0, 0, 0.38)";
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
            this.textHint = "rgba(255, 255, 255, 0.30)";
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
    this.style = style;
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
// Reverse the ripple in the element
xm.ripple.reverse = function(element) {
    element.ink.classList.remove("animate");
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
    // Identify the event source
    var x,y;
    if(event.clientX && event.clientY) {
        x = event.clientX - offset.left - element.ink.offsetWidth / 2;
        y = event.clientY - offset.top - element.ink.offsetHeight / 2;
    }
    else {
        x = (offset.right - offset.left - element.ink.offsetWidth) / 2;
        y = (offset.bottom - offset.top - element.ink.offsetHeight) / 2;
    }


    // Start the new animation
    element.ink.style.top = y + "px";
    element.ink.style.left = x + "px";
    element.ink.style.backgroundColor = element.pressedColor;
    element.ink.classList.add("animate");
};

// Reset the focus shade in the element
xm.focus.reset = function (element) {
    if(element.shade)
        element.shade.classList.remove("animate");
};
// Create the focus shade in the element
xm.focus.create = function (element) {
    // Initialise the animation
    if(!element.shade) {
        element.shade = document.createElement("m-focus");
        element.appendChild(element.shade);
    }
};
xm.focus.make = function (element) {
    // Create shade if necessary
    xm.focus.create(element);
    // Animate
    element.shade.classList.add("animate");
};

// Produce a reveal animation for the element
xm.morph.create = function (parent, element) {
    // Prepare for animation
    var bounds = element.getBoundingClientRect();
    var morph = document.createElement("div");
    morph.classList.add("morph");
    morph.style.width = bounds.width + "px";
    morph.style.height = bounds.height + "px";
    morph.style.top = bounds.top + "px";
    morph.style.left = bounds.left + "px";

    // Make sure parent is properly positioned
    var parentBounds = parent.getBoundingClientRect();
    parent.style.top = parentBounds.top + "px";
    parent.style.left = parentBounds.left + "px";
    parent.classList.add("morph-originator");

    // Add it to the screen
    element._morph = morph;
    element._parent = parent;
    element.style.opacity = 0;
    element.style.display = "none";
    document.body.appendChild(morph);
};
xm.morph.show = function (element) {
    // Make sure that we do not trigger animation whilst element is morphing
    if(element._isMorphing)
        return;
    element._isMorphing = true;

    // Setup
    var morph = element._morph;
    var parent = element._parent;
    morph.style.display = "block";

    // When parent arrives to the centre of target, start ink animation
    parent.addEventListener("transitionend",
        function (e) {
            // Start ripple effect
            morph.pressedColor = window.getComputedStyle(parent, null).backgroundColor;
            xm.ripple.make({}, morph);

            // When ink animation finishes, hide the layer to reveal the original element
            morph.ink.addEventListener("transitionend",
                function (e) {
                    // Start ripple effect
                    morph.ink.style.opacity = 0;
                    parent.style.opacity = 0;
                    element.style.removeProperty("display");
                    element.style.opacity = 1;

                    // Hide animation element and remove the handler
                    if(e.propertyName == "opacity") {
                        morph.style.display = "none";
                        e.target.removeEventListener(e.type, arguments.callee);
                        element._isMorphing = false;
                    }
                });

            // Remove the handler
            e.target.removeEventListener(e.type, arguments.callee);
        });

    // Detect bounds
    var morphBounds = morph.getBoundingClientRect();
    var parentBounds = parent.getBoundingClientRect();
    // Store parent original form
    parent._bounds = parentBounds;
    parent._originalElevation = parent.elevation;
    // Start animation
    parent.style.top = (morphBounds.top + morphBounds.height / 2 - parentBounds.height / 2) + "px";
    parent.style.left = (morphBounds.left + morphBounds.width / 2 - parentBounds.width / 2) + "px";
    parent.elevation = 0;
};
xm.morph.hide = function (element) {
    // Make sure that we do not trigger animation whilst element is morphing
    if(element._isMorphing)
        return;
    element._isMorphing = true;

    // Setup
    var morph = element._morph;
    var parent = element._parent;

    // Reverse ripple effect
    morph.style.display = "block";
    setTimeout(function() {
        morph.ink.style.opacity = 1;

        morph.ink.addEventListener("transitionend",
            function(e) {
                xm.ripple.reverse(morph);

                // Hide element and show parent
                element.style.opacity = 0;
                parent.style.opacity = 1;

                // Clean up when ink disappears
                if(e.propertyName == "transform") {
                    element.style.display = "none";
                    parent.style.top = parent._bounds.top + "px";
                    parent.style.left = parent._bounds.left + "px";
                    parent.elevation = parent._originalElevation;
                    e.target.removeEventListener(e.type, arguments.callee);
                    element._isMorphing = false;
                }
            });
    }, 10);
};

// Returns whether the key pressed should activate the element
xm.input.isActionKey = function (keyCode) {
    return keyCode == 32 || keyCode == 13;
};

// Creates an ink wash to cover the screen
xm.wash.create = function () {
    if(!xm.wash.instance) {
        xm.wash.instance = document.createElement("div");
        xm.wash.instance.classList.add("wash");
        document.body.appendChild(xm.wash.instance);
    }
    xm.wash.instance.style.width = screen.width + "px";
    xm.wash.instance.style.height = screen.height + "px";
};
// Toggle the ink overlay
xm.wash.toggle = function () {
    xm.wash.create();
    xm.wash.instance.classList.toggle("show");
};

// Mixin that provides common logic for all material elements
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
            attribute: {
                boolean: true
            },
            get: function() {
                return this._primary;
            },
            set: function(value) {
                this._primary = value;
                if(value)
                    this.tint = xm.current.color;

                if(this.render instanceof Function)
                    this.render();
            }
        },
        tint: {
            attribute: {},
            get: function() {
                return this._tint;
            },
            set: function(value) {
                this._tint = value;

                if(this.render instanceof Function)
                    this.render();
            }
        },
        theme: {
            attribute: {},
            get: function() {
                return this._theme;
            },
            set: function(value) {
                if(value != "light" && value != "dark")
                    value = xm.current.style;
                this._theme = value;

                if(this.render instanceof Function)
                    this.render();
            }
        }
    }
};

// Define simple components
xtag.register("m-ink", {});
xtag.register("m-focus", {});
xtag.register("m-divider", {
    lifecycle: {
        created: function () {
            // Setup styles
            this.style.borderBottom = "solid 1px " + xm.current.divider;
        }
    }
});
xtag.register("m-card", {
    lifecycle: {
        created: function () {
            // Setup styles
            this.style.backgroundColor = xm.current.card;
        }
    }
});
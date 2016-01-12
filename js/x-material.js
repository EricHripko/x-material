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
var theme = makeTheme("teal", true, "dark");

function makeTheme(color, isLight, toolbarStyle) {
    var theme;
    if (isLight)
        theme = {
            disabledElevatedFore: "rgba(0, 0, 0, 0.26)",
            disabledElevatedBack: "rgba(0, 0, 0, 0.12)",
            disabledFlatFore: "rgba(153, 153, 153, 0.40)",
            flatPressed: "rgba(153, 153, 153, 0.40)",
            elevatedBack: "white",
            elevatedPressed: "rgb(224, 224, 224)",
            background: "#fafafa",
            text: "rgba(0, 0, 0, .87)",
            textSecondary: "rgba(0, 0, 0, 0.54)",
            iconActive: "rgba(0, 0, 0, 0.54)",
            iconInactive: "rgba(0, 0, 0, 0.26)",
            divider: "rgba(0, 0, 0, 0.12)",
            card: "white"
        };
    else
        theme = {
            disabledElevatedFore: "rgba(255, 255, 255, 0.30)",
            disabledElevatedBack: "rgba(255, 255, 255, 0.12)",
            disabledFlatFore: "rgba(255, 255, 255, 0.30)",
            flatPressed: "rgba(204, 204, 204, 0.25)",
            elevatedBack: colors[color][500],
            elevatedPressed: colors[color][700],
            background: "#303030",
            text: "white",
            textSecondary: "rgba(0, 0, 0, 0.70)",
            iconActive: "white",
            iconInactive: "rgba(255, 255, 255, 0.30)",
            divider: "rgba(255, 255, 255, 0.12)",
            card: "#424242"
        };

    theme.color = color;
    switch(toolbarStyle) {
        default:
            theme.appBarBack = "#212121";
            theme.appBarFore = "white";
            theme.appBarIcon = "dark";
            break;
        case "light":
            theme.appBarBack = "#f5f5f5";
            theme.appBarFore = "rgba(0, 0, 0, .87)";
            theme.appBarIcon = "dark";
            break;
        case "dark":
            theme.appBarBack = "#212121";
            theme.appBarFore = "white";
            theme.appBarIcon = "light";
            break;
    }
    return theme;
}

function resetRipple(element) {
    if(element.ink)
        element.ink.style.opacity = 0;
}

function makeRipple(element) {
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
}

function hasValue(value) {
    return value !== undefined;
}

xtag.register("m-subhead", {
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.textView = document.createElement("m-text-view");
            this.textView.textStyle = "body2";
            // Insert it
            this.innerText = "";
            this.appendChild(this.textView);
            // Setup styles
            this.textView.style.color = theme.textSecondary;
        }
    },
    accessors: {
        themeColor: {
            attribute: {},
            get: function() {
                return this._themeColor;
            },
            set: function(value) {
                this._themeColor = value;
                this.textView.style.color = colors[this.themeColor][500];
            }
        },
        primary: {
            attribute: {},
            get: function() {
                return this._primary;
            },
            set: function(value) {
                this._primary = value;
                this.themeColor = hasValue(value) ? theme.color : undefined;
            }
        },
        text: {
            attribute: {},
            get: function() {
                return this.textView.innerText;
            },
            set: function(value) {
                this.textView.innerText = value;
            }
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
            this.text.style.color = theme.text;
            this.pressedColor = theme.elevatedPressed;
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
            resetRipple(this);
        }
    },
    events: {
        tapstart: function () {
            // Animate ripple
            makeRipple(this);
        },
        tapend: function () {
            this.resetAnimation();
        },
        leave: function () {
            this.resetAnimation();
        }
    }
});


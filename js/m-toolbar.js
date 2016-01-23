xtag.register("m-toolbar", {
    mixins: ["m-element"],
    content: function () {/*
        <m-text-view text-style="title"></m-text-view>
    */},
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.textView = this.querySelector("m-text-view");
            // Setup styles
            this.elevation = 4;
            this.render();
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
        },
        navIcon: {
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
                    this.icon.classList.add("nav");
                    this.icon.src = value;
                    this.icon.themeColor = xm.current.appBarIcon;

                    this.insertBefore(this.icon, this.textView);
                    return;
                }

                // Remove the icon
                if(this.icon != undefined) {
                    this.removeElement(this.icon);
                    this.icon = undefined;
                }
            }
        }
    },
    events: {
        "tapstart:delegate(m-icon)": function (e) {
            // Animate ripple
            this.pressedColor = colors[this.parentNode.themeColor][400];
            xm.ripple.make(e, this);
        },
        "tapend:delegate(m-icon)": function (e) {
            xm.ripple.reset(this);
        },
        "leave:delegate(m-icon)": function (e) {
            xm.ripple.reset(this);
        }
    },
    methods: {
        render: function() {
            this.style.background = this.primary ? colors[this.themeColor][500] : xm.current.appBarBack;
            this.textView.style.color = xm.current.appBarFore;
        }
    }
});

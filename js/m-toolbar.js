xtag.register("m-toolbar", {
    mixins: ["m-element"],
    content: "<m-text-view text-style='title'></m-text-view>",
    lifecycle: {
        created: function() {
            // Create a text view to go inside the element
            this.textView = this.querySelector("m-text-view");
            // Setup styles
            this.defaultElevation = 4;
            this.render();
        }
    },
    accessors: {
        opaque: {
            attribute: {
                boolean: true
            },
            get: function() {
                return this._opaque;
            },
            set: function(value) {
                this._opaque = value;
                this.render();
            }
        },
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
                    this.icon.selectable = true;
                    this.icon.classList.add("nav");
                    this.icon.src = value;
                    this.icon.tint = xm.current.appBarIcon;

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
    methods: {
        render: function() {
            // Identify rendering options
            var opaque = this.opaque || this.tint in colors;
            var fallback = opaque ? xm.current.appBarBack : "transparent";
            // Perform rendering
            this.elevation = this.opaque ? this.defaultElevation : 0;
            this.textView.style.color = opaque ? xm.current.appBarFore : xm.current.text;
            this.style.backgroundColor = this.tint in colors ? colors[this.tint][500] : fallback;
            this.textView.textStyle = this.classList.contains("fixed") ? "title" : "subheading";
            this.style.borderBottom = this.elevation > 0 ? "none" : "solid 1px " + xm.current.divider;
            // Icon rendering
            if(this.icon)
                this.icon.tint = opaque ? xm.current.appBarIcon : "dark";
        }
    }
});

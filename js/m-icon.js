xtag.register("m-icon", {
    mixins: ["m-element"],
    lifecycle: {
        created: function () {
            // Create a text view to go inside the element
            this.icon = document.createElement("i");
            this.icon.textContent = this.textContent;
            this.icon.classList.add("material-icons");
            // Insert it
            this.textContent = "";
            this.appendChild(this.icon);
            // Setup styles
            this.icon.style.color = xm.current.iconActive;
        }
    },
    accessors: {
        src: {
            attribute: {},
            get: function () {
                return this.icon.textContent;
            },
            set: function (value) {
                this.icon.textContent = value;
            }
        },
        inactive: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._inactive;
            },
            set: function (value) {
                this._inactive = value;
                this.render();
            }
        }
    },
    methods: {
        render: function() {
            if(this.inactive) {
                this.icon.style.color = xm.current.iconInactive;
                return;
            }

            if(this.themeColor) {
                this.icon.style.color = colors[this.themeColor][500];
                return;
            }

            this.icon.style.color = xm.current.iconActive;
        }
    }
});
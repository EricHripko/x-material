xm.spinner = {};
xm.spinner.animate = function (spinner) {
    // When the animation began
    var start = null;
    // Function that ensures smooth animation of the spinner
    var anim = function(time) {
        if(!spinner.indeterminate)
            return;

        if(!start) {
            start = time;
            window.requestAnimationFrame(anim);
            return;
        }

        dt = time - start;

        if(dt < 100) {
            if(spinner.view.classList.contains("step3"))
                spinner.view.classList.remove("step3");
        }
        else if(dt < 350) {
            spinner.view.classList.add("step1");
        }
        else if(dt < 1050) {
            spinner.view.classList.remove("step1");
            spinner.view.classList.add("step2");
        }
        else if(dt < 1650) {
            spinner.view.classList.remove("step2");
            spinner.view.classList.add("step3");
        }
        else
            start = null;

        window.requestAnimationFrame(anim);
    };

    // Start animate
    anim();
};

xtag.register("m-spinner", {
    mixins: ["m-element"],
    content: "<svg><circle cx=20 cy=20 r=16 fill='transparent' stroke-width=3 /></svg>",
    lifecycle: {
        created: function () {
            this.view = this.querySelector("svg");
            this.circle = this.querySelector("circle");
            this.render();
        }
    },
    accessors: {
        indeterminate: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._indeterminate;
            },
            set: function (value) {
                // Start animation when switching from determinate to indeterminate
                if(!this._indeterminate && value) {
                    this._indeterminate = value;
                    xm.spinner.animate(this);
                }

                this._indeterminate = value;
                this.render();
            }
        },
        value: {
            attribute: {},
            get: function () {
                return this._value || 0;
            },
            set: function (value) {
                this._value = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            this.circle.setAttribute("stroke", colors[this.tint in colors ? this.tint : xm.current.color][500]);

            if(!this.indeterminate) {
                var offset = Math.max(Math.min(this.value, 100), 0);
                offset = Math.round((offset / 100) * 200);

                this.view.style.strokeDasharray = offset + ", 200";
            }
            else
                this.view.style.cssText = "";
        }
    }
});
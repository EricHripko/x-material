xm.spinner = {};
xm.spinner.animate = function (spinner) {
    // When the animation began
    var start = null;
    // Function that ensures smooth animation of the spinner
    var anim = function(time) {
        if(!spinner.indeterminate) {
            spinner.progressView.classList.remove("step3");
            spinner.progressView.classList.remove("step2");
            spinner.progressView.classList.remove("step1");
            return;
        }

        if(!start) {
            start = time;
            window.requestAnimationFrame(anim);
            return;
        }

        dt = time - start;

        if(dt < 100) {
            if(spinner.progressView.classList.contains("step3"))
                spinner.progressView.classList.remove("step3");
        }
        else if(dt < 350) {
            spinner.progressView.classList.add("step1");
        }
        else if(dt < 1050) {
            spinner.progressView.classList.remove("step1");
            spinner.progressView.classList.add("step2");
        }
        else if(dt < 1650) {
            spinner.progressView.classList.remove("step2");
            spinner.progressView.classList.add("step3");
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
    content: "<svg class='track'><circle fill='transparent' cx=20 cy=20 r=16 stroke-width=3 /></svg><svg class='progress'><circle fill='transparent' cx=20 cy=20 r=16 stroke-width=3 /></svg>",
    lifecycle: {
        created: function () {
            this.progressView = this.querySelector("svg.progress");
            this.progressCircle = this.querySelector("svg.progress circle");
            this.trackView = this.querySelector("svg.track");
            this.trackCircle = this.querySelector("svg.track circle");
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
        outline: {
            attribute: {
                boolean: true
            },
            get: function () {
                return this._outline;
            },
            set: function (value) {
                this._outline = value;
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
        },
        size: {
            attribute: {},
            get: function () {
                return this._size || 40;
            },
            set: function (value) {
                this._size = value;
                this.render();
            }
        }
    },
    methods: {
        render: function () {
            // Switch between indeterminate and determinate modes
            if(!this.indeterminate) {
                var offset = Math.max(Math.min(this.value, 100), 0);

                this.progressView.style.strokeDasharray = offset + ", 200";
            }
            else
                this.progressView.style.cssText = "";

            // Configure appearance
            this.style.width = this.size + "px";
            this.style.height = this.size + "px";

            this.trackView.style.transform = "scale(" + (Math.round(this.size / 4) / 10) + ")";
            if(this.outline)
                this.trackCircle.setAttribute("stroke", xm.current.divider);
            else
                this.trackCircle.removeAttribute("stroke");

            this.progressView.style.transform = "scale(" + (Math.round(this.size / 4) / 10) + ")";
            this.progressCircle.setAttribute("stroke", colors[this.tint in colors ? this.tint : xm.current.color][500]);
        }
    }
});
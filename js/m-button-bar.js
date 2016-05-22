xtag.register("m-button-bar", {
    lifecycle: {
        inserted: function () {
            // Identify the active button
            var active = this.querySelector("[active]");
            if(!active)
                active = this.children[0];
            this.setActive(active);
        }
    },
    methods: {
        /**
         * Retrieve children of the element.
         * @returns {Array} Children as an array.
         */
        getChildren: function () {
            var result = [];
            for(var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                result.push(child);
            }
            return result;
        },
        /**
         * Set the active button in this control.
         * @param active Active button.
         */
        setActive: function (active) {
            this.getChildren().forEach(function (child) {
                if(child == active)
                    child.setAttribute("active", "active");
                else
                    child.removeAttribute("active");

                if(active.getAttribute("selected-tint"))
                    child.setAttribute("tint", active.getAttribute("selected-tint"));

                if(child.render)
                    child.render();
            });
        }
    },
    events: {
        MaterialButtonSelected: function (e) {
            this.setActive(e.target);
        }
    }
});

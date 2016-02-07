(function () {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    xtag.register("m-pick-date", {
        mixins: ["m-element"],
        content: "<header>\
                <m-text-view class='year' text-style='body1'>1995</m-text-view>\
                <m-text-view class='date' text-style='title'>Tue, Jul 11</m-text-view>\
              </header>\
              <section class='date'>\
                <m-icon src='keyboard_arrow_left' selectable class='control before'></m-icon>\
                <m-text-view class='date-header' text-style='body2' text-color='primary'>July 1995</m-text-view>\
                <m-icon src='keyboard_arrow_right' selectable class='control after'></m-icon>\
              </section>\
              <table class='calendar'>\
                <thead>\
                    <tr>\
                        <th><m-text-view text-style='caption' text-color='secondary'>M</m-text-view></th>\
                        <th><m-text-view text-style='caption' text-color='secondary'>T</m-text-view></th>\
                        <th><m-text-view text-style='caption' text-color='secondary'>W</m-text-view></th>\
                        <th><m-text-view text-style='caption' text-color='secondary'>T</m-text-view></th>\
                        <th><m-text-view text-style='caption' text-color='secondary'>F</m-text-view></th>\
                        <th><m-text-view text-style='caption' text-color='secondary'>S</m-text-view></th>\
                        <th><m-text-view text-style='caption' text-color='secondary'>S</m-text-view></th>\
                    </tr>\
                </thead>\
                <tbody>\
                </tbody>\
              </table>\
              <input>",
        lifecycle: {
            created: function () {
                this.yearView = this.querySelector("m-text-view.year");
                this.dateView = this.querySelector("m-text-view.date");
                this.headerView = this.querySelector("header");
                this.valueView = this.querySelector("input");
                this.dateHeaderView = this.querySelector("m-text-view.date-header");
                this.calendarView = this.querySelector("table.calendar tbody");
                this.value = new Date().toString();

                this.render();
            }
        },
        accessors: {
            value: {
                attribute: {},
                get: function () {
                    return new Date(this.valueView.value);
                },
                set: function (value) {
                    this.valueView.value = value;
                    this.render();
                }
            }
        },
        methods: {
            /*
             * Remove all children of the node.
             */
            removeChildren: function (node) {
                while (node.firstChild)
                    node.removeChild(node.firstChild);
            },
            /*
             * Create an element for the node.
             */
            createElement: function (text) {
                // Create a text view
                var view = document.createElement("m-text-view");
                view.textStyle = "caption";
                view.textColor = "primary";
                view.style.fontWeight = "500";
                view.textContent = text;

                // Highlight today's date
                if(this.getDay() == text)
                    view.style.color = colors[this.tint in colors ? this.tint : "grey"][500];

                // Wrap it as a column
                var td = document.createElement("td");
                td.appendChild(view);
                return td;
            },

            /*
             * Get the date that represents the start of the month.
             */
            getStartOfMonth: function () {
                var value = this.value;
                return new Date(value.getFullYear(), value.getMonth(), 1);
            },
            /*
             * Get number of days in the currently selected month.
             */
            getDaysInMonth: function () {
                var value = this.value;
                return new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
            },

            /*
             * Get currently selected year.
             */
            getYear: function () {
                return this.value.getFullYear();
            },
            /*
             * Get currently selected month.
             */
            getMonth: function () {
                return months[this.value.getMonth()];
            },
            /*
             * Get currently day of week.
             */
            getWeekDay: function () {
                return days[this.value.getDay()];
            },
            /*
             * Get currently selected day of month.
             */
            getDay: function () {
                return this.value.getDate();
            },
            /*
             * Get currently selected month and year.
             */
            getMonthYear: function () {
                return months[this.value.getMonth()] + " " + this.getYear();
            },
            /*
             * Get currently selected weekday, month and day.
             */
            getShortDate: function () {
                return this.getWeekDay().substring(0, 3) + ", " + this.getMonth().substring(0, 3) + " " + this.getDay();
            },
            render: function () {
                // Setup controls
                this.yearView.textContent = this.getYear();
                this.dateView.textContent = this.getShortDate();
                this.dateHeaderView.textContent = this.getMonthYear();

                // Display the calendar
                this.removeChildren(this.calendarView);

                // Add initial row with empty spaces
                var weekDay = this.getStartOfMonth().getDay();
                var row, element, toAdd;
                if(weekDay != 1) {
                    // Add a row
                    row = document.createElement("tr");
                    this.calendarView.appendChild(row);
                    // Calculate how much empty space to add before current day
                    toAdd = weekDay == 0 ? 6 : weekDay - 1;
                    while(toAdd-- > 0)
                        row.appendChild(this.createElement(""));
                }

                // Add the content of the calendar
                var i = 1;
                var total = this.getDaysInMonth();
                while(i < total) {
                    // Add a row on Monday
                    if(weekDay == 1) {
                        row = document.createElement("tr");
                        this.calendarView.appendChild(row);
                    }

                    row.appendChild(this.createElement(i.toString()));

                    i++;
                    weekDay++;
                    weekDay %= 7;
                }

                // Add final row with empty spaces
                if(weekDay != 0) {
                    // Calculate how much empty space to add before current day
                    toAdd = weekDay;
                    while(toAdd-- > 0)
                        row.appendChild(this.createElement(""));
                }

                // Default to current theme
                var themeColor = this.tint in colors ? this.tint : xm.current.color;
                var style = this.theme in colors ? this.theme : xm.current.style;
                // Setup styles
                this.style.backgroundColor = xm.current.card;
                this.headerView.style.backgroundColor = colors[themeColor][500];
                this.headerView.style.color = colors[style][400];
            }
        }
    });
})();
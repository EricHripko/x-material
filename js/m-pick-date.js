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
                this.controlView = this.querySelector("section.date");
                this.valueView = this.querySelector("input");
                this.dateHeaderView = this.querySelector("m-text-view.date-header");
                this.calendarHeaderView = this.querySelector("table.calendar thead");
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
            createElement: function (date, text) {
                // Create a text view
                var view = document.createElement("m-text-view");
                view.classList.add("option");
                view.textStyle = "caption";
                view.textColor = "primary";
                view.pressedColor = colors[this.tint in colors ? this.tint : "grey"][600];
                view.style.fontWeight = "500";
                view.textContent = text;

                // Highlight today's date
                var today = new Date();
                if(date.getDate() == text) {
                    view.classList.add("chosen");
                    view.style.backgroundColor = colors[this.tint in colors ? this.tint : "grey"][500];
                    view.style.color = colors[this.theme in colors ? this.theme : xm.current.style][500];
                }
                else if(today.getDate() == text && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear())
                    view.style.color = colors[this.tint in colors ? this.tint : "grey"][500];

                // Wrap it as a column
                var td = document.createElement("td");
                td.appendChild(view);
                return td;
            },
            /*
             * Create the calendar.
             */
            createCalendar: function (date) {
                // Display the calendar
                this.removeChildren(this.calendarView);

                // Add initial row with empty spaces
                var weekDay = this.getStartOfMonth(date).getDay();
                var row, element, toAdd;
                if (weekDay != 1) {
                    // Add a row
                    row = document.createElement("tr");
                    this.calendarView.appendChild(row);
                    // Calculate how much empty space to add before current day
                    toAdd = weekDay == 0 ? 6 : weekDay - 1;
                    while (toAdd-- > 0)
                        row.appendChild(this.createElement(date, ""));
                }

                // Add the content of the calendar
                var i = 1;
                var total = this.getDaysInMonth(date);
                while (i <= total) {
                    // Add a row on Monday
                    if (weekDay == 1) {
                        row = document.createElement("tr");
                        this.calendarView.appendChild(row);
                    }

                    row.appendChild(this.createElement(date, i.toString()));

                    i++;
                    weekDay++;
                    weekDay %= 7;
                }

                // Add final row with empty spaces
                if (weekDay != 0) {
                    // Calculate how much empty space to add before current day
                    toAdd = weekDay;
                    while (toAdd-- > 0)
                        row.appendChild(this.createElement(date, ""));
                }

                // Set the height of the control after some delay, because DOM may not be ready yet
                var component = this;
                setTimeout(function() {
                    component.style.height = (component.calendarView.offsetHeight
                        + component.calendarHeaderView.offsetHeight
                        + component.headerView.offsetHeight
                        + component.controlView.offsetHeight) + "px";
                }, 10);
            },
            /*
             * Select a new day in the month.
             */
            selectDay: function(value) {
                // Set the new date
                var current = this.value;
                this.valueView.value = new Date(current.getFullYear(), current.getMonth(), value);

                // Deselect current options
                var options = this.querySelectorAll("table.calendar m-text-view.option");
                for(var i = 0; i < options.length; i++) {
                    var option = options[i];

                    // Deselect the current option
                    if (option.classList.contains("chosen")) {
                        option.classList.remove("chosen");
                        option.style.backgroundColor = "transparent";
                        option.textColor = "primary";
                    }

                    // Select a new option
                    if (option.textContent == value) {
                        option.classList.add("chosen");
                        option.style.backgroundColor = colors[this.tint in colors ? this.tint : "grey"][500];
                        option.style.color = colors[this.theme in colors ? this.theme : xm.current.style][500];
                    }
                }

                // Update the date
                this.dateView.textContent = this.getShortDate();
            },

            /*
             * Get the date that represents the start of the month.
             */
            getStartOfMonth: function (value) {
                value = value || this.value;
                return new Date(value.getFullYear(), value.getMonth(), 1);
            },
            /*
             * Get number of days in the currently selected month.
             */
            getDaysInMonth: function (value) {
                value = value || this.value;
                return new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
            },

            /*
             * Get currently selected year.
             */
            getYear: function (value) {
                return (value || this.value).getFullYear();
            },
            /*
             * Get currently selected month.
             */
            getMonth: function (value) {
                return months[(value || this.value).getMonth()];
            },
            /*
             * Get currently day of week.
             */
            getWeekDay: function (value) {
                return days[(value || this.value).getDay()];
            },
            /*
             * Get currently selected day of month.
             */
            getDay: function (value) {
                return (value || this.value).getDate();
            },
            /*
             * Get currently selected month and year.
             */
            getMonthYear: function (value) {
                return months[(value || this.value).getMonth()] + " " + this.getYear(value);
            },
            /*
             * Get currently selected weekday, month and day.
             */
            getShortDate: function () {
                return this.getWeekDay().substring(0, 3) + ", " + this.getMonth().substring(0, 3) + " " + this.getDay();
            },
            /*
             * Get the same date on the previous month.
             */
            getPreviousMonth: function (value) {
                // Retrieve the important data
                var year = value.getFullYear();
                var month = value.getMonth();
                var day = value.getDate();

                // Retrieve the previous month
                month--;
                // Reached January, flip to previous year
                if(month < 0) {
                    month = 11;
                    year--;
                }

                return new Date(year, month, day);
            },
            /*
             * Get the same date on the next month.
             */
            getNextMonth: function (value) {
                // Retrieve the important data
                var year = value.getFullYear();
                var month = value.getMonth();
                var day = value.getDate();

                // Retrieve the previous month
                month++;
                // Reached January, flip to previous year
                if(month > 11) {
                    month = 0;
                    year++;
                }

                return new Date(year, month, day);
            },
            render: function () {
                // Setup controls
                this.yearView.textContent = this.getYear();
                this.dateView.textContent = this.getShortDate();
                this.dateHeaderView.textContent = this.getMonthYear();

                // Display calendar for current value
                this.createCalendar(this.value);

                // Default to current theme
                var themeColor = this.tint in colors ? this.tint : "grey";
                var style = this.theme in colors ? this.theme : xm.current.style;
                // Setup styles
                this.style.backgroundColor = xm.current.card;
                this.headerView.style.backgroundColor = colors[themeColor][500];
                this.headerView.style.color = colors[style][400];
                this.dateView.style.color = colors[style][500];
            }
        },
        events: {
            "tapend:delegate(.control.before)": function () {
                // Retrieve the component
                var component = this.parentNode.parentNode;

                // Get the previous month displayed
                component.value = component.getPreviousMonth(component.value);
                component.createCalendar(component.value);
            },
            "tapend:delegate(.control.after)": function () {
                // Retrieve the component
                var component = this.parentNode.parentNode;

                // Get the previous month displayed
                component.value = component.getNextMonth(component.value);
                component.createCalendar(component.value);
            },
            "tapstart:delegate(m-text-view.option)": function (e) {
                // Animate ripple
                xm.ripple.make(e, this);
            },
            "tapend:delegate(m-text-view.option)": function (e) {
                // Retrieve the component
                var component = this.parentNode.parentNode.parentNode.parentNode.parentNode;

                component.selectDay(this.textContent);

                xm.ripple.reset(this);
            },
            "leave:delegate(m-text-view.option)": function (e) {
                xm.ripple.reset(this);
            }
        }
    });
})();
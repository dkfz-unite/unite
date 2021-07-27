class ContentHelpers {
    /**
     * Converts boolean value to it's string representation
     * @param {*} value Boolean value to convert
     * @param {*} inverse Invert result ('false' by default)
     * @param {*} yes String to return if value is 'true' ('Yes' by default)
     * @param {*} no String to return if value is 'false' ('No' by default)
     * @returns String representation of boolean value or null if value is not set
     */
    toBooleanString(value, inverse = false, yes = "Yes", no = "No") {
        if (value == null || value == undefined) {
            return null;
        }

        return inverse
            ? value ? no : yes
            : value ? yes : no;
    }

    /**
     * Converts json date string to locale date string
     * @param {*} jsonDate Json date string to convert
     * @returns Locale date string representation of json date string or null if json date string is not set
     */
    toDateString(jsonDate) {
        if (!jsonDate) {
            return null;
        }

        return new Date(jsonDate).toLocaleDateString();
    }

    /**
     * Converts range of json date strings to locale date range string
     * @param {*} jsonDateStart  Json start date string
     * @param {*} jsonDateEnd Json end date string
     * @returns Locale date range string representation of json start and end date strings or null if json start and end date string are not set
     */
    toDataRangeString(jsonDateStart, jsonDateEnd) {
        if (!jsonDateStart && !jsonDateEnd) {
            return null;
        }
        else {
            var startDate = this.toDateString(jsonDateStart) ?? "...";
            var endDate = this.toDateString(jsonDateEnd) ?? "...";
            return startDate + " - " + endDate;
        }
    }

    /**
     * Converts start day and duration to timespan string
     * @param {*} startDay Start day
     * @param {*} durationDays Duration days
     */
    toTimespanString(startDay, durationDays) {
        if (!startDay && !durationDays) {
            return "Days ? - ?";
        } else if (startDay && !durationDays) {
            return `Day ${startDay}`;
        } else if (!startDay && durationDays) {
            return `${durationDays} days long`;
        } else {
            return `Days ${startDay} - ${startDay + durationDays}`;
        }
    }
}

export default new ContentHelpers();
// import {Lang} from "./";

export default class DateLib {

    static value = new Date();

    static resetValue() {
        DateLib.value = new Date();
    }

    static setValue(date = false) {
        if (typeof date === 'string') {
            DateLib.value = new Date(...DateLib.getParsedDate(date));
        } else if (typeof date === "number") {
            DateLib.value = new Date(date * 1000);
        }
        return this;
    }

    static getParsedDate(date) {
        let dateArr = String(date).split(' ');
        dateArr = dateArr.length > 1 ? dateArr : String(date).split('T');
        var days = String(dateArr[0]).split('-');
        var hours = String(dateArr[1]).split(':');
        if (dateArr.length === 2) {
            return [parseInt(days[0]), parseInt(days[1]) - 1, parseInt(days[2]), parseInt(hours[0] || 0), parseInt(hours[1] || 0), parseInt(hours[2] || 0)];
        } else {
            return [parseInt(days[0]), parseInt(days[1]) - 1, parseInt(days[2]), '00', '00', '00'];
        }
    }

    static getUnix() {
        let date = Math.floor(DateLib.value / 1000);
        DateLib.resetValue();
        return date;
    }

    static format(format = "Y-m-d H:i:s") {

        let date = DateLib.value;
        if (date < 1) date = new Date();
        let d = date.getDate();
        if (d < 10) d = "0" + d;
        let m = date.getMonth() + 1; //January is 0!
        if (m < 10) m = "0" + m;
        let Y = date.getFullYear();
        let H = date.getHours();
        if (H < 10) H = "0" + H;
        let i = date.getMinutes();
        if (i < 10) i = "0" + i;
        let s = date.getSeconds();
        if (s < 10) s = "0" + s;

        let months = DateLib.getMonthsShort();
        let replaceWith = [
            ["Y", Y],
            ["m", m],
            ["M", months[parseInt(m) - 1].title],
            ["w", date.getDay()],
            ["W", 0],
            ["d", d],
            ["H", H],
            ["i", i],
            ["s", s],
        ];
        for (let key in replaceWith) {
            let [find, replace] = replaceWith[key];
            format = format.replace(find, replace);
        }

        DateLib.resetValue()
        return format;
    }

    static weekday(n) {
        let date = DateLib.value;
        let currentDay = DateLib.value.getDay();
        let distance = n - currentDay;
        date.setDate(date.getDate() + distance);
        return this;
    }

    static startOf(type) {
        let date = DateLib.value;

        switch (type) {
            case 'day':
                DateLib.value.setHours(0, 0, 0, 0);
                break;
            case 'week':
                DateLib.value = DateLib.setToMonday(DateLib.value).setHours(0, 0, 0, 0);
                break;
            case 'month':
                DateLib.value = new Date(date.getFullYear(), date.getMonth(), 1);
                // DateLib.value = new Date(date.getFullYear(), date.getMonth(), 1,date.getHours(),date.getMinutes(),date.getSeconds());
                break;
            case 'year':
                DateLib.value = new Date(date.getFullYear(), 0, 1);
                break;
        }
        return this;
    }


    static endOf(type) {
        let date = DateLib.value;

        switch (type) {
            case 'day':
                DateLib.value.setHours(23, 59, 59, 999);
                break;
            case 'week':
                DateLib.value.setDate(date.getDate() - date.getDay() + 6);
                DateLib.value.setHours(23, 59, 59, 999);
                break;
            case 'isoWeek':
                DateLib.value.setDate(date.getDate() - date.getDay() + 7);
                DateLib.value.setHours(23, 59, 59, 999);
                break;
            case 'month':
                DateLib.value = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
                // DateLib.value = new Date(date.getFullYear(), date.getMonth(), 1,date.getHours(),date.getMinutes(),date.getSeconds());
                break;
            case 'year':
                DateLib.value = new Date(date.getFullYear(), 11, 31);
                break;
        }
        return this;
    }


    static add(amount, type) {
        let date = DateLib.value;

        switch (type) {
            case 'day':
                DateLib.value.setDate(date.getDate() + amount);
                break;
            case 'week':
                DateLib.value.setDate(date.getDate() + amount * 7);
                break;
            case 'month':
                DateLib.addMonths(DateLib.value, amount);
                break;
            case 'year':
                DateLib.addYear(DateLib.value, amount);
                break;
        }
        return this;
    }


    static subtract(amount, type) {
        let date = DateLib.value;

        switch (type) {
            case 'day':
                DateLib.value.setDate(date.getDate() - amount);
                break;
            case 'week':
                DateLib.value.setDate(date.getDate() - amount * 7);
                break;
            case 'month':

                break;
            case 'year':

                break;
        }
        return this;
    }


    static set(type, value) {
        switch (type) {
            case 'minutes':
                DateLib.value.setMinutes(value);
                break;
            case 'hours':
                DateLib.value.setHours(value);
                break;
            case 'date':
                DateLib.value.setDate(value);
                break;
            case 'month':
                DateLib.value.setMonth(value);
                break;
            case 'year':
                DateLib.value.setFullYear(value);
                break;
        }
        return this;
    }


    //HELPER METHODS START

    static addMonths(date, months) {
        let d = date.getDate();
        date.setMonth(date.getMonth() + months);
        if (date.getDate() !== d) {
            date.setDate(0);
        }
        return date;
    }

    static addYear(date, months) {
        let d = date.getDate();
        date.setFullYear(date.getFullYear() + months);
        if (date.getDate() !== d) {
            date.setDate(0);
        }
        return date;
    }

    static setToMonday(date) {
        let day = date.getDay() || 7;
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        return date;
    }

    //HELPER METHODS END


    static getWeeks() {
        return [
            { value: 1, title: 'Monday' },
            { value: 2, title: 'Tuesday' },
            { value: 3, title: 'Wednesday' },
            { value: 4, title: 'Thursday' },
            { value: 5, title: 'Friday' },
            { value: 6, title: 'Saturday' },
            { value: 7, title: 'Sunday' },
        ];
    }

    static getMonths() {
        return [
            { value: 1, title: 'January' },
            { value: 2, title: 'February' },
            { value: 3, title: 'March' },
            { value: 4, title: 'April' },
            { value: 5, title: 'May' },
            { value: 6, title: 'June' },
            { value: 7, title: 'July' },
            { value: 8, title: 'August' },
            { value: 9, title: 'September' },
            { value: 10, title: 'October' },
            { value: 11, title: 'November' },
            { value: 12, title: 'December' },
        ];
    }

    static getMonthsShort() {
        return [
            { value: 1, title: 'January' },
            { value: 2, title: 'February' },
            { value: 3, title: 'March' },
            { value: 4, title: 'April' },
            { value: 5, title: 'May' },
            { value: 6, title: 'June' },
            { value: 7, title: 'July' },
            { value: 8, title: 'August' },
            { value: 9, title: 'September' },
            { value: 10, title: 'October' },
            { value: 11, title: 'November' },
            { value: 12, title: 'December' },
        ];
    }

    static getWeek(id) {
        return DateLib.getWeeks()[id - 1];
    }

    static getMonth(id) {
        return DateLib.getMonths()[id - 1];
    }


    static getUnixtime() {
        let time = new Date().getTime();
        time = Math.floor(time / 1000)
        return time;
    }

    // Convert unixtime to date format
    static date(format = "Y-m-d H:i:s", unixtime = 0) {
        let date = new Date(unixtime * 1000);
        if (unixtime < 1)
            date = new Date();
        let d = date.getDate();
        if (d < 10) d = '0' + d;
        let m = date.getMonth() + 1; //January is 0!
        if (m < 10) m = '0' + m;
        let Y = date.getFullYear();
        let H = date.getHours();
        if (H < 10)
            H = '0' + H;
        let i = date.getMinutes();
        if (i < 10)
            i = '0' + i;
        let s = date.getSeconds();
        if (s < 10)
            s = '0' + s;

        let months = DateLib.getMonthsShort();
        let monthText = months[parseInt(m) - 1].title;

        let replaceWith = [
            ["Y", Y],
            ["m", m],
            ["M", monthText],
            ["w", date.getDay()],
            ["W", 0],
            ["d", d],
            ["H", H],
            ["i", i],
            ["s", s],
        ];
        for (let key in replaceWith) {
            let [find, replace] = replaceWith[key];
            format = format.replace(find, replace);
        }
        return format;
    }

    // Convert time to PM/AM format
    static anteTime(time = "13:00-16:00") {
        let convertedTimeString
        let startTime = time.split("-")[0]
        // return convertedTimeString;
        return startTime;
    }

    static parseElapse(elapse) {
        let d = Math.floor(elapse / 86400);
        let h = Math.floor((elapse - d * 86400) / 3600);
        let m = Math.floor((elapse - d * 86400 - h * 3600) / 60);
        let s = elapse - d * 86400 - h * 3600 - m * 60;
        return { d, h, m, s };
    }

    static convertSeconds(elapse) {
        let txt = '';
        let { d, h, m, s } = DateLib.parseElapse(elapse);
        if (d > 0)
            txt += d + 'd ';
        if (h > 0)
            txt += h + 'h ';
        if (m > 0 && (h === 0 || d === 0))
            txt += m + 'm ';
        if (m === 0 && h === 0 && d === 0)
            txt += 0 + '';

        return txt;
    }

    static filterTime(unixtime) {
        let txt = '';
        if (!unixtime) {
            txt = Lang.get("Now");
        } else {
            let currentUnixtime = DateLib.getUnixtime();
            let dif = currentUnixtime - unixtime;
            if (DateLib.date("Y-m-d", currentUnixtime) === DateLib.date("Y-m-d", unixtime)) {
                txt = Lang.get("Today") + ' ' + DateLib.date("H:i", unixtime);
            } else if (DateLib.date("Y-m-d", currentUnixtime - 86400) === DateLib.date("Y-m-d", unixtime)) {
                txt = Lang.get("Yesterday") + ' ' + DateLib.date("H:i", unixtime);
            } else if (DateLib.date("Y", currentUnixtime - 86400) !== DateLib.date("Y", unixtime)) {
                txt = DateLib.date("d M, Y", unixtime);
            } else if (dif / 86400 > 1) {
                txt = DateLib.date("d M", unixtime);
            }
        }
        return txt;
    }



    static getDate(type = "") {
        let date = new Date()
        let time = date.getTime()
        let week_day = date.getDay()
        let month_day = date.getDate()
        time = Math.floor(time / 1000)

        let days_till_monday = week_day - 1
        let days_till_sunday = 7 - week_day
        let days_till_month_first = month_day - 1
        let days_till_month_last = 30 - month_day

        let unix_day = 86400
        let unix_today = time
        let unix_yesterday = unix_today - unix_day
        let unix_tomorrow = unix_today + unix_day
        let unix_week_first_day = unix_today - days_till_monday * unix_day
        let unix_week_last_day = unix_today + days_till_sunday * unix_day
        let unix_month_first_day = unix_today - days_till_month_first * unix_day
        let unix_month_last_day = unix_today + days_till_month_last * unix_day

        switch (type) {
            case "today":
                return DateLib.date("Y:m:d", unix_today)
            case "yesterday":
                return DateLib.date("Y:m:d", unix_yesterday)
            case "tomorrow":
                return DateLib.date("Y:m:d", unix_tomorrow)
            case "this_week":
                return `${DateLib.date("Y:m:d", unix_week_first_day)}-${DateLib.date("Y:m:d", unix_week_last_day)}`
            case "this_month":
                return `${DateLib.date("Y:m:d", unix_month_first_day)}-${DateLib.date("Y:m:d", unix_month_last_day)}`
            default:
                return DateLib.date("Y:m:d", date)
        }
    }
};

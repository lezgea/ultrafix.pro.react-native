
export default class TimeC {

    /**
     *  Converts string time ("16:00-18:00") to PM/AM type string format
     * */
    static anteTime(time = "16:00-18:00") {
        let convertedTimeString = time
        let startTime = time.split("-")[0]
        let startHour = startTime.split(":")[0]
        let startMinute = startTime.split(":")[1]
        let startF = startHour > 11 ? "PM" : "AM"

        let endTime = time.split("-")[1]
        let endHour = endTime.split(":")[0]
        let endMinute = endTime.split(":")[1]
        let endF = endHour > 11 ? "PM" : "AM"

        if (startHour == "00") startHour = 12
        if (startHour > 12) startHour = startHour - 12
        if (startMinute == "00") {
            startMinute = ""
        } else {
            startMinute = `:${startMinute}`
        }

        if (endHour == "00") endHour = 12
        if (endHour > 12) endHour = endHour - 12
        if (endMinute == "00") {
            endMinute = ""
        } else {
            endMinute = `:${endMinute}`
        }

        convertedTimeString = `${startHour}${startMinute} ${startF} - ${endHour}${endMinute} ${endF}`
        return convertedTimeString
    }
}

function isOpenNow(
    regularOpeningHours: google.maps.places.OpeningHours,
): boolean {
    const periods = regularOpeningHours.periods;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    for (const period of periods) {
        const isOpenToday = currentDay === period.open.day;
        const isAfterOpening =
            currentHour > period.open.hour ||
            (currentHour === period.open.hour &&
                currentMinute >= period.open.minute);
        console.log("isAfterOpening", isAfterOpening);
        if (isOpenToday && isAfterOpening) {
            if (period.close) {
                if (currentHour < period.close.hour) {
                    return true;
                } else if (
                    currentHour === period.close.hour &&
                    currentMinute <= period.close.minute
                ) {
                    return true;
                }
            }
        }
    }

    return false;
}

export default isOpenNow;

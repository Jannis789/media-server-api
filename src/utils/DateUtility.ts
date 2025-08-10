class DateUtility extends Date {
    addSeconds(seconds: number): this {
        this.setSeconds(this.getSeconds() + seconds);
        return this;
    }

    addMinutes(minutes: number): this {
        this.setMinutes(this.getMinutes() + minutes);
        return this;
    }

    addHours(hours: number): this {
        this.setHours(this.getHours() + hours);
        return this;
    }

    addDays(days: number): this {
        this.setDate(this.getDate() + days);
        return this;
    }

    addMonths(months: number): this {
        this.setMonth(this.getMonth() + months);
        return this;
    }

    addYears(years: number): this {
        this.setFullYear(this.getFullYear() + years);
        return this;
    }
}

export { DateUtility };
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import isOpenNow from "../OpenNowCheck";

describe.concurrent("isOpenNow", () => {
    const regularOpeningHours = {
        periods: [
            {
                open: {
                    day: 0,
                    hour: 12,
                    minute: 30,
                },
                close: {
                    day: 0,
                    hour: 14,
                    minute: 30,
                },
            },
        ],
        weekdayDescriptions: [],
    };
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
    it("should return true if the place is open and current time is within open hours", () => {
        // March 2, 2025 at 1pm
        const date = new Date(2025, 2, 2, 13, 0);

        vi.setSystemTime(date);

        const isOpenResult = isOpenNow(regularOpeningHours);
        expect(isOpenResult).toBe(true);
    });
    it("should return false if the place is closed today", () => {
        // March 4, 2025 at 1pm
        const date = new Date(2025, 1, 4, 13);

        vi.setSystemTime(date);

        const isOpenResult = isOpenNow(regularOpeningHours);
        expect(isOpenResult).toBe(false);
    });
    it("should return false if the place is open today but its too early", () => {
        // March 4, 2025 at 1pm
        const date = new Date(2025, 2, 2, 1);

        vi.setSystemTime(date);

        const isOpenResult = isOpenNow(regularOpeningHours);
        expect(isOpenResult).toBe(false);
    });
    it("should return false if the place is open today but its too late", () => {
        // March 4, 2025 at 1pm
        const date = new Date(2025, 2, 2, 23);

        vi.setSystemTime(date);

        const isOpenResult = isOpenNow(regularOpeningHours);
        expect(isOpenResult).toBe(false);
    });
    it("should return false if the place is open today but its too early accounting for minutes", () => {
        // March 4, 2025 at 1pm
        const date = new Date(2025, 2, 2, 12, 15);

        vi.setSystemTime(date);

        const isOpenResult = isOpenNow(regularOpeningHours);
        expect(isOpenResult).toBe(false);
    });
    it("should return false if the place is open today but its too late accounting for minutes", () => {
        // March 4, 2025 at 1pm
        const date = new Date(2025, 2, 14, 23);

        vi.setSystemTime(date);

        const isOpenResult = isOpenNow(regularOpeningHours);
        expect(isOpenResult).toBe(false);
    });
});

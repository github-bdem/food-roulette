import { vi, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { FoodMapContext } from "src/components/FoodMap/FoodMapContext";
import ResultsCard from "../ResultsCard";

vi.mock("src/components/FoodMap/ConvertGmapsLatLngToLatLng", () => {
    return {
        default: vi.fn(() => ({ lat: 0, lng: 0 })),
    };
});

const renderResultsCardWithProvider = (
    testLocation: google.maps.places.Place,
) => {
    render(
        <FoodMapContext.Provider value={{ state: {}, dispatch: () => null }}>
            <ResultsCard gmapsLocation={testLocation} />
        </FoodMapContext.Provider>,
    );
};

describe("ResultsCard", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        const date = new Date(2025, 2, 2, 13, 0);
        vi.setSystemTime(date);
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });
    it("should display google maps places data if present on provided location", async () => {
        const mockLocation = {
            displayName: "test-display-name",
            photos: [{ getURI: vi.fn(() => "http://example.com/photo.jpg") }],
            location: { lat: 36.0556, lng: -112.1 },
            rating: 4,
            userRatingCount: 10,
            priceLevel: "2",
            websiteURI: "https://www.example.com",
            nationalPhoneNumber: "+1-555-123-4567",
            formattedAddress: "123 Main St, Anytown, USA",
            googleMapsURI:
                "https://maps.google.com/maps?q=123+Main+St,+Anytown,+USA",
            hasDelivery: true,
            isReservable: true,
            hasTakeout: false,
            id: "test-id",
            regularOpeningHours: {
                weekdayDescriptions: [
                    "Sunday: 9 AM - 5 PM",
                    "Monday: 10 AM - 6 PM",
                    "Tuesday: 11 AM - 7 PM",
                    "Wednesday: 12 PM - 8 PM",
                    "Thursday: 1 PM - 9 PM",
                    "Friday: 2 PM - 10 PM",
                    "Saturday: 3 PM - 11 PM",
                ],
            },
        };
        renderResultsCardWithProvider(
            mockLocation as unknown as google.maps.places.Place,
        );

        const displayName = await screen.findByText(mockLocation.displayName);
        expect(displayName).toBeInTheDocument();

        const imageDisplay = await screen.findByAltText(
            mockLocation.displayName,
        );
        expect(imageDisplay).toBeInTheDocument();

        const curentDayHoursDisplay = await screen.findByText(
            "Todays Hours: 9 AM - 5 PM",
        );
        expect(curentDayHoursDisplay).toBeInTheDocument();

        // TODO: DO THE DISTANCE COMPUTATION CHECK HERE
    });
});

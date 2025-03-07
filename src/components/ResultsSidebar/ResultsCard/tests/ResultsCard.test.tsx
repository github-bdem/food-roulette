import { vi, describe, it } from "vitest";
import ResultsSidebar from "../../ResultsSidebar";
import { render, screen } from "@testing-library/react";
import { FoodMapContext } from "src/components/FoodMap/FoodMapContext";

interface MockFoodLocation {
    gmapsLocation: { id: string };
}

vi.mock("../ResultsCard", () => {
    const ResultsCardMock = (item: MockFoodLocation) => {
        return (
            <div
                data-testid={`mock-result-card-${item.gmapsLocation.id}`}
            ></div>
        );
    };
    return { default: ResultsCardMock };
});

describe("ResultsSidebar", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("should display no results message when foodLocations is empty", async () => {
        render(
            <FoodMapContext.Provider
                value={{ state: { foodLocations: [] }, dispatch: () => null }}
            >
                <ResultsSidebar />
            </FoodMapContext.Provider>,
        );
        const noResultsMessageElement = await screen.findByText(
            "No food locations found",
        );
        expect(noResultsMessageElement).toBeInTheDocument();
    });
    it("should display results cards for each foodLocation provided", async () => {
        render(
            <FoodMapContext.Provider
                value={{
                    state: {
                        foodLocations: [
                            {
                                id: "test1",
                            } as google.maps.places.Place,
                        ],
                    },
                    dispatch: () => null,
                }}
            >
                <ResultsSidebar />
            </FoodMapContext.Provider>,
        );
        const noResultsMessageElement = await screen.findByTestId(
            "mock-result-card-test1",
        );
        expect(noResultsMessageElement).toBeInTheDocument();
    });
});

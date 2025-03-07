import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UpdateOnMoveToggle from "../UpdateOnMoveToggle";
import userEvent from "@testing-library/user-event";
import { FilterContext } from "src/components/FilterSidebar/FiltersContext";

const toggleUpdateOnMapMoveMock = vi.fn();

vi.mock("../../FilterSidebar/FilterContextInteractions", () => {
    return {
        default: vi.fn(() => {
            return { toggleUpdateOnMapMove: toggleUpdateOnMapMoveMock };
        }),
    };
});

const renderUpdateOnMoveComponent = (updateOnMapMove: boolean) => {
    render(
        <FilterContext.Provider
            value={{
                state: {
                    updateOnMapMove,
                    foodTypeFilters: [],
                    includeOpenNow: false,
                    maxDistancePercent: 0,
                    includeReservationsAvailable: false,
                    includeDeliveryAvailable: false,
                    includeTakeawayAvailable: false,
                    minimumRating: 0,
                    maximumPrice: 0,
                },
                dispatch: () => null,
            }}
        >
            <UpdateOnMoveToggle />
        </FilterContext.Provider>,
    );
};

const user = userEvent.setup();

describe("UpdateOnMoveToggle", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("should be checked if updateOnMapMove is true", async () => {
        renderUpdateOnMoveComponent(true);
        const toggle = await screen.findByLabelText("Update on map move");
        expect(toggle).toBeChecked();
    });
    it("should not be checked if updateOnMapMove is false", async () => {
        renderUpdateOnMoveComponent(false);
        const toggle = await screen.findByLabelText("Update on map move");
        expect(toggle).not.toBeChecked();
    });
    it("should be call toggleUpdateOnMapMove if checkbox is clicked", async () => {
        renderUpdateOnMoveComponent(true);
        const toggle = await screen.findByLabelText("Update on map move");
        expect(toggle).toBeChecked();
        await user.click(toggle);
        expect(toggleUpdateOnMapMoveMock).toHaveBeenCalled();
    });
});

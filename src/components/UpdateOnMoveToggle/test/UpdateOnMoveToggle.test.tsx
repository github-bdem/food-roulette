import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UpdateOnMoveToggle from "../UpdateOnMoveToggle";
import userEvent from "@testing-library/user-event";

const renderUpdateOnMoveComponent = () => {
    render(<UpdateOnMoveToggle />);
};

const toggleUpdateOnMapMoveMock = vi.fn();

const user = userEvent.setup();

describe("UpdateOnMoveToggle", () => {
    beforeEach(() => {
        vi.mock("../../FilterSidebar/FiltersContext", async () => {
            const actual = await vi.importActual(
                "../../FilterSidebar/FiltersContext",
            );
            return {
                ...actual,
                useFilterContext: vi.fn(() => {
                    return { state: { updateOnMapMove: true } };
                }),
            };
        });
        vi.mock("../../FilterSidebar/FilterContextInteractions", () => {
            return {
                default: vi.fn(() => {
                    return { toggleUpdateOnMapMove: toggleUpdateOnMapMoveMock };
                }),
            };
        });
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("should be checked if updateOnMapMove is true", async () => {
        renderUpdateOnMoveComponent();
        const toggle = await screen.findByLabelText("Update on map move");
        expect(toggle).toBeChecked();
    });
    it("should be call toggleUpdateOnMapMove if checkbox is clicked", async () => {
        renderUpdateOnMoveComponent();
        const toggle = await screen.findByLabelText("Update on map move");
        expect(toggle).toBeChecked();
        await user.click(toggle);
        expect(toggleUpdateOnMapMoveMock).toHaveBeenCalled();
    });
});

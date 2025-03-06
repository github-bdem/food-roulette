import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// import userEvent  from '@testing-library/user-event';

/**
        const user = userEvent.setup();
        await render(<App />);
        const button = await screen.queryByText('count is 0');
        
        // Pre Expectations
        expect(button).not.toBeNull();

        // Actions
        await user.click(button as HTMLElement);
        await user.click(button as HTMLElement);
        await user.click(button as HTMLElement);
 */

vi.mock("../../FilterSidebar/FiltersContext", () => {
    return {
        useFilterContext: vi.fn(() => ({
            state: { updateOnMapMove: true },
            dispatch: vi.fn(),
        })),
    };
});

import UpdateOnMoveToggle from "../UpdateOnMoveToggle";

describe("UpdateOnMoveToggle", () => {
    it("renders the component correctly", () => {
        render(<UpdateOnMoveToggle />);
        const toggle = screen.getByText("Update on map move");
        expect(toggle).toBeInTheDocument();
    });
});

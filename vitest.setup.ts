import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

/**
 * Weird declaration to make vi.useFakeTimers work with testing-library screen
 *
 * https://github.com/vitest-dev/vitest/issues/3117
 * https://stackoverflow.com/questions/59459312/using-globalthis-in-typescript
 * https://github.com/microsoft/TypeScript/issues/30139
 */
declare global {
    // eslint-disable-next-line no-var
    var jest: typeof vi;
}

globalThis.jest = vi;

afterEach(() => {
    cleanup();
});

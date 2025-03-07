import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// TODO: Fix this typing issue, its too late and Im just trying to bang out tests right now
globalThis.jest = vi;

afterEach(() => {
    cleanup();
});

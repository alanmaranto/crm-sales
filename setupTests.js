import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { setLogger } from "react-query";
import { handlers } from "./src/__tests__/utils";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

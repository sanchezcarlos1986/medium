import { customString } from "./customString";

describe.each`
  receivedString                                                                       | expectedResult
  ${{ context: "My custom web", component: "home page", action: "get information" }}   | ${"my-custom-web.home-page.get-information"}
  ${{ context: "jest and typescript", component: "utils", action: "testing strings" }} | ${"jest-and-typescript.utils.testing-strings"}
`("passcode", ({ receivedString, expectedResult }) => {
  test(`get string ${expectedResult}`, () => {
    const result = customString(receivedString);
    expect(result).toBe(expectedResult);
  });
});

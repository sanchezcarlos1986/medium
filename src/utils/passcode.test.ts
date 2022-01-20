import { passcode } from "./passcode";

describe.each`
  receivedString                | expectedResult
  ${"this is my password"}      | ${"timp"}
  ${"I am learning typescript"} | ${"ialt"}
  ${"jest is the best"}         | ${"jitb"}
`("passcode", ({ receivedString, expectedResult }) => {
  test("get passcode from a string", () => {
    const result = passcode(receivedString);
    expect(result).toBe(expectedResult);
  });
});

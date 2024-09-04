import { expect, test } from "vitest"
import { formatString } from "@/lib/utils.ts"

test("add a string with no uppercases and spaces, returns a string with first letter uppercase and spaces", () => {
  expect(formatString("hello world")).toBe("Hello world")
  expect(formatString("hello-world")).toBe("Hello world")
  expect(formatString("hello")).toBe("Hello")
})

import { expect, test } from "vitest"
import { formatString } from "@/lib/utils.ts"

test("add a string with no uppercases and spaces, returns a string with first letter uppercase and spaces", () => {
  // Test: string with spaces only
  expect(formatString("hello world")).toBe("Hello world")

  // Test: string with hyphens only
  expect(formatString("hello-world")).toBe("Hello world")

  // Test: string with a mix of spaces and hyphens
  expect(formatString("hello-world from-vitest")).toBe(
    "Hello world from vitest"
  )

  // Test: empty string
  expect(formatString("")).toBe("")

  // Test: string that's already capitalized
  expect(formatString("Already formatted")).toBe("Already formatted")

  // Test: string with numbers and special characters
  expect(formatString("123-this is a-test")).toBe("123 this is a test")

  // Test: single word input with hyphen
  expect(formatString("word-another")).toBe("Word another")

  // Test: string with uppercase letters in the middle
  expect(formatString("hello-World")).toBe("Hello World")

  // Test: string with special characters and hyphens
  expect(formatString("-hello-")).toBe(" hello ")
})

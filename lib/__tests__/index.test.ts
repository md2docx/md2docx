import { describe, expect, it, vi } from "vitest";
import { md2docx } from "../src/index";

// Mock the @m2d/core module
vi.mock("@m2d/core", () => ({
  toDocx: vi.fn().mockResolvedValue(new Blob()),
  DEFAULT_SECTION_PROPS: { plugins: [] },
}));

// Mock all plugin modules
vi.mock("@m2d/emoji", () => ({ emojiPlugin: vi.fn() }));
vi.mock("@m2d/html", () => ({ htmlPlugin: vi.fn() }));
vi.mock("@m2d/image", () => ({ imagePlugin: vi.fn() }));
vi.mock("@m2d/list", () => ({ listPlugin: vi.fn() }));
vi.mock("@m2d/math", () => ({ mathPlugin: vi.fn() }));
vi.mock("@m2d/mermaid", () => ({ mermaidPlugin: vi.fn() }));
vi.mock("@m2d/table", () => ({ tablePlugin: vi.fn() }));

describe("md2docx", () => {
  it("should convert basic markdown to docx", async () => {
    const markdown = "# Hello World";
    const result = await md2docx(markdown);
    expect(result).toBeInstanceOf(Blob);
  });

  it("should handle empty markdown", async () => {
    const result = await md2docx("");
    expect(result).toBeInstanceOf(Blob);
  });

  it("should accept custom docx properties", async () => {
    const docxProps = { title: "Test Doc", author: "Test Author" };
    const result = await md2docx("# Test", docxProps);
    expect(result).toBeInstanceOf(Blob);
  });

  it("should accept custom section properties", async () => {
    const sectionProps = { plugins: [] };
    const result = await md2docx("# Test", {}, sectionProps);
    expect(result).toBeInstanceOf(Blob);
  });

  it("should support different output types", async () => {
    const result = await md2docx("# Test", {}, undefined, "arraybuffer");
    expect(result).toBeInstanceOf(Blob);
  });

  it("should accept plugin properties", async () => {
    const pluginProps = {
      mermaid: { mermaidConfig: { theme: "dark" as const } },
      list: { bulletChar: "*" },
      table: { borderStyle: "single" },
      emoji: { shortcodes: true },
      image: { maxWidth: 500 },
    };
    // @ts-expect-error -- ok test
    const result = await md2docx("# Test", {}, undefined, "blob", pluginProps);
    expect(result).toBeInstanceOf(Blob);
  });

  it("should handle complex markdown with multiple features", async () => {
    const markdown = `
# Title

## Subtitle

- List item 1
- List item 2

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

**Bold text** and *italic text*

Math: $E = mc^2$

:smile: emoji
    `;
    const result = await md2docx(markdown);
    expect(result).toBeInstanceOf(Blob);
  });
});

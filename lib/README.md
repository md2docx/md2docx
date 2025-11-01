# @m2d/md2docx

[![test](https://github.com/md2docx/md2docx/actions/workflows/test.yml/badge.svg)](https://github.com/md2docx/md2docx/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/md2docx/md2docx/graph/badge.svg)](https://codecov.io/gh/md2docx/md2docx)
[![Version](https://img.shields.io/npm/v/@m2d/md2docx.svg?colorB=green)](https://www.npmjs.com/package/@m2d/md2docx)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/md2docx.svg)](https://www.npmjs.com/package/@m2d/md2docx)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/md2docx)

**The simplest way to convert Markdown → DOCX (Word).**
Batteries-included wrapper around all `@m2d/*` plugins and Unified — just **one import, one call**.

✅ Supports **GFM**, **HTML**, **tables**, **images**, **emoji**, **math (LaTeX)**, **Mermaid diagrams**, **frontmatter**, and more.
✅ Works in **Node.js & browser environments** (auto-skips unsupported plugins on server).
✅ Built on top of `@m2d/core` → produces real `.docx` files using `docx`.

---

## 🚀 Installation

```bash
# with pnpm
pnpm add @m2d/md2docx

# or npm
npm install @m2d/md2docx

# or yarn
yarn add @m2d/md2docx
```

---

## ✨ Quick Start

```ts
import { md2docx } from "@m2d/md2docx";
import { writeFileSync } from "node:fs";

const markdown = `
# Hello World 👋

- Supports **Markdown**
- Tables, math ($E = mc^2$), images, and more
`;

const docxBlob = await md2docx(markdown); // default outputType = 'blob'

// In Node: save to file
writeFileSync("output.docx", Buffer.from(await docxBlob.arrayBuffer()));
```

---

## 📦 API

```ts
md2docx(
  md: string,
  docxProps?: IDocxProps,
  defaultSectionProps?: ISectionProps,
  outputType?: OutputType, // "blob" | "buffer" | "base64" | "stream"
  pluginProps?: {
    mermaid?: MermaidOptions;
    list?: ListOptions;
    table?: TableOptions;
    emoji?: EmojiOptions;
    image?: ImageOptions;
  }
): Promise<OutputTypeResult>;
```

| Param                 | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `md`                  | Markdown string input.                                              |
| `docxProps`           | Passed directly to `@m2d/core` → document metadata, styles, etc.    |
| `defaultSectionProps` | Defaults for sections — page size, margins, plugins.                |
| `outputType`          | `"blob"` (browser default) — or `"buffer"`, `"base64"`, `"stream"`. |
| `pluginProps`         | Optional config passed to specific `@m2d/*` plugins.                |

---

## 🧠 What’s Included (Under the Hood)

| Feature                   | Plugin                                             |
| ------------------------- | -------------------------------------------------- |
| Markdown parsing          | `remark-parse`, `remark-gfm`, `remark-frontmatter` |
| Math (inline & block)     | `remark-math`, `@m2d/math`                         |
| HTML inside Markdown      | `@m2d/html` _(client-only)_                        |
| Emoji support             | `@m2d/emoji`                                       |
| Tables                    | `@m2d/table`                                       |
| Lists + task lists        | `@m2d/list`                                        |
| Images (URL, base64, SVG) | `@m2d/image` _(client-only)_                       |
| Mermaid diagrams          | `@m2d/mermaid`                                     |

👉 On **Node/server-side**, HTML & image plugins are skipped automatically to avoid DOM/canvas issues.

---

## 🛠 Example – Custom Options

```ts
import { md2docx } from "@m2d/md2docx";

await md2docx(
  markdown,
  { title: "My Doc", author: "Mayank" }, // docxProps
  undefined, // keep default section props
  "buffer", // outputType
  {
    image: { maxWidth: 500 },
    mermaid: { theme: "dark" },
  }
);
```

---

## ⚠️ Notes & Best Practices

- When using HTML (`<div>`, `<span>`, etc.), sanitize input if it's user-generated.
- For full control or custom Node pipelines, use lower-level packages like `@m2d/core`.
- Mermaid & image rendering may require browser/polyfill contexts.

---

## 📚 Related Packages

| Package               | Purpose                                       |
| --------------------- | --------------------------------------------- |
| `@m2d/core`           | Converts MDAST → DOCX using `docx`.           |
| `@m2d/html`           | Parses HTML nodes inside Markdown.            |
| `@m2d/image`          | Handles images, caching, base64, URLs.        |
| `@m2d/math`           | LaTeX equations → DOCX.                       |
| `@m2d/table`          | GitHub-style Markdown tables.                 |
| `@m2d/react-markdown` | Lightweight Markdown → React (exports MDAST). |

---

## 🤝 Contributing

Pull requests and issue reports welcome!
If your team uses this in production, please consider **starring the repo** or posting feedback.

---

## 📜 License

## MPL-2.0 © Mayank Chaudhari and contributors

<p align="center">Made with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

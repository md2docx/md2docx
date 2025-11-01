import { type IDocxProps, type ISectionProps, toDocx } from "@m2d/core";
import { DEFAULT_SECTION_PROPS } from "@m2d/core/utils";
import { emojiPlugin } from "@m2d/emoji";
import { htmlPlugin } from "@m2d/html";
import { imagePlugin } from "@m2d/image";
import { listPlugin } from "@m2d/list";
import { mathPlugin } from "@m2d/math";
import { mermaidPlugin } from "@m2d/mermaid";
import { tablePlugin } from "@m2d/table";
import type { OutputType } from "docx";
import type { Root } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

export const md2docx = (
  md: string,
  docxProps: IDocxProps = {},
  defaultSectionProps: ISectionProps = DEFAULT_SECTION_PROPS,
  outputType: OutputType = "blob",
  pluginProps?: {
    mermaid?: Parameters<typeof mermaidPlugin>[0];
    list?: Parameters<typeof listPlugin>[0];
    table?: Parameters<typeof tablePlugin>[0];
    emoji?: Parameters<typeof emojiPlugin>[0];
    image?: Parameters<typeof imagePlugin>[0];
  },
) => {
  const processor = unified().use([
    remarkParse,
    remarkGfm,
    remarkMath,
    remarkFrontmatter,
  ]);

  const mdast = processor.parse(md) as Root;

  if (!defaultSectionProps.plugins?.length) {
    const plugins = [
      mermaidPlugin(pluginProps?.mermaid),
      htmlPlugin(),
      listPlugin(pluginProps?.list),
      mathPlugin(),
      tablePlugin(pluginProps?.table),
      emojiPlugin(pluginProps?.emoji),
      imagePlugin(pluginProps?.image),
    ];
    defaultSectionProps.plugins =
      typeof window === "undefined"
        ? plugins.slice(2, -1) // server-side: skip html & image plugins
        : plugins;
  }

  return toDocx(mdast, docxProps, defaultSectionProps, outputType);
};

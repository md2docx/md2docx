import type { IDocxProps, ISectionProps } from "@m2d/core";
import { type Mdast2DocxPluginProps, remarkDocx } from "@m2d/remark-docx";
import type { OutputType } from "docx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

export const md2docx = async (
  md: string,
  docxProps: IDocxProps = {},
  sectionProps?: ISectionProps,
  outputType: OutputType = "blob",
  pluginProps?: Mdast2DocxPluginProps,
) => {
  const processor = unified().use([
    remarkParse,
    remarkGfm,
    remarkMath,
    remarkFrontmatter,
    [remarkDocx, outputType, docxProps, sectionProps, pluginProps],
  ]);
  const res = await processor.process(md);
  return res.result;
};

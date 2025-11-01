import { readFileSync } from "node:fs";
import { md2docx } from "@m2d/md2docx";
import { NextResponse } from "next/server";

/**
 * Generate a docx file from markdown on server side.
 * @returns docx file
 */
export const GET = async () => {
  const md = readFileSync("../../sample.md", "utf-8");
  const buffer = await md2docx(md, {}, undefined, "arraybuffer");
  return new NextResponse(new Uint8Array(buffer as ArrayBuffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="sample.docx"',
    },
  });
};

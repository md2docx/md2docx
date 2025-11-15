"use client";

import { md2docx } from "@m2d/md2docx";
import { useState } from "react";
import md from "../../../../../sample.md?raw";
import { CodeDisplay } from "./code-display";
import styles from "./demo.module.scss";
// skipcq: JS-R1001
import demoCode from "./demo.tsx?raw";

/** React live demo */
export function Demo() {
  const [loading, setLoading] = useState(false);

  const downloadDocx = () => {
    setLoading(true);

    md2docx(md).then((blob, ...others) => {
      console.log({ blob, others });
      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-document.docx";
      link.click();
      URL.revokeObjectURL(url);
      setLoading(false);
    });
  };

  // console.log(docxProcessor.processSync(md));

  const code: { filename: string; code: string }[] = [
    { filename: "sample.md", code: md },
    { filename: "demo.tsx", code: demoCode },
  ];
  return (
    <div className={styles.demo}>
      <h1>MDAST (Markdown Abstract Syntax Tree) to DOCX</h1>
      <button
        className={styles.btn}
        disabled={loading}
        onClick={downloadDocx}
        type="button"
      >
        {loading ? "Downloading..." : "Download as DOCX"}
      </button>
      <CodeDisplay code={code} />
      {/* <pre>{JSON.stringify(mdast, null, 2)}</pre> */}
    </div>
  );
}

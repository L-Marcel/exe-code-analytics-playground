import { Analytic, AnalyticFile } from "@lmarcel/exe-code-analytics";
import highlight from "json-highlight";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from "../components/search";

const CodeMirror = dynamic<any>(() => {
  import("codemirror/mode/xml/xml");
  import("codemirror/mode/javascript/javascript");

  return import("react-codemirror");
}, { ssr: false });

function Home() {
  const [mime, setMime] = useState("txt");
  const [text, setText] = useState(` Analytic version: ${Analytic.getVersion()}` +
  `\n\n Put your code here to test.` +
  `\n\n Simulate commit -> create a fake commit to test churn;` + 
  `\n\n Complexity -> file cyclomatic complexity (unavaliable for Python);` +
  `\n Churn -> number of time that a file is changed (commited);` +
  `\n Sloc -> number of non-empty lines;` +
  `\n Methods -> all methods found in the code;` +
  `\n Classes -> all classes found in the code.` +
  `\n\n Files with the same name in a commit indicate a change, ` + 
  `\n Exe Code Analytics use this to calculate the churn.`);

  const [result, setResult] = useState<any>(null);
  const [files, setFiles] = useState<AnalyticFile[]>([
    {
      path: "realtime.txt",
      content: ""
    }
  ]);

  const handleGetAnalytics = useRef(debounce((text: string, currentFiles: AnalyticFile[]) => {
    const newfiles = currentFiles.map((c, i) => {
      if(i === currentFiles.length - 1) {
        return {
          ...c,
          content: text
        };
      };

      return c;
    });

    setFiles(newfiles);

    const analytic = new Analytic(newfiles);
    const result = analytic.execute();
    const lastIndex = result.length - 1;
    
    setResult(result.length >= 1? {
      ...result[lastIndex],
      content: result[lastIndex].content.length > 200? result[lastIndex].content.slice(0, 200) + "...":result[lastIndex].content
    }:{});
  }, 500));

  const handleSaveFile = useCallback(() => {
    setFiles(f => [...f, f[f.length - 1]]);
  }, [setFiles]);

  useEffect(() => {
    if(text !== files[files.length - 1].content || result === null || ((files[files.length - 1].churn || 0) < (files.length - 1) && files.length > 1)) {
      handleGetAnalytics.current(text, files);
    };
  }, [text, files, result]);

  useEffect(() => {
    let fileMime = "";
    const file = files[files.length - 1];

    if(file.path.includes(".")) {
      const [_, _mime] = file.path.split(".");
      fileMime = _mime;
    };

    if(fileMime !== mime) {
      setFiles(f => {
        const data = f[f.length - 1];
        let path = data.path;
        
        if(data.path.includes(".")) {
          const [_path, _] = data.path.split(".");
          path = _path + "." + mime;
        };
  
        return [...f, { ...data, path }];
      })
    };
  }, [mime, files, setFiles]);

  return (
    <>
      <Head>
        <title>Exe Code Analytics</title>
      </Head>
      <div
        className="
          flex
          w-screen
          flex-col
          md:flex-row
          items-center
          h-screen
          relative
        "
      >
        <div
          className="
            flex
            relative
            flex-col
            w-full
            md:w-8/12
            h-4/6
            md:h-full
          "
        >
          <div
            className="
              h-10
              w-full
              bg-zinc-900
              flex
              z-20
              justify-end
              gap-x-[1px]
            "
          >
            <Search
              onSelect={m => setMime(m)}
            />
            <button
              className="
                flex
                text-zinc-100
                bg-zinc-600
                px-4
                py-1.5
                outline-none
                hover:bg-zinc-500
                ring-gray-400
                h-full
                hover:ring-2
                focus:ring-2
                focus-visible:ring-2
                ring-offset-2
                ring-offset-zinc-800
                opacity-50
                hover:opacity-100
                transition-opacity
              "
              onClick={handleSaveFile}
            >commit</button>
            {/*<button
              className="
                flex
                text-zinc-100
              bg-zinc-600
                px-4
                py-1.5
                outline-none
                hover:bg-zinc-500
                ring-gray-400
                h-full
                hover:ring-2
                focus:ring-2
                focus-visible:ring-2
                ring-offset-2
                ring-offset-zinc-800
                opacity-50
                hover:opacity-100
                transition-opacity
              "
              onClick={handleSaveFile}
            >help</button>*/}
          </div>
          <CodeMirror
            value={text}
            onChange={(t:any) => setText(t)}
            options={{
              theme: "dracula",
              lineNumbers: true,
              mode: mime
            }}
          />
        </div>
        <pre
          className="
            p-4
            flex
            flex-nowrap
            text-zinc-200
            w-full
            md:w-4/12
            h-2/6
            text-sm
            md:h-full
            overflow-x-auto
            scrollbar-thin
            scrollbar-thumb-zinc-400
            scrollbar-track-zinc-700
            items-start
            md:items-start
            whitespace-pre-wrap
          "
        >
          <code
            dangerouslySetInnerHTML={{
              __html: highlight(JSON.stringify({ commits: files.length, result } as any, null, 2))
            }}
          />
        </pre>
        <a 
          href="https://l-marcel.vercel.app"
          className="
            absolute
            bottom-8
            md:top-4
            right-12
            md:right-6
            text-zinc-300
            hover:underline
            underline-offset-4
            h-min
            px-1
          "
        >
          @l-marcel
        </a>
        <div
          className="
            flex
            md:hidden
            h-6
            w-full
            bg-zinc-800
          "
        />
      </div>
    </>
  );
}

export default Home;

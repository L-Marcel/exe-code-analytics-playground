import { Analytic, AnalyticFile } from "@lmarcel/exe-code-analytics";
import highlight from "json-highlight";
import { debounce } from "lodash";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from 'react';

function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({});
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

    setResult(result.length >= 1? {
      ...result[0],
      content: result[0].content.length > 200? result[0].content.slice(0, 200) + "...":result[0].content
    }:{});
  }, 500));

  const handleSaveFile = useCallback(() => {
    setFiles(f => [...f, f[f.length - 1]]);
  }, [setFiles]);

  useEffect(() => {
    if(text !== files[files.length - 1].content) {
      handleGetAnalytics.current(text, files);
    };
  }, [text, files]);

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
            w-full
            md:w-8/12
            h-4/6
            md:h-full
          "
        >
          <button
            className="
              flex
              absolute
              top-[-4px]
              z-10
              right-6
              bg-zinc-400
              px-4
              py-1.5
              rounded-b-md
              outline-none
              hover:bg-zinc-300
              ring-gray-400
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
          >simulate commit: {files.length}</button>
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key == 'Tab') {
                e.preventDefault();
                var start = e.currentTarget.selectionStart;
                var end = e.currentTarget.selectionEnd;
            
                e.currentTarget.value = e.currentTarget.value.substring(0, start) +
                  "\t" + e.currentTarget.value.substring(end);
            
                e.currentTarget.selectionStart =
                e.currentTarget.selectionEnd = start + 1;
              }
            }}
            placeholder={`Put your code here to test.` +
            `\n\nSimulate commit -> create a fake commit to test churn;` + 
            `\n\nComplexity -> file cyclomatic complexity;` +
            `\nChurn -> number of time that a file is changed (commited);` +
            `\nSloc -> number of non-empty lines;` +
            `\nMethods -> all methods found in the code;` +
            `\nClasses -> all classes found in the code.` +
            `\n\nFiles with the same name in a commit indicate a change, ` + 
            `Exe Code Analytics use this to calculate the churn.` +
            `\n\nNote: to maintain performance in the playground, churn ` +
            `is update when file is changed.`
            }
            className="
              accent-zinc-50
              text-zinc-200
              bg-zinc-800
              resize-none
              overflow-y-auto
              scrollbar-thin
              scrollbar-thumb-zinc-400
              scrollbar-track-zinc-700
              placeholder:text-zinc-400
              outline-none
              ring-gray-400
              hover:ring-2
              focus:ring-2
              focus-visible:ring-2
              absolute
              w-full
              h-full
              top-0
              p-4
            "
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
              __html: highlight(JSON.stringify(result, null, 2))
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

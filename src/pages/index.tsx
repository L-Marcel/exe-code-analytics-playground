import { Analytic, AnalyticFile } from "@lmarcel/exe-code-analytics";
import highlight from "json-highlight";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from 'react';

function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({});

  const handleGetAnalytics = useRef(debounce((text: string) => {
    let files: AnalyticFile[] = [
      {
        path: "realtime.txt",
        content: text
      }
    ];

    const analytic = new Analytic(files);
    const result = analytic.execute();

    setResult(result.length >= 1? {
      ...result[0],
      content: result[0].content.length > 200? result[0].content.slice(0, 200) + "...":result[0].content
    }:{});
  }, 500));

  useEffect(() => {
    handleGetAnalytics.current(text);
  }, [text]);

  return <div
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
      placeholder="Put your code here."
      className="
        accent-zinc-50
        text-zinc-200
        p-4
        w-full
        md:w-8/12
        h-4/6
        md:h-full
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
      "
    />
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
        items-center
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
  </div>;
}

export default Home;

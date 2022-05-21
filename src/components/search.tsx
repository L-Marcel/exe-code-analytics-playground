import { Combobox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

interface SearchProps {
  onSelect: (mime: string, mode: string) => void;
};

const languages = [
  { id: 1, name: "JavaScript", mime: "js", mode: "text/javascript" },
  { id: 2, name: "TypeScript", mime: "ts", mode: "text/typescript" },
  { id: 3, name: "JavaScript (JSX)", mime: "jsx", mode: "text/jsx" },
  { id: 4, name: "TypeScript (TSX)", mime: "tsx", mode: "text/typescript-jsx" },
  { id: 5, name: "Java", mime: "java", mode: "text/x-java" },
  { id: 6, name: "Python", mime: "py", mode: "text/x-python" },
  { id: 7, name: "Text", mime: "txt", mode: "text" },
  { id: 8, name: "HTML", mime: "html", mode: "text/html" }
];

function Search({ onSelect }: SearchProps) {
  const [selectedLang, setSelectedLang] = useState(languages[3]);
  const [query, setQuery] = useState("");

  const filteredLanguages =
    query === ""
      ? languages
      : languages.filter((lang) => {
          return lang.name.toLowerCase().includes(query.toLowerCase())
        });

  useEffect(() => {
    onSelect(selectedLang.mime, selectedLang.mode);
  }, [onSelect, selectedLang]);

  return (
    <Combobox 
      value={selectedLang} 
      onChange={setSelectedLang}
    >
      <div       
        className="
          flex
          flex-col
          relative
        "
      >
        <Combobox.Input
          className="
            flex
            text-zinc-100
            bg-zinc-600
            px-4
            pb-[.2rem]
            outline-none
            hover:bg-zinc-500
            ring-gray-400
            h-10
            !min-h-[2.5rem]
            w-40
            hover:ring-2
            focus:ring-2
            focus-visible:ring-2
            ring-offset-2
            ring-offset-zinc-800
            opacity-50
            hover:opacity-100
            transition-opacity
          "
          onChange={(e: any) => setQuery(e.currentTarget.value)}
          displayValue={(p: any) => p.name}
        />
        <Combobox.Button 
          className="
            absolute 
            right-0 
            top-[.6rem] 
            flex 
            items-center 
            pr-2
          "
        >
          <SelectorIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Combobox.Options
          className="
            bg-zinc-600
            rounded-b-xl
          "
        >
          {filteredLanguages.map((lang) => (
            <Combobox.Option
              key={lang.id}
              value={lang}
              onClick={() => setSelectedLang(lang)}
              className="
                bg-zinc-300
                hover:bg-zinc-200
                cursor-pointer
                select-none 
                px-4
                py-3
              "
            >
              {lang.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
};

export { Search };

import { Dialog, Transition } from "@headlessui/react";
import { getVersion } from "@lmarcel/exe-code-analytics";
import { Fragment, useState } from "react";

function HelpModal() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="
          flex
          text-zinc-100
        bg-zinc-600
          px-4
          py-2
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
      >Help</button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="
            fixed
            z-50
            top-0
          "
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="
                fixed 
                inset-0 
                w-screen
                h-screen
                backdrop-blur-sm
                -backdrop-hue-rotate-15
              "
            />
          </Transition.Child>
          <div
            className="
              flex
              items-center 
              justify-center 
              p-4 
              text-center
              w-screen
              h-screen
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
                  w-full
                  md:max-w-md
                  lg:max-w-lg 
                  xl:max-w-xl
                  fixed
                  transform 
                  overflow-hidden 
                  rounded-2xl 
                  bg-zinc-900
                  text-zinc-200
                  p-6 
                  text-left 
                  align-middle 
                  shadow-xl 
                  transition-all
                "
              >
                <h2
                  className="
                    font-bold
                    text-xl
                  "
                >Need some help??</h2>
                <p
                  className="
                    mb-4
                  "
                >
                  It{`'`}s simple!
                </p>

                <p
                  className="
                    mb-4
                  "
                >
                  Put your code in the editor to test after changing the current language to your preference. 
                  Some languages ​​are not fully supported or covered.
                </p>

                <h5
                  className="
                    font-semibold
                    text-lg
                  "
                >Available metrics:</h5>
                <ul
                  className="
                    mb-4
                  "
                >
                  <li><span className="text-teal-300">Complexity</span> - file cyclomatic complexity (unavailable for Python);</li>
                  <li><span className="text-teal-300">Churn</span> - number of time that a file is changed (commited);</li>
                  <li><span className="text-teal-300">Sloc</span> - number of non-empty lines;</li>
                  <li><span className="text-teal-300">Methods</span> - all methods found in the code;</li>
                  <li><span className="text-teal-300">Classes</span> - all classes found in the code.</li>
                </ul>

                <p
                  className="
                    mb-4
                  "
                >
                  <span
                    className="
                      font-medium
                      text-lg
                    "
                  >Analytic version:</span> <span className="text-teal-300">{getVersion()}</span>
                </p>
                
                <p>
                  Files with the same name in a commit indicate a change, Exe Code Analytics use this to calculate the churn.
                  You can simulate a commit by clicking in {`"commit"`}.
                </p>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="
                    flex
                    text-zinc-900
                    bg-zinc-300
                    px-4
                    py-1.5
                    outline-none
                    hover:bg-zinc-400
                    ring-gray-400
                    h-full
                    hover:ring-2
                    focus:ring-2
                    focus-visible:ring-2
                    ring-offset-2
                    ring-offset-zinc-800
                    transition-opacity
                    rounded-md
                    mt-5
                  "
                >
                  Thanks!
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export { HelpModal };

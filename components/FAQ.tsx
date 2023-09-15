import React from "react";

export interface FAQProps {
  // make a attribute that is structured like {"question": "answer"}
  list: { [question: string]: string };
}

function FAQ({ list }: FAQProps) {
  return (
    <div className="flex items-center justify-center w-[100%]">
      <div className="w-full max-w-lg px-10 py-8 mx-auto rounded-lg shadow-xl text-left">
        {Object.entries(list).map(([question, answer]) => (
          <details className="w-full dark:bg-black bg-white border border-green-800 cursor-pointer mb-3 shadow-xl">
            <summary className="w-full dark:bg-black bg-white text-dark flex justify-between px-4 py-3 after:content-['+']">
              {question}
            </summary>
            <p className="px-4 py-3 font-light">{answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default FAQ;

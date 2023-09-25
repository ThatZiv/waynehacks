import React from "react";

interface FAQList {
  // make a attribute that is structured like {"question": "answer"}
  [question: string]: string;
}

function FAQ() {
  const list: FAQList = {
    "What is a Hackathon?":
      "A hackathon is an event where programmers get together for a short period of time to collaborate and create a project." +
      " Attending these events and participating is a great resume booster!",

    "I am a beginner and don't know how to code, can I still participate?": `Anyone can participate! We welcome all beginners to experts in development.
      Hackathons are a perfect place to learn new skills and find out what it takes to build an application!`,

    "Can I work alone or in a team?":
      "Teams can consist of 1-4 members. Don't worry if you do not have a team! We will have an event to find team members.",

    "Where do I sign up!": `You must create an account by hitting 'login' at the top of the page and using your school email.
      Once signed up, we will send you an email when registrations are available.`,

    // DO THIS WHEN YOU CAN REGISTER
    // "Where do I sign up!": `You must create an account by hitting 'login' at the top of the page and using your school email.
    // Then you can register for the event by hitting 'register' at the home page.`,

    "I signed up...now what?":
      "We will send you an email with more information as the event gets closer.",
  };

  return (
    <div className="flex items-center justify-center w-[100%]">
      <div className="w-full max-w-lg px-10 py-8 mx-auto rounded-lg shadow-xl text-left">
        {Object.entries(list).map(([question, answer]) => (
          <details className="w-full dark:bg-black bg-white border border-neutral-800 cursor-pointer hover:border-yellow-600 mb-3 shadow-xl">
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

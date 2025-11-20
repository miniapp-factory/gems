"use client";

import { useState } from "react";
import QuizResult from "./quiz-result";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const rawQuestions = [
  {
    question: "What is your favorite type of food?",
    options: [
      { text: "Meat", animal: "dog" },
      { text: "Fish", animal: "cat" },
      { text: "Plants", animal: "hamster" },
      { text: "Anything", animal: "horse" },
    ],
  },
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Playing fetch", animal: "dog" },
      { text: "Sleeping in sunbeams", animal: "cat" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Racing across fields", animal: "horse" },
    ],
  },
  {
    question: "What is your preferred habitat?",
    options: [
      { text: "Urban parks", animal: "dog" },
      { text: "Cozy corners", animal: "cat" },
      { text: "Hidden burrows", animal: "hamster" },
      { text: "Open meadows", animal: "horse" },
    ],
  },
  {
    question: "How do you like to communicate?",
    options: [
      { text: "Bark loudly", animal: "dog" },
      { text: "Purr softly", animal: "cat" },
      { text: "Squeak quietly", animal: "hamster" },
      { text: "Whinny proudly", animal: "horse" },
    ],
  },
  {
    question: "What is your personality like?",
    options: [
      { text: "Friendly and loyal", animal: "dog" },
      { text: "Independent and curious", animal: "cat" },
      { text: "Energetic and playful", animal: "hamster" },
      { text: "Strong and noble", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite color?",
    options: [
      { text: "Red", animal: "fox" },
      { text: "Blue", animal: "cat" },
      { text: "Green", animal: "hamster" },
      { text: "Yellow", animal: "dog" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    rawQuestions.map((q) => ({ ...q, options: shuffleArray(q.options) }))
  );
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<string>("");

  const handleAnswer = (animal: string) => {
    const newScores = { ...scores, [animal]: scores[animal] + 1 };
    setScores(newScores);
    if (current + 1 < shuffledQuestions.length) {
      setCurrent(current + 1);
    } else {
      const max = Math.max(...Object.values(newScores));
      const best = Object.entries(newScores).find(([, v]) => v === max)?.[0] ?? "cat";
      setResultAnimal(best);
      setShowResult(true);
    }
  };

  if (showResult) {
    return <QuizResult animal={resultAnimal} />;
  }

  const { question, options } = shuffledQuestions[current];

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{question}</h2>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt.text}
            onClick={() => handleAnswer(opt.animal)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

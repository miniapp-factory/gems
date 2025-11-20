"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function QuizResult({ animal }: { animal: string }) {
  const imageSrc = `/${animal}.png`;
  const shareText = `I just found out I'm a ${animal}! Check it out: ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={imageSrc} alt={animal} width={512} height={512} className="size-64" />
      <h2 className="text-2xl font-bold">{animal.charAt(0).toUpperCase() + animal.slice(1)}</h2>
      <Share text={shareText} />
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Retake Quiz
      </button>
    </div>
  );
}

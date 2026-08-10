import { useState } from "react";
import { driveEmbed } from "@/lib/projects";

export function DrivePlayer({
  driveId,
  poster,
  title,
  className = "",
  ratio = "aspect-[16/9]",
}: {
  driveId: string;
  poster: string;
  title: string;
  className?: string;
  ratio?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`group relative overflow-hidden bg-card ${ratio} ${className}`}>
      {playing ? (
        <iframe
          src={driveEmbed(driveId)}
          title={`${title} — film`}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          data-cursor="PLAY"
          aria-label={`Play ${title}`}
          className="absolute inset-0 h-full w-full"
        >
          <img
            src={poster}
            alt={`${title} — cinematic still`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <span className="absolute bottom-5 left-5 label text-foreground/80">Play film →</span>
        </button>
      )}
    </div>
  );
}

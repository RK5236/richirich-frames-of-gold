import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getDriveVideoUrl } from "@/lib/drive.functions";

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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchVideoUrl = useServerFn(getDriveVideoUrl);

  const handlePlay = async () => {
    if (videoUrl) {
      setPlaying(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    try {
      const { url } = await fetchVideoUrl({ data: { driveId } });
      setVideoUrl(url);
      setPlaying(true);
    } catch (e) {

      console.error("Failed to load drive video URL", e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`group relative overflow-hidden bg-card ${ratio} ${className}`}>
      {playing && videoUrl ? (
        <video
          src={videoUrl}
          title={`${title} — film`}
          controls
          autoPlay
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 h-full w-full bg-black object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          data-cursor="PLAY"
          aria-label={`Play ${title}`}
          className="absolute inset-0 h-full w-full"
        >
          <img
            src={poster}
            alt={`${title} video poster frame by Richi Rich`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <span className="absolute bottom-5 left-5 label text-foreground/80">
            {isLoading ? "Loading film…" : error ? "Retry film →" : "Play film →"}
          </span>
        </button>
      )}
    </div>
  );
}


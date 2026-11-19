"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import controls from "@/content/media-controls.json";

const POSTER = "/videos/manifesto-room-poster.jpg";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(listener: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

const motionAllowed = () => !window.matchMedia(MOTION_QUERY).matches;
const serverMotionAllowed = () => false;

/** The original three-scene service film, revealed only in the live chapter. */
export function ServiceBackdrop() {
  const { locale } = useWebsiteI18n();
  const copy = controls[locale as keyof typeof controls];
  // Server and hydration start with the same still. Reduced-motion visitors
  // never mount a video or request either media source.
  const allowMotion = useSyncExternalStore(subscribeMotion, motionAllowed, serverMotionAllowed);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const failedFormats = useRef(new Set<string>());
  const [inView, setInView] = useState(false);
  const [hasSource, setHasSource] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const showVideo = allowMotion && hasSource && !failed;

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio > 0;
      setInView(visible);
      if (visible) setHasSource(true);
    }, { threshold: 0.01 });
    observer.observe(media);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (inView && !userPaused && !document.hidden) {
        void video.play().catch(() => { /* The play control and poster remain available. */ });
      } else video.pause();
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [inView, userPaused, showVideo]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      void video.play().catch(() => { /* Keep the static poster if playback is unavailable. */ });
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  const sourceFailed = (format: string) => {
    failedFormats.current.add(format);
    if (failedFormats.current.size === 2) setFailed(true);
  };

  const label = playing ? copy.pause : copy.play;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" data-service-backdrop>
      <div ref={mediaRef} aria-hidden="true" className="absolute inset-x-0 top-0 h-[400px] sm:h-[580px] lg:h-[800px]">
        <div
          className="absolute inset-0 overflow-hidden opacity-[0.68] [html.light_&]:opacity-[0.58]"
          style={{ maskImage: "linear-gradient(to bottom, black 0%, black 58%, transparent 100%)" }}
        >
          <Image
            src={POSTER}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="scale-125 object-cover object-[35%_50%] lg:object-center"
          />
          {showVideo && (
            <video
              ref={videoRef}
              data-service-video
              className="absolute inset-0 h-full w-full scale-125 object-cover object-[35%_50%] transition-opacity duration-700 motion-reduce:transition-none lg:object-center"
              style={{ opacity: ready ? 1 : 0 }}
              muted
              loop
              playsInline
              preload="none"
              poster={POSTER}
              onLoadStart={() => setReady(false)}
              onLoadedData={() => setReady(true)}
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={event => {
                // React also bubbles individual <source> errors here. Let the
                // browser try MP4 when WebM is unavailable before using the still.
                if (event.currentTarget.error) setFailed(true);
              }}
            >
              <source src="/videos/manifesto-room.webm" type="video/webm" onError={() => sourceFailed("webm")} />
              <source src="/videos/manifesto-room.mp4" type="video/mp4" onError={() => sourceFailed("mp4")} />
            </video>
          )}
        </div>
        <div className="absolute inset-0 opacity-60 mix-blend-soft-light" style={{ background: "radial-gradient(ellipse 85% 75% at 64% 30%, rgba(233,162,74,.55), transparent 62%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 58% at 50% 30%, color-mix(in srgb, var(--navy-deep) 72%, transparent), color-mix(in srgb, var(--navy-deep) 30%, transparent) 55%, transparent 80%)" }} />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--navy-deep)] to-transparent" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--navy-deep), transparent 14%, transparent 86%, var(--navy-deep))" }} />
      </div>
      {showVideo && (
        <button
          type="button"
          data-service-video-toggle
          className="pointer-events-auto absolute end-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--navy-deep)]/80 text-[var(--text-primary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-warm)] sm:end-6"
          aria-label={label}
          title={label}
          onClick={togglePlayback}
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

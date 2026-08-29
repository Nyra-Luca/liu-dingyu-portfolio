import { useState } from "react";

function ImageFrame({
  src,
  alt,
  className = "",
  label,
  ratio = "aspect-[4/3]",
  fit = "cover",
  objectPosition = "center",
  imageClassName = "",
  priority = false,
}) {
  const [failed, setFailed] = useState(false);
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`image-frame ${ratio} relative w-full min-w-0 max-w-full overflow-hidden bg-card ${className}`}
      aria-label={alt}
    >
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={`h-full w-full ${fitClass} [backface-visibility:hidden] [image-rendering:auto] ${imageClassName}`}
          style={{ objectPosition }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="h-full rounded-sm border border-line/70 bg-[linear-gradient(135deg,rgba(94,131,160,0.12),rgba(177,89,79,0.08)),linear-gradient(rgba(47,52,55,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(47,52,55,0.05)_1px,transparent_1px)] bg-[length:100%_100%,28px_28px,28px_28px]" />
          <p className="absolute bottom-5 left-5 right-5 text-xs uppercase tracking-[0.18em] text-ink/40">
            {label || "Image placeholder"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageFrame;

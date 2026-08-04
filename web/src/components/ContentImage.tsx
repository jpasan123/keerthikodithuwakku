import Image from "next/image";

type ContentImageProps = {
  src: string;
  alt: string;
  /** Show the full image without cropping (default) or fill the frame */
  fit?: "contain" | "cover";
  position?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Responsive image that keeps portraits, banners, and split graphics fully visible. */
export function ContentImage({
  src,
  alt,
  fit = "contain",
  position = "object-center",
  priority,
  sizes = "100vw",
  className = "",
}: ContentImageProps) {
  if (fit === "cover") {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${position} ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${className}`}
    />
  );
}

/** Framed container for card thumbnails — full image visible on a soft surface */
export function ContentImageFrame({
  src,
  alt,
  aspect = "aspect-[16/10]",
  fit = "contain" as "contain" | "cover",
  position = "object-center",
  priority,
  sizes,
  className = "",
}: ContentImageProps & { aspect?: string }) {
  return (
    <div
      className={`relative ${aspect} overflow-hidden ${fit === "contain" ? "bg-[#f5f4f0]" : "bg-kk-ink"} ${className}`}
    >
      {fit === "contain" ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-contain p-1.5 sm:p-2 ${position}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${position} transition duration-700 group-hover/card:scale-[1.05]`}
        />
      )}
    </div>
  );
}

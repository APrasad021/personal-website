import Image from "next/image";

export const shelves = ["currently-reading", "to-read", "read"];

export const getStars = (
  numStars: number,
  isHover: boolean = false,
  size: number = 15
) => {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(
      <Image
        src={isHover ? "/star_filled.svg" : "/star_outline.svg"}
        width={size}
        height={size}
        key={i}
        alt="Hand drawn Star"
        style={
          isHover
            ? {
                filter:
                  "invert(33%) sepia(35%) saturate(3204%) hue-rotate(153deg) brightness(91%) contrast(100%)",
              }
            : {}
        }
      />
    );
  }
  return stars;
};

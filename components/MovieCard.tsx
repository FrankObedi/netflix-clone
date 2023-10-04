import React from "react";
interface MovieCardProps {
  data: Record<string, any>;
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            group-hover:opacity-80
            sm:group-hover:opacity-0
            delay-50
            w-full
            h-[12vw]
        "
        src={data?.thumbnailUrl}
        alt={data?.title}
      />
      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-100
            z-10
            invisible
            sm:visible
            delay-50
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[2vw]
            group-hover:opacity-100
        "
      >
        <img
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-t-md
            w-full
            h-[12vw]
        "
          src={data?.thumbnailUrl}
          alt={data?.title}
        />
      </div>
    </div>
  );
};

export default MovieCard;

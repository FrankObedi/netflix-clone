import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <Link
      href={{
        pathname: `/watch/${movieId}`,
      }}
    >
      <button
        className="
            bg-white
            rounded-md
            py-1
            md:py-2
            px-2
            md:px-4
            w-auto
            text-sm
            lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-neutral-300
            transition
        "
      >
        <BsFillPlayFill className="mr-1" size={25} />
        Play
      </button>
    </Link>
  );
};

export default PlayButton;

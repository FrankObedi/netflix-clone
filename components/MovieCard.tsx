import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import useInfoModal from "@/hooks/useInfoModel";
import { BsChevronDown } from "react-icons/bs";

interface MovieCardProps {
  data: Record<string, any>;
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const { openModal } = useInfoModal();
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
            delay-100
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
            delay-100
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
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
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b
        "
        >
          <div className="flex flex-row items-center gap-3">
            <Link
              className="
                        cursor-pointer
                        w-6
                        h-6
                        lg:w-10
                        lg:h-10
                        bg-white
                        rounded-full
                        flex
                        justify-center
                        items-center
                        hover:bg-neutral-300
                    "
              href={{
                pathname: `/watch/${data?.id}`,
              }}
            >
              <BsFillPlayFill size={25} />
            </Link>
            <FavoriteButton movieId={data?.id} />
            <button
              onClick={() => openModal(data?.id)}
              className="
              ml-auto 
              group/item 
              w-6 
              h-6 
              lg:w-10 
              lg:h-10 
              border-white 
              border-2 
              rounded-full 
              flex 
              justify-center 
              items-center 
              transition 
              hover-border-neutral-300
              "
            >
              <BsChevronDown
                size={20}
                className="text-white group/item group-hover/item:text-neutral-300"
              />
            </button>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>

          <div className="flex flex-row items-center mt-4 gap-3">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.duration}
            </p>
          </div>

          <div className="flex flex-row items-center mt-4 gap-3">
            <p className="text-white text-[10px] lg:text-sm">{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

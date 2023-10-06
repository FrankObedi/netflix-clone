import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModel from "@/hooks/useInfoModel";
import useMovie from "@/hooks/useMovei";
useMovie;

FavoriteButton;
AiOutlineClose;
PlayButton;

interface InfoModelProps {
  visible: boolean;
  onClose: any;
}

const InfoModel: React.FC<InfoModelProps> = ({ visible, onClose }) => {
  const { isVisible, setIsVisible } = useState(!!visible);
  const movieId = useInfoModel();
  const { data = {} } = useMovie(undefined, movieId);
  return <div></div>;
};

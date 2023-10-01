import useSwr from "swr";

import fetcher from "@/libs/fetcher";

const CurrentUser = () => {
  const { data: user } = useSwr("/api/current", fetcher);
  // console.log(data);
  return <p>{user?.name}</p>;
};

export default CurrentUser;

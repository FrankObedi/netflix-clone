import React from "react";
import { signOut } from "next-auth/react";

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="flex bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="flex flew-row gap-3 items-center w-full group/item justify-center">
          <img
            className="w-8 rounded-md"
            src="/images/default-red.png"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline ">
            Username
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <button
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sing out of Netflix
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;

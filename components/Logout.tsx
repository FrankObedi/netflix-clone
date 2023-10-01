import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <>
      <button
        onClick={() => signOut()}
        className="w-1/2 h-10 text-white bg-red-400"
      >
        Logout
      </button>
    </>
  );
}

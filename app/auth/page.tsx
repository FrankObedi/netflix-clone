"use client";
import Input from "@/components/input";
import { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      // login after registering
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant == "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" && (
                <Input
                  id="name"
                  label="Name"
                  onChange={(e: any) => setname(e.target.value)}
                  type="text"
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant == "login" ? login : register}
              className="bg-red-600 py-2 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant == "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <button
                className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition                  
                  "
              >
                <FcGoogle size={30} />
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition                  
                  "
              >
                <FaGithub size={30} />
              </button>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant == "login"
                ? "New to Netflix?"
                : "Already have an account?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:uderline cursor-pointer"
              >
                {variant == "login" ? "Sign up now" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

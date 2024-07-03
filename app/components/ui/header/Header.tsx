"use client";
import React from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import Button from "../button/Button";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps) {
  const router = useRouter();

  const player = usePlayer();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleSignUp = async () => {
    authModal.setView("sign-up");
    authModal.onOpen();
  };

  const handleSignIn = async () => {
    authModal.setView("sign-in");
    authModal.onOpen();
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully!");
    }
  };

  return (
    <header
      className={twMerge(
        `
      h-fit
      bg-gradient-to-b
      from-emerald-800
      p-6
    `,
        className
      )}
    >
      <div
        className="
        w-full
        mb-4
        flex
        items-center
        justify-between
      "
      >
        <div
          className="
          hidden
          md:flex
          gap-x-2
          items-center
        "
        >
          <button
            onClick={() => router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="
          rounded-full
          p-2
          bg-white
          flex
          items-center
          justify-center
          cursor-pointer
          hover:opacity-75
          transition
          "
          >
            <HiHome className="text-black" size={20} />
          </button>

          <button
            onClick={() => router.push("/search")}
            className="
          rounded-full
          p-2
          bg-white
          flex
          items-center
          justify-center
          cursor-pointer
          hover:opacity-75
          transition
          "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
          flex
          justify-between
          items-center
          gap-x-4
        "
        >
          {user ? (
            <>
              <div>
                <Button
                  className="
              bg-white
              px-6
              py-2"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
              <div>
                <Button
                 onClick={() => router.push("/account")}
                className="
                  bg-white
                  ">
                  <FaUser className="text-black" size={20} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Button
                  className="
              bg-transparent
              text-neutral-300
              font-medium"
                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="
              bg-white
              px-6
              py-2"
                  onClick={handleSignIn}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
      {/* <span className={styles.header_title}>
        
          <span className={styles.logout_container}>
            <button className={styles.logout_button} onClick={handleLogout}>
              Log out
            </button>
            <span className={styles.logout_icon}>
              <UserSVG className={styles.logout_svg} />
            </span>
          </span>
        ) : (
          <span className={styles.logout_container}>
            
            <button
              className={styles.logout_button}
              style={{ width: "180px" }}
              onClick={authModal.onOpen}
            >
              Log in
            </button>
          </span>
        )}
      </span>

      <h1>Welcome back</h1>

      <div className={styles.play_lists_container}>
        <div className={styles.play_list}>
          <span className={styles.liked_song}>
            <HeartSVG />
          </span>
          <span className={styles.playlist_name}>Liked Songs</span>
        </div>
      </div> */}
    </header>
  );
}

export default Header;

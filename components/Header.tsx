"use client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header = ({ className, children }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    }
    toast.success("Logged Out");
  };
  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b
      from-cyan-900
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
            bg-black
            flex
            items-center
            justify-center
            rounded-full
            hover:opacity-75
            transition
          "
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              bg-black
              flex
              items-center
              justify-center
              rounded-full
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div
          className="
            flex
            items-center
            gap-x-2
            md:hidden
          "
        >
          <button
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
            <HiHome size={20} className="text-black" />
          </button>
          <button
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
            <BiSearch size={20} className="text-black" />
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
            <div
              onClick={handleLogout}
              className="
                flex
                gap-x-4
                justify-between
                items-center
                text-black
              "
            >
              <Button className="bg-white">Logout</Button>
              <Button
                className="rounded-full p-3 bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="
                      bg-transparent
                      text-neutral-400
                      hover:opacity-75
                      font-semibold
                    "
                >
                  Sign up!
                </Button>
              </div>
              <div>
                <Button
                  onClick={onOpen}
                  className="
                      bg-white
                      text-black
                      text-md
                      hover:opacity-75
                      transition
    
                    "
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;

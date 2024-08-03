"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
 const pathname = usePathname();

  return (
    <div className="flex p-4 items-center   justify-between bg-secondary shadow-sm ">
      <Image alt="Logo" src={"/logo.svg"} width={160} height={120} />
      <ul className="md:flex hidden gap-6">
        <li className={`hover:text-primary  hover:font-bold cursor-pointer transition-all 
            ${pathname === "/dashboard" && "text-primary font-bold"}
            `}>
          Dashboard{" "}
        </li>
        <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all 
            ${pathname === "/dashboard/questions" && "text-primary font-bold"}
            `}>
          Questions{" "}
        </li>
        <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all 
            ${pathname === "/dashboard/upgrade" && "text-primary font-bold"}
            `}>
          Upgrade{" "}
        </li>

        <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all 
            ${pathname === "/dashboard/how" && "text-primary font-bold"}
            `}>
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;

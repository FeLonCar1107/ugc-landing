import React, { use, useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Spin as Hamburger } from "hamburger-react";

export default function HamburgerMenu(props: any) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <React.Fragment>
      {isOpen && <Menu data={props} />}
      <Hamburger
        rounded
        size={25}
        color="#530424"
        distance="sm"
        direction="right"
        onToggle={handleClick}
      />
    </React.Fragment>
  );
}

function Menu(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { navigation, currentLanguage } = props.data;

  useEffect(() => {
    // isLinkActive();
  }, [pathname]);

  const linkClass = `block text-white text-[52px] leading-[60px] sm:text-7xl hover:text-black font-BeckanPersonal overflow-hidden ${
    pathname === "/" ? "text-jazzberry-jam-300" : ""
  }`;
  return (
    <div
      id="menu"
      className="fixed top-0 right-0 bg-jazzberry-jam-300 w-screen h-screen"
    >
      <ul className="w-full h-auto flex flex-col px-8 absolute bottom-10">
        <li>
          <Link href="/" className={linkClass}>
            {navigation.home.title.toUpperCase()}
          </Link>
        </li>
        {navigation.nav_options.map((option: any) => (
          <li key={option.id}>
            <Link
              href={option.href}
              onClick={() => router.push(`${currentLanguage}${option.href}`)}
              className={linkClass}
            >
              {option.title.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

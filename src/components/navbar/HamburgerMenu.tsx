import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Spin as Hamburger } from "hamburger-react";
import { IMenuProps } from "@/types/props/menu";
import { INavOption } from "@/types/nav-option";

export default function HamburgerMenu(props: IMenuProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <React.Fragment>
      {isOpen && <Menu {...props} />}
      <Hamburger
        rounded
        size={props?.size || 25}
        color={isOpen ? "#530424" : props?.color}
        distance="sm"
        direction="right"
        onToggle={handleClick}
      />
    </React.Fragment>
  );
}

function Menu(props: IMenuProps) {
  const router = useRouter();
  const { navigation, currentLanguage } = props;
  const [currentImage, setCurrentImage] = useState<string>(
    navigation.menu.image,
  );

  const handleMouseEnter = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  const handleMouseLeave = () => {
    setCurrentImage(navigation.menu.image);
  };

  return (
    <div
      id="menu"
      className="fixed top-0 right-0 bg-jazzberry-jam-200 w-screen h-screen flex justify-around items-center tilt-out-fwd-tl"
    >
      <div className="hidden lg:block relative w-[25%] h-0 pb-[30%] shadow-lg">
        <Image
          src={currentImage}
          alt="ILA Logo"
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          className="animated fadeIn"
        />
      </div>
      <ul className="w-full lg:w-auto h-full flex flex-col justify-center items-start lg:items-center gap-3 lg:gap-0 px-8 relative uppercase">
        <li>
          <Link href="/" className="link">
            <span className="mask">
              <div className="link-container">
                <span className="link-title-one title">
                  {navigation.home.title}
                </span>
                <span className="link-title-two title font-BeckanPersonal tracking-[0.3rem] text-jazzberry-jam-600">
                  {navigation.home.title}
                </span>
              </div>
            </span>
          </Link>
        </li>
        {navigation.nav_options.map((option: INavOption) => (
          <li
            key={option.id}
            onMouseEnter={() => handleMouseEnter(option.image)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={option.href}
              onClick={() => router.push(`${currentLanguage}${option.href}`)}
              className="link"
            >
              <span className="mask">
                <div className="link-container">
                  <span className="link-title-one title">{option.title}</span>
                  <span className="link-title-two title font-BeckanPersonal tracking-[0.3rem] text-jazzberry-jam-600">
                    {option.title}
                  </span>
                </div>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:block relative w-[25%] h-0 pb-[30%] shadow-lg">
        <Image
          src={currentImage}
          alt="ILA Logo"
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          className="animated fadeIn"
        />
      </div>
      {/* <Image
        src={flower}
        alt="flower"
        width={200}
        height={200}
        className="lg:hidden absolute -bottom-10 -right-10 -rotate-45"
      /> */}
    </div>
  );
}

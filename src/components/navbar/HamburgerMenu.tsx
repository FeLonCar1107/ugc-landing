import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
        size={props?.size || 25}
        color={props?.color || "#530424"}
        distance="sm"
        direction="right"
        onToggle={handleClick}
      />
    </React.Fragment>
  );
}

function Menu(props: any) {
  const router = useRouter();
  const { navigation, currentLanguage } = props.data;

  return (
    <div
      id="menu"
      className="fixed top-0 right-0 bg-jazzberry-jam-200 w-screen h-screen flex justify-around items-center tilt-out-fwd-tl"
    >
      <div className="hidden lg:block relative w-[20%] h-0 pb-[25%] shadow-lg">
        <Image
          src={
            "https://scontent.cdninstagram.com/v/t51.29350-15/449248694_496934582995989_6491671145130259660_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=MAJcGMzzRaEQ7kNvgE3sf6j&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AYDICsqcx7ucHI_AhcIGAgLmKmSgbHZ8bP3PLmvQCI-XNA&oe=669071A3"
          }
          alt="ILA Logo"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <ul className="w-auto h-full lg:h-full flex flex-col lg:justify-center lg:items-center px-8 absolute lg:relative uppercase">
        <li>
          <Link href="/" className="link">
            <span className="mask">
              <div className="link-container">
                <span className="link-title1 title">
                  {navigation.home.title}
                </span>
                <span className="link-title2 title font-BeckanPersonal tracking-[0.3rem] text-jazzberry-jam-600">
                  {navigation.home.title}
                </span>
              </div>
            </span>
          </Link>
        </li>
        {navigation.nav_options.map((option: any) => (
          <li key={option.id}>
            <Link
              href={option.href}
              onClick={() => router.push(`${currentLanguage}${option.href}`)}
              className="link"
            >
              <span className="mask">
                <div className="link-container">
                  <span className="link-title1 title">{option.title}</span>
                  <span className="link-title2 title font-BeckanPersonal tracking-[0.3rem] text-jazzberry-jam-600">
                    {option.title}
                  </span>
                </div>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:block relative w-[20%] h-0 pb-[25%] shadow-lg">
        <Image
          src={
            "https://scontent.cdninstagram.com/v/t51.29350-15/449248694_496934582995989_6491671145130259660_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=MAJcGMzzRaEQ7kNvgE3sf6j&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AYDICsqcx7ucHI_AhcIGAgLmKmSgbHZ8bP3PLmvQCI-XNA&oe=669071A3"
          }
          alt="ILA Logo"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { INavOption } from "@/types/nav-option";
import { IMenuProps } from "@/types/props/menu";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";

interface MenuProps {
  data: IMenuProps;
  closeMenu: () => void;
}

export default function Menu({ data, closeMenu }: MenuProps) {
  const { navigation } = data;
  const locomotiveScroll = useContext(LocomotiveScrollContext);
  const [currentImage, setCurrentImage] = useState<string>(
    navigation.menu.image,
  );

  const handleMouseEnter = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  const handleMouseLeave = () => {
    setCurrentImage(navigation.menu.image);
  };

  useEffect(() => {
    if (locomotiveScroll) locomotiveScroll.update();
  }, [locomotiveScroll]);

  const scrollTo = (target: string) => {
    closeMenu();
    if (locomotiveScroll) {
      locomotiveScroll.scrollTo(target, {
        duration: 1000,
        easing: [0.22, 0.22, 0.2, 1],
      });
    }
  };

  return (
    <div
      id="menu"
      className="fixed top-0 right-0 lg:-top-2 lg:-right-4 bg-jazzberry-jam-200 w-screen h-screen flex justify-around items-center"
    >
      <div className="hidden lg:block relative w-[17%] h-0 pb-[28%] shadow-lg">
        <Image
          src={currentImage}
          alt="Preview Image of the Menu Item"
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
            <Link href={option.href} className="link">
              <span className="mask" onClick={() => scrollTo(option.href)}>
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
      <div className="hidden lg:block relative w-[17%] h-0 pb-[28%] shadow-lg">
        <Image
          src={currentImage}
          alt="Preview Image of the Menu Item"
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          className="animated fadeIn"
        />
      </div>
    </div>
  );
}

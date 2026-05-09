import React, { useContext, useEffect, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { IMenuProps } from "@/types/props/menu";
import Menu from "@/components/navbar/Menu";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";

export default function HamburgerMenu(props: IMenuProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    if (!locomotiveScroll || !isOpen) return;
    locomotiveScroll.stop();
    return () => {
      locomotiveScroll.start();
      requestAnimationFrame(() => locomotiveScroll.update());
    };
  }, [isOpen, locomotiveScroll]);

  const handleModal = (value?: boolean) => {
    setOpen(value || !isOpen);
  };

  return (
    <React.Fragment>
      {isOpen && (
        <Menu
          data={props}
          closeMenu={() => {
            handleModal(false);
          }}
        />
      )}
      <Hamburger
        rounded
        size={props?.size || 25}
        color={isOpen ? "#530424" : props?.color}
        distance="sm"
        toggled={isOpen}
        direction="right"
        onToggle={handleModal}
      />
    </React.Fragment>
  );
}

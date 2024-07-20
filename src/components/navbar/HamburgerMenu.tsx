import React, { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { IMenuProps } from "@/types/props/menu";
import Menu from "@/components/navbar/Menu";

export default function HamburgerMenu(props: IMenuProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      {isOpen && <Menu {...props} />}
      <Hamburger
        rounded
        size={props?.size || 25}
        color={isOpen ? "#530424" : props?.color}
        distance="sm"
        direction="right"
        onToggle={() => setOpen(!isOpen)}
      />
    </React.Fragment>
  );
}

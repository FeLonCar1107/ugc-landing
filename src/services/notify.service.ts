import toast from "react-hot-toast";
import Notify from "@/enums/notify.enum";

const Icons: { [key: string]: string } = {
  [Notify.SUCCESS]: "🚀",
  [Notify.ERROR]: "😢",
  [Notify.WARNING]: "⚠️",
  [Notify.INFO]: "💡",
};

const Colors: { [key: string]: string } = {
  [Notify.SUCCESS]: "#22bb33",
  [Notify.ERROR]: "#bb2124",
  [Notify.WARNING]: "#f0ad4e",
  [Notify.INFO]: "#5bc0de",
};

export const notify = (message: string, type: string) => {
  toast(message, {
    icon: Icons[type],
    duration: 5000,
    position: "top-center",
    style: {
      color: "#fff",
      borderRadius: "5px",
      background: Colors[type],
    },
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};

export default notify;

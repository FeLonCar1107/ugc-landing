import { IFooterProps } from "@/types/props/footer";

export default function Footer(props: IFooterProps) {
  const { content } = props;
  return (
    <footer
      data-scroll-section
      className="bg-jazzberry-jam-700 w-screen h-auto relative"
    >
      <div className="bg-jazzberry-jam-700 w-full h-2 absolute -top-1"></div>
      <div className="w-full h-auto flex flex-col items-center justify-center gap-2 p-4 text-jazzberry-jam-50 text-xs lg:text-sm">
        <p>
          © {new Date().getFullYear()} - {content.rights}
        </p>
        <div className="flex gap-5 items-center justify-center">
          <p>
            {content.madeWith} ❤️ {content.by}{" "}
            <a
              href={content.authorLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-jazzberry-jam-100 hover:scale-110 hover:border-b transition-all duration-300 ease-in-out"
            >
              {content.author}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

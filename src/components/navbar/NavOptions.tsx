import Link from "next/link";

export default function NavOptions(props: any) {
  return (
    <div className="hidden md:flex mx-aut justify-center items-center gap-2 2xl:gap-8">
      {props.options.map((option: any) => (
        <Link
          key={option.id}
          href={option.href}
          className="rounded-3xl hover:bg-white hover:text-black py-2 px-5 flex-grow text-sm lg:text-[14px] 2xl:text-[20px] text-center font-normal"
        >
          {option.title}
        </Link>
      ))}
    </div>
  );
}

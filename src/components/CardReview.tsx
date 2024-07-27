import Image from "next/image";
import { IReview } from "@/types/review";

export default function CardReview({
  review,
  index,
}: {
  review: IReview;
  index: number;
}) {
  const colors = ["200", "50", "300"];
  return (
    <div
      className={`review w-[90%] max-w-[450px] h-[130px] lg:max-h-[200px] rounded-xl flex flex-col justify-center items-center gap-1 lg:gap-3 py-4 px-3 lg:p-10 bg-jazzberry-jam-${
        colors[index % colors.length]
      }`}
    >
      <div className="w-full flex justify-start items-center gap-3">
        <Image
          src={review.image.src}
          alt={review.image.alt}
          width={40}
          height={40}
          className="bg-jazzberry-jam-700 rounded-full p-1"
        />
        <div className="text-jazzberry-jam-700 flex flex-col">
          <h2 className="text-xs lg:text-sm font-bold">{review.fullName}</h2>
          <p className="opacity-70 text-[10px] lg:text-xs">{review.role}</p>
        </div>
      </div>
      <p className="w-full text-jazzberry-jam-900 text-[10px] md:text-xs lg:text-xs text-start">
        {review.description}
      </p>
    </div>
  );
}

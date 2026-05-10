"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { ICollaborationsProps } from "@/types/props/collaborations";

/** Editorial ease — aligned with CountUpStat / ScrollReveal */
const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Collaborations(props: ICollaborationsProps) {
  const { splitTitle, content } = props;
  const reducedMotion = useReducedMotion();
  const figureRef = useRef<HTMLElement>(null);
  const bookInView = useInView(figureRef, { amount: 0.22, margin: "0px 0px -8% 0px" });

  const enableFloat = !reducedMotion && bookInView;

  return (
    <section
      data-scroll-section
      id="collaborations"
      className="relative h-auto w-screen bg-transparent tw-section-y-stack lg:pb-20"
    >
      <div className="section-shell flex h-auto items-center justify-center">
        <h2 className="tw-section-heading tw-text-heading flex items-center gap-3">
          <span className="font-bold">{splitTitle[0]}</span>
          {splitTitle[1] ? (
            <>
              {" "}
              <span className="hidden font-normal md:inline">{splitTitle[1]}</span>
            </>
          ) : null}
        </h2>
      </div>
      <div className="section-shell w-full px-6 mt-4">
        <motion.figure
          ref={figureRef}
          className="collaborations-book"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.95, ease: easeOut }}
        >
          <motion.div
            className="collaborations-book__float"
            animate={
              enableFloat ? { y: [0, -7, 0] } : { y: 0 }
            }
            transition={{
              duration: 7.5,
              repeat: enableFloat ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/portfolio/collabs.png"
              alt={content.bookMockupAlt}
              width={735}
              height={610}
              sizes="(min-width: 1024px) 720px, (min-width: 768px) 90vw, 100vw"
              className="collaborations-book__image"
              priority={false}
            />
          </motion.div>
          <motion.figcaption
            className="collaborations-book__caption"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7, ease: easeOut }}
          >
            {content.bookMockupCaption}
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

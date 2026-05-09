import { IAboutProps } from "@/types/props/about";
import { useCollabs } from "@/context/CollabsContext";
import Image from "next/image";
import useHoverEffects from "@/hooks/useHoverEffects";
import TikTok from "@/components/svg/social-media/TikTok";
import Instagram from "@/components/svg/social-media/Instagram";
import CountUpStat from "@/components/ui/CountUpStat";

export default function About(props: IAboutProps) {
  useHoverEffects();
  const { totalBrands } = useCollabs();
  const { title, subtitle, content } = props;
  const experienceStats = [
    {
      label: content.experience.brandsTrustedLabel,
      value: `+${totalBrands}`,
    },
    {
      label: content.experience.yearsCreatingLabel,
      value: content.experience.yearsCreatingValue,
    },
    {
      label: content.experience.yearsUgcLabel,
      value: content.experience.yearsUgcValue,
    },
  ];

  return (
    <section
      data-scroll-section
      id="about"
      className="tw-section-y relative isolate flex w-screen items-center justify-center overflow-hidden"
    >
      {/* Mobile: full viewport width — outside .section-shell avoids mid-screen “stripe” */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 md:hidden"
        aria-hidden
      >
        <Image
          src={content.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_24%] opacity-15 [mask-image:linear-gradient(to_top,transparent_0%,black_24%,black_100%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_24%,black_100%)]"
        />
      </div>

      {/* Desktop: same container width as before (section-shell column) so object-cover + 76%/42% match the original framing */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        aria-hidden
      >
        <div className="section-shell h-full">
          <div className="relative isolate h-full w-full overflow-hidden">
            <Image
              src={content.image.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[76%_42%] opacity-15 [mask-image:linear-gradient(to_top,transparent_0%,black_24%,black_100%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_24%,black_100%)]"
            />
          </div>
        </div>
      </div>

      <div className="section-shell relative z-0 w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-y-4 lg:gap-y-12">
          <header className="min-w-0 space-y-0.5 text-center">
            <p className="tw-eyebrow">{title}</p>
            <h2 className="tw-section-heading tw-text-heading font-bold">
              {subtitle}
            </h2>
          </header>

          <div className="w-full space-y-9">
            <div className="tw-body-readable w-full space-y-5">
              {[
                content.description.paragraph1,
                content.description.paragraph2,
                content.description.paragraph3,
              ]
                .filter((paragraph) => paragraph.trim().length > 0)
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </div>

            <div className="flex w-full flex-col gap-10 lg:gap-32 md:flex-row md:items-start">
              <div className="w-full md:w-7/12">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-jazzberry-jam-700">
                    {content.whyWorkWithMeTitle}
                  </h3>
                  <div className="space-y-4">
                    {content.reasons.map((reason) => (
                      <article
                        key={reason.title}
                        className="border-l-2 border-jazzberry-jam-200/80 pl-4"
                      >
                        <p className="font-semibold text-jazzberry-jam-700/95">
                          {reason.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed tw-body-readable">
                          {reason.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full space-y-8 md:w-5/12">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-jazzberry-jam-700">
                    {content.experienceTitle}
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    {experienceStats.map((stat, i) => (
                      <article
                        key={stat.label}
                        className="min-w-0 rounded-xl border border-jazzberry-jam-100/60 bg-white px-2 py-3 text-center backdrop-blur-[1px]"
                      >
                        <CountUpStat
                          value={stat.value}
                          index={i}
                          className="text-xl font-bold leading-none text-jazzberry-jam-700 tabular-nums"
                        />
                        <p className="mt-1.5 text-[11px] leading-tight tw-body-readable [overflow-wrap:anywhere]">
                          {stat.label}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-jazzberry-jam-700">
                    {content.socialProofTitle}
                  </h3>
                  <div className="grid gap-2.5">
                    {content.socialStats.map((stat, i) => (
                      <article
                        key={stat.platform}
                        className="flex items-center justify-between rounded-xl border border-jazzberry-jam-100/60 bg-white px-4 py-3 text-jazzberry-jam-700 backdrop-blur-[1px]"
                      >
                        <span className="inline-flex items-center">
                          {stat.platform === "TikTok" && (
                            <TikTok url={stat.url} size={20} color="#9D174D" />
                          )}
                          {stat.platform === "Instagram" && (
                            <Instagram
                              url={stat.url}
                              size={20}
                              color="#9D174D"
                            />
                          )}
                          {stat.platform !== "TikTok" &&
                            stat.platform !== "Instagram" && (
                              <a
                                href={stat.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold underline-offset-2 hover:underline"
                              >
                                {stat.platform}
                              </a>
                            )}
                        </span>
                        <CountUpStat
                          value={stat.followers}
                          index={experienceStats.length + i}
                          className="text-2xl font-bold leading-none tabular-nums"
                        />
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-jazzberry-jam-700">
                {content.toolsTitle}
              </h3>
              <ul className="flex flex-wrap gap-2 text-xs tw-body-readable">
                {content.tools.map((tool) => (
                  <li
                    key={tool}
                    className="max-w-full rounded-full border border-jazzberry-jam-100/60 bg-white px-3 py-1.5 text-xs md:text-sm leading-snug [overflow-wrap:anywhere] backdrop-blur-[1px]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

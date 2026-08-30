import { Container } from "@/components/site/layout-primitives";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import { getContent } from "@/lib/content/store";

/**
 * A new company has no delivery record to quote, so these count what the firm
 * actually brings to the table. Every figure is read off the site's own content
 * rather than typed out, so none of them can drift away from the services,
 * products and team pages as those are edited in the dashboard.
 */
export type Stat = { icon: string; value: string; label: string };

/** The site-wide figures, used by the services page banner. */
export async function siteStats(): Promise<Stat[]> {
  const [services, products, team] = await Promise.all([
    getContent("services"),
    getContent("products"),
    getContent("team"),
  ]);

  return [
    {
      icon: "FaLayerGroup",
      value: String(services.items.length),
      label: "Core Services",
    },
    {
      icon: "FaBoxesStacked",
      value: String(products.items.length),
      label: "Product Platforms",
    },
    {
      icon: "FaUsers",
      value: String(
        team.groups.reduce((n, group) => n + group.members.length, 0),
      ),
      label: "Specialists On Team",
    },
    {
      icon: "FaMicrochip",
      value: String(
        new Set(services.items.flatMap((service) => service.tech)).size,
      ),
      label: "Technologies Mastered",
    },
  ];
}

/**
 * The white card that straddles the bottom edge of a dark page banner. Place it
 * directly after a `PageBanner` with `overlap` set; the negative top margin
 * lifts it into the dark, so the banner needs that bottom padding to sit in.
 *
 * Defaults to the site-wide figures; pass `stats` for a page whose banner wants
 * numbers about its own subject.
 */
export async function StatsBar({ stats }: { stats?: Stat[] }) {
  const rows = stats ?? (await siteStats());

  return (
    <Container className="relative z-10 -mt-[60px] md:-mt-[70px]">
      <Reveal className="grid grid-cols-2 rounded-[20px] border border-slate-200 bg-white px-6 py-6 shadow-[0_24px_50px_-30px_rgb(15_23_42_/_0.45)] md:grid-cols-4 md:divide-x md:divide-slate-200 md:px-10">
        {rows.map((stat) => (
          <div key={stat.label} className="px-2 py-3 text-center md:px-6">
            <div className="mb-1.5 flex items-center justify-center gap-2.5">
              <Icon name={stat.icon} className="text-[1.35rem] text-brand" />
              <span className="font-heading text-[1.6rem] font-extrabold text-ink md:text-[1.9rem]">
                {stat.value}
              </span>
            </div>
            <p className="text-[0.9rem] font-medium text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </Container>
  );
}

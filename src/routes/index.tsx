import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Droplets,
  Facebook,
  Gauge,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Settings2,
  Snowflake,
  Star,
  Wind,
} from "lucide-react";
import { useState, type FormEvent, type MouseEvent } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { trackLead } from "@/lib/analytics";

import equipmentImage from "@/assets/modern-cool-equipment.jpg";
import industrialHero from "@/assets/modern-cool-industrial-hero.jpg";
import homeownerImage from "@/assets/modern-cool-homeowner.jpg";
import residentialImage from "@/assets/modern-cool-residential.jpg";

const phoneDisplay = "+92 320 7979097";
const whatsappNumber = "923207979097";
const photoServices = [
  {
    label: "Deep Wash",
    title: "Breathe cleaner, cooler air",
    image: residentialImage,
    position: "object-center",
  },
  {
    label: "Inverter PCB",
    title: "Fault finding done properly",
    image: homeownerImage,
    position: "object-top",
  },
  {
    label: "Chiller Care",
    title: "Keep production moving",
    image: industrialHero,
    position: "object-center",
  },
  {
    label: "Gas Refill",
    title: "Measured, vacuum-tested charging",
    image: equipmentImage,
    position: "object-center",
  },
];

const topServices = [
  {
    title: "Split AC Deep Chemical Wash",
    body: "A proper indoor blower and outdoor condenser wash that clears dirt, blocked drains and weak airflow.",
    tone: "bg-plum text-plum-foreground",
    icon: Droplets,
  },
  {
    title: "Inverter AC PCB Repair",
    body: "Careful fault tracing for inverter boards, compressors and capacitors, with genuine replacement parts.",
    tone: "bg-rose text-rose-foreground",
    icon: Settings2,
  },
  {
    title: "Leak Detection & Gas Charging",
    body: "Vacuum-tested leak checks and accurate R32 or R410A charging—never guesswork.",
    tone: "bg-cobalt text-cobalt-foreground",
    icon: Gauge,
  },
  {
    title: "Industrial Chillers & Cold Storage",
    body: "Planned maintenance and breakdown support for factories, food facilities, plazas and malls.",
    tone: "bg-mint text-mint-foreground",
    icon: Snowflake,
  },
];

const clients = [
  "Coca-Cola Beverages Pakistan Ltd",
  "Ramzan Sugar Mills",
  "Punjab Food Authority",
  "Shaheen Complex Lahore",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Modern Cool HVAC & Refrigeration Engineering",
  telephone: "+923207979097",
  email: "Moderncoolcompany1@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al-Noor Town, Workshop Stop, Walton Road",
    addressLocality: "Lahore Cantt",
    addressCountry: "PK",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.4779, longitude: 74.3597 },
  areaServed: [
    "Lahore",
    "DHA Lahore",
    "Gulberg",
    "Walton",
    "Lahore Cantt",
    "Model Town",
    "Johar Town",
    "Bahria Town Lahore",
    "Sundar Industrial Estate",
  ],
  foundingDate: "2016",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Modern Cool | AC Repair & HVAC Services Lahore" },
      {
        name: "description",
        content:
          "Book same-day AC repair, deep cleaning, gas charging, chiller and cold storage service across Lahore with Modern Cool.",
      },
      { property: "og:title", content: "Modern Cool | AC Repair & HVAC Services Lahore" },
      {
        property: "og:description",
        content:
          "Reliable AC repair at your door and industrial cooling support from Walton Road, Lahore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
});

function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
const quickMessage = (service: string) =>
  whatsappLink(
    `Assalam-o-Alaikum Modern Cool. I need help with ${service} in Lahore. Please share technician availability.`,
  );

function RoundLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-card-foreground shadow-sm transition-transform hover:-translate-y-1"
    >
      <ArrowUpRight className="size-5" />
    </a>
  );
}

function Index() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [problem, setProblem] = useState("");
  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackLead({ event_type: "form_submit", section: "hero_booking", service: problem, area });
    window.open(
      whatsappLink(
        `Assalam-o-Alaikum Modern Cool. Mera naam ${name.trim()} hai. Main ${area.trim()} mein hoon. Mere AC ya cooling system ka masla: ${problem.trim()}. Barah-e-karam technician ki availability aur visit ka waqt bata dein.`,
      ),
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleLeadClick(e: MouseEvent<HTMLElement>) {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    const type = href.includes("wa.me")
      ? "whatsapp_click"
      : href.startsWith("tel:")
        ? "phone_call"
        : null;
    if (!type) return;
    const section = a.closest("[data-section]")?.getAttribute("data-section") ?? "unknown";
    const text = decodeURIComponent(href.split("text=")[1] ?? "");
    const match = text.match(/help with (.+?) in Lahore/);
    trackLead({ event_type: type, section, service: match ? (match[1] ?? null) : null });
  }

  return (
    <main
      onClick={handleLeadClick}
      className="site-home min-h-screen overflow-x-hidden bg-background pb-16 text-foreground md:pb-0"
    >
      <header
        data-section="header"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 md:flex md:justify-between md:px-8 lg:py-7"
      >
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Modern Cool home">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-cobalt text-cobalt-foreground">
            <Snowflake className="size-5" />
          </span>
          <span className="truncate text-xl font-semibold tracking-tight">Modern Cool</span>
        </a>
        <nav
          className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex"
          aria-label="Primary navigation"
        >
          <a href="#services" className="hover:text-cobalt">
            Services
          </a>
          <a href="#commercial" className="hover:text-cobalt">
            Commercial
          </a>
          <a href="#why-us" className="hover:text-cobalt">
            Why Us
          </a>
          <a href="#contact" className="hover:text-cobalt">
            Contact
          </a>
        </nav>
        <a
          href={quickMessage("AC or refrigeration service")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-cobalt px-4 text-sm font-bold text-cobalt-foreground transition-colors hover:bg-cobalt/90 sm:px-6"
        >
          <MessageCircle className="size-4" />
          <span className="hidden sm:inline">Book via WhatsApp</span>
          <span className="sm:hidden">Book</span>
        </a>
      </header>

      <section
        id="top"
        data-section="hero"
        className="mx-auto max-w-7xl px-5 pb-8 pt-10 text-center md:px-8 md:pt-16"
      >
        <Eyebrow trailingIcon className="mx-auto mb-6">
          Serving Lahore since 2016
        </Eyebrow>
        <h1 className="mx-auto max-w-4xl hero-title">
          Cooling &amp; AC experts at your{" "}
          <span className="inline-flex items-center gap-2">
            door{" "}
            <span className="grid size-10 place-items-center text-cobalt sm:size-14">
              <Snowflake className="size-7 sm:size-9" />
            </span>
          </span>{" "}
          in Lahore
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
          Garmi mein AC ruk jaye, you need a clear answer fast. We handle home AC repair, deep
          cleaning and commercial refrigeration from our Walton Road workshop.
        </p>

        <form
          onSubmit={submitBooking}
          className="mx-auto mt-8 grid max-w-4xl gap-0 rounded-md border border-foreground/30 bg-card p-1 text-left md:grid-cols-[.8fr_.8fr_1.4fr_auto]"
          aria-label="Book an HVAC technician on WhatsApp"
        >
          <label className="min-w-0 rounded-md px-4 py-3 text-[11px] font-bold uppercase text-muted-foreground">
            <span>Your name</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Ahmed"
              autoComplete="name"
              className="mt-1 w-full bg-transparent text-sm font-bold normal-case text-foreground outline-none placeholder:font-medium placeholder:text-muted-foreground"
            />
          </label>
          <label className="min-w-0 rounded-md border-t border-border px-4 py-3 text-[11px] font-bold uppercase text-muted-foreground md:border-l md:border-t-0">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-cobalt" /> Area in Lahore
            </span>
            <input
              required
              value={area}
              onChange={(event) => setArea(event.target.value)}
              placeholder="e.g. DHA Phase 5"
              autoComplete="address-level2"
              className="mt-1 w-full bg-transparent text-sm font-bold normal-case text-foreground outline-none placeholder:font-medium placeholder:text-muted-foreground"
            />
          </label>
          <label className="min-w-0 rounded-md border-t border-border px-4 py-3 text-[11px] font-bold uppercase text-muted-foreground md:border-l md:border-t-0">
            <span className="flex items-center gap-2">
              <Wind className="size-4 text-cobalt" /> What needs fixing?
            </span>
            <input
              required
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              placeholder="e.g. AC thandi hawa nahi de raha"
              className="mt-1 w-full bg-transparent text-sm font-bold normal-case text-foreground outline-none placeholder:font-medium placeholder:text-muted-foreground"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-foreground px-7 text-sm font-bold text-background transition-colors hover:bg-cobalt"
          >
            <MessageCircle className="size-5" /> WhatsApp
          </button>
        </form>

        <div className="mt-10 grid gap-2 md:h-[420px] md:grid-cols-12">
          <article className="group relative min-h-[330px] overflow-hidden rounded-lg md:col-span-5">
            <img
              src={residentialImage}
              alt="Modern Cool technician servicing a split AC"
              width={960}
              height={720}
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-image-shade" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-left text-overlay">
              <h2 className="text-2xl font-bold">
                Fast booking,
                <br />
                doorstep help
              </h2>
              <RoundLink
                href={quickMessage("same-day AC repair")}
                label="Book same-day AC repair"
              />
            </div>
          </article>
          <div className="grid gap-2 md:col-span-3 md:grid-rows-[1fr_120px]">
            <article className="group relative min-h-[300px] overflow-hidden rounded-lg md:min-h-0">
              <img
                src={homeownerImage}
                alt="Modern Cool technician with a Lahore homeowner"
                width={768}
                height={1152}
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-card px-3 py-1.5 text-xs font-medium">
                Certified technicians
              </span>
            </article>
            <div className="flex items-center gap-4 rounded-lg bg-cobalt px-5 py-5 text-left text-cobalt-foreground">
              <Check className="size-8 shrink-0" />
              <div>
                <strong className="text-base font-semibold">
                  From our workshop
                  <br />
                  to your door
                </strong>
                <p className="mt-2 text-xs">Walton Road · Lahore</p>
              </div>
            </div>
          </div>
          <article className="group relative min-h-[330px] overflow-hidden rounded-lg md:col-span-4">
            <img
              src={equipmentImage}
              alt="Technician checking an AC condenser with gauges"
              width={768}
              height={1152}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-image-shade" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-left text-overlay">
              <h2 className="text-2xl font-bold">
                Proper diagnosis,
                <br />
                no guesswork
              </h2>
              <RoundLink href={quickMessage("AC fault diagnosis")} label="Book AC diagnosis" />
            </div>
          </article>
        </div>
      </section>

      <section
        id="services"
        data-section="cooling_essentials"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-16"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 className="mt-5 section-title">Cooling essentials</h2>
          </div>
          <p className="max-w-lg text-sm font-medium leading-relaxed text-muted-foreground md:justify-self-end">
            From a weak bedroom AC to a chiller that keeps a production floor running, our team
            arrives ready for the job.
          </p>
        </div>
        <div className="mt-8 flex snap-x gap-2 overflow-x-auto pb-3">
          {photoServices.map((item, index) => (
            <article
              key={item.label}
              className="group relative h-80 min-w-[78%] snap-start overflow-hidden rounded-lg sm:min-w-[46%] lg:min-w-0 lg:flex-1"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className={`absolute inset-0 size-full object-cover ${item.position} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-image-shade" />
              <span
                className={`absolute left-4 top-4 rounded-sm px-3 py-1.5 text-xs font-medium ${index === 0 ? "bg-orange text-orange-foreground" : index === 1 ? "bg-rose text-rose-foreground" : index === 2 ? "bg-cobalt text-cobalt-foreground" : "bg-mint text-mint-foreground"}`}
              >
                {item.label}
              </span>
              <div className="absolute inset-x-5 bottom-6 flex items-end justify-between gap-3 text-overlay">
                <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
                <RoundLink href={quickMessage(item.label)} label={`Ask about ${item.label}`} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section data-section="stats" className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end">
          <h2 className="section-title">
            Speed you feel.
            <br />
            Reliability you can count on.
          </h2>
          <p className="text-sm font-medium text-muted-foreground md:justify-self-end">
            Residential urgency and industrial discipline, backed by a physical workshop in Lahore
            Cantt.
          </p>
        </div>
        <div className="grid gap-2 md:grid-cols-12 lg:auto-rows-[230px]">
          <div className="rounded-lg bg-secondary p-7 md:col-span-4">
            <p className="text-2xl font-bold leading-tight">
              The secret to reliable cooling? A quick response and a proper diagnosis.
            </p>
            <p className="mt-8 text-xs font-bold text-muted-foreground">
              From Walton Road, across Lahore
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-cobalt p-7 text-cobalt-foreground md:col-span-3">
            <strong className="text-6xl font-semibold">48+</strong>
            <p className="mt-2 text-sm font-semibold">Commercial projects supported</p>
          </div>
          <div className="rounded-lg bg-rose p-7 text-rose-foreground md:col-span-5">
            <strong className="text-6xl font-semibold">10k+</strong>
            <p className="mt-2 text-sm font-bold">Units repaired, washed and commissioned</p>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-orange p-7 text-orange-foreground md:col-span-5">
            <strong className="text-6xl font-semibold">24/7</strong>
            <p className="mt-2 max-w-xs text-sm font-bold leading-snug">
              Emergency response for corporate AMC partners
            </p>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-mint p-7 text-center text-mint-foreground md:col-span-4">
            <p className="text-2xl font-bold leading-tight">
              Careful diagnosis.
              <br />
              Clear advice.
              <br />
              Reliable repairs.
            </p>
          </div>
          <div className="rounded-lg bg-plum p-7 text-plum-foreground md:col-span-3">
            <strong className="text-4xl font-semibold">2016</strong>
            <p className="mt-3 text-lg font-bold">Trust over everything</p>
            <ul className="mt-4 space-y-2 text-xs opacity-80">
              <li>• Certified engineers</li>
              <li>• Walton Road workshop</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        data-section="top_services"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-16"
      >
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>Popular now</Eyebrow>
            <h2 className="mt-5 section-title">Top services for Lahore</h2>
          </div>
          <a
            href={quickMessage("an HVAC service")}
            target="_blank"
            rel="noreferrer"
            className="hidden w-fit items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-bold text-background md:flex md:justify-self-end"
          >
            Ask a technician <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="mt-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {topServices.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`${item.tone} flex min-h-[390px] flex-col rounded-lg p-6`}
              >
                <span className="grid size-10 place-items-center rounded-full border border-current/30">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-7 text-2xl font-semibold leading-tight">{item.title}</h3>
                <p className="mt-auto pt-10 text-sm leading-relaxed">{item.body}</p>
                <a
                  href={quickMessage(item.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-between gap-2 border-t border-current/30 pt-4 text-sm font-semibold transition-opacity hover:opacity-75"
                >
                  Book this service <ArrowUpRight className="size-4" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="why-us"
        data-section="testimonial"
        className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16"
      >
        <div className="mb-8 flex justify-center">
          <Eyebrow framed>Commercial experience</Eyebrow>
        </div>
        <div className="rounded-lg bg-foreground p-6 text-background md:p-10">
          <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div className="relative h-72 overflow-hidden rounded-lg bg-orange">
              <img
                src={industrialHero}
                alt="Industrial HVAC maintenance by Modern Cool"
                width={1280}
                height={960}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-background/75">
                Residential &amp; industrial cooling
              </p>
              <p className="mt-6 text-2xl font-semibold leading-relaxed">
                Clear advice, professional tools and dependable follow-through—whether the call is
                from a family home or a running plant.
              </p>
              <p className="mt-6 text-sm font-bold text-background/60">
                Modern Cool · Walton Road, Lahore
              </p>
            </div>
          </div>
          <div id="commercial" className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client) => (
              <div
                key={client}
                className="flex min-h-16 items-center border-t border-background/25 px-2 py-4 text-sm font-medium leading-snug"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-section="quick_list" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1fr]">
          <div>
            <Eyebrow>Quick booking</Eyebrow>
            <h2 className="mt-5 section-title">
              Tell us what’s gone wrong. We’ll take it from there.
            </h2>
          </div>
          <div className="divide-y divide-border">
            {["AC Master Wash", "Gas Charging", "PCB Repair", "Chiller AMC"].map((item) => (
              <a
                key={item}
                href={quickMessage(item)}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-5"
              >
                <span className={`grid size-11 shrink-0 place-items-center text-cobalt`}>
                  <Snowflake className="size-5" />
                </span>
                <span className="min-w-0 truncate text-lg font-bold">{item}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="contact"
        data-section="footer"
        className="mt-6 overflow-hidden bg-foreground text-background "
      >
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-12 border-b border-background/15 pb-12 lg:grid-cols-[1.35fr_.65fr_.65fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md bg-cobalt text-cobalt-foreground">
                  <Snowflake className="size-5" />
                </span>
                <span className="text-xl font-semibold">Modern Cool</span>
              </div>
              <h2 className="mt-8 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Reliable cooling support, from your home to your plant.
              </h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-background/65">
                AC repair, deep cleaning, installation, refrigeration and industrial maintenance
                across Lahore.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-background/50">Explore</p>
              <nav className="mt-5 grid gap-3 text-sm font-semibold" aria-label="Footer navigation">
                <a href="#services">Services</a>
                <a href="#commercial">Commercial</a>
                <a href="#why-us">Why us</a>
                <a href="#top">Book a visit</a>
              </nav>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-background/50">Contact</p>
              <address className="mt-5 grid gap-3 text-sm font-semibold not-italic">
                <p className="leading-relaxed">
                  Al-Noor Town, Workshop Stop
                  <br />
                  Walton Road, Lahore Cantt
                </p>
                <a href="tel:+923207979097">{phoneDisplay}</a>
                <a href="mailto:Moderncoolcompany1@gmail.com" className="break-all">
                  Moderncoolcompany1@gmail.com
                </a>
              </address>
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-background/50">
              © {new Date().getFullYear()} Modern Cool. Lahore, Pakistan.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={quickMessage("AC or refrigeration service")}
                target="_blank"
                rel="noreferrer"
                aria-label="Modern Cool on WhatsApp"
                className="grid size-10 place-items-center rounded-full border border-background/15 bg-background/5"
              >
                <MessageCircle className="size-4" />
              </a>
              <span
                aria-label="Facebook profile link pending"
                title="Facebook profile link pending"
                className="grid size-10 place-items-center rounded-full border border-background/10 text-background/35"
              >
                <Facebook className="size-4" />
              </span>
              <span
                aria-label="Instagram profile link pending"
                title="Instagram profile link pending"
                className="grid size-10 place-items-center rounded-full border border-background/10 text-background/35"
              >
                <Instagram className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </footer>

      <div
        data-section="mobile_bar"
        className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-2 gap-2 bg-background/95 p-2 shadow-2xl backdrop-blur md:hidden"
      >
        <a
          href={quickMessage("AC or refrigeration service")}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-cobalt text-sm font-bold text-cobalt-foreground"
        >
          <MessageCircle className="size-5" /> WhatsApp Chat
        </a>
        <a
          href="tel:+923207979097"
          className="flex items-center justify-center gap-2 rounded-full bg-orange text-sm font-bold text-orange-foreground"
        >
          <Phone className="size-5" /> Call Now
        </a>
      </div>
    </main>
  );
}

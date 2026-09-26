import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, MapPin, MessageCircle, Phone, Snowflake } from "lucide-react";
import { useState, type FormEvent } from "react";

import industrialHero from "@/assets/modern-cool-industrial-hero.jpg";
import residentialImage from "@/assets/modern-cool-residential.jpg";

const phoneDisplay = "+92 320 7979097";
const whatsappNumber = "923207979097";

const areas = ["DHA", "Gulberg", "Walton / Cantt", "Model Town", "Johar Town", "Bahria Town", "Sundar Industrial Estate", "Other"];
const services = [
  "Split AC Deep Chemical Wash",
  "Inverter AC PCB Repair & Troubleshooting",
  "Refrigerant Leak Detection & Gas Charge (R32 / R410A)",
  "AC Installation & Relocation",
  "Industrial Chiller Maintenance & Overhaul",
  "Cold Storage & Blast Freezer AMC",
];

const serviceCards = [
  { number: "01", title: "Split AC Deep Chemical Wash", body: "High-pressure indoor blower and outdoor condenser sanitization. Removes built-up dirt, clears choked drains, and restores airflow.", tag: "Same-Day Doorstep Service", tone: "bg-terracotta text-terracotta-foreground" },
  { number: "02", title: "Inverter AC Repair & Gas Refill", body: "Expert diagnosis for PCB faults, compressor issues, capacitor replacements, and vacuum-tested R32 / R410A refrigerant charging.", tag: "30-Day Warranty on Genuine Parts", tone: "bg-mint text-mint-foreground" },
  { number: "03", title: "Industrial Chiller Plants", body: "Scheduled descaling, condenser overhauls, motor servicing, and emergency breakdown response for factories, plazas, and malls.", tag: "Uptime SLA", tone: "bg-cobalt text-cobalt-foreground" },
  { number: "04", title: "Cold Storage & Blast Freezers", body: "Precision temperature control and insulation maintenance for food processing, pharmaceuticals, and agricultural storage.", tag: "Engineering-Grade Systems", tone: "bg-plum text-plum-foreground" },
];

const clients = ["Coca-Cola Beverages Pakistan Ltd", "Ramzan Sugar Mills", "Punjab Food Authority", "Shaheen Complex Lahore"];
const stats = [
  ["2016", "Serving Lahore with certified HVAC technicians"],
  ["10,000+", "Units repaired, washed, and commissioned"],
  ["24/7", "Emergency response for corporate AMC partners"],
  ["Walton Road", "Physical workshop and parts center in Lahore Cantt"],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Modern Cool HVAC & Refrigeration Engineering",
  telephone: "+923207979097",
  email: "Moderncoolcompany1@gmail.com",
  address: { "@type": "PostalAddress", streetAddress: "Al-Noor Town, Workshop Stop, Walton Road", addressLocality: "Lahore Cantt", addressCountry: "PK" },
  geo: { "@type": "GeoCoordinates", latitude: 31.4779, longitude: 74.3597 },
  areaServed: ["Lahore", "DHA Lahore", "Gulberg", "Walton", "Lahore Cantt", "Model Town", "Johar Town", "Bahria Town Lahore", "Sundar Industrial Estate"],
  foundingDate: "2016",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Modern Cool | HVAC & Refrigeration Engineering Lahore" },
      { name: "description", content: "Same-day AC repair, chemical cleaning, industrial chillers and cold storage engineering across Lahore. Call or WhatsApp Modern Cool." },
      { property: "og:title", content: "Modern Cool | HVAC & Refrigeration Engineering Lahore" },
      { property: "og:description", content: "Fast residential AC repair and industrial cooling expertise from our Walton Road workshop." },
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

function Index() {
  const [name, setName] = useState("");
  const [area, setArea] = useState(areas[0]);
  const [service, setService] = useState(services[0]);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim().slice(0, 80);
    if (!cleanName) return;
    window.open(whatsappLink(`Hello Modern Cool team! My name is ${cleanName} from ${area}. I need ${service}. Please confirm technician availability.`), "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground md:pb-0">
      <header className="border-b-2 border-foreground bg-background">
        <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-5 lg:px-10">
          <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Modern Cool home">
            <span className="grid size-10 place-items-center bg-cobalt text-cobalt-foreground"><Snowflake className="size-6" /></span>
            <span className="text-xl font-black uppercase tracking-tight">Modern Cool</span>
          </a>
          <span className="hidden rounded-full border border-foreground/25 px-4 py-2 text-[11px] font-bold uppercase tracking-wide xl:block">+ HVAC &amp; Refrigeration Since 2016 +</span>
          <nav className="hidden items-center gap-7 text-sm font-bold lg:flex" aria-label="Primary navigation">
            <a href="#residential" className="hover:text-cobalt">Residential</a><a href="#commercial" className="hover:text-cobalt">Commercial</a><a href="#why-us" className="hover:text-cobalt">Why Us</a><a href="#contact" className="hover:text-cobalt">Contact</a>
          </nav>
          <a href={whatsappLink("Hello Modern Cool team! I need HVAC service. Please confirm technician availability.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 bg-orange px-5 py-3 text-sm font-black text-orange-foreground transition-transform hover:-translate-y-0.5 sm:flex">
            <MessageCircle className="size-4" /> WhatsApp: {phoneDisplay}
          </a>
        </div>
      </header>

      <section id="top" className="border-b-2 border-foreground">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_.95fr]">
          <div className="flex flex-col justify-center px-5 py-14 lg:px-10 lg:py-20">
            <div className="mb-7 w-fit rounded-full border border-foreground/30 bg-secondary px-4 py-2 text-[11px] font-black uppercase tracking-wide">+ Emergency Dispatch &amp; Industrial Cooling +</div>
            <h1 className="max-w-4xl text-5xl font-black leading-[.93] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">Precision Cooling for Every Scale. <span className="text-cobalt">From Lahore Homes to Industrial Plants.</span></h1>
            <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">Fast same-day doorstep AC repair, deep chemical cleaning, and commercial refrigeration engineering. Workshop located on Walton Road, serving all of Lahore.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="tel:+923207979097" className="inline-flex min-h-12 items-center gap-2 bg-orange px-5 py-3 text-sm font-black text-orange-foreground"><Phone className="size-4" /> Call Now for Fast Repair</a>
              <a href="#dispatch" className="inline-flex min-h-12 items-center gap-2 border-2 border-foreground px-5 py-3 text-sm font-black hover:bg-foreground hover:text-background">Request Corporate Consultation <ArrowRight className="size-4" /></a>
            </div>
          </div>
          <div className="relative min-h-[430px] border-t-2 border-foreground lg:border-l-2 lg:border-t-0">
            <img src={industrialHero} alt="Modern Cool technician inspecting industrial chiller machinery in Lahore" width={1280} height={960} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
            <div className="absolute bottom-0 left-0 bg-foreground px-5 py-4 text-background"><span className="block text-3xl font-black">24/7</span><span className="text-xs font-bold uppercase">Corporate emergency response</span></div>
          </div>
        </div>
      </section>

      <section id="dispatch" className="border-b-2 border-foreground bg-secondary">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[.78fr_1.22fr]">
          <div className="border-b-2 border-foreground px-5 py-10 lg:border-b-0 lg:border-r-2 lg:px-10 lg:py-12">
            <span className="text-xs font-black uppercase text-cobalt">Direct technician line</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Fast Technician Dispatch</h2>
            <p className="mt-3 max-w-md font-medium text-muted-foreground">Direct WhatsApp booking with an HVAC technician</p>
          </div>
          <form onSubmit={submitBooking} className="grid gap-px bg-foreground sm:grid-cols-2 lg:grid-cols-[.85fr_1fr_1.4fr_auto]" aria-label="WhatsApp booking form">
            <label className="bg-background p-5 text-xs font-black uppercase">Name<input value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="Your name" className="mt-2 block h-12 w-full border-2 border-foreground bg-background px-3 text-sm font-medium normal-case outline-none focus:border-cobalt" /></label>
            <label className="relative bg-background p-5 text-xs font-black uppercase">Lahore Area<select value={area} onChange={(e) => setArea(e.target.value)} className="mt-2 block h-12 w-full appearance-none border-2 border-foreground bg-background px-3 pr-9 text-sm font-medium normal-case outline-none focus:border-cobalt">{areas.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute bottom-9 right-8 size-4" /></label>
            <label className="relative bg-background p-5 text-xs font-black uppercase">Required Service<select value={service} onChange={(e) => setService(e.target.value)} className="mt-2 block h-12 w-full appearance-none border-2 border-foreground bg-background px-3 pr-9 text-sm font-medium normal-case outline-none focus:border-cobalt">{services.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute bottom-9 right-8 size-4" /></label>
            <div className="flex bg-background p-5"><button type="submit" className="min-h-12 w-full bg-orange px-6 text-sm font-black text-orange-foreground hover:bg-cobalt hover:text-cobalt-foreground">Book via WhatsApp →</button></div>
          </form>
        </div>
      </section>

      <section id="residential" className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
            <div><span className="text-xs font-black uppercase text-cobalt">+ Residential &amp; Enterprise +</span><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Two scales. One engineering standard.</h2></div>
            <p className="max-w-xl font-medium leading-relaxed text-muted-foreground md:justify-self-end">Fast relief for your home. Operational certainty for your business. Every job is handled with measured diagnostics and professional-grade equipment.</p>
          </div>
          <div id="commercial" className="grid border-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((card, index) => <article key={card.title} className={`${card.tone} flex min-h-[390px] flex-col border-foreground p-6 sm:[&:nth-child(odd)]:border-r-2 lg:border-r-2 lg:last:border-r-0 ${index > 1 ? "border-t-2 lg:border-t-0" : ""}`}>
              <span className="text-sm font-black">{card.number}</span><h3 className="mt-14 text-3xl font-black leading-none tracking-tight">{card.title}</h3><p className="mt-5 text-sm font-semibold leading-relaxed opacity-85">{card.body}</p><div className="mt-auto border-t border-current pt-4 text-xs font-black uppercase"><Check className="mr-2 inline size-4" />{card.tag}</div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="why-us" className="bg-foreground text-background">
        <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-6 border-b border-background/25 pb-12 lg:grid-cols-2 lg:items-end"><h2 className="max-w-3xl text-4xl font-black leading-none tracking-tight sm:text-6xl">Trusted by Lahore’s Leading Commercial &amp; Industrial Enterprises</h2><p className="max-w-lg font-medium text-background/70 lg:justify-self-end">Engineering reliability where temperature control and uptime cannot fail.</p></div>
          <div className="grid border-b border-background/25 sm:grid-cols-2 lg:grid-cols-4">{clients.map((client) => <div key={client} className="flex min-h-36 items-center border-background/25 py-8 pr-6 sm:border-r sm:pl-6 sm:first:pl-0 lg:last:border-r-0"><span className="text-lg font-black leading-tight">{client}</span></div>)}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">{stats.map(([value, label]) => <div key={value} className="border-background/25 py-9 pr-6 sm:border-r sm:pl-6 sm:first:pl-0 lg:last:border-r-0"><strong className="block text-4xl font-black text-orange sm:text-5xl">{value}</strong><span className="mt-3 block max-w-[230px] text-sm font-medium text-background/65">{label}</span></div>)}</div>
        </div>
      </section>

      <section className="border-b-2 border-foreground">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-[420px]"><img src={residentialImage} alt="Modern Cool technician servicing a split AC in a Lahore home" width={960} height={720} loading="lazy" className="absolute inset-0 size-full object-cover" /></div>
          <div className="border-t-2 border-foreground lg:border-l-2 lg:border-t-0">
            <div className="border-b-2 border-foreground p-7 lg:p-10"><span className="text-xs font-black uppercase text-cobalt">+ How we work +</span><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">From callout to controlled climate.</h2></div>
            {[['01','Quick WhatsApp Request','Tell us your location and symptom in 30 seconds.'],['02','Site Survey & Transparent Quote','Inspection by a technician with no hidden fees.'],['03','Precision Execution','High-grade tooling, vacuum pumps, and OEM parts.']].map(([n,title,body]) => <div key={n} className="grid grid-cols-[64px_1fr] border-b border-foreground/25 p-7 last:border-b-0 lg:p-9"><span className="text-xl font-black text-cobalt">{n}</span><div><h3 className="text-xl font-black tracking-tight">{title}</h3><p className="mt-2 text-sm font-medium text-muted-foreground">{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-cobalt text-cobalt-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.2fr_.8fr] lg:px-10 lg:py-20">
          <div><div className="flex items-center gap-3"><Snowflake className="size-8"/><span className="text-2xl font-black uppercase">Modern Cool</span></div><h2 className="mt-7 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Modern Cool HVAC &amp; Refrigeration Engineering</h2><p className="mt-6 max-w-3xl text-sm font-medium leading-relaxed text-cobalt-foreground/75">Serving residential and industrial clients across DHA, Gulberg, Cantt, Model Town, Johar Town, Bahria, Sundar Industrial Estate, and Kot Lakhpat.</p></div>
          <address className="not-italic lg:justify-self-end"><div className="flex gap-3 border-b border-cobalt-foreground/25 pb-5"><MapPin className="mt-1 size-5 shrink-0"/><span className="font-semibold">Al-Noor Town, Workshop Stop,<br/>Walton Road, Lahore Cantt, Pakistan</span></div><a href="tel:+923207979097" className="mt-5 block text-xl font-black">{phoneDisplay}</a><a href="mailto:Moderncoolcompany1@gmail.com" className="mt-2 block font-semibold">Moderncoolcompany1@gmail.com</a></address>
        </div>
        <div className="border-t border-cobalt-foreground/25 px-5 py-5 text-center text-xs font-bold uppercase lg:px-10">© 2026 Modern Cool · Serving all of Lahore, Pakistan</div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-2 border-t-2 border-foreground md:hidden">
        <a href={whatsappLink("Hello Modern Cool team! I need HVAC service. Please confirm technician availability.")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-cobalt text-sm font-black text-cobalt-foreground"><MessageCircle className="size-5"/> WhatsApp Chat</a>
        <a href="tel:+923207979097" className="flex items-center justify-center gap-2 bg-orange text-sm font-black text-orange-foreground"><Phone className="size-5"/> Call Now</a>
      </div>
    </main>
  );
}
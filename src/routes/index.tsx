import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Droplets,
  Gauge,
  MapPin,
  MessageCircle,
  Phone,
  Settings2,
  Snowflake,
  Star,
  Wind,
} from "lucide-react";
import { useState, type FormEvent, type MouseEvent } from "react";

import { SymptomAdvisor } from "@/components/SymptomAdvisor";
import { trackLead } from "@/lib/analytics";

import equipmentImage from "@/assets/modern-cool-equipment.jpg";
import industrialHero from "@/assets/modern-cool-industrial-hero.jpg";
import homeownerImage from "@/assets/modern-cool-homeowner.jpg";
import residentialImage from "@/assets/modern-cool-residential.jpg";

const phoneDisplay = "+92 320 7979097";
const whatsappNumber = "923207979097";
const areas = ["DHA", "Gulberg", "Walton / Cantt", "Model Town", "Johar Town", "Bahria Town", "Sundar Industrial Estate", "Other"];
const services = ["Split AC Deep Chemical Wash", "Inverter AC PCB Repair & Troubleshooting", "Refrigerant Leak Detection & Gas Charge (R32 / R410A)", "AC Installation & Relocation", "Industrial Chiller Maintenance & Overhaul", "Cold Storage & Blast Freezer AMC"];

const photoServices = [
  { label: "Deep Wash", title: "Breathe cleaner, cooler air", image: residentialImage, position: "object-center" },
  { label: "Inverter PCB", title: "Fault finding done properly", image: homeownerImage, position: "object-top" },
  { label: "Chiller Care", title: "Keep production moving", image: industrialHero, position: "object-center" },
  { label: "Gas Refill", title: "Measured, vacuum-tested charging", image: equipmentImage, position: "object-center" },
];

const topServices = [
  { title: "Split AC Deep Chemical Wash", body: "A proper indoor blower and outdoor condenser wash that clears dirt, blocked drains and weak airflow.", tone: "bg-plum text-plum-foreground", icon: Droplets },
  { title: "Inverter AC PCB Repair", body: "Careful fault tracing for inverter boards, compressors and capacitors, with genuine replacement parts.", tone: "bg-rose text-rose-foreground", icon: Settings2 },
  { title: "Leak Detection & Gas Charging", body: "Vacuum-tested leak checks and accurate R32 or R410A charging—never guesswork.", tone: "bg-cobalt text-cobalt-foreground", icon: Gauge },
  { title: "Industrial Chillers & Cold Storage", body: "Planned maintenance and breakdown support for factories, food facilities, plazas and malls.", tone: "bg-mint text-mint-foreground", icon: Snowflake },
];

const clients = ["Coca-Cola Beverages Pakistan Ltd", "Ramzan Sugar Mills", "Punjab Food Authority", "Shaheen Complex Lahore"];

const jsonLd = { "@context": "https://schema.org", "@type": "HVACBusiness", name: "Modern Cool HVAC & Refrigeration Engineering", telephone: "+923207979097", email: "Moderncoolcompany1@gmail.com", address: { "@type": "PostalAddress", streetAddress: "Al-Noor Town, Workshop Stop, Walton Road", addressLocality: "Lahore Cantt", addressCountry: "PK" }, geo: { "@type": "GeoCoordinates", latitude: 31.4779, longitude: 74.3597 }, areaServed: ["Lahore", "DHA Lahore", "Gulberg", "Walton", "Lahore Cantt", "Model Town", "Johar Town", "Bahria Town Lahore", "Sundar Industrial Estate"], foundingDate: "2016" };

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: "Modern Cool | AC Repair & HVAC Services Lahore" },
    { name: "description", content: "Book same-day AC repair, deep cleaning, gas charging, chiller and cold storage service across Lahore with Modern Cool." },
    { property: "og:title", content: "Modern Cool | AC Repair & HVAC Services Lahore" },
    { property: "og:description", content: "Reliable AC repair at your door and industrial cooling support from Walton Road, Lahore." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] }),
});

function whatsappLink(message: string) { return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`; }
const quickMessage = (service: string) => whatsappLink(`Assalam-o-Alaikum Modern Cool. I need help with ${service} in Lahore. Please share technician availability.`);

function RoundLink({ href, label }: { href: string; label: string }) {
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-card-foreground shadow-sm transition-transform hover:-translate-y-1"><ArrowUpRight className="size-5" /></a>;
}

function Index() {
  const [area, setArea] = useState(areas[0]);
  const [service, setService] = useState(services[0]);
  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackLead({ event_type: "form_submit", section: "hero_booking", service, area });
    window.open(whatsappLink(`Assalam-o-Alaikum Modern Cool. I am in ${area} and need ${service}. Please confirm technician availability and expected visit time.`), "_blank", "noopener,noreferrer");
  }

  function handleLeadClick(e: MouseEvent<HTMLElement>) {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    const type = href.includes("wa.me") ? "whatsapp_click" : href.startsWith("tel:") ? "phone_call" : null;
    if (!type) return;
    const section = a.closest("[data-section]")?.getAttribute("data-section") ?? "unknown";
    const text = decodeURIComponent(href.split("text=")[1] ?? "");
    const match = text.match(/help with (.+?) in Lahore/);
    trackLead({ event_type: type, section, service: match ? match[1] : null });
  }

  return (
    <main onClick={handleLeadClick} className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground md:pb-0">
      <header data-section="header" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 md:flex md:justify-between md:px-8 lg:py-7">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Modern Cool home"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cobalt text-cobalt-foreground"><Snowflake className="size-5" /></span><span className="truncate text-xl font-extrabold tracking-tight">Modern Cool</span></a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex" aria-label="Primary navigation"><a href="#services" className="hover:text-cobalt">Services</a><a href="#commercial" className="hover:text-cobalt">Commercial</a><a href="#why-us" className="hover:text-cobalt">Why Us</a><a href="#contact" className="hover:text-cobalt">Contact</a></nav>
        <a href={quickMessage("AC or refrigeration service")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-cobalt px-4 text-sm font-bold text-cobalt-foreground shadow-lg shadow-cobalt/15 sm:px-6"><MessageCircle className="size-4"/><span className="hidden sm:inline">Book via WhatsApp</span><span className="sm:hidden">Book</span></a>
      </header>

      <section id="top" data-section="hero" className="mx-auto max-w-7xl px-5 pb-20 pt-10 text-center md:px-8 md:pt-16">
        <div className="mx-auto mb-6 w-fit rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-muted-foreground">+ Serving Lahore since 2016 +</div>
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Cooling &amp; AC experts at your <span className="inline-flex items-center gap-2 text-cobalt">door <span className="grid size-12 place-items-center rounded-2xl bg-cobalt-soft sm:size-16"><Snowflake className="size-7 sm:size-9"/></span></span> in Lahore</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">Garmi mein AC ruk jaye, you need a clear answer fast. We handle home AC repair, deep cleaning and commercial refrigeration from our Walton Road workshop.</p>

        <form onSubmit={submitBooking} className="mx-auto mt-10 grid max-w-4xl gap-2 rounded-3xl border border-border bg-card p-2 text-left shadow-xl shadow-foreground/5 md:grid-cols-[1fr_1.4fr_auto]" aria-label="Book an HVAC technician on WhatsApp">
          <label className="relative min-w-0 rounded-2xl px-4 py-3 text-[11px] font-bold uppercase text-muted-foreground"><span className="flex items-center gap-2"><MapPin className="size-4 text-cobalt"/> Area in Lahore</span><select value={area} onChange={(e) => setArea(e.target.value)} className="mt-1 w-full appearance-none bg-transparent pr-7 text-sm font-bold normal-case text-foreground outline-none">{areas.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute bottom-4 right-4 size-4"/></label>
          <label className="relative min-w-0 rounded-2xl border-t border-border px-4 py-3 text-[11px] font-bold uppercase text-muted-foreground md:border-l md:border-t-0"><span className="flex items-center gap-2"><Wind className="size-4 text-cobalt"/> Service needed</span><select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full appearance-none truncate bg-transparent pr-7 text-sm font-bold normal-case text-foreground outline-none">{services.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute bottom-4 right-4 size-4"/></label>
          <button type="submit" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-foreground px-7 text-sm font-bold text-background transition-colors hover:bg-cobalt"><MessageCircle className="size-5"/> Book on WhatsApp</button>
        </form>

        <div className="mt-14 grid gap-4 md:h-[470px] md:grid-cols-12">
          <article className="group relative min-h-[330px] overflow-hidden rounded-3xl md:col-span-5"><img src={residentialImage} alt="Modern Cool technician servicing a split AC" width={960} height={720} fetchPriority="high" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-image-shade"/><div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-left text-overlay"><h2 className="text-2xl font-bold">Fast booking,<br/>doorstep help</h2><RoundLink href={quickMessage("same-day AC repair")} label="Book same-day AC repair"/></div></article>
          <div className="grid gap-4 md:col-span-3 md:grid-rows-[1fr_150px]">
            <article className="group relative min-h-[300px] overflow-hidden rounded-3xl md:min-h-0"><img src={homeownerImage} alt="Modern Cool technician with a Lahore homeowner" width={768} height={1152} loading="lazy" className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"/><span className="absolute left-5 top-5 rounded-full bg-card/95 px-4 py-2 text-xs font-bold">Certified technicians</span></article>
            <div className="rounded-3xl bg-cobalt p-6 text-left text-cobalt-foreground"><div className="flex items-center gap-3"><div className="flex -space-x-2"><span className="size-9 rounded-full border-2 border-cobalt bg-mint"/><span className="size-9 rounded-full border-2 border-cobalt bg-rose"/><span className="size-9 rounded-full border-2 border-cobalt bg-orange"/></div><strong className="text-2xl">98%</strong></div><p className="mt-3 text-xs font-semibold text-cobalt-foreground/80">Customer satisfaction across repair visits</p></div>
          </div>
          <article className="group relative min-h-[330px] overflow-hidden rounded-3xl md:col-span-4"><img src={equipmentImage} alt="Technician checking an AC condenser with gauges" width={768} height={1152} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-image-shade"/><div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-left text-overlay"><h2 className="text-2xl font-bold">Proper diagnosis,<br/>no guesswork</h2><RoundLink href={quickMessage("AC fault diagnosis")} label="Book AC diagnosis"/></div></article>
        </div>
      </section>

      <section id="services" data-section="cooling_essentials" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end"><div><span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold">+ Services +</span><h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Cooling essentials</h2></div><p className="max-w-lg text-sm font-medium leading-relaxed text-muted-foreground md:justify-self-end">From a weak bedroom AC to a chiller that keeps a production floor running, our team arrives ready for the job.</p></div>
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-3">
          {photoServices.map((item, index) => <article key={item.label} className="group relative h-72 min-w-[78%] snap-start overflow-hidden rounded-3xl sm:min-w-[46%] lg:min-w-0 lg:flex-1"><img src={item.image} alt={item.title} loading="lazy" className={`absolute inset-0 size-full object-cover ${item.position} transition-transform duration-700 group-hover:scale-105`}/><div className="absolute inset-0 bg-image-shade"/><span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${index === 0 ? 'bg-orange text-orange-foreground' : index === 1 ? 'bg-rose text-rose-foreground' : index === 2 ? 'bg-cobalt text-cobalt-foreground' : 'bg-mint text-mint-foreground'}`}>{item.label}</span><div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-overlay"><h3 className="text-xl font-bold leading-tight">{item.title}</h3><RoundLink href={quickMessage(item.label)} label={`Ask about ${item.label}`}/></div></article>)}
        </div>
      </section>

      <section data-section="stats" className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end"><h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Speed you feel.<br/>Reliability you can count on.</h2><p className="text-sm font-medium text-muted-foreground md:justify-self-end">Residential urgency and industrial discipline, backed by a physical workshop in Lahore Cantt.</p></div>
        <div className="grid gap-4 md:grid-cols-12 md:auto-rows-[210px]">
          <div className="rounded-3xl bg-secondary p-7 md:col-span-4"><p className="text-2xl font-bold leading-tight">The secret to reliable cooling? A quick response and a proper diagnosis.</p><p className="mt-8 text-xs font-bold text-muted-foreground">From Walton Road, across Lahore</p></div>
          <div className="relative overflow-hidden rounded-3xl bg-cobalt p-7 text-cobalt-foreground md:col-span-3"><strong className="text-6xl font-extrabold">48+</strong><p className="mt-2 text-sm font-semibold">Commercial projects supported</p><span className="absolute -bottom-10 -right-6 size-36 rounded-full border-[18px] border-mint/80"/></div>
          <div className="rounded-3xl bg-rose p-7 text-rose-foreground md:col-span-5"><strong className="text-6xl font-extrabold">10k+</strong><p className="mt-2 text-sm font-bold">Units repaired, washed and commissioned</p></div>
          <div className="relative overflow-hidden rounded-3xl bg-orange p-7 text-orange-foreground md:col-span-5"><strong className="text-6xl font-extrabold">24/7</strong><p className="mt-2 max-w-xs text-sm font-bold">Emergency response for corporate AMC partners</p><span className="absolute -bottom-16 right-8 size-40 rounded-full border-[18px] border-plum/20"/></div>
          <div className="flex items-center justify-center rounded-3xl bg-mint p-7 text-center text-mint-foreground md:col-span-4"><p className="text-2xl font-bold leading-tight">Top-rated technicians, fast response &amp; transparent pricing</p></div>
          <div className="rounded-3xl bg-plum p-7 text-plum-foreground md:col-span-3"><strong className="text-4xl font-extrabold">2016</strong><p className="mt-3 text-lg font-bold">Trust over everything</p><ul className="mt-4 space-y-2 text-xs opacity-80"><li>• Certified engineers</li><li>• Walton Road workshop</li></ul></div>
        </div>
      </section>

      <section data-section="top_services" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 md:items-end"><div><span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold">+ Popular now +</span><h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Top services for Lahore</h2></div><a href={quickMessage("an HVAC service")} target="_blank" rel="noreferrer" className="hidden w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background md:flex md:justify-self-end">Ask a technician <ArrowUpRight className="size-4"/></a></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {topServices.map((item) => { const Icon = item.icon; return <article key={item.title} className={`${item.tone} flex min-h-[390px] flex-col rounded-3xl p-7`}><span className="grid size-12 place-items-center rounded-2xl bg-card/15"><Icon className="size-6"/></span><h3 className="mt-10 text-2xl font-extrabold leading-tight">{item.title}</h3><p className="mt-4 text-sm font-medium leading-relaxed opacity-80">{item.body}</p><a href={quickMessage(item.title)} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center justify-between rounded-full border border-current/25 px-4 py-3 text-sm font-bold">Book this service <ArrowUpRight className="size-4"/></a></article> })}
        </div>
      </section>

      <section id="why-us" data-section="testimonial" className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <p className="mb-8 text-center text-xs font-bold">+ Lahore businesses that trust our work +</p>
        <div className="rounded-3xl bg-foreground p-6 text-background md:p-10">
          <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div className="relative h-72 overflow-hidden rounded-3xl bg-orange"><img src={industrialHero} alt="Industrial HVAC maintenance by Modern Cool" width={1280} height={960} loading="lazy" className="size-full object-cover"/></div>
            <div><div className="flex gap-1 text-orange">{[1,2,3,4,5].map((n)=><Star key={n} className="size-5 fill-current"/>)}</div><p className="mt-6 text-2xl font-semibold leading-relaxed">Clear advice, professional tools and dependable follow-through—whether the call is from a family home or a running plant.</p><p className="mt-6 text-sm font-bold text-background/60">What Modern Cool clients value</p></div>
          </div>
          <div id="commercial" className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{clients.map(client=><div key={client} className="flex min-h-20 items-center rounded-2xl bg-background/5 px-5 text-sm font-bold">{client}</div>)}</div>
        </div>
      </section>

      <SymptomAdvisor whatsappLink={whatsappLink} />

      <section data-section="quick_list" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1fr]"><div><span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold">+ Quick booking +</span><h2 className="mt-5 text-4xl font-extrabold tracking-tight">Tell us what’s gone wrong. We’ll take it from there.</h2></div><div className="divide-y divide-border">{["AC Master Wash", "Gas Charging", "PCB Repair", "Chiller AMC"].map((item, index)=><a key={item} href={quickMessage(item)} target="_blank" rel="noreferrer" className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-5"><span className={`grid size-11 shrink-0 place-items-center rounded-xl ${index%2 ? 'bg-mint' : 'bg-rose'}`}><Snowflake className="size-5"/></span><span className="min-w-0 truncate text-lg font-bold">{item}</span><span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background"><ArrowUpRight className="size-4"/></span></a>)}</div></div>
      </section>

      <footer id="contact" data-section="footer" className="mx-3 mb-3 rounded-3xl bg-cobalt text-cobalt-foreground md:mx-6 md:mb-6">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_auto] md:px-10 md:py-16"><div><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-card text-cobalt"><Snowflake className="size-5"/></span><span className="text-xl font-extrabold">Modern Cool</span></div><h2 className="mt-8 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">AC comfort at home. Cooling certainty at work.</h2><p className="mt-5 max-w-2xl text-sm font-medium text-cobalt-foreground/75">Serving DHA, Gulberg, Cantt, Model Town, Johar Town, Bahria, Sundar Industrial Estate and Kot Lakhpat.</p></div><address className="not-italic md:text-right"><p className="font-semibold">Al-Noor Town, Workshop Stop<br/>Walton Road, Lahore Cantt, Pakistan</p><a href="tel:+923207979097" className="mt-5 block text-xl font-bold">{phoneDisplay}</a><a href="mailto:Moderncoolcompany1@gmail.com" className="mt-2 block text-sm font-semibold">Moderncoolcompany1@gmail.com</a></address></div>
      </footer>

      <div data-section="mobile_bar" className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-2 gap-2 bg-background/95 p-2 shadow-2xl backdrop-blur md:hidden"><a href={quickMessage("AC or refrigeration service")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-cobalt text-sm font-bold text-cobalt-foreground"><MessageCircle className="size-5"/> WhatsApp Chat</a><a href="tel:+923207979097" className="flex items-center justify-center gap-2 rounded-full bg-orange text-sm font-bold text-orange-foreground"><Phone className="size-5"/> Call Now</a></div>
    </main>
  );
}
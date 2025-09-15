import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Factory, Layers, Zap, GaugeCircle, Grid, Phone, Mail, MapPin,
  CheckCircle2, ChevronRight, Search, Filter, ShoppingCart, FileText,
  Rocket, Check, XCircle
} from "lucide-react"

// ---------------- Brand Config ----------------
const BRAND = {
  name: "Vaishnavi Weavetech LLP",
  tagline: "Import-substitute warp-knit fabrics | Powernet • Shapewear • Spacer | India-made",
  brandPrimary: "#0B2447", // navy
  brandAccent: "#1FA97A",  // emerald
  brandSoft: "#EEF5FF",
}

// ---------------- Formspree Endpoint ----------------
const FORM_ENDPOINT = "https://formspree.io/f/xjkolyjz" // live

// ---------------- Product Taxonomy (EL Tricot) ----------------
const CATEGORIES = [
  {
    key: "apparel",
    title: "Apparel & Intimates",
    blurb: "Soft hand-feel, controlled stretch & recovery, lingerie-grade surfaces.",
    items: [
      { name: "Powernet (Control/Support)", spec: "Nylon/Spandex • 120–280 gsm • 20–35% elongation", tags: ["apparel","stretch","support"] },
      { name: "Shapewear Tricot", spec: "Fine gauge • smooth face • brushed back (optional)", tags: ["apparel","shapewear"] },
      { name: "Lingerie Lining Tricot", spec: "E28–E36 fine hand • dyeable", tags: ["apparel","lingerie"] },
      { name: "Sports Mesh (Micro-mesh)", spec: "Breathable • moisture management", tags: ["sports","mesh"] },
    ],
  },
  {
    key: "performance",
    title: "Performance & Footwear",
    blurb: "High breathability meshes and structured bases for lamination.",
    items: [
      { name: "Shoe Upper Mesh", spec: "Engineered apertures • laminate-ready", tags: ["footwear","mesh"] },
      { name: "Backpack / Luggage Mesh", spec: "Tear-resistant • abrasion resistant", tags: ["bags","mesh"] },
      { name: "Spacer (3D) — Light", spec: "3–5 mm loft • air-flow • cushioning", tags: ["spacer","3D"] },
      { name: "Spacer (3D) — Medium", spec: "6–10 mm loft • body-contact comfort", tags: ["spacer","3D"] },
    ],
  },
  {
    key: "home",
    title: "Home & Upholstery",
    blurb: "Tulle, curtain net, sofa velvet and decorative textures made fast with EL lapping.",
    items: [
      { name: "Tulle / Curtain Net", spec: "Stable apertures • drape", tags: ["home","net"] },
      { name: "Sofa Velvet (Turtle / Suede effect)", spec: "Plush touch • embossable", tags: ["home","velvet"] },
      { name: "Crinkle / Bubble Textures", spec: "EL-patterned surfaces • dimensional", tags: ["home","texture"] },
    ],
  },
  {
    key: "auto",
    title: "Automotive & Mobility",
    blurb: "Consistent quality bases for lamination, headliner, seat internals, trims.",
    items: [
      { name: "Headliner Base Tricot", spec: "Uniform lay • foam/film lamination", tags: ["auto","lamination"] },
      { name: "Seat Spacer / Ventilation", spec: "3D cushioning • airflow", tags: ["auto","spacer"] },
      { name: "Trims & Acoustic Nets", spec: "Controlled porosity • NVH tuning", tags: ["auto","mesh"] },
    ],
  },
  {
    key: "industrial",
    title: "Industrial & Medical",
    blurb: "Technical bases for coatings, composites, strapping and bandaging.",
    items: [
      { name: "Coating/Lamination Base", spec: "Smooth face • good dimensional stability", tags: ["industrial","lamination"] },
      { name: "Reinforcement Mesh", spec: "Open structure • resin compatible", tags: ["industrial","mesh"] },
      { name: "Medical Elastic Bandage Base", spec: "Skin-friendly • calibrated stretch", tags: ["medical","elastic"] },
    ],
  },
]

const SPECS = [
  { label: "Guide Bars", value: "4-bar EL (3–6 bars available)" },
  { label: "Gauges", value: "E28–E36 typical (others on request)" },
  { label: "Widths", value: "≈ 180–300+ inches working width" },
  { label: "Capabilities", value: "EL electronic lapping • meshes • textures • spacer" },
]

// ---------------- Contact ----------------
const CONTACT = {
  phone: "+91 7567400099",
  email: "surat@vaishnaviweavetech.com",
  address: "Icchapore GIDC, Surat, Gujarat, India",
}

// ---------------- UI Primitives ----------------
const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium border-slate-300/60 bg-white/60 backdrop-blur">
    {children}
  </span>
)

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
)

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 text-slate-900">
      {icon}
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
  </div>
)

const ProductCard = ({ item }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h4 className="font-semibold text-slate-900">{item.name}</h4>
        <p className="text-sm text-slate-600 mt-1">{item.spec}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t,i) => <Tag key={i}>{t}</Tag>)}
        </div>
      </div>
      <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 grid place-items-center">
        <Grid className="h-6 w-6 text-slate-500" />
      </div>
    </div>
  </Card>
)

// ---------------- RFQ (inline success/error, no redirect) ----------------
const RFQ = () => {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true); setError("")
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
      if (res.ok) { setSent(true); form.reset() }
      else {
        const j = await res.json().catch(()=>({}))
        setError(j?.errors?.[0]?.message || "Submission failed. Please try again.")
      }
    } catch {
      setError("Network error. Check connection and try again.")
    } finally { setLoading(false) }
  }

  return (
    <Card className="p-6" id="enquire">
      <SectionTitle
        icon={<FileText className="h-5 w-5 text-slate-700" />}
        title="Request a Quote (RFQ)"
        subtitle="Tell us your target application and key parameters. We'll revert with feasibility and MOQs."
      />

      {sent ? (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <Check className="h-5 w-5"/>
          <div>
            <div className="font-medium">Thanks! Your request is in.</div>
            <div className="text-sm">We usually respond within one business day.</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* simple honeypot */}
          <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />

          <input name="name" required placeholder="Full name" className="input" />
          <input name="email" required type="email" placeholder="Work email" className="input" />
          <input name="company" placeholder="Company" className="input" />
          <input name="phone" placeholder="Phone / WhatsApp" className="input" />
          <input name="application" placeholder="Application (e.g., shapewear, headliner, spacer)" className="input md:col-span-2" />
          <textarea name="specs" placeholder="GSM, composition, width, color, stretch %, finish, monthly volume…" rows={4} className="textarea md:col-span-2" />
          <button className="btn md:col-span-2" type="submit" disabled={loading}>
            <ShoppingCart className="h-4 w-4 mr-2" /> {loading ? "Submitting…" : "Submit RFQ"}
          </button>
          {error && (
            <div className="md:col-span-2 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
              <XCircle className="h-4 w-4"/> <span className="text-sm">{error}</span>
            </div>
          )}
        </form>
      )}
    </Card>
  )
}

// ---------------- App ----------------
export default function App() {
  const [q, setQ] = useState("")
  const filtered = useMemo(() => {
    if (!q.trim()) return CATEGORIES
    const t = q.toLowerCase()
    return CATEGORIES.map(cat => ({
      ...cat,
      items: cat.items.filter(it =>
        (it.name + it.spec + it.tags.join(" ")).toLowerCase().includes(t)
      )
    })).filter(cat => cat.items.length)
  }, [q])

  return (
    <div
      className="min-h-screen bg-[--bg] text-slate-800"
      style={{ ['--bg']: `linear-gradient(180deg, ${BRAND.brandSoft} 0%, #ffffff 100%)` }}
    >
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur border-b border-slate-200/60 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl"
              style={{background: `conic-gradient(from 120deg, ${BRAND.brandAccent}, ${BRAND.brandPrimary})`}}
            />
            <div>
              <div className="font-semibold">{BRAND.name}</div>
              <div className="text-xs text-slate-500">{BRAND.tagline}</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#products" className="hover:text-slate-900">Products</a>
            <a href="#capability" className="hover:text-slate-900">Capability</a>
            <a href="#enquire" className="hover:text-slate-900">RFQ</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
          <a href="#enquire" className="btn hidden md:inline-flex">Enquire</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{opacity:0, y:10}}
                animate={{opacity:1, y:0}}
                transition={{duration:.5}}
                className="text-3xl md:text-5xl font-bold leading-tight"
              >
                EL Warp-Knitting Tricot —
                <span className="block" style={{color: BRAND.brandPrimary}}>Made in India, at Scale</span>
              </motion.h1>
              <p className="mt-4 text-slate-600 max-w-xl">
                We manufacture high-value, flexible, import-substitute warp-knit fabrics on modern <b>EL Tricot machines</b>:
                powernet, shapewear, spacer (3D), sports meshes, tulle, upholstery textures and technical bases.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#products" className="btn">
                  <Layers className="h-4 w-4 mr-2"/> Explore Products
                </a>
                <a href="#enquire" className="btn btn-outline">
                  <Rocket className="h-4 w-4 mr-2"/> Start an RFQ
                </a>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                {[
                  {icon: <Zap className="h-4 w-4"/>, text: "Quick pattern change (EL)"},
                  {icon: <GaugeCircle className="h-4 w-4"/>, text: "Fine gauges E28–E36"},
                  {icon: <Factory className="h-4 w-4"/>, text: "Large-width production"},
                ].map((f,i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="text-[--accent]" style={{['--accent']: BRAND.brandAccent}}>{f.icon}</span>{f.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl border border-slate-200 bg-white shadow-inner p-4 grid place-items-center">
                <div className="text-center max-w-sm">
                  <div
                    className="mx-auto h-20 w-20 rounded-2xl mb-4"
                    style={{
                      background: `radial-gradient(60% 60% at 50% 50%, ${BRAND.brandAccent}33, transparent),
                                   linear-gradient(135deg, ${BRAND.brandPrimary} 0%, ${BRAND.brandAccent} 100%)`
                    }}
                  />
                  <h3 className="font-semibold">EL Electronic Lapping</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Software-defined lapping for meshes, textures and fast design iterations without mechanical pattern discs.
                  </p>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-3xl opacity-20"
                   style={{background: `radial-gradient(circle, ${BRAND.brandAccent}, transparent)`}}/>
            </div>
          </div>
        </div>
      </section>

      {/* Search / Filter */}
      <section className="mx-auto max-w-7xl px-4" id="products">
        <Card className="p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Search products, e.g., spacer, powernet, headliner…"
                className="pl-9 input w-full"
              />
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-600">
              <Filter className="h-4 w-4"/> Type to filter catalog
            </div>
          </div>
        </Card>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10">
          {filtered.map((cat) => (
            <div key={cat.key}>
              <SectionTitle
                icon={<Layers className="h-5 w-5 text-slate-700"/>}
                title={cat.title}
                subtitle={cat.blurb}
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {cat.items.map((it, idx) => <ProductCard key={idx} item={it} />)}
              </div>
            </div>
          ))}
          {!filtered.length && (
            <Card className="p-10 text-center text-slate-600">
              No matches. Try keywords like <b>spacer</b>, <b>mesh</b>, <b>powernet</b>, <b>headliner</b>.
            </Card>
          )}
        </div>
      </section>

      {/* Capability */}
      <section className="mx-auto max-w-7xl px-4 pb-10" id="capability">
        <Card className="p-6">
          <SectionTitle
            icon={<GaugeCircle className="h-5 w-5 text-slate-700"/>}
            title="Machine Capability — EL Tricot"
            subtitle="We operate modern Tricot machines with EL electronic lapping for rapid pattern swaps and consistent quality."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-3">
              {SPECS.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5" style={{color: BRAND.brandAccent}}/>
                  <div>
                    <div className="font-medium text-slate-900">{s.label}</div>
                    <div className="text-sm text-slate-600">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-white to-slate-50">
              <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
                <li>Meshes with engineered apertures for breathability and laminations.</li>
                <li>Textured surfaces (crinkle/bubble) using EL lapping patterns.</li>
                <li>3D spacer constructions for cushioning and airflow.</li>
                <li>Fine, stable tricot for linings, shapewear and control fabrics.</li>
              </ul>
              <a href="#enquire" className="mt-4 inline-flex items-center text-[--primary]" style={{['--primary']: BRAND.brandPrimary}}>
                Discuss feasibility <ChevronRight className="h-4 w-4 ml-1"/>
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* RFQ */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <RFQ />
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-4 pb-16" id="contact">
        <Card className="p-6">
          <SectionTitle
            icon={<Phone className="h-5 w-5 text-slate-700"/>}
            title="Contact"
            subtitle="We usually respond within one business day."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center"
                   style={{background: `${BRAND.brandAccent}22`, color: BRAND.brandAccent}}>
                <Phone className="h-5 w-5"/>
              </div>
              <div>
                <div className="text-sm text-slate-500">Phone</div>
                <div className="font-medium">{CONTACT.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center"
                   style={{background: `${BRAND.brandAccent}22`, color: BRAND.brandAccent}}>
                <Mail className="h-5 w-5"/>
              </div>
              <div>
                <div className="text-sm text-slate-500">Email</div>
                <div className="font-medium">{CONTACT.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center"
                   style={{background: `${BRAND.brandAccent}22`, color: BRAND.brandAccent}}>
                <MapPin className="h-5 w-5"/>
              </div>
              <div>
                <div className="text-sm text-slate-500">Address</div>
                <div className="font-medium">{CONTACT.address}</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#enquire" className="hover:text-slate-700">Enquire</a>
            <a href="#products" className="hover:text-slate-700">Products</a>
            <a href="#capability" className="hover:text-slate-700">Capability</a>
          </div>
        </div>
      </footer>

      {/* Minimal utility styles for inputs/buttons */}
      <style>{`
        .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:1rem;padding:.625rem 1rem;border:1px solid ${BRAND.brandPrimary}20;background:${BRAND.brandPrimary};color:white;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.06)}
        .btn:hover{opacity:.95}
        .btn[disabled]{opacity:.6;cursor:not-allowed}
        .btn-outline{background:transparent;color:${BRAND.brandPrimary};border-color:${BRAND.brandPrimary}33}
        .input,.textarea{border:1px solid rgb(226 232 240);border-radius:1rem;padding:.625rem .875rem;outline:none;width:100%;background:white}
        .input:focus,.textarea:focus{border-color:${BRAND.brandAccent}}
      `}</style>
    </div>
  )
}

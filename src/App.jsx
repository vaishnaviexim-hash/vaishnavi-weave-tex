import React, { useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { CheckCircle, Factory, Layers, Zap, Wrench, Shield, Phone, Mail, MapPin, ChevronRight } from 'lucide-react'

const Feature = ({ icon, title, desc }) => (
  <div className="card"><div className="card-body">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-xl bg-slate-100">{icon}</div>
      <div className="text-lg font-medium">{title}</div>
    </div>
    <p className="text-slate-600 text-sm">{desc}</p>
  </div></div>
)

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="container-max">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
        {subtitle && (<p className="mt-3 text-slate-600 max-w-3xl mx-auto">{subtitle}</p>)}
      </motion.div>
      {children}
    </div>
  </section>
)

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const canSubmit = form.name && (form.email || form.phone) && form.message

  const features = [
    { icon: <Layers className="h-6 w-6" />, title: 'Warp Knitting (EL)', desc: 'High-speed EL warp knitting for uniform mesh, nets & engineered fabrics.' },
    { icon: <Wrench className="h-6 w-6" />, title: 'Jacquard Integration', desc: 'Patterning flexibility with jacquard attachments for complex motifs.' },
    { icon: <Zap className="h-6 w-6" />, title: 'Rapid Development', desc: 'Quick sampling to production with agile design-to-loom workflow.' },
    { icon: <Shield className="h-6 w-6" />, title: 'Quality Focus', desc: 'Inline checks for GSM, dimensional stability & defect control.' },
  ]
  const industries = [
    { name: 'Athleisure & Sportswear', points: ['Breathable meshes', 'Power-net', 'Spacer fabrics'] },
    { name: 'Automotive & Seating', points: ['Seat support meshes', 'Headliner substrates'] },
    { name: 'Medical & Care', points: ['Elastic bandages', 'Support meshes (non-sterile)'] },
    { name: 'Home & Interiors', points: ['Curtain nets', 'Decor meshes', 'Organizers'] },
    { name: 'Industrial & Safety', points: ['Filtration meshes', 'Packaging sleeves', 'Reinforcement'] },
  ]
  const process = [
    { step: '1', title: 'Requirement Capture', text: 'GSM, hand-feel, width, color, end-use & target price.' },
    { step: '2', title: 'Design & Yarn Selection', text: 'Guide bar plan, yarn counts, elastane %, denier/tex.' },
    { step: '3', title: 'Sampling', text: 'Lab dips & loom trials to lock quality and touch.' },
    { step: '4', title: 'Production', text: 'Optimized settings for stability, shrinkage & yield.' },
    { step: '5', title: 'Finishing', text: 'Setting, heat treatment, inspection & packing.' },
  ]

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b bg-white/70">
          <div className="container-max h-16 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">VW</span>
              <div className="leading-tight">
                <div className="font-semibold">Vaishnavi Weave Tex LLP</div>
                <div className="text-xs text-slate-500">Engineered Warp-Knit Fabrics</div>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#capabilities" className="hover:text-slate-900 text-slate-600">Capabilities</a>
              <a href="#industries" className="hover:text-slate-900 text-slate-600">Industries</a>
              <a href="#process" className="hover:text-slate-900 text-slate-600">Process</a>
              <a href="#gallery" className="hover:text-slate-900 text-slate-600">Gallery</a>
              <a href="#contact" className="hover:text-slate-900 text-slate-600">Contact</a>
              <a href="#enquire" className="btn btn-primary">Enquire</a>
            </nav>
          </div>
        </header>

        <section id="home" className="relative overflow-hidden">
          <div className="container-max py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold tracking-tight">
                  Precision EL Warp Knitting
                </motion.h1>
                <p className="mt-4 text-lg text-slate-600">We design and manufacture custom warp-knit meshes and nets with jacquard patterning — built for performance, consistency, and scale.</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href="#enquire" className="btn btn-primary">Get a Quote</a>
                  <a href="#capabilities" className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900">
                    Explore capabilities <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                  <div className="badge"><CheckCircle className="h-4 w-4" /> Fast sampling</div>
                  <div className="badge"><CheckCircle className="h-4 w-4" /> Consistent GSM</div>
                  <div className="badge"><CheckCircle className="h-4 w-4" /> On-time delivery</div>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-50 shadow-xl ring-1 ring-black/5 p-1">
                  <div className="h-full w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_right,theme(colors.slate.100),theme(colors.slate.200))] flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2 p-6">{[...Array(18)].map((_, i) => (<div key={i} className="h-14 w-24 rounded-lg bg-white/70 shadow-inner border border-slate-200" />))}</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg border p-4 flex items-center gap-3">
                  <Factory className="h-6 w-6" />
                  <div><div className="text-sm font-medium">In-house sampling</div><div className="text-xs text-slate-500">Rapid prototyping to production</div></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="capabilities" title="Capabilities" subtitle="From concept to continuous production, we deliver stable, repeatable quality.">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (<Feature key={idx} icon={f.icon} title={f.title} desc={f.desc} />))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="card"><div className="card-body"><div className="text-lg font-medium mb-2">Materials</div><div className="text-sm text-slate-600 space-y-2"><p>Polyester • Nylon • Elastane (Spandex) • Cotton blends</p><p>Counts/Denier per design spec; dyed/undyed; high-tenacity on request.</p></div></div></div>
            <div className="card"><div className="card-body"><div className="text-lg font-medium mb-2">Widths & GSM</div><div className="text-sm text-slate-600 space-y-2"><p>Typical width: 36&quot;–72&quot; (others on request)</p><p>GSM: 40–300 depending on construction and yarn mix.</p></div></div></div>
            <div className="card"><div className="card-body"><div className="text-lg font-medium mb-2">Finishes</div><div className="text-sm text-slate-600 space-y-2"><p>Heat setting • Soft handle • Anti-roll edges • Custom packing</p><p>Third-party testing available per requirement.</p></div></div></div>
          </div>
        </Section>

        <Section id="industries" title="Industries & Applications" subtitle="We tailor constructions for performance across categories.">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((it, i) => (
              <div key={i} className="card"><div className="card-body">
                <div className="text-lg font-medium">{it.name}</div>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
                  {it.points.map((p, j) => (<li key={j}>{p}</li>))}
                </ul>
              </div></div>
            ))}
          </div>
        </Section>

        <Section id="process" title="How We Work" subtitle="A clear, collaborative flow for reliable outcomes.">
          <div className="grid md:grid-cols-5 gap-4">
            {process.map((p, i) => (
              <div key={i} className="relative card"><div className="card-body h-full">
                <div className="text-5xl font-bold text-slate-200 leading-none">{p.step}</div>
                <div className="mt-2 font-medium">{p.title}</div>
                <div className="text-sm text-slate-600 mt-1">{p.text}</div>
              </div></div>
            ))}
          </div>
        </Section>

        <Section id="gallery" title="Gallery" subtitle="Sample meshes and patterns (representative renders)">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (<div key={i} className="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border shadow-inner" />))}
          </div>
          <p className="text-xs text-center text-slate-500 mt-3">Note: Replace placeholders with actual product photos later.</p>
        </Section>

        <div className="bg-slate-900 text-white">
          <div className="container-max py-10 md:py-12 grid md:grid-cols-2 gap-6 items-center">
            <div><h3 className="text-2xl font-semibold">Have a fabric in mind?</h3><p className="text-slate-300 mt-1">Share your GSM, width and end-use — we'll revert with a quick feasibility and timeline.</p></div>
            <div className="flex md:justify-end"><a href="#enquire" className="btn bg-white text-slate-900 hover:opacity-90 rounded-xl">Start an Enquiry</a></div>
          </div>
        </div>

        <Section id="contact" title="Contact" subtitle="Reach out for sampling, quotations, or collaborations.">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card"><div className="card-body space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-700"><MapPin className="h-4 w-4 mt-0.5" /><span><span className="font-medium">Vaishnavi Weave Tex LLP</span><br/>220, Rajhans Ornate,<br/>Parle Point,<br/>Surat (Gujarat) India</span></div>
              <div className="flex items-start gap-3 text-slate-700"><Phone className="h-4 w-4 mt-0.5" /><span>+91 7567400099</span></div>
              <div className="flex items-start gap-3 text-slate-700"><Mail className="h-4 w-4 mt-0.5" /><span>admin@vaishnaviweavetex.com</span></div>
            </div></div>
            <div className="card md:col-span-2" id="enquire"><div className="card-body">
              {!submitted ? (
                <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); if (canSubmit) setSubmitted(true);}}>
                  <input name="name" placeholder="Your name" value={form.name} onChange={onChange} className="w-full rounded-lg border p-2" />
                  <input name="company" placeholder="Company (optional)" onChange={onChange} className="w-full rounded-lg border p-2" />
                  <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full rounded-lg border p-2" />
                  <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} className="w-full rounded-lg border p-2" />
                  <div className="md:col-span-2"><textarea name="message" placeholder="Tell us about the fabric you need (GSM, width, end-use, target price)" value={form.message} onChange={onChange} rows={5} className="w-full rounded-lg border p-2" /></div>
                  <div className="md:col-span-2 flex items-center justify-between">
                    <div className="text-xs text-slate-500">We’ll reply within 1 business day.</div>
                    <button type="submit" disabled={!canSubmit} className="btn btn-primary rounded-xl disabled:opacity-40">Send Enquiry</button>
                  </div>
                </form>
              ) : (<div className="p-6 rounded-xl bg-green-50 border border-green-200 text-green-800">Thanks! This demo stores nothing. Connect this form to your email/CRM to receive submissions.</div>)}
            </div></div>
          </div>
        </Section>

        <footer className="border-t">
          <div className="container-max py-10 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div>© {new Date().getFullYear()} Vaishnavi Weave Tex LLP. Mesh, lace, net, spacer fabric — for Lingerie, Sportswear, Automotive Textiles, Curtains, Shoe Fabric, Shirts, Garments.</div>
            <div className="flex items-center gap-4">
              <a href="#capabilities" className="hover:text-slate-900">Capabilities</a>
              <a href="#industries" className="hover:text-slate-900">Industries</a>
              <a href="#process" className="hover:text-slate-900">Process</a>
              <a href="#contact" className="hover:text-slate-900">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}

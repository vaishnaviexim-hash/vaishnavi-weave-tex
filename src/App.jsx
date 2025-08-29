import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Factory, Layers, Zap, GaugeCircle, Grid, Phone, Mail, MapPin, CheckCircle2, ChevronRight, Search, Filter, ShoppingCart, FileText, Rocket, Check, XCircle } from "lucide-react"


// Brand Config
const BRAND = {
name: "Vaishnavi Weave Tex LLP",
tagline: "Import‑substitute warp‑knit fabrics | Powernet • Shapewear • Spacer | India‑made",
brandPrimary: "#0B2447", // navy
brandAccent: "#1FA97A", // emerald
brandSoft: "#EEF5FF",
}


// Formspree Endpoint (live)
const FORM_ENDPOINT = "https://formspree.io/f/xzzadowb"


// Product Taxonomy (EL Tricot)
const CATEGORIES = [
{
key: "apparel",
title: "Apparel & Intimates",
blurb: "Soft hand‑feel, controlled stretch & recovery, lingerie‑grade surfaces.",
items: [
{ name: "Powernet (Control/Support)", spec: "Nylon/Spandex • 120–280 gsm • 20–35% elongation", tags: ["apparel","stretch","support"] },
{ name: "Shapewear Tricot", spec: "Fine gauge • smooth face • brushed back (optional)", tags: ["apparel","shapewear"] },
{ name: "Lingerie Lining Tricot", spec: "E28–E36 fine hand • dyeable", tags: ["apparel","lingerie"] },
{ name: "Sports Mesh (Micro‑mesh)", spec: "Breathable • moisture management", tags: ["sports","mesh"] },
],
},
{
key: "performance",
title: "Performance & Footwear",
blurb: "High breathability meshes and structured bases for lamination.",
items: [
{ name: "Shoe Upper Mesh", spec: "Engineered apertures • laminate‑ready", tags: ["footwear","mesh"] },
{ name: "Backpack / Luggage Mesh", spec: "Tear‑resistant • abrasion resistant", tags: ["bags","mesh"] },
{ name: "Spacer (3D) — Light", spec: "3–5 mm loft • air‑flow • cushioning", tags: ["spacer","3D"] },
{ name: "Spacer (3D) — Medium", spec: "6–10 mm loft • body‑contact comfort", tags: ["spacer","3D"] },
],
},
{
key: "home",
title: "Home & Upholstery",
blurb: "Tulle, curtain net, sofa velvet and decorative textures made fast with EL lapping.",
items: [
{ name: "Tulle / Curtain Net", spec: "Stable apertures • drape", tags: ["home","net"] },
{ name: "Sofa Velvet (Turtle / Suede effect)", spec: "Plush touch • embossable", tags: ["home","velvet"] },
{ name: "Crinkle / Bubble Textures", spec: "EL‑patterned surfaces • dimensional", tags: ["home","texture"] },
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
{ name: "Medical Elastic Bandage Base", spec: "Skin‑friendly • calibrated stretch", tags: ["medical","elastic"] },
],
},
]


const SPECS = [
{ label: "Guide Bars", value: "4‑bar EL (3–6 bars available)" },
{ label: "Gauges", value: "E28–E36 typical (others on request)" },
{ label: "Widths", value: "≈ 180–300+ inches working width" },
{ label: "Capabilities", value: "EL electronic lapping • meshes • textures • spacer" },
]


const CONTACT = {
}

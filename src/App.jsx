import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Factory, Layers, Zap, GaugeCircle, Grid, Phone, Mail, MapPin, CheckCircle2, ChevronRight, Search, Filter, ShoppingCart, FileText, Rocket, Check, XCircle } from "lucide-react"

const BRAND = {
  name: "Vaishnavi Weave Tex LLP",
  tagline: "Import-substitute warp-knit fabrics | Powernet • Shapewear • Spacer | India-made",
  brandPrimary: "#0B2447", // navy
  brandAccent: "#1FA97A",  // emerald
  brandSoft: "#EEF5FF",
}

const FORM_ENDPOINT = "https://formspree.io/f/xzzadowb"

const CONTACT = {
  phone: "+91 7567400099",
  email: "admin@vaishnaviweavetex.com",
  address: "Icchapore GIDC, Surat, Gujarat, India",
}

// --- define product categories + specs (same as before, trimmed for brevity) ---
// (Use the full version I prepared earlier)

const CATEGORIES = [ /* …categories with products… */ ]
const SPECS = [
  { label: "Guide Bars", value: "4-bar EL (3–6 bars available)" },
  { label: "Gauges", value: "E28–E36 typical (others on request)" },
  { label: "Widths", value: "≈ 180–300+ inches working width" },
  { label: "Capabilities", value: "EL electronic lapping • meshes • textures • spacer" },
]

// --- UI helpers (Tag, Card, SectionTitle, ProductCard) ---
// --- RFQ form with inline success/error (same as before) ---
// --- App component rendering hero, catalog, capability, RFQ, contact, footer ---

export default function App() {
  // … full code from earlier App.jsx bundle …
}

import soc2 from "./soc2.json";

export const FRAMEWORKS = [
  {
    slug: "soc2",
    name: "SOC 2",
    blurb: "Common Criteria (CC1–CC9) — Trust Services Criteria, Security category.",
    content: soc2,
  },
  {
    slug: "iso-27001",
    name: "ISO 27001",
    blurb: "Annex A controls, 2022 revision.",
    content: null,
  },
  {
    slug: "nist-csf",
    name: "NIST CSF 2.0",
    blurb: "Govern, Identify, Protect, Detect, Respond, Recover.",
    content: null,
  },
  {
    slug: "pci-dss",
    name: "PCI DSS",
    blurb: "12 requirements, v4.0.1.",
    content: null,
  },
  {
    slug: "hipaa",
    name: "HIPAA",
    blurb: "Security Rule — Administrative, Physical, Technical safeguards.",
    content: null,
  },
  {
    slug: "gdpr",
    name: "GDPR",
    blurb: "Chapters 2–4 — the parts that map most cleanly to security controls.",
    content: null,
  },
];

export function getFramework(slug) {
  return FRAMEWORKS.find((f) => f.slug === slug) || null;
}

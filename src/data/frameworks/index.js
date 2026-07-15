import soc2 from "./soc2.json";
import hipaa from "./hipaa.json";
import iso27001 from "./iso-27001.json";
import gdpr from "./gdpr.json";
import cmmc from "./cmmc.json";
import nistCsf from "./nist-csf.json";
import ccpa from "./ccpa.json";

// How compliance is actually demonstrated — shown as a tag alongside each
// framework, since it's easy to conflate "certification" and "attestation"
// and the distinction matters (see each framework's own Overview for the
// fuller explanation).
export const FRAMEWORK_TYPES = {
  attestation: "A CPA/QSA firm's opinion report on your controls — not a pass/fail certificate.",
  certification: "An accredited body issues an actual certificate after an audit.",
  law: "A legal requirement enforced by a government body, not a voluntary standard.",
  framework: "A voluntary risk-management framework with no certification or attestation mechanism.",
};

export const FRAMEWORKS = [
  {
    slug: "soc2",
    name: "SOC 2",
    blurb: "Common Criteria (CC1–CC9) — Trust Services Criteria, Security category.",
    type: "attestation",
    content: soc2,
  },
  {
    slug: "iso-27001",
    name: "ISO 27001",
    blurb: "Annex A controls, 2022 revision.",
    type: "certification",
    content: iso27001,
  },
  {
    slug: "nist-csf",
    name: "NIST CSF 2.0",
    blurb: "Govern, Identify, Protect, Detect, Respond, Recover.",
    type: "framework",
    content: nistCsf,
  },
  {
    slug: "pci-dss",
    name: "PCI DSS",
    blurb: "12 requirements, v4.0.1.",
    type: "attestation",
    content: null,
  },
  {
    slug: "hipaa",
    name: "HIPAA",
    blurb: "Security Rule — Administrative, Physical, Technical safeguards.",
    type: "law",
    content: hipaa,
  },
  {
    slug: "gdpr",
    name: "GDPR",
    blurb: "Chapters II–IV — the parts that map most cleanly to security controls.",
    type: "law",
    content: gdpr,
  },
  {
    slug: "cmmc",
    name: "CMMC",
    blurb: "Level 2 — all 110 NIST SP 800-171 practices.",
    type: "certification",
    content: cmmc,
  },
  {
    slug: "ccpa",
    name: "CCPA",
    blurb: "Consumer rights & business obligations, as amended by CPRA.",
    type: "law",
    content: ccpa,
  },
];

export function getFramework(slug) {
  return FRAMEWORKS.find((f) => f.slug === slug) || null;
}

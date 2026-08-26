import type { IconType } from "react-icons";
import {
  FaArrowsRotate,
  FaAward,
  FaBuildingColumns,
  FaBullseye,
  FaCartShopping,
  FaCode,
  FaEye,
  FaGraduationCap,
  FaHandshake,
  FaHeadset,
  FaHeart,
  FaHospital,
  FaHotel,
  FaHouse,
  FaCar,
  FaEarthAmericas,
  FaGem,
  FaLightbulb,
  FaRocket,
  FaSeedling,
  FaShieldHalved,
  FaUsers,
  FaUsersGear,
  FaUtensils,
} from "react-icons/fa6";

export const aboutHighlights: {
  title: string;
  description: string;
  icon: IconType;
}[] = [
  // Checkable facts rather than claims. The previous set asserted ISO
  // certification and clients in 10+ countries, neither of which the site
  // evidences anywhere.
  {
    title: "Nine people",
    description: "Everyone on the team page works on client projects",
    icon: FaUsersGear,
  },
  {
    title: "Nine products",
    description: "Built in-house, licensed and maintained by us",
    icon: FaRocket,
  },
  {
    title: "Six service lines",
    description: "Web, mobile, AI, design, marketing and 3D",
    icon: FaAward,
  },
  {
    title: "UTC+5:45",
    description: "Overlaps the working day across Asia, the Gulf and Europe",
    icon: FaEarthAmericas,
  },
];

export const foundationCards: {
  label: string;
  title: string;
  body: string;
  points: string[];
  icon: IconType;
  /** Per-card icon gradient and hover glow, from the legacy .mission/.vision/.values rules. */
  iconGradient: string;
  glow: string;
}[] = [
  {
    label: "01",
    title: "Our Mission",
    body: "To build software that still works two years after we hand it over. That means documented handovers, established tooling for the parts that have to keep running, and being straight with clients about what a project actually requires.",
    points: [
      "Documented handovers on every project",
      "Established tooling for anything long-lived",
      "Honest scoping before a deposit is taken",
    ],
    icon: FaBullseye,
    iconGradient: "from-[#6366f1] to-[#8b5cf6]",
    glow: "bg-[rgb(99_102_241_/_0.2)]",
  },
  {
    label: "02",
    title: "Our Vision",
    body: "To be the studio that businesses in Nepal and the wider region turn to first — and to prove that serious engineering does not require a Bangalore or Singapore address to be taken seriously.",
    points: [
      "The studio the region turns to first",
      "Serious engineering, built from Nepal",
      "Products, not just billable hours",
    ],
    icon: FaEye,
    iconGradient: "from-[#0ea5e9] to-[#06b6d4]",
    glow: "bg-[rgb(14_165_233_/_0.2)]",
  },
  {
    label: "03",
    title: "Our Values",
    body: "Say what the work will cost before starting it. Flag problems while they are still cheap to fix. Turn down projects that are a poor fit rather than delivering them badly. None of it is complicated; most of it is just uncomfortable.",
    points: [
      "Price quoted before work begins",
      "Problems flagged while still cheap",
      "Poor-fit projects turned down",
    ],
    icon: FaHeart,
    iconGradient: "from-[#ec4899] to-[#f43f5e]",
    glow: "bg-[rgb(236_72_153_/_0.2)]",
  },
];

export const coreValues: {
  title: string;
  description: string;
  icon: IconType;
  accent: string;
}[] = [
  {
    title: "Trust & Transparency",
    description:
      "We quote before we start, flag overruns as they happen rather than at invoicing, and tell you when a feature is not worth what it will cost to build.",
    icon: FaHandshake,
    accent: "#6366f1",
  },
  {
    title: "Creative Innovation",
    description:
      "We read the release notes and try the new tooling, then use the established option anyway for anything that has to stay up. Novelty is a cost your maintenance budget pays later.",
    icon: FaLightbulb,
    accent: "#ec4899",
  },
  {
    title: "Excellence Always",
    description:
      "Code review on everything, tests on the parts that matter, and a security pass before launch rather than after an incident report.",
    icon: FaGem,
    accent: "#14b8a6",
  },
  {
    title: "Team Collaboration",
    description:
      "Nine people means the designer, the backend developer and the person who will support the thing are all in the same conversation from week one.",
    icon: FaUsers,
    accent: "#f59e0b",
  },
  {
    title: "Passion Driven",
    description:
      "We take on a limited number of projects at once. It caps our revenue and it is the only reason we can keep senior people on every engagement.",
    icon: FaHeart,
    accent: "#ef4444",
  },
  {
    title: "Continuous Growth",
    description:
      "Every project ends with a written retrospective, and the things that went wrong get fixed in how we run the next one rather than repeated.",
    icon: FaSeedling,
    accent: "#3b82f6",
  },
];

export const differentiators: {
  title: string;
  body: string;
  icon: IconType;
}[] = [
  {
    title: "Expert Technical Team",
    // NOTE: the legacy markup shipped this item with an empty body, so it never
    // had copy of its own. Summarised here from the team and tech-stack pages.
    body: "Our developers, designers, and engineers work across React, Angular, Node.js, Python, Flutter, and TensorFlow — the same stack that powers every project we deliver.",
    icon: FaCode,
  },
  {
    title: "Agile Development Process",
    body: "We follow agile methodology with 2-week sprints, daily standups, and regular demos. This ensures transparency, flexibility, and continuous delivery of value throughout the project lifecycle.",
    icon: FaArrowsRotate,
  },
  {
    title: "Security First Approach",
    body: "Security is embedded in every stage of our development process. We conduct regular security audits, follow OWASP guidelines, and implement enterprise-grade encryption and authentication.",
    icon: FaShieldHalved,
  },
  {
    title: "Dedicated Support & Maintenance",
    body: "Our relationship doesn't end at deployment. We provide 24/7 dedicated support, proactive monitoring, regular updates, and performance optimization to ensure your solution runs flawlessly.",
    icon: FaHeadset,
  },
];

export const industries: { title: string; icon: IconType; accent: string }[] = [
  { title: "Healthcare", icon: FaHospital, accent: "#6366f1" },
  { title: "Hospitality", icon: FaHotel, accent: "#ec4899" },
  { title: "Retail & E-Commerce", icon: FaCartShopping, accent: "#14b8a6" },
  { title: "Education", icon: FaGraduationCap, accent: "#f59e0b" },
  { title: "Finance & Banking", icon: FaBuildingColumns, accent: "#3b82f6" },
  { title: "Food & Restaurant", icon: FaUtensils, accent: "#ef4444" },
  { title: "Transportation", icon: FaCar, accent: "#8b5cf6" },
  { title: "Real Estate", icon: FaHouse, accent: "#06b6d4" },
];

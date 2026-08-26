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
  {
    title: "Innovation-Driven",
    description: "Always exploring emerging technologies",
    icon: FaRocket,
  },
  {
    title: "Client-Centric",
    description: "Your success is our primary goal",
    icon: FaUsersGear,
  },
  {
    title: "Quality Assured",
    description: "ISO certified development processes",
    icon: FaAward,
  },
  {
    title: "Global Presence",
    description: "Serving clients in 10+ countries",
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
    body: "To deliver innovative, high-quality software solutions that empower businesses to achieve their digital transformation goals. We strive to be the catalyst for positive change — bridging the gap between complex technology and practical business outcomes.",
    points: [
      "Empower businesses globally",
      "Deliver measurable impact",
      "Drive digital transformation",
    ],
    icon: FaBullseye,
    iconGradient: "from-[#6366f1] to-[#8b5cf6]",
    glow: "bg-[rgb(99_102_241_/_0.2)]",
  },
  {
    label: "02",
    title: "Our Vision",
    body: "To become a globally recognized leader in software innovation, setting new benchmarks for quality, creativity, and technological excellence. We envision a future where every business has access to world-class digital tools.",
    points: [
      "Global technology leader",
      "Set industry benchmarks",
      "Democratize technology access",
    ],
    icon: FaEye,
    iconGradient: "from-[#0ea5e9] to-[#06b6d4]",
    glow: "bg-[rgb(14_165_233_/_0.2)]",
  },
  {
    label: "03",
    title: "Our Values",
    body: "Integrity, innovation, collaboration, and excellence drive everything we do. We believe in transparent communication, continuous learning, and building long-term partnerships built on trust and mutual growth.",
    points: [
      "Integrity in every action",
      "Continuous innovation",
      "Collaborative partnerships",
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
      "We believe in open, honest communication. Every decision is made with integrity, and every client relationship is built on a foundation of trust.",
    icon: FaHandshake,
    accent: "#6366f1",
  },
  {
    title: "Creative Innovation",
    description:
      "We challenge conventions and embrace new ideas. Our team constantly explores emerging technologies to deliver groundbreaking solutions.",
    icon: FaLightbulb,
    accent: "#ec4899",
  },
  {
    title: "Excellence Always",
    description:
      "Mediocrity is not in our vocabulary. We pursue excellence in every line of code, every pixel designed, and every interaction with our clients.",
    icon: FaGem,
    accent: "#14b8a6",
  },
  {
    title: "Team Collaboration",
    description:
      "Great things happen when talented people work together. We foster a collaborative culture where every voice matters and every idea counts.",
    icon: FaUsers,
    accent: "#f59e0b",
  },
  {
    title: "Passion Driven",
    description:
      "We're not just building software — we're pursuing our passion. This enthusiasm fuels our creativity and drives us to go above and beyond.",
    icon: FaHeart,
    accent: "#ef4444",
  },
  {
    title: "Continuous Growth",
    description:
      "We invest in learning and development. Our team stays ahead of technology trends to deliver the most current and effective solutions.",
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

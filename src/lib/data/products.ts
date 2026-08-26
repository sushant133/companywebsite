import type { IconType } from "react-icons";
import {
  FaBrain,
  FaCar,
  FaChartLine,
  FaCube,
  FaGlobe,
  FaHospital,
  FaHotel,
  FaPaintbrush,
  FaUtensils,
} from "react-icons/fa6";

export type Product = {
  title: string;
  icon: IconType;
  sector: string;
  /** Featured products lead the page; the rest follow in a denser list. */
  featured?: boolean;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    title: "Restaurant Management System",
    icon: FaUtensils,
    sector: "Hospitality",
    featured: true,
    description:
      "Reservations, online ordering, a kitchen display, stock tracking and billing in one system, so the floor and the kitchen are working from the same information.",
    features: [
      "Table reservations",
      "Online ordering and delivery",
      "Kitchen display system",
      "Inventory tracking",
      "POS and billing",
      "Customer loyalty",
    ],
  },
  {
    title: "Hospital Management System",
    icon: FaHospital,
    sector: "Healthcare",
    featured: true,
    description:
      "Patient records, scheduling, pharmacy and lab results in one place, with billing and insurance handled at the end of the same workflow.",
    features: [
      "Patient registration and records",
      "Appointment scheduling",
      "Electronic health records",
      "Pharmacy management",
      "Lab and diagnostics",
      "Insurance and billing",
    ],
  },
  {
    title: "Hotel CMS",
    icon: FaHotel,
    sector: "Hospitality",
    featured: true,
    description:
      "A booking engine with channel manager integration, housekeeping and guest services, built to run several properties from one account.",
    features: [
      "Room booking engine",
      "Channel manager integration",
      "Guest portal",
      "Housekeeping",
      "Revenue management",
      "Multi-property support",
    ],
  },
  {
    title: "Parking Management System",
    icon: FaCar,
    sector: "Transport",
    description:
      "Live bay occupancy, automated entry and exit with number-plate recognition, digital payment and revenue reporting for operators.",
    features: [
      "Live bay monitoring",
      "Automated entry and exit",
      "Digital payments",
      "Number-plate recognition",
      "Revenue reporting",
      "Driver mobile app",
    ],
  },
  {
    title: "Web Development Suite",
    icon: FaGlobe,
    sector: "General",
    description:
      "Templates, a page builder and a CMS with storefront and analytics built in, for teams that want to run their own site after launch.",
    features: [
      "Responsive templates",
      "SEO tooling",
      "Storefront and checkout",
      "Analytics dashboard",
      "Multi-language",
      "Cloud hosting ready",
    ],
  },
  {
    title: "Digital Marketing Platform",
    icon: FaChartLine,
    sector: "Marketing",
    description:
      "Campaign management, social scheduling, email automation and lead tracking, reported against revenue rather than impressions.",
    features: [
      "Campaign manager",
      "Social scheduling",
      "Email automation",
      "SEO analysis",
      "Lead tracking and CRM",
      "Return-on-spend reporting",
    ],
  },
  {
    title: "AI/ML Intelligence Suite",
    icon: FaBrain,
    sector: "Data",
    description:
      "Forecasting, document classification, sentiment analysis and computer vision, with the training and evaluation tooling around them.",
    features: [
      "Forecasting dashboard",
      "Text and sentiment analysis",
      "Computer vision",
      "Assistant builder",
      "Automated reporting",
      "Custom model training",
    ],
  },
  {
    title: "3D/4D Immersive Platform",
    icon: FaCube,
    sector: "3D",
    description:
      "Browser-based product configurators, virtual walkthroughs and AR previews, running on WebGL without an app install.",
    features: [
      "Product configurator",
      "Virtual walkthroughs",
      "AR preview",
      "Time-based simulation",
      "WebGL and Three.js",
      "Cross-platform",
    ],
  },
  {
    title: "Graphics Design Studio",
    icon: FaPaintbrush,
    sector: "Design",
    description:
      "A browser design toolkit for brand kits, social assets, print-ready artwork and motion graphics, with shared team libraries.",
    features: [
      "Brand identity kits",
      "Social template library",
      "Logo and icon design",
      "Print-ready CMYK export",
      "Motion graphics",
      "Team collaboration",
    ],
  },
];

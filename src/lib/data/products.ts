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
  badge: string;
  /** Featured badges use the brand gradient instead of the tinted pill. */
  featured?: boolean;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    title: "Web Development Suite",
    icon: FaGlobe,
    badge: "Popular",
    description:
      "A comprehensive web development platform featuring customizable templates, drag-and-drop builders, integrated CMS, and e-commerce capabilities. Perfect for businesses looking to establish a powerful online presence.",
    features: [
      "Responsive Design Templates",
      "Built-in SEO Tools",
      "E-Commerce Integration",
      "Analytics Dashboard",
      "Multi-language Support",
      "Cloud Hosting Ready",
    ],
  },
  {
    title: "Restaurant Management System",
    icon: FaUtensils,
    badge: "Featured",
    featured: true,
    description:
      "An all-in-one restaurant management solution that handles table reservations, online ordering, kitchen management, inventory tracking, billing, and customer loyalty programs seamlessly.",
    features: [
      "Table Reservation System",
      "Online Ordering & Delivery",
      "Kitchen Display System",
      "Inventory Management",
      "POS & Billing System",
      "Customer Loyalty Program",
    ],
  },
  {
    title: "Parking Management System",
    icon: FaCar,
    badge: "New",
    description:
      "Smart parking management solution with real-time slot monitoring, automated ticketing, digital payments, ANPR integration, and comprehensive analytics for parking facility operators.",
    features: [
      "Real-time Slot Monitoring",
      "Automated Entry/Exit",
      "Digital Payment Gateway",
      "ANPR Camera Integration",
      "Revenue Analytics",
      "Mobile App for Users",
    ],
  },
  {
    title: "Hotel CMS",
    icon: FaHotel,
    badge: "Popular",
    description:
      "Complete hotel content management and booking system featuring room management, online reservations, guest services, housekeeping management, and multi-property support for the hospitality industry.",
    features: [
      "Room Booking Engine",
      "Channel Manager Integration",
      "Guest Management Portal",
      "Housekeeping Module",
      "Revenue Management",
      "Multi-Property Support",
    ],
  },
  {
    title: "Hospital Management System",
    icon: FaHospital,
    badge: "Enterprise",
    description:
      "Comprehensive healthcare management platform covering patient registration, appointment scheduling, electronic health records, pharmacy management, lab integration, and billing automation.",
    features: [
      "Patient Registration & Records",
      "Appointment Scheduling",
      "Electronic Health Records",
      "Pharmacy Management",
      "Lab & Diagnostics Integration",
      "Insurance & Billing Module",
    ],
  },
  {
    title: "Digital Marketing Platform",
    icon: FaChartLine,
    badge: "New",
    description:
      "All-in-one digital marketing suite with campaign management, social media scheduling, email automation, SEO analysis, lead tracking, and detailed performance analytics dashboards.",
    features: [
      "Campaign Manager",
      "Social Media Scheduler",
      "Email Automation",
      "SEO Analysis Tools",
      "Lead Generation & CRM",
      "ROI Analytics Dashboard",
    ],
  },
  {
    title: "3D/4D Immersive Platform",
    icon: FaCube,
    badge: "Innovative",
    featured: true,
    description:
      "A powerful immersive experience engine for creating stunning 3D product showcases, virtual walkthroughs, augmented reality previews, and interactive 4D simulations for businesses across industries.",
    features: [
      "3D Product Configurator",
      "Virtual Walkthrough Builder",
      "AR Preview Integration",
      "4D Time-based Simulations",
      "WebGL & Three.js Powered",
      "Cross-platform Compatibility",
    ],
  },
  {
    title: "AI/ML Intelligence Suite",
    icon: FaBrain,
    badge: "AI Powered",
    featured: true,
    description:
      "An enterprise-grade artificial intelligence and machine learning platform featuring predictive analytics, natural language processing, computer vision, intelligent chatbots, and automated decision-making tools.",
    features: [
      "Predictive Analytics Dashboard",
      "NLP & Sentiment Analysis",
      "Computer Vision Module",
      "AI Chatbot Builder",
      "Automated Report Generation",
      "Custom ML Model Training",
    ],
  },
  {
    title: "Graphics Design Studio",
    icon: FaPaintbrush,
    badge: "Creative",
    description:
      "A comprehensive cloud-based graphic design toolkit for creating professional brand identities, marketing materials, social media assets, print designs, and motion graphics — all from one intuitive platform.",
    features: [
      "Brand Identity Kit Generator",
      "Social Media Template Library",
      "Logo & Icon Designer",
      "Print-Ready Export (CMYK)",
      "Motion Graphics & Animation",
      "Team Collaboration Tools",
    ],
  },
];

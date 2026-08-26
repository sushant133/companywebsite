import type { IconType } from "react-icons";
import {
  FaBrain,
  FaBullhorn,
  FaCode,
  FaCube,
  FaMobileScreenButton,
  FaPalette,
} from "react-icons/fa6";

export type Service = {
  slug: string;
  title: string;
  icon: IconType;
  /** Short version for the home page grid. */
  teaser: string;
  /** Full version for the services page. */
  description: string;
  features: string[];
  tech: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: FaCode,
    teaser:
      "Marketing sites, customer portals and internal tools, built so your own team can maintain them afterwards.",
    description:
      "Most of our work starts here — marketing sites, customer portals, storefronts and internal tools, usually React or Next.js on the front with Node or Python behind it. Deployment configuration and setup documentation are written alongside the code, so handing the project to another developer is a normal Tuesday rather than a project in itself.",
    features: [
      "Custom Website Development",
      "E-Commerce Solutions",
      "Progressive Web Apps (PWA)",
      "CMS Development",
      "API Development & Integration",
      "Web Portal Development",
    ],
    tech: ["React", "Angular", "Vue.js", "Node.js", "Python", "PHP"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    icon: FaMobileScreenButton,
    teaser:
      "One codebase serving iOS and Android, with store submission handled rather than left to you.",
    description:
      "We build cross-platform apps in Flutter or React Native, which keeps one codebase serving both stores and keeps the budget doing the same. Native Swift or Kotlin where a project genuinely needs it. Store listings, review submissions and the release process are part of the engagement, not an extra you discover at the end.",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Apps",
      "App UI/UX Design",
      "App Testing & QA",
      "App Store Optimization",
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    icon: FaBrain,
    teaser:
      "Document extraction, classification and forecasting — the tasks that quietly consume your team's week.",
    description:
      "The genuinely useful applications here are narrower than the industry usually admits. We build document and form extraction, classification, forecasting, search across your own records, and assistants on top of existing language models. Where a problem does not need machine learning, we will tell you — that happens more often than not.",
    features: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Chatbot Development",
      "Recommendation Systems",
      "Process Automation",
    ],
    tech: ["TensorFlow", "PyTorch", "OpenAI", "Python", "Scikit-learn"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: FaPalette,
    teaser:
      "Interface and flow design delivered as components engineers can build directly from.",
    description:
      "Wireframes, prototypes and finished interface design, handed over as a component library rather than a folder of flat screens — which is where most of the detail gets lost between design and build. Usability sessions run against the prototype, before production code makes changes expensive.",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design",
      "Interaction Design",
      "Design Systems",
      "Usability Testing",
    ],
    tech: ["Figma", "Adobe XD", "Sketch", "InVision", "Photoshop"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: FaBullhorn,
    teaser:
      "Search, paid and email campaigns, reported against revenue rather than impressions.",
    description:
      "Search optimisation, paid campaigns, email and content, measured against the numbers that pay for them. This works best alongside a site we have built, where the funnel can be instrumented properly instead of inferred from whatever analytics happen to be installed.",
    features: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Pay-Per-Click (PPC) Advertising",
      "Content Marketing",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    tech: ["Google Ads", "Meta Ads", "SEMrush", "Mailchimp", "Analytics"],
  },
  {
    slug: "3d-4d-development",
    title: "3D/4D Development",
    icon: FaCube,
    teaser:
      "Product configurators, walkthroughs and AR previews that run in a browser, with no app to install.",
    description:
      "Interactive 3D delivered through the browser — product configurators, property and venue walkthroughs, and AR previews for retail. Built on Three.js and WebGL, moving to Unity or Unreal where a project needs a full engine behind it.",
    features: [
      "3D Modeling & Animation",
      "Augmented Reality (AR)",
      "Virtual Reality (VR)",
      "3D Product Visualization",
      "Interactive 3D Web Experiences",
      "4D Simulation",
    ],
    tech: ["Unity", "Unreal Engine", "Three.js", "Blender", "WebGL"],
  },
];

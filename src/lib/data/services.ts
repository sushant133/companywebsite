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
  /** Short version for the home page list. */
  teaser: string;
  /** Full version for the services page. */
  description: string;
  features: string[];
  tech: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web development",
    icon: FaCode,
    teaser:
      "Marketing sites, customer portals and internal tools, built to be maintained after we hand them over.",
    description:
      "Most of our work starts here. We build marketing sites, customer portals, storefronts and internal tools — usually React or Next.js on the front, Node or Python behind it. We write the deployment setup and the documentation alongside the code, so your team can take over without calling us first.",
    features: [
      "Marketing and content sites",
      "Customer and admin portals",
      "Online stores and payments",
      "REST and GraphQL APIs",
      "Third-party integrations",
      "Performance and SEO work",
    ],
    tech: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "PHP"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile apps",
    icon: FaMobileScreenButton,
    teaser:
      "One codebase for iOS and Android, with the store submissions handled.",
    description:
      "We build cross-platform apps in Flutter or React Native, which keeps one codebase serving both stores and keeps your budget doing the same. Native Swift or Kotlin when a project genuinely needs it. We handle store listings, review submissions and the release process, not just the build.",
    features: [
      "Flutter and React Native apps",
      "Native iOS and Android",
      "Offline-first data sync",
      "Push notifications",
      "App Store and Play submission",
      "Release and crash monitoring",
    ],
    tech: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & machine learning",
    icon: FaBrain,
    teaser:
      "Practical models for the jobs that eat your team's week — extraction, classification, forecasting.",
    description:
      "The useful version of this is narrower than the pitch usually suggests. We build document extraction, classification, forecasting and search over your own data, plus assistants built on existing language models. We will tell you when a problem does not need machine learning, which is often.",
    features: [
      "Document and form extraction",
      "Classification and tagging",
      "Demand and revenue forecasting",
      "Search over internal documents",
      "Assistants on existing models",
      "Model evaluation and monitoring",
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "OpenAI", "scikit-learn"],
  },
  {
    slug: "ui-ux-design",
    title: "Product design",
    icon: FaPalette,
    teaser:
      "Interface and flow design, delivered as components your developers can build from.",
    description:
      "Wireframes, prototypes and finished interface design — delivered as a component library rather than a folder of flat screens, so the handoff to development does not lose half the detail. We run usability sessions on the prototype before anyone writes production code.",
    features: [
      "Discovery and user interviews",
      "Wireframes and prototypes",
      "Interface and visual design",
      "Component libraries",
      "Design systems and tokens",
      "Usability testing",
    ],
    tech: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
  },
  {
    slug: "digital-marketing",
    title: "Digital marketing",
    icon: FaBullhorn,
    teaser:
      "Search, paid and email — reported against revenue rather than impressions.",
    description:
      "Search optimisation, paid campaigns, email and content, reported against the numbers that pay for them rather than against impressions. Works best alongside a site we have built, where we can instrument the funnel properly instead of guessing at it.",
    features: [
      "Technical and content SEO",
      "Google and Meta campaigns",
      "Email and lifecycle marketing",
      "Landing page testing",
      "Analytics instrumentation",
      "Monthly reporting",
    ],
    tech: ["Google Ads", "Meta Ads", "SEMrush", "Mailchimp", "GA4"],
  },
  {
    slug: "3d-4d-development",
    title: "3D & immersive",
    icon: FaCube,
    teaser:
      "Product configurators, virtual walkthroughs and AR previews that run in a browser.",
    description:
      "Interactive 3D that runs in a browser without an app install — product configurators, property and venue walkthroughs, and AR previews for retail. Built on Three.js and WebGL, with Unity or Unreal where a project needs a full engine behind it.",
    features: [
      "3D product configurators",
      "Property and venue walkthroughs",
      "AR previews for retail",
      "Modelling and animation",
      "WebGL optimisation",
      "VR experiences",
    ],
    tech: ["Three.js", "WebGL", "Unity", "Unreal Engine", "Blender"],
  },
];

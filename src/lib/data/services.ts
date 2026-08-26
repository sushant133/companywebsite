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
  /** One-line version used on the home page preview grid. */
  teaser: string;
  /** Full description used on the services page. */
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
      "Custom websites and web applications built with modern frameworks and best practices.",
    description:
      "We build high-performance, responsive websites and web applications that deliver exceptional user experiences. Our web solutions are built using the latest technologies and frameworks to ensure speed, security, and scalability.",
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
      "Native and cross-platform mobile applications for iOS and Android platforms.",
    description:
      "We create native and cross-platform mobile applications that offer seamless performance and intuitive user interfaces. Our mobile solutions are designed to engage users and drive business results across iOS and Android platforms.",
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
      "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
    description:
      "Harness the power of artificial intelligence and machine learning to automate processes, gain insights from data, and make smarter business decisions. Our AI solutions are tailored to solve your unique challenges.",
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
      "Beautiful, intuitive interfaces designed to enhance user engagement and satisfaction.",
    description:
      "Create memorable digital experiences with our expert design team. We craft beautiful, intuitive interfaces that delight users and drive engagement, combining aesthetic appeal with functional excellence.",
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
      "Strategic digital marketing campaigns that boost your brand visibility and drive results.",
    description:
      "Boost your online presence and reach your target audience with our data-driven digital marketing strategies. We help you grow your brand, generate leads, and maximize your return on investment.",
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
      "Immersive 3D and 4D experiences that bring your ideas to life with stunning visuals.",
    description:
      "Step into the future with our immersive 3D and 4D development services. From augmented reality experiences to interactive 3D visualizations, we create stunning digital environments that captivate and engage.",
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

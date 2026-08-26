import type { IconType } from "react-icons";
import {
  FaAndroid,
  FaAngular,
  FaAws,
  FaBrain,
  FaChartLine,
  FaCloud,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaFeather,
  FaFileSignature,
  FaFire,
  FaGem,
  FaGoogle,
  FaHtml5,
  FaJava,
  FaJs,
  FaLaptopCode,
  FaLifeRing,
  FaMicrosoft,
  FaMobileScreenButton,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRobot,
  FaServer,
  FaSwift,
  FaUsers,
  FaVuejs,
} from "react-icons/fa6";

export type OverviewItem = {
  title: string;
  description: string;
  icon: IconType;
};

/**
 * Four commitments about how a project runs, replacing six abstract virtues
 * ("Innovation First", "Quality Assured"…) that every agency claims and none
 * can be held to. Each of these is grounded in something the site already
 * states elsewhere: agile sprints, OWASP review, post-launch support and
 * remote collaboration tooling.
 */
export const overviewItems: OverviewItem[] = [
  {
    title: "You talk to the developers",
    description:
      "We are a team of nine, so the person writing your code is in the same thread you are. No account manager relaying questions in between.",
    icon: FaUsers,
  },
  {
    title: "Scope and price agreed up front",
    description:
      "Discovery ends with a written scope and an itemised proposal. Fixed price, hourly or a dedicated team — whichever suits the work, decided before it starts.",
    icon: FaFileSignature,
  },
  {
    title: "Two-week sprints you can watch",
    description:
      "Every sprint closes with a demo on a staging environment you can open yourself, so progress is something you see rather than something you're told about.",
    icon: FaChartLine,
  },
  {
    title: "Support past the launch date",
    description:
      "Bug fixes, security updates and performance work continue after handover. Keep us on a maintenance package or take it in-house — the documentation supports both.",
    icon: FaLifeRing,
  },
];

export type TechCategory = {
  title: string;
  icon: IconType;
  items: { label: string; icon?: IconType }[];
};

export const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    icon: FaLaptopCode,
    items: [
      { label: "React", icon: FaReact },
      { label: "Angular", icon: FaAngular },
      { label: "Vue.js", icon: FaVuejs },
      { label: "TypeScript", icon: FaJs },
      { label: "HTML5", icon: FaHtml5 },
      { label: "CSS3", icon: FaCss3Alt },
    ],
  },
  {
    title: "Backend",
    icon: FaServer,
    items: [
      { label: "Node.js", icon: FaNodeJs },
      { label: "Python", icon: FaPython },
      { label: "Java", icon: FaJava },
      { label: "PHP", icon: FaPhp },
      { label: "Ruby", icon: FaGem },
      { label: ".NET", icon: FaDatabase },
    ],
  },
  {
    title: "Mobile",
    icon: FaMobileScreenButton,
    items: [
      { label: "React Native", icon: FaReact },
      { label: "Flutter", icon: FaFeather },
      { label: "Swift", icon: FaSwift },
      { label: "Kotlin", icon: FaAndroid },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: FaCloud,
    items: [
      { label: "AWS", icon: FaAws },
      { label: "Google Cloud", icon: FaGoogle },
      { label: "Azure", icon: FaMicrosoft },
      { label: "Docker", icon: FaDocker },
    ],
  },
  {
    title: "Databases",
    icon: FaDatabase,
    items: [
      { label: "PostgreSQL", icon: FaDatabase },
      { label: "MySQL", icon: FaDatabase },
      { label: "MongoDB", icon: FaDatabase },
      { label: "Firebase", icon: FaFire },
    ],
  },
  {
    title: "AI / ML",
    icon: FaBrain,
    items: [
      { label: "TensorFlow", icon: FaRobot },
      { label: "PyTorch", icon: FaFire },
      { label: "OpenAI", icon: FaBrain },
      { label: "scikit-learn", icon: FaChartLine },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We work through the requirements, the systems it has to integrate with, and what can wait for a second release. You leave with a written scope and a proposal.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, then a clickable prototype. Changes cost almost nothing here and a great deal later, so the interface is settled before production code is written.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Two-week sprints with continuous testing against a staging environment you can open at any time. Each sprint closes with a working demo.",
  },
  {
    number: "04",
    title: "Handover",
    description:
      "We deploy to your infrastructure and hand over setup notes, architecture documentation and a walkthrough, then stay on for support.",
  },
];

export const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "A straightforward website is two to four weeks. Web applications and mobile apps run two to six months depending on scope. You get a sprint-by-sprint schedule at the end of discovery, and progress stays visible on staging rather than appearing only at the end.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Three arrangements, depending on the work: a fixed price for a defined scope, an hourly rate where the scope is open-ended, or a dedicated team retained monthly. You get an itemised proposal after discovery with no line items added later.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes post-launch support covering bug fixes, security updates, performance work and feature additions. From there you can keep a maintenance package or move the project in-house — the handover documentation is written so the second option is genuinely open to you.",
  },
  {
    question: "Do you work with clients outside Nepal?",
    answer:
      "Yes. We are on Nepal Time (UTC+5:45), which overlaps the working day across South Asia, the Gulf and most of Europe. For clients further west we keep calls in our early morning and run the rest asynchronously over Slack, Jira and email.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "React, Angular and Vue on the front end; Node.js, Python, PHP and Java behind it; Flutter and React Native for mobile; AWS, Google Cloud and Azure for infrastructure. We choose per project rather than fitting every problem to one stack.",
  },
  {
    question: "Can you take over a project someone else started?",
    answer:
      "Often, yes. We begin with an audit of the existing codebase and give you a straight answer on whether it is worth continuing or cheaper to rebuild. Sometimes the answer is that you should stay where you are, and we will say so.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "Yes, before any detailed discussion of your project. Send us yours or use ours.",
  },
];

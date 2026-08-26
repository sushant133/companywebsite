import type { IconType } from "react-icons";
import {
  FaArrowsRotate,
  FaComments,
  FaLifeRing,
  FaShieldHalved,
} from "react-icons/fa6";

/**
 * Four ways of working, each one grounded in something the previous site
 * already stated (agile sprints, OWASP reviews, post-launch support,
 * remote collaboration). The six cards these replace — "Innovation First",
 * "Quality Assured" and so on — were claims every agency makes and none
 * can be checked.
 */
export const commitments: {
  title: string;
  description: string;
  icon: IconType;
}[] = [
  {
    title: "You talk to the people building it",
    description:
      "We are a small team, so the developer writing your code is in the same conversation you are. Slack, Zoom, Jira — whichever you already use.",
    icon: FaComments,
  },
  {
    title: "Two-week sprints, working software",
    description:
      "Daily standups internally, a demo at the end of every sprint. You see the thing running each fortnight rather than reading a status report about it.",
    icon: FaArrowsRotate,
  },
  {
    title: "Security reviewed, not assumed",
    description:
      "OWASP guidelines through the build, encrypted communications, and a security review before launch rather than after an incident.",
    icon: FaShieldHalved,
  },
  {
    title: "Support continues after launch",
    description:
      "Bug fixes, security updates, performance work and new features. Take a maintenance package or take the project in-house — both are fine.",
    icon: FaLifeRing,
  },
];

/** Grouped for the quiet tech band, replacing six separate boxed cards. */
export const techGroups: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["React", "Angular", "Vue", "TypeScript", "HTML", "CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "PHP", "Java", "Ruby", ".NET"],
  },
  { label: "Mobile", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
  {
    label: "Cloud",
    items: ["AWS", "Google Cloud", "Azure", "Docker"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    label: "AI & 3D",
    items: ["TensorFlow", "PyTorch", "OpenAI", "Three.js", "Unity"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery and planning",
    description:
      "We work through the requirements, the systems it has to talk to, and what can wait for a second version. You leave with a written scope, a roadmap and a proposal.",
  },
  {
    number: "02",
    title: "Design and prototype",
    description:
      "Wireframes, then a clickable prototype. Changes are cheap here and expensive later, so the interface gets settled before anyone writes production code.",
  },
  {
    number: "03",
    title: "Development and testing",
    description:
      "Two-week sprints with continuous testing, against a staging environment you can open at any time. A demo closes every sprint.",
  },
  {
    number: "04",
    title: "Launch and support",
    description:
      "We deploy, hand over the documentation, and stay on for maintenance, updates and monitoring for as long as you want us there.",
  },
];

export const faqs = [
  {
    question: "How long will a project take?",
    answer:
      "A straightforward website is usually two to four weeks. Web applications and mobile apps run two to six months depending on scope. You get a sprint-by-sprint schedule at the end of discovery, and progress is visible on staging throughout rather than only at the end.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Three arrangements, depending on what suits the work: a fixed price for a defined scope, an hourly rate for open-ended work, or a dedicated team retained by the month. Either way you get an itemised proposal after discovery, and the number in it is the number you pay.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes post-launch support — bug fixes, security updates, performance work and feature additions. From there you can keep a maintenance package running or take the project in-house. The handover documentation is written so that the second option is genuinely available to you.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Most of our work is remote. We are on Nepal Time (UTC+5:45), which overlaps the working day across South Asia, the Gulf and most of Europe. For clients further west we keep calls in our early morning and run everything else asynchronously.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "React, Angular and Vue on the front end; Node.js, Python, PHP and Java behind it; Flutter and React Native for mobile; AWS, Google Cloud and Azure for infrastructure. We pick per project rather than fitting every problem to one stack.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "Yes, before any detailed discussion of your project. Send us yours or use ours.",
  },
];

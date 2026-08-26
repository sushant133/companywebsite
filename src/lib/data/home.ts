import type { IconType } from "react-icons";
import {
  FaAndroid,
  FaAngular,
  FaAws,
  FaBrain,
  FaChartLine,
  FaClock,
  FaCloud,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaDollarSign,
  FaFeather,
  FaFire,
  FaGem,
  FaGoogle,
  FaHeadset,
  FaHtml5,
  FaJava,
  FaJs,
  FaLaptopCode,
  FaLightbulb,
  FaMicrosoft,
  FaMobileScreenButton,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRobot,
  FaServer,
  FaShieldHalved,
  FaSwift,
  FaUpRightAndDownLeftFromCenter,
  FaVuejs,
} from "react-icons/fa6";

export type OverviewItem = { title: string; description: string; icon: IconType };

export const overviewItems: OverviewItem[] = [
  {
    title: "Innovation First",
    description:
      "We stay ahead of technology trends to deliver forward-thinking solutions that keep your business competitive.",
    icon: FaLightbulb,
  },
  {
    title: "Quality Assured",
    description:
      "Every project undergoes rigorous testing and quality checks to ensure flawless performance and reliability.",
    icon: FaShieldHalved,
  },
  {
    title: "On-Time Delivery",
    description:
      "We respect deadlines and deliver projects on schedule without compromising on quality or features.",
    icon: FaClock,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any issues or questions.",
    icon: FaHeadset,
  },
  {
    title: "Cost Effective",
    description:
      "Premium quality solutions at competitive prices, ensuring maximum return on your technology investment.",
    icon: FaDollarSign,
  },
  {
    title: "Scalable Solutions",
    description:
      "Our architectures are built to grow with your business, handling increased loads seamlessly.",
    icon: FaUpRightAndDownLeftFromCenter,
  },
];

export type TechCategory = {
  title: string;
  icon: IconType;
  items: { label: string; icon: IconType }[];
};

export const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    icon: FaLaptopCode,
    items: [
      { label: "React", icon: FaReact },
      { label: "Angular", icon: FaAngular },
      { label: "Vue.js", icon: FaVuejs },
      { label: "HTML5", icon: FaHtml5 },
      { label: "CSS3", icon: FaCss3Alt },
      { label: "JavaScript", icon: FaJs },
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
      { label: "MongoDB", icon: FaDatabase },
      { label: "PostgreSQL", icon: FaDatabase },
      { label: "MySQL", icon: FaDatabase },
      { label: "Firebase", icon: FaFire },
    ],
  },
  {
    title: "AI/ML",
    icon: FaBrain,
    items: [
      { label: "TensorFlow", icon: FaRobot },
      { label: "PyTorch", icon: FaFire },
      { label: "OpenAI", icon: FaBrain },
      { label: "Scikit-learn", icon: FaChartLine },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description:
      "We analyze your requirements, research your market, and create a comprehensive project roadmap with clear milestones.",
  },
  {
    number: "02",
    title: "Design & Prototype",
    description:
      "Our designers create wireframes and interactive prototypes, ensuring the perfect user experience before development begins.",
  },
  {
    number: "03",
    title: "Development & Testing",
    description:
      "Our expert developers build your solution using agile methodologies, with continuous testing to ensure quality.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We deploy your solution and provide ongoing maintenance, updates, and 24/7 support to ensure smooth operation.",
  },
];

export const faqs = [
  {
    question: "What services does MantraSphere Innovations offer?",
    answer:
      "We offer a comprehensive range of digital services including Web Development, Mobile App Development, AI & Machine Learning solutions, UI/UX Design, Digital Marketing, and 3D/4D Development. Each service is tailored to meet your specific business needs.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Project timelines vary based on complexity and scope. A simple website can be completed in 2-4 weeks, while complex web applications or mobile apps may take 2-6 months. We provide detailed timelines during the planning phase and keep you updated throughout.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes! We provide comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer flexible maintenance packages tailored to your needs with 24/7 support availability.",
  },
  {
    question: "What technologies do you use for development?",
    answer:
      "We work with a wide range of modern technologies including React, Angular, Vue.js, Node.js, Python, Flutter, React Native, TensorFlow, AWS, Google Cloud, and many more. We select the best technology stack based on your project requirements.",
  },
  {
    question: "How do you handle project pricing?",
    answer:
      "We offer flexible pricing models including fixed-price projects, hourly rates, and dedicated team arrangements. After understanding your requirements, we provide a detailed proposal with transparent pricing. We ensure no hidden costs and great value for your investment.",
  },
  {
    question: "Can you work with clients remotely?",
    answer:
      "Absolutely! We have extensive experience working with clients globally. We use modern collaboration tools like Slack, Zoom, Jira, and Trello to ensure seamless communication and project management regardless of your location.",
  },
  {
    question: "Do you sign NDAs and ensure data security?",
    answer:
      "Yes, we take data security very seriously. We are happy to sign NDAs before project discussions begin. We follow industry-standard security practices, use encrypted communications, and ensure all client data is protected and confidential.",
  },
];

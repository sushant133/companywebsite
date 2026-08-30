import type { ContentMap } from "@/lib/content/schema";

/**
 * The content the site ships with. Everything here is editable from the admin
 * dashboard; these values are what a fresh database is seeded with, and what
 * the public pages fall back to when MongoDB is unreachable or a field has not
 * been filled in yet. Nothing on the site should read a hard-coded string that
 * is not represented here.
 */

const site: ContentMap["site"] = {
  name: "MantraSphere Innovations",
  shortName: "Mantra[[Sphere]]",
  description:
    "MantraSphere Innovations is a software development company delivering cutting-edge digital solutions to businesses worldwide.",
  url: "https://mantrasphere.com.np",
  logo: "/images/logo.png",
  googleSiteVerification: "mhTGwyeOoJAmWn6CFGKn2Huf8rTc61LX9UGi0c_xFWA",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/projects", label: "Projects" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ],
  headerCta: { label: "Get Started", href: "/contact" },
  footerLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/projects", label: "Projects" },
    { href: "/team", label: "Our Team" },
    { href: "/contact", label: "Contact" },
  ],
  contact: {
    address: "Dhangadhimai-10, Siraha,\nMadhesh Pradesh, Nepal 560001",
    addressShort: "Dhangadhimai-10, Siraha,\nMadhesh Pradesh, Nepal",
    phones: ["+977 9824763981", "+977 9842582526"],
    email: "info@mantrasphere.com.np",
    hours: "Sun - Fri: 9:00 AM - 7:00 PM",
    hoursLong: ["Sunday - Friday: 9:00 AM - 7:00 PM", "Saturday: Closed"],
    whatsapp:
      "https://wa.me/9779824763981?text=Hi%20how%20can%20I%20help%20you%3F",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.0!2d86.4022092!3d26.7530571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eea372b09b1d4d%3A0xf68d8d47527c6963!2sMantraSphere%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp",
  },
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61583575547597",
      icon: "FaFacebookF",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mantrasphere-innovations-3667513b7/",
      icon: "FaLinkedinIn",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mantrasphere.official/",
      icon: "FaInstagram",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/9779824763981?text=Hi%20how%20can%20I%20help%20you%3F",
      icon: "FaWhatsapp",
    },
    {
      label: "GitHub",
      href: "https://github.com/mantrasphere",
      icon: "FaGithub",
    },
  ],
};

const home: ContentMap["home"] = {
  hero: {
    badge: "Innovating the Future of Technology",
    badgeIcon: "FaRocket",
    title: "Transforming Ideas Into",
    typingWords: [
      "Digital Reality",
      "Smart Solutions",
      "Innovative Products",
      "Success Stories",
    ],
    description:
      "MantraSphere Innovations delivers cutting-edge software solutions that empower businesses to thrive in the digital era. From AI-powered applications to immersive 3D experiences, we turn your vision into extraordinary digital products.",
    image: "/images/about.jpg",
    primaryCta: { label: "Explore Services", href: "/services" },
    secondaryCta: { label: "Learn More", href: "/about" },
  },
  why: {
    tag: "Why Choose Us",
    title: "We Build Solutions That [[Drive Growth]]",
    description:
      "At MantraSphere Innovations, we combine technical expertise with creative thinking to deliver solutions that make a real difference.",
    image: "/images/why-choose-us-businesswoman.png",
    items: [
      {
        icon: "FaLightbulb",
        title: "Innovation First",
        description:
          "We stay ahead of technology trends to deliver forward-thinking solutions that keep your business competitive.",
      },
      {
        icon: "FaShieldHalved",
        title: "Quality Assured",
        description:
          "Every project undergoes rigorous testing and quality checks to ensure flawless performance and reliability.",
      },
      {
        icon: "FaClock",
        title: "On-Time Delivery",
        description:
          "We respect deadlines and deliver projects on schedule without compromising on quality or features.",
      },
      {
        icon: "FaHeadset",
        title: "24/7 Support",
        description:
          "Our dedicated support team is available around the clock to assist you with any issues or questions.",
      },
      {
        icon: "FaDollarSign",
        title: "Cost Effective",
        description:
          "Premium quality solutions at competitive prices, ensuring maximum return on your technology investment.",
      },
      {
        icon: "FaUpRightAndDownLeftFromCenter",
        title: "Scalable Solutions",
        description:
          "Our architectures are built to grow with your business, handling increased loads seamlessly.",
      },
    ],
  },
  servicesPreview: {
    tag: "Our Services",
    title: "What We [[Offer]]",
    description:
      "Comprehensive digital solutions tailored to meet your unique business requirements.",
    primaryCta: { label: "View All Services", href: "/services" },
    secondaryCta: { label: "See Our Projects", href: "/projects" },
  },
  tech: {
    tag: "Tech Stack",
    title: "Technologies We [[Work With]]",
    description:
      "We leverage the latest and most powerful technologies to build robust solutions.",
    categories: [
      {
        title: "Frontend",
        icon: "FaLaptopCode",
        items: [
          { label: "React", icon: "FaReact" },
          { label: "Angular", icon: "FaAngular" },
          { label: "Vue.js", icon: "FaVuejs" },
          { label: "HTML5", icon: "FaHtml5" },
          { label: "CSS3", icon: "FaCss3Alt" },
          { label: "JavaScript", icon: "FaJs" },
        ],
      },
      {
        title: "Backend",
        icon: "FaServer",
        items: [
          { label: "Node.js", icon: "FaNodeJs" },
          { label: "Python", icon: "FaPython" },
          { label: "Java", icon: "FaJava" },
          { label: "PHP", icon: "FaPhp" },
          { label: "Ruby", icon: "FaGem" },
          { label: ".NET", icon: "FaDatabase" },
        ],
      },
      {
        title: "Mobile",
        icon: "FaMobileScreenButton",
        items: [
          { label: "React Native", icon: "FaReact" },
          { label: "Flutter", icon: "FaFeather" },
          { label: "Swift", icon: "FaSwift" },
          { label: "Kotlin", icon: "FaAndroid" },
        ],
      },
      {
        title: "Cloud & DevOps",
        icon: "FaCloud",
        items: [
          { label: "AWS", icon: "FaAws" },
          { label: "Google Cloud", icon: "FaGoogle" },
          { label: "Azure", icon: "FaMicrosoft" },
          { label: "Docker", icon: "FaDocker" },
        ],
      },
      {
        title: "Databases",
        icon: "FaDatabase",
        items: [
          { label: "MongoDB", icon: "FaDatabase" },
          { label: "PostgreSQL", icon: "FaDatabase" },
          { label: "MySQL", icon: "FaDatabase" },
          { label: "Firebase", icon: "FaFire" },
        ],
      },
      {
        title: "AI/ML",
        icon: "FaBrain",
        items: [
          { label: "TensorFlow", icon: "FaRobot" },
          { label: "PyTorch", icon: "FaFire" },
          { label: "OpenAI", icon: "FaBrain" },
          { label: "Scikit-learn", icon: "FaChartLine" },
        ],
      },
    ],
  },
  process: {
    tag: "How We Work",
    title: "Our Development [[Process]]",
    description:
      "A streamlined approach to turning your ideas into successful digital products.",
    image: "/images/how-we-work-line-art.png",
    steps: [
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
    ],
  },
  faq: {
    title: "Frequently Asked [[Questions]]",
    searchPlaceholder: "Search question here",
    image: "/images/faq-illustration-questions.png",
    items: [
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
          "Absolutely — remote collaboration is how we work by default. We use modern tools like Slack, Zoom, Jira, and Trello, and we agree on a regular check-in schedule that fits your time zone, so you always know where your project stands regardless of your location.",
      },
      {
        question: "Do you sign NDAs and ensure data security?",
        answer:
          "Yes, we take data security very seriously. We are happy to sign NDAs before project discussions begin. We follow industry-standard security practices, use encrypted communications, and ensure all client data is protected and confidential.",
      },
    ],
  },
  cta: {
    title: "Ready to Start Your Next Project?",
    description:
      "Let's collaborate to build something extraordinary. Get in touch with us today and let's turn your ideas into reality.",
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Call Us Now", href: "tel:+9779842582526" },
  },
};

const testimonials: ContentMap["testimonials"] = {
  enabled: false,
  tag: "Testimonials",
  title: "What Our Clients [[Say]]",
  description:
    "The people we have built for, in their own words. Add a testimonial from the dashboard and this band appears on the home page.",
  items: [],
};

const services: ContentMap["services"] = {
  banner: {
    eyebrow: "Our Services",
    title: "Powerful Digital Solutions for Your [[Business Growth]]",
    description:
      "We combine innovation, technology, and creativity to deliver custom digital solutions that drive efficiency, engagement, and measurable results.",
    image: "/images/services-banner-isometric.png",
    crumb: "",
    points: [
      { icon: "FaWandMagicSparkles", label: "Tailored Solutions" },
      { icon: "FaShieldHalved", label: "Quality Assured" },
      { icon: "FaClock", label: "On-Time Delivery" },
    ],
  },
  header: {
    tag: "What We Do",
    title: "Comprehensive Digital [[Solutions]]",
    description:
      "End-to-end digital services designed to transform your business and accelerate growth.",
  },
  items: [
    {
      slug: "web-development",
      title: "Web Development",
      icon: "FaCode",
      image: "/images/services/web-development.jpg",
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
      icon: "FaMobileScreenButton",
      image: "/images/services/mobile-app-development.jpg",
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
      icon: "FaBrain",
      image: "/images/services/ai-machine-learning.jpg",
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
      icon: "FaPalette",
      image: "/images/services/ui-ux-design.jpg",
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
      icon: "FaBullhorn",
      image: "/images/services/digital-marketing.jpg",
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
      icon: "FaCube",
      image: "/images/services/3d-4d-development.jpg",
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
  ],
  cta: {
    title: "Need a Custom Solution?",
    description:
      "Let's discuss how our services can help your business grow. Contact us for a free consultation.",
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "View Products", href: "/products" },
  },
};

const products: ContentMap["products"] = {
  banner: {
    eyebrow: "Our Products",
    title: "Smart Products for [[Modern Businesses]]",
    description:
      "Powerful, scalable, and intelligent software products built to simplify operations, enhance productivity, and accelerate growth.",
    image: "/images/products-banner.jpg",
    crumb: "Products",
    points: [
      { icon: "FaHandPointer", label: "Easy to Use" },
      { icon: "FaUpRightAndDownLeftFromCenter", label: "Scalable" },
      { icon: "FaShieldHalved", label: "Secure" },
      { icon: "FaCircleCheck", label: "Reliable" },
    ],
  },
  header: {
    tag: "Our Products",
    title: "Ready-to-Deploy [[Solutions]]",
    description:
      "Explore our lineup of industry-specific software products designed to streamline operations and boost efficiency.",
  },
  items: [
    {
      title: "Web Development Suite",
      icon: "FaGlobe",
      badge: "Popular",
      featured: false,
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
      icon: "FaUtensils",
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
      icon: "FaCar",
      badge: "New",
      featured: false,
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
      icon: "FaHotel",
      badge: "Popular",
      featured: false,
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
      icon: "FaHospital",
      badge: "Enterprise",
      featured: false,
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
      icon: "FaChartLine",
      badge: "New",
      featured: false,
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
      icon: "FaCube",
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
      icon: "FaBrain",
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
      icon: "FaPaintbrush",
      badge: "Creative",
      featured: false,
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
  ],
  cta: {
    title: "Interested in Our Products?",
    description:
      "Request a free demo or get a custom quote tailored to your business needs.",
    primary: { label: "Request Demo", href: "/contact" },
    secondary: { label: "Get Custom Quote", href: "/contact" },
  },
};

const projects: ContentMap["projects"] = {
  banner: {
    eyebrow: "Our Projects",
    title: "Real Projects. [[Real Impact.]]",
    description:
      "A close look at the work we have delivered end to end — what we built, what it does, and the technology behind it.",
    image: "/images/about.jpg",
    crumb: "Projects",
    points: [
      { icon: "FaCode", label: "Built End to End" },
      { icon: "FaHandshake", label: "Delivered to Client" },
      { icon: "FaScrewdriverWrench", label: "Supported After Launch" },
    ],
  },
  header: {
    tag: "Featured Project",
    title: "Work We Have [[Delivered]]",
    description:
      "Every project here is one we have built and handed over. The list is short by design — it only holds finished work.",
  },
  items: [
    {
      slug: "school-lms",
      title: "School LMS Management System",
      icon: "FaGraduationCap",
      image: "/images/projects/school-lms.jpg",
      liveUrl: "",
      categories: ["Web Application", "Education"],
      description:
        "A learning management system built for schools: one place for staff to run classes, track attendance and grades, and keep parents informed, replacing the spreadsheets and paperwork the day used to run on.",
      features: [
        "Student & Staff Records",
        "Attendance Tracking",
        "Class & Timetable Management",
        "Gradebook & Report Cards",
        "Assignments & Study Material",
        "Parent Communication",
      ],
      tech: ["React", "Node.js", "MongoDB", "Express"],
    },
  ],
  cta: {
    title: "Have a Project in Mind?",
    description:
      "Let's discuss how we can turn your idea into a working digital solution.",
    primary: { label: "Start a Project", href: "/contact" },
    secondary: { label: "View Services", href: "/services" },
  },
};

const team: ContentMap["team"] = {
  banner: {
    eyebrow: "Our Team",
    title: "People. Passion. [[Purpose.]]",
    description:
      "We are a team of thinkers, builders, and dreamers working together to create digital solutions that drive real impact.",
    image: "/images/about.jpg",
    crumb: "Team",
    points: [
      { icon: "FaAward", label: "Experienced" },
      { icon: "FaHandshake", label: "Collaborative" },
      { icon: "FaLightbulb", label: "Innovative" },
      { icon: "FaUserCheck", label: "Client-Focused" },
    ],
  },
  leadershipHeader: {
    tag: "Meet the Leadership",
    title: "Leadership That [[Drives Us Forward]]",
    description: "",
  },
  groups: [
    {
      title: "Leadership",
      blurb:
        "Our founders set the direction and stay close to every project we take on.",
      layout: "leadership",
      members: [
        {
          name: "Sushant Kumar Mahato",
          role: "Founder & CEO",
          bio: "Visionary with years of experience in technology, Artificial Intelligence and business strategy. Passionate about driving innovation.",
          gradient: "from-[#6366f1] to-[#8b5cf6]",
          image: "",
        },
        {
          name: "Pritee Singh",
          role: "Co-Founder",
          bio: "Strong expertise in business strategy, operations management, and client relations. Drives growth and bridges gap between business vision and technology.",
          gradient: "from-[#0ea5e9] to-[#06b6d4]",
          image: "",
        },
      ],
    },
    {
      title: "Development Team",
      blurb:
        "Engineers and developers turning ideas into working digital products.",
      layout: "default",
      members: [
        {
          name: "Priyanka Sinha",
          role: "Lead Frontend Developer",
          bio: "React & Angular expert crafting beautiful, performant user interfaces.",
          gradient: "from-[#6366f1] to-[#0ea5e9]",
          image: "",
        },
        {
          name: "Nabh Verma",
          role: "Lead Backend Developer",
          bio: "Node.js and Python specialist building robust, scalable server architectures.",
          gradient: "from-[#3b82f6] to-[#6366f1]",
          image: "",
        },
        {
          name: "Kshitiz Budhathoki",
          role: "Mobile App Developer",
          bio: "Flutter & React Native developer creating cross-platform mobile experiences.",
          gradient: "from-[#0ea5e9] to-[#818cf8]",
          image: "",
        },
        {
          name: "Shashank Mahato",
          role: "AI/ML Engineer",
          bio: "Machine learning specialist developing intelligent solutions with TensorFlow and PyTorch.",
          gradient: "from-[#8b5cf6] to-[#6366f1]",
          image: "",
        },
      ],
    },
    {
      title: "Design & Marketing",
      blurb:
        "Creative minds shaping our brand and the way our work feels to use.",
      layout: "default",
      members: [
        {
          name: "Prithvi Kumar",
          role: "3D/4D Developer",
          bio: "Immersive technology expert creating stunning 3D visualizations and AR/VR experiences.",
          gradient: "from-[#6366f1] to-[#818cf8]",
          image: "",
        },
        {
          name: "Ruja Subedi",
          role: "Digital Marketing Head",
          bio: "Growth marketing expert driving brand awareness and lead generation strategies.",
          gradient: "from-[#0ea5e9] to-[#6366f1]",
          image: "",
        },
        {
          name: "Prince Kushwaha",
          role: "Lead UI/UX Designer",
          bio: "Creative designer with a keen eye for detail and passion for user-centered design.",
          gradient: "from-[#06b6d4] to-[#0ea5e9]",
          image: "",
        },
      ],
    },
  ],
};

const about: ContentMap["about"] = {
  banner: {
    eyebrow: "Discover Our Story",
    title: "We Are [[MantraSphere]] Innovations",
    description:
      "A passionate team of innovators, developers, and designers committed to transforming the digital landscape one breakthrough solution at a time.",
    image: "/images/about-banner.jpg",
    crumb: "About Us",
    points: [
      { icon: "FaCircleCheck", label: "Security First" },
      { icon: "FaCircleCheck", label: "Remote-Friendly" },
      { icon: "FaCircleCheck", label: "24/7 Support" },
    ],
  },
  story: {
    eyebrow: "Who We Are",
    title: "Pioneering Digital [[Innovation]] Since [[2025]]",
    paragraphs: [
      "MantraSphere Innovations was born from a bold idea that technology should empower every business, regardless of size, to achieve extraordinary things.",
      "Today we are a close-knit team of specialists developers, designers, engineers and marketers small enough that the people who scope your project are the people who build it. Our journey has been fueled by curiosity, creativity, and an unwavering commitment to excellence.",
      "We don't just write code, we craft digital experiences that transform businesses. From AI-powered analytics to immersive 3D environments, we push the boundaries of what's possible in the digital world.",
    ],
    image: "/images/who-we-are.jpg",
    imageAlt:
      "A developer at a desk typing on a keyboard, with source code on the monitor beside them",
    primaryCta: { label: "Our Services", href: "/services" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    highlights: [
      {
        icon: "FaRocket",
        title: "Innovation-Driven",
        description: "Always exploring emerging technologies",
      },
      {
        icon: "FaUsersGear",
        title: "Client-Centric",
        description: "Your success is our primary goal",
      },
      {
        icon: "FaAward",
        title: "Quality Assured",
        description: "Code review and testing on every build",
      },
      {
        icon: "FaEarthAmericas",
        title: "Remote Delivery",
        description: "Set up to work with you in any time zone",
      },
    ],
  },
  foundation: {
    eyebrow: "Our Foundation",
    title: "Driven by Purpose,\n[[Defined by Values]]",
    description:
      "The principles that guide every decision we make and every solution we build.",
    image: "/images/about.jpg",
    cards: [
      {
        label: "01",
        title: "Our Mission",
        body: "To deliver innovative, high-quality software solutions that empower businesses to achieve their digital transformation goals. We strive to be the catalyst for positive change bridging the gap between complex technology and practical business outcomes.",
        icon: "FaBullseye",
        points: [
          "Empower businesses globally",
          "Deliver measurable impact",
          "Drive digital transformation",
        ],
      },
      {
        label: "02",
        title: "Our Vision",
        body: "To become a globally recognized leader in software innovation, setting new benchmarks for quality, creativity, and technological excellence. We envision a future where every business has access to world-class digital tools.",
        icon: "FaEye",
        points: [
          "Global technology leader",
          "Set industry benchmarks",
          "Democratize technology access",
        ],
      },
      {
        label: "03",
        title: "Our Values",
        body: "Integrity, innovation, collaboration, and excellence drive everything we do. We believe in transparent communication, continuous learning, and building long-term partnerships built on trust and mutual growth.",
        icon: "FaHeart",
        points: [
          "Integrity in every action",
          "Continuous innovation",
          "Collaborative partnerships",
        ],
      },
    ],
  },
  values: {
    eyebrow: "What We Stand For",
    title: "Our Core [[Values]]",
    description:
      "The pillars that support our culture, guide our decisions, and shape our future.",
    items: [
      {
        title: "Trust & Transparency",
        description:
          "We believe in open, honest communication. Every decision is made with integrity, and every client relationship is built on a foundation of trust.",
        icon: "FaHandshake",
        accent: "#6366f1",
      },
      {
        title: "Creative Innovation",
        description:
          "We challenge conventions and embrace new ideas. Our team constantly explores emerging technologies to deliver groundbreaking solutions.",
        icon: "FaLightbulb",
        accent: "#ec4899",
      },
      {
        title: "Excellence Always",
        description:
          "Mediocrity is not in our vocabulary. We pursue excellence in every line of code, every pixel designed, and every interaction with our clients.",
        icon: "FaGem",
        accent: "#14b8a6",
      },
      {
        title: "Team Collaboration",
        description:
          "Great things happen when talented people work together. We foster a collaborative culture where every voice matters and every idea counts.",
        icon: "FaUsers",
        accent: "#f59e0b",
      },
      {
        title: "Passion Driven",
        description:
          "We're not just building software — we're pursuing our passion. This enthusiasm fuels our creativity and drives us to go above and beyond.",
        icon: "FaHeart",
        accent: "#ef4444",
      },
      {
        title: "Continuous Growth",
        description:
          "We invest in learning and development. Our team stays ahead of technology trends to deliver the most current and effective solutions.",
        icon: "FaSeedling",
        accent: "#3b82f6",
      },
    ],
  },
  different: {
    eyebrow: "Why Choose Us",
    title: "What Makes Us [[Different]]",
    description:
      "In a crowded market, we stand out through our unique combination of expertise, innovation, and genuine care for our clients' success.",
    image: "/images/why-choose-us-about.jpg",
    items: [
      {
        title: "Expert Technical Team",
        body: "Our developers, designers, and engineers work across React, Angular, Node.js, Python, Flutter, and TensorFlow the same stack that powers every project we deliver.",
        icon: "FaCode",
      },
      {
        title: "Agile Development Process",
        body: "We follow agile methodology with 2-week sprints, daily standups, and regular demos. This ensures transparency, flexibility, and continuous delivery of value throughout the project lifecycle.",
        icon: "FaArrowsRotate",
      },
      {
        title: "Security First Approach",
        body: "Security is embedded in every stage of our development process. We conduct regular security audits, follow OWASP guidelines, and implement enterprise-grade encryption and authentication.",
        icon: "FaShieldHalved",
      },
      {
        title: "Dedicated Support & Maintenance",
        body: "Our relationship doesn't end at deployment. We provide 24/7 dedicated support, proactive monitoring, regular updates, and performance optimization to ensure your solution runs flawlessly.",
        icon: "FaHeadset",
      },
    ],
    tiles: [
      { icon: "FaGears", label: "Agile" },
      { icon: "FaLock", label: "Secure" },
      { icon: "FaGaugeHigh", label: "Fast" },
      { icon: "FaUpRightAndDownLeftFromCenter", label: "Scalable" },
      { icon: "FaCheckDouble", label: "Tested" },
      { icon: "FaCloud", label: "Cloud" },
    ],
  },
  industries: {
    eyebrow: "Industries",
    title: "Industries We [[Serve]]",
    description:
      "Our expertise spans across multiple industries, delivering tailored solutions for each sector.",
    items: [
      { title: "Healthcare", icon: "FaHospital", accent: "#6366f1" },
      { title: "Hospitality", icon: "FaHotel", accent: "#ec4899" },
      { title: "Retail & E-Commerce", icon: "FaCartShopping", accent: "#14b8a6" },
      { title: "Education", icon: "FaGraduationCap", accent: "#f59e0b" },
      { title: "Finance & Banking", icon: "FaBuildingColumns", accent: "#3b82f6" },
      { title: "Food & Restaurant", icon: "FaUtensils", accent: "#ef4444" },
      { title: "Transportation", icon: "FaCar", accent: "#8b5cf6" },
      { title: "Real Estate", icon: "FaHouse", accent: "#06b6d4" },
    ],
  },
  cta: {
    title: "Ready to Transform Your Business?",
    description:
      "Let's build something extraordinary together. Get in touch and tell us what you have in mind.",
    primary: { label: "Start Your Project", href: "/contact" },
    secondary: { label: "Meet Our Team", href: "/team" },
  },
};

const contact: ContentMap["contact"] = {
  banner: {
    eyebrow: "Contact Us",
    title: "Let's Talk About [[Your Project]]",
    description:
      "Tell us what you have in mind and we will come back with honest advice on scope, timeline, and cost no obligation.",
    image: "/images/about.jpg",
    crumb: "Contact",
    points: [
      { icon: "FaComments", label: "Free Consultation" },
      { icon: "FaClock", label: "Sun - Fri: 9:00 AM - 7:00 PM" },
      { icon: "FaWhatsapp", label: "WhatsApp Us" },
    ],
  },
  intro: {
    title: "Get In [[Touch]]",
    description:
      "Have a project in mind or want to learn more about our services? We'd love to hear from you. Reach out and let's start a conversation.",
    socialsHeading: "Contact Us",
  },
  form: {
    heading: "Send Us a Message",
    description: "",
    submitLabel: "Send Message",
    services: [
      { value: "web", label: "Web Development" },
      { value: "mobile", label: "Mobile App Development" },
      { value: "ai", label: "AI & Machine Learning" },
      { value: "uiux", label: "UI/UX Design" },
      { value: "marketing", label: "Digital Marketing" },
      { value: "3d", label: "3D/4D Development" },
      { value: "other", label: "Other" },
    ],
  },
  showMap: true,
};

export const defaultContent: ContentMap = {
  site,
  home,
  testimonials,
  services,
  products,
  projects,
  team,
  about,
  contact,
};

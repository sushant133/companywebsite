export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Tailwind gradient stops for the avatar placeholder, per the legacy inline styles. */
  gradient: string;
};

export type TeamGroup = {
  title: string;
  /** Leadership renders three-up; the other groups render four-up. */
  layout: "leadership" | "default";
  members: TeamMember[];
};

export const teamGroups: TeamGroup[] = [
  {
    title: "Leadership",
    layout: "leadership",
    members: [
      {
        name: "Sushant Kumar Mahato",
        role: "Founder & CEO",
        bio: "Visionary with years of experience in technology, Artificial Intelligence and business strategy. Passionate about driving innovation.",
        gradient: "from-[#6366f1] to-[#8b5cf6]",
      },
      {
        name: "Pritee Singh",
        role: "Co-Founder",
        bio: "Strong expertise in business strategy, operations management, and client relations. Drives growth and bridges gap between business vision and technology.",
        gradient: "from-[#ec4899] to-[#f43f5e]",
      },
    ],
  },
  {
    title: "Development Team",
    layout: "default",
    members: [
      {
        name: "Priyanka Sinha",
        role: "Lead Frontend Developer",
        bio: "React & Angular expert crafting beautiful, performant user interfaces.",
        gradient: "from-[#f59e0b] to-[#f97316]",
      },
      {
        name: "Nabh Verma",
        role: "Lead Backend Developer",
        bio: "Node.js and Python specialist building robust, scalable server architectures.",
        gradient: "from-[#3b82f6] to-[#6366f1]",
      },
      {
        name: "Kshitiz Budhathoki",
        role: "Mobile App Developer",
        bio: "Flutter & React Native developer creating cross-platform mobile experiences.",
        gradient: "from-[#10b981] to-[#059669]",
      },
      {
        name: "Shashank Mahato",
        role: "AI/ML Engineer",
        bio: "Machine learning specialist developing intelligent solutions with TensorFlow and PyTorch.",
        gradient: "from-[#8b5cf6] to-[#a855f7]",
      },
    ],
  },
  {
    title: "Design & Marketing",
    layout: "default",
    members: [
      {
        name: "Prithvi Kumar",
        role: "3D/4D Developer",
        bio: "Immersive technology expert creating stunning 3D visualizations and AR/VR experiences.",
        gradient: "from-[#ec4899] to-[#d946ef]",
      },
      {
        name: "Ruja Subedi",
        role: "Digital Marketing Head",
        bio: "Growth marketing expert driving brand awareness and lead generation strategies.",
        gradient: "from-[#f43f5e] to-[#ef4444]",
      },
      {
        name: "Prince Kushwaha",
        role: "Lead UI/UX Designer",
        bio: "Creative designer with a keen eye for detail and passion for user-centered design.",
        gradient: "from-[#06b6d4] to-[#0ea5e9]",
      },
    ],
  },
];

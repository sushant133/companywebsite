export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type TeamGroup = {
  title: string;
  members: TeamMember[];
};

export const teamGroups: TeamGroup[] = [
  {
    title: "Leadership",
    members: [
      {
        name: "Sushant Kumar Mahato",
        role: "Founder & CEO",
        bio: "Works across technology and business strategy, with a particular interest in where machine learning is genuinely worth applying — and where it isn't.",
      },
      {
        name: "Pritee Singh",
        role: "Co-Founder",
        bio: "Runs operations and client relationships, and is usually the person translating between what a business needs and what gets built.",
      },
    ],
  },
  {
    title: "Engineering",
    members: [
      {
        name: "Priyanka Sinha",
        role: "Lead Frontend Developer",
        bio: "React and Angular. Builds the interfaces, and cares more than most about how they behave on a slow connection.",
      },
      {
        name: "Nabh Verma",
        role: "Lead Backend Developer",
        bio: "Node.js and Python. Responsible for the parts that have to stay up, and for the database decisions everyone lives with afterwards.",
      },
      {
        name: "Kshitiz Budhathoki",
        role: "Mobile App Developer",
        bio: "Flutter and React Native, plus the store submission process that most people forget to budget time for.",
      },
      {
        name: "Shashank Mahato",
        role: "AI/ML Engineer",
        bio: "TensorFlow and PyTorch. Builds the models, evaluates them properly, and says so when a simpler approach would do the job.",
      },
    ],
  },
  {
    title: "Design & marketing",
    members: [
      {
        name: "Prince Kushwaha",
        role: "Lead UI/UX Designer",
        bio: "Takes projects from wireframe to component library, and runs the usability sessions that catch problems before they get built.",
      },
      {
        name: "Prithvi Kumar",
        role: "3D/4D Developer",
        bio: "Three.js, WebGL and Unity. Builds the configurators and walkthroughs, and keeps them running at a sensible frame rate.",
      },
      {
        name: "Ruja Subedi",
        role: "Digital Marketing Head",
        bio: "Search, paid and lifecycle marketing, reported against the numbers that pay for the campaign.",
      },
    ],
  },
];

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

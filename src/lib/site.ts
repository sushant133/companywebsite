import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";

export const siteConfig = {
  name: "MantraSphere Innovations",
  shortName: "MantraSphere",
  url: "https://mantrasphere.com.np",
  description:
    "Software development studio in Siraha, Nepal. We build web and mobile products for businesses, and licence nine of our own platforms.",
  googleSiteVerification: "mhTGwyeOoJAmWn6CFGKn2Huf8rTc61LX9UGi0c_xFWA",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;

export const contactInfo = {
  address: "Dhangadhimai-10, Siraha\nMadhesh Pradesh, Nepal",
  phones: ["+977 9824763981", "+977 9842582526"],
  email: "info@mantrasphere.com.np",
  hours: "Sun–Fri, 9:00–19:00 NPT",
  hoursLong: ["Sunday to Friday, 9:00 – 19:00 NPT", "Closed Saturday"],
  whatsapp:
    "https://wa.me/9779824763981?text=Hi%20how%20can%20I%20help%20you%3F",
} as const;

export const socialLinks: {
  href: string;
  label: string;
  icon: IconType;
}[] = [
  {
    href: "https://www.linkedin.com/in/mantrasphere-innovations-3667513b7/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  { href: "https://github.com/mantrasphere", label: "GitHub", icon: FaGithub },
  {
    href: "https://www.facebook.com/profile.php?id=61583575547597",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.instagram.com/mantrasphere.official/",
    label: "Instagram",
    icon: FaInstagram,
  },
  { href: contactInfo.whatsapp, label: "WhatsApp", icon: FaWhatsapp },
];

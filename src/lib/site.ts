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
    "MantraSphere Innovations is a software development company delivering cutting-edge digital solutions to businesses worldwide.",
  googleSiteVerification: "mhTGwyeOoJAmWn6CFGKn2Huf8rTc61LX9UGi0c_xFWA",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const contactInfo = {
  address: "Dhangadhimai-10, Siraha,\nMadhesh Pradesh, Nepal 560001",
  addressShort: "Dhangadhimai-10, Siraha,\nMadhesh Pradesh, Nepal",
  phones: ["+977 9824763981", "+977 9842582526"],
  email: "info@mantrasphere.com.np",
  hours: "Sun - Fri: 9:00 AM - 7:00 PM",
  hoursLong: ["Sunday - Friday: 9:00 AM - 7:00 PM", "Saturday: Closed"],
  whatsapp:
    "https://wa.me/9779824763981?text=Hi%20how%20can%20I%20help%20you%3F",
} as const;

export const socialLinks: {
  href: string;
  label: string;
  icon: IconType;
}[] = [
  {
    href: "https://www.facebook.com/profile.php?id=61583575547597",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.linkedin.com/in/mantrasphere-innovations-3667513b7/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://www.instagram.com/mantrasphere.official/",
    label: "Instagram",
    icon: FaInstagram,
  },
  { href: contactInfo.whatsapp, label: "WhatsApp", icon: FaWhatsapp },
  { href: "https://github.com/mantrasphere", label: "GitHub", icon: FaGithub },
];

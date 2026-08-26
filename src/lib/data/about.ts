import type { IconType } from "react-icons";
import {
  FaBuildingColumns,
  FaCar,
  FaCartShopping,
  FaGraduationCap,
  FaHospital,
  FaHotel,
  FaHouse,
  FaUtensils,
} from "react-icons/fa6";

/**
 * How we work, as four positions rather than six abstract virtues.
 *
 * The previous set ("Trust & Transparency", "Creative Innovation",
 * "Excellence Always", "Passion Driven"…) said nothing a competitor could
 * disagree with, which is the tell that a values section is filler. These
 * take a side.
 */
export const positions: { title: string; body: string }[] = [
  {
    title: "Small team, senior people",
    body: "Nine of us, and everyone on this site works on client projects. Nobody gets handed to a junior after the pitch, because there is no bench to hand them to.",
  },
  {
    title: "We say no to work",
    body: "If a project needs a stack we do not know well, or the budget will not carry the scope, we say so before taking a deposit. Turning down a bad fit costs less than delivering one.",
  },
  {
    title: "Boring technology, mostly",
    body: "We use established tools for the parts that have to keep running, and save the newer ones for problems that genuinely need them. Novelty is a cost your maintenance budget pays later.",
  },
  {
    title: "The handover is part of the job",
    body: "Documentation, architecture notes and a walkthrough ship with the code. A project you cannot hand to another developer is not finished.",
  },
];

export const industries: { title: string; icon: IconType }[] = [
  { title: "Healthcare", icon: FaHospital },
  { title: "Hospitality", icon: FaHotel },
  { title: "Retail & e-commerce", icon: FaCartShopping },
  { title: "Education", icon: FaGraduationCap },
  { title: "Finance & banking", icon: FaBuildingColumns },
  { title: "Restaurants", icon: FaUtensils },
  { title: "Transport & parking", icon: FaCar },
  { title: "Real estate", icon: FaHouse },
];

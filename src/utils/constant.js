import prime_icon from "../assets/images/prime_icon.svg";
import prime_hover from "../assets/images/prime_hover.svg";
import { Prime } from "../components/ui/svg";
import LargePrime from '../assets/images/large_prime.png';

export const items = [
  {
    name: "Prime",
    path: "/:id",
    src: prime_icon,
    hoverSrc: prime_hover,
    logo : LargePrime,
    docId: "68466ecb6e8d3444d55e85f1",
    id: "prime",
    headerIcon: Prime,
  },
];
export function getDayFromISO(dateString) {
  const date = new Date(dateString);
  return String(date.getUTCDate()).padStart(2, "0");
}
export function getMonthAbbreviation(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "short" }).toUpperCase();
}
export const SOCKET = {
  JOINLEAGUE: "joinLeague",
  LEAVELEAGUE: "LeaveLeague",
  LEAGUEUPDATE: "leagueUpdate",
  LEAGUEJOIN: "leagueJoin",
  READYTOPLAY : "readyToPlay",
  NOTREADYTOPLAY: "notReadyToPlay",
  JOINMATCH: "joinMatch",
  MATCHUPDATE : "matchUpdate",
  STARTMATCH: "startMatch",
  ONMESSAGE: "onMessage",
};
export function generateTailwindGradient(hexColor) {
  // Convert Hex to RGBA for a nice gradient range
  const toRGBA = (hex, alpha = 1) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const darkShade = "rgba(55, 16, 31, 1)";
  const midShade = toRGBA(hexColor);

  // Return Tailwind-compatible inline background string
  const gradient = `linear-gradient(141deg, ${darkShade} 0%, ${midShade} 100%)`;
  return `bg-[${gradient}]`;
}
// Animation variants for the card wrapper
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // Exit in reverse order
    },
  },
};

// Animation variants for individual cards
export const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.3 } },
};
// Output: bg-[linear-gradient(141deg, rgba(55, 16, 31, 1) 0%, rgba(157, 45, 58, 1) 100%)]

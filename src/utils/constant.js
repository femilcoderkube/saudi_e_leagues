import prime_icon from "../assets/images/prime_icon.svg";
import prime_hover from "../assets/images/prime_hover.svg";
import { Prime } from "../components/ui/svg";

export const items = [
  {
    name: "Prime",
    path: "/:id",
    src: prime_icon,
    hoverSrc: prime_hover,
    docId: "68466ecb6e8d3444d55e85f1",
    id: "prime",
    headerIcon : Prime,
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
  LEAGUEUPDATE: "leagueUpdate",
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

  const darkShade = 'rgba(55, 16, 31, 1)';
  const midShade = toRGBA(hexColor);

  // Return Tailwind-compatible inline background string
  const gradient = `linear-gradient(141deg, ${darkShade} 0%, ${midShade} 100%)`;
  return `bg-[${gradient}]`;
}

// Output: bg-[linear-gradient(141deg, rgba(55, 16, 31, 1) 0%, rgba(157, 45, 58, 1) 100%)]


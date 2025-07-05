import prime_icon from "../assets/images/prime_icon.svg";
import prime_hover from "../assets/images/prime_hover.png";
import { Prime } from "../components/ui/svg";
import LargePrime from "../assets/images/prime_hover.png";
import { baseURL } from "./axios";

export const items = [
  {
    name: "Prime",
    path: "/:id",
    src: prime_icon,
    hoverSrc: prime_hover,
    logo: LargePrime,
    docId: "68466ecb6e8d3444d55e85f1",
    id: "prime",
    headerIcon: Prime,
  },
];
export const getPartnerById = (id) => {
  return items.find((item) => item.id === id);
};
export const getPartnerByDocId = (id) => {
  return items.find((item) => item.docId == id);
};
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
  READYTOPLAY: "readyToPlay",
  NOTREADYTOPLAY: "notReadyToPlay",
  JOINMATCH: "joinMatch",
  MATCHUPDATE: "matchUpdate",
  STARTMATCH: "startMatch",
  ONMESSAGE: "onMessage",
  ONSUBMIT: "onSubmit",
  JOINUSEROOM: "joinUserRoom",
  GIVEREPUTATION: "giveReputation",
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
export function formatDateToMonthDay(dateStr) {
  const date = new Date(dateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };
  return `${month} ${getOrdinal(day)}`;
}
export function canJoinQueue(leagueData) {
  const text = getQueueText(leagueData);
  return text === "QUEUE";
}

export function getQueueText(leagueData) {
  if (!leagueData || !leagueData.queueSettings) return "";

  const { alwaysOn, schedule } = leagueData.queueSettings;

  // Always On: Use startDate/endDate logic
  if (alwaysOn) {
    const now = new Date();
    const start = new Date(leagueData.startDate);
    if (start > now) {
      return "STARTS IN " + GetTimeString(leagueData.startDate);
    } else {
      return "QUEUE";
    }
  }

  // Scheduled: Use schedule.days, startTime, endTime
  if (
    schedule &&
    Array.isArray(schedule.days) &&
    schedule.days.length > 0 &&
    schedule.startTime &&
    schedule.endTime
  ) {
    // Get today's day in lowercase
    const today = new Date();
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const todayName = daysOfWeek[today.getDay()];

    // Is today a queue day?
    const isTodayQueueDay = schedule.days
      .map((d) => d.toLowerCase())
      .includes(todayName);

    // Parse start and end time for today
    function parseTimeToDate(timeStr, baseDate) {
      const [h, m] = timeStr.split(":").map(Number);
      const d = new Date(baseDate);
      d.setHours(h, m, 0, 0);
      return d;
    }

    if (isTodayQueueDay) {
      const startTime = parseTimeToDate(schedule.startTime, today);
      const endTime = parseTimeToDate(schedule.endTime, today);

      if (today < startTime) {
        return `OPENS IN ${GetTimeString(startTime)}`;
      } else if (today >= startTime && today <= endTime) {
        return "QUEUE";
      } else {
        // Find next queue day
        let nextDayIndex = null;
        for (let i = 1; i <= 7; i++) {
          const next = (today.getDay() + i) % 7;
          if (
            schedule.days.map((d) => d.toLowerCase()).includes(daysOfWeek[next])
          ) {
            nextDayIndex = next;
            break;
          }
        }
        if (nextDayIndex !== null) {
          // Calculate next queue day date
          const nextDate = new Date(today);
          nextDate.setDate(
            today.getDate() + ((nextDayIndex + 7 - today.getDay()) % 7)
          );
          const nextStartTime = parseTimeToDate(schedule.startTime, nextDate);
          return `OPENS IN ${GetTimeString(nextStartTime)}`;
        }
        return "QUEUE CLOSED";
      }
    } else {
      // Find next queue day
      let nextDayIndex = null;
      for (let i = 1; i <= 7; i++) {
        const next = (today.getDay() + i) % 7;
        if (
          schedule.days.map((d) => d.toLowerCase()).includes(daysOfWeek[next])
        ) {
          nextDayIndex = next;
          break;
        }
      }
      if (nextDayIndex !== null) {
        // Calculate next queue day date
        const nextDate = new Date(today);
        nextDate.setDate(
          today.getDate() + ((nextDayIndex + 7 - today.getDay()) % 7)
        );
        const nextStartTime = parseTimeToDate(schedule.startTime, nextDate);
        return `OPENS IN ${GetTimeString(nextStartTime)}`;
      }
      return "QUEUE CLOSED";
    }
  }

  return "QUEUE CLOSED";
}

export function GetTimeString(date) {
  if (!date) return "";
  const now = new Date();
  const target = new Date(date);
  let diff = Math.max(0, target - now); // in ms

  const sec = Math.floor(diff / 1000) % 60;
  const min = Math.floor(diff / (1000 * 60)) % 60;
  const hour = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const month = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  let parts = [];
  if (month > 0) parts.push(month === 1 ? "1 mon" : `${month} mon`);
  if (day > 0 && month === 0) parts.push(day === 1 ? "1 day" : `${day} day`);
  if (hour > 0 && month === 0 && day === 0)
    parts.push(hour === 1 ? "1 hr" : `${hour} hrs`);
  if (min > 0 && month === 0 && day === 0 && hour === 0)
    parts.push(min === 1 ? "1 min" : `${min} min`);
  if (sec > 0 && month === 0 && day === 0 && hour === 0 && min === 0)
    parts.push(sec === 1 ? "1 sec" : `${sec} sec`);
  if (parts.length === 0) parts.push("0 sec");
  return parts.join(" ");
}

export function getServerURL(path) {
  return `${baseURL}/api/v1/${path}`;
}
export function getDigitList(num) {
  if (num == null) return Array(6).fill(0);
  const digits = num.toString().split("").map(Number);
  // Take the first 6 digits if more than 6, otherwise pad at the start
  const firstSix =
    digits.length >= 6
      ? digits.slice(0, 6)
      : Array(6 - digits.length)
          .fill(0)
          .concat(digits);
  return firstSix;
}
export const formatTime = (secs) => {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
};
// Utility function to check for a specific path segment
export function checkParams(param) {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  return pathSegments.includes(param);
}

// Example usage
// const isFindingMatch = checkParams('finding-match');
// console.log(isFindingMatch); // true if 'finding-match' is in the path

export function formatAmountWithCommas(amount) {
  if (amount == null) return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getRandomColor = (senderId) => {
  // Simple hash function to generate consistent color for the same senderId
  let hash = 0;
  for (let i = 0; i < senderId?.length; i++) {
    hash = senderId.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Convert hash to a 6-digit hex color
  const color = `#${((hash >> 0) & 0xffffff).toString(16).padStart(6, "0")}`;
  return color;
};

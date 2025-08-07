import prime_icon from "../assets/images/prime_icon.svg";
import prime_hover from "../assets/images/prime_hover.png";
import { Prime } from "../components/ui/svg";
import LargePrime from "../assets/images/prime_hover.png";
import { baseURL } from "./axios";
import moment from "moment-timezone";

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
  NOTIFICATION: "notification",
  ONNOTIFICATION: "onNotification",
  READNOTIFICATION: "readNotification",
  GETLASTMATCHS: "getLastMatchs",
  LASTMATCHUPDATE: "lastMatchUpdate",
  GETWEEKOFSTAR: "getWeekOfStar",
  ONWEEKOFSTARUSERS: "onWeekOfStarUsers",
  CANCELMATCH: "cancelMatch",
  GETTOURNAMENT: "getTournament",
  ONTOURNAMENTUPDATE: "onTournamentUpdate",
  GETTOURNAMENTSTAGES: "getTournamentStages",
  ONTOURNAMENTSTAGESUPDATE: "onTournamentStagesUpdate",
  // DRAFTING PHASE
  GETDRAFTDATA: "getDraftData",
  ONDRAFTDATAUPDATE: "onDraftDataUpdate",
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
export function canJoinQueue(leagueData, t) {
  const text = getQueueText(leagueData, t);
  return text === t("images.queue");
}

// export function getQueueText(leagueData , t) {
//   if (!leagueData || !leagueData.queueSettings) return "";

//   const { alwaysOn, schedule } = leagueData.queueSettings;

//   // If alwaysOn at the root, use startDate logic
//   if (alwaysOn) {
//     const now = new Date();
//     const start = new Date(leagueData.startDate);
//     if (start > now) {
//       return t("images.starts_in") + " " + GetTimeString(leagueData.startDate , t);
//     } else {
//       return t("images.queue");
//     }
//   }

//   // New schedule.days structure
//   if (
//     schedule &&
//     Array.isArray(schedule.days) &&
//     schedule.days.length > 0
//   ) {
//     // Get today's day in lowercase
//     const today = new Date();
//     const daysOfWeek = [
//       "sunday",
//       "monday",
//       "tuesday",
//       "wednesday",
//       "thursday",
//       "friday",
//       "saturday",
//     ];
//     const todayName = daysOfWeek[today.getDay()];

//     // Find today's schedule object
//     const todaySchedule = schedule.days.find(
//       (d) => d.day && d.day.toLowerCase() === todayName
//     );

//     // If today is a queue day
//     if (todaySchedule) {
//       // If alwaysOn for today, queue is always open
//       if (todaySchedule.alwaysOn) {
//         return t("images.queue");
//       }

//       // If there are time slots for today
//       if (Array.isArray(todaySchedule.time) && todaySchedule.time.length > 0) {
//         // Use moment-timezone to convert to Saudi Riyadh timezone
//         // import moment from "moment-timezone";
//         const saTz = "Asia/Riyadh";
//         const nowRiyadh = moment.tz(new Date(), saTz);

//         // Find the current or next slot
//         let foundOpen = false;
//         let nextOpenTime = null;

//         for (let slot of todaySchedule.time) {
//           const startTime = moment.tz(
//             `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${slot.startTime}`,
//             "YYYY-M-D HH:mm",
//             saTz
//           );
//           const endTime = moment.tz(
//             `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${slot.endTime}`,
//             "YYYY-M-D HH:mm",
//             saTz
//           );

//           if (nowRiyadh.isBefore(startTime)) {
//             // Next slot not started yet
//             if (!nextOpenTime || startTime.isBefore(nextOpenTime)) {
//               nextOpenTime = startTime;
//             }
//           } else if (nowRiyadh.isSameOrAfter(startTime) && nowRiyadh.isSameOrBefore(endTime)) {
//             // Currently in a slot
//             foundOpen = true;
//             break;
//           }
//         }

//         if (foundOpen) {
//           return t("images.queue");
//         } else if (nextOpenTime) {
//           return t("images.opens_in") + " " + GetTimeString(nextOpenTime.toDate() , t);
//         }
//         // If no more slots today, look for next available day
//       }
//       // If no time slots, treat as closed for today unless alwaysOn
//     }

//     // Find the next available day with alwaysOn or a time slot
//     let soonestDay = null;
//     let soonestTime = null;
//     for (let i = 1; i <= 7; i++) {
//       const nextDayIdx = (today.getDay() + i) % 7;
//       const nextDayName = daysOfWeek[nextDayIdx];
//       const nextDayObj = schedule.days.find(
//         (d) => d.day && d.day.toLowerCase() === nextDayName
//       );
//       if (nextDayObj) {
//         // If alwaysOn for that day, that's the soonest
//         if (nextDayObj.alwaysOn) {
//           soonestDay = i;
//           soonestTime = null;
//           break;
//         }
//         // If there are time slots, pick the earliest slot
//         if (Array.isArray(nextDayObj.time) && nextDayObj.time.length > 0) {
//           const nextDate = new Date(today);
//           nextDate.setDate(today.getDate() + i);
//           // Find earliest slot
//           let earliestSlot = nextDayObj.time[0];
//           for (let slot of nextDayObj.time) {
//             if (
//               slot.startTime < earliestSlot.startTime
//             ) {
//               earliestSlot = slot;
//             }
//           }
//           const saTz = "Asia/Riyadh";
//           const slotStart = moment.tz(
//             `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}-${nextDate.getDate()} ${earliestSlot.startTime}`,
//             "YYYY-M-D HH:mm",
//             saTz
//           );
//           if (
//             soonestTime === null ||
//             slotStart.isBefore(soonestTime)
//           ) {
//             soonestDay = i;
//             soonestTime = slotStart;
//           }
//         }
//       }
//     }

//     if (soonestDay !== null) {
//       if (soonestTime) {
//         return t("images.opens_in") + " " + GetTimeString(soonestTime.toDate() , t);
//       } else {
//         // Next day is alwaysOn, so opens at midnight
//         const nextDate = new Date(today);
//         nextDate.setDate(today.getDate() + soonestDay);
//         nextDate.setHours(0, 0, 0, 0);
//         return t("images.opens_in") + " " + GetTimeString(nextDate , t);
//       }
//     }

//     return t("images.queue_closed");
//   }

//   return t("images.queue_closed");
// }
export function getQueueText(leagueData, t) {
  if (!leagueData || !leagueData.queueSettings) return "";

  const { alwaysOn, schedule } = leagueData.queueSettings;

  // If alwaysOn at the root, use startDate logic
  if (alwaysOn) {
    const now = new Date();
    const start = new Date(leagueData.startDate);
    if (start > now) {
      return (
        t("images.starts_in") + " " + GetTimeString(leagueData.startDate, t)
      );
    } else {
      return t("images.queue");
    }
  }

  // New schedule.days structure
  if (schedule && Array.isArray(schedule.days) && schedule.days.length > 0) {
    // Get current time in Saudi Riyadh timezone
    const saTz = "Asia/Riyadh";
    const nowRiyadh = moment.tz(new Date(), saTz);

    // Get today's day name in Riyadh timezone
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const todayNameRiyadh = daysOfWeek[nowRiyadh.day()];

    // Find today's schedule object based on Riyadh timezone
    const todaySchedule = schedule.days.find(
      (d) => d.day && d.day.toLowerCase() === todayNameRiyadh
    );

    // If today is a queue day
    if (todaySchedule) {
      // If alwaysOn for today, queue is always open
      if (todaySchedule.alwaysOn) {
        return t("images.queue");
      }

      // If there are time slots for today
      if (Array.isArray(todaySchedule.time) && todaySchedule.time.length > 0) {
        // Get current time in HH:mm format (Riyadh time)
        const currentTimeStr = nowRiyadh.format("HH:mm");

        // Find the current or next slot
        let foundOpen = false;
        let nextOpenTime = null;

        for (let slot of todaySchedule.time) {
          const startTime = slot.startTime; // "HH:mm" format
          const endTime = slot.endTime; // "HH:mm" format

          // Compare time strings directly
          if (currentTimeStr < startTime) {
            // Next slot not started yet
            if (!nextOpenTime || startTime < nextOpenTime) {
              nextOpenTime = startTime;
            }
          } else if (currentTimeStr >= startTime && currentTimeStr <= endTime) {
            // Currently in a slot
            foundOpen = true;
            break;
          }
        }

        if (foundOpen) {
          return t("images.queue");
        } else if (nextOpenTime) {
          // Create a date object for today with the next open time (in Riyadh timezone)
          const nextOpenDateTime = moment.tz(
            `${nowRiyadh.format("YYYY-MM-DD")} ${nextOpenTime}`,
            "YYYY-MM-DD HH:mm",
            saTz
          );
          return (
            t("images.opens_in") +
            " " +
            GetTimeString(nextOpenDateTime.toDate(), t)
          );
        }
        // If no more slots today, look for next available day
      }
      // If no time slots, treat as closed for today unless alwaysOn
    }

    // Find the next available day with alwaysOn or a time slot
    let soonestDay = null;
    let soonestTime = null;

    for (let i = 1; i <= 7; i++) {
      const nextDayRiyadh = nowRiyadh.clone().add(i, "days");
      const nextDayName = daysOfWeek[nextDayRiyadh.day()];
      const nextDayObj = schedule.days.find(
        (d) => d.day && d.day.toLowerCase() === nextDayName
      );

      if (nextDayObj) {
        // If alwaysOn for that day, that's the soonest
        if (nextDayObj.alwaysOn) {
          soonestDay = i;
          soonestTime = null;
          break;
        }
        // If there are time slots, pick the earliest slot
        if (Array.isArray(nextDayObj.time) && nextDayObj.time.length > 0) {
          // Find earliest slot
          let earliestSlot = nextDayObj.time[0];
          for (let slot of nextDayObj.time) {
            if (slot.startTime < earliestSlot.startTime) {
              earliestSlot = slot;
            }
          }

          const slotStart = moment.tz(
            `${nextDayRiyadh.format("YYYY-MM-DD")} ${earliestSlot.startTime}`,
            "YYYY-MM-DD HH:mm",
            saTz
          );

          if (soonestTime === null || slotStart.isBefore(soonestTime)) {
            soonestDay = i;
            soonestTime = slotStart;
          }
        }
      }
    }

    if (soonestDay !== null) {
      if (soonestTime) {
        return (
          t("images.opens_in") + " " + GetTimeString(soonestTime.toDate(), t)
        );
      } else {
        // Next day is alwaysOn, so opens at midnight (Riyadh time)
        const nextOpenDate = nowRiyadh
          .clone()
          .add(soonestDay, "days")
          .startOf("day");
        return (
          t("images.opens_in") + " " + GetTimeString(nextOpenDate.toDate(), t)
        );
      }
    }

    return t("images.queue_closed");
  }

  return t("images.queue_closed");
}
export function GetTimeString(date, t) {
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
  if (month > 0)
    parts.push(month === 1 ? t("images.1_mon") : `${month} ${t("images.mon")}`);
  if (day > 0 && month === 0)
    parts.push(day === 1 ? t("images.1_day") : `${day} ${t("images.day")}`);
  if (hour > 0 && month === 0 && day === 0)
    parts.push(hour === 1 ? t("images.1_hr") : `${hour} ${t("images.hrs")}`);
  if (min > 0 && month === 0 && day === 0 && hour === 0)
    parts.push(min === 1 ? t("images.1_min") : `${min} ${t("images.min")}`);
  if (sec > 0 && month === 0 && day === 0 && hour === 0 && min === 0)
    parts.push(sec === 1 ? t("images.1_sec") : `${sec} ${t("images.sec")}`);
  if (parts.length === 0) parts.push(t("images.0_sec"));
  return parts.join(" ");
}

export function getServerURL(path) {
  return `${baseURL}/api/v1/${path}`;
}
export function getDigitList(num) {
  if (num == null) return Array(8).fill(0);
  const digits = num.toString().split("").map(Number);
  // Take the first 6 digits if more than 6, otherwise pad at the start
  const firstSix =
    digits.length >= 8
      ? digits.slice(0, 8)
      : Array(8 - digits.length)
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

  // Generate RGB values ensuring they're not too dark (minimum brightness)
  const r = Math.max(128, (hash >> 16) & 0xff);
  const g = Math.max(128, (hash >> 8) & 0xff);
  const b = Math.max(128, hash & 0xff);

  // Convert to hex color
  const color = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return color;
};
export const notificationType = {
  ACCOUNT_CREATION: 1,
  JOINING_PRIME_LEAGUE: 2,
  SCORESUBMITTED: 3,
  MATCHMAKING_FOUND: 4,
  POST_MATCH: 5,
  LEAGUE_ENDED: 6,
  MATCH_IN_DISPUTE: 7,
  CONFLICT_RESOLVED: 8,
  QUEUE_OPENED: 9,
  FIRST_MATCH_WIN: 10,
  FIRST_MATCH_LOSS: 11,
};
export const buttonType = {
  NONE: 0,
  MAIN_LOBBY: 1,
  LEAGUE_LOBBY: 2,
  VIEW_MATCH: 3,
};
export function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // difference in seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
export function getIntervalCountdown(currentIntervalStartTime, intervalTimeMinutes) {
  const now = new Date();
  const intervalTimeMs = intervalTimeMinutes * 1000; // Convert to milliseconds
  
  // Calculate when current interval should end
  const currentIntervalEndTime = new Date(new Date(currentIntervalStartTime).getTime() + intervalTimeMs);
  
  // Calculate remaining time in milliseconds
  const remainingMs = currentIntervalEndTime.getTime() - now.getTime();
  
  // Convert to seconds (round up to avoid showing 0 when there's still time)
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  
  // Return 0 if interval has already ended
  return Math.max(0, remainingSeconds);
}

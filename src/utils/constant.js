import axiosInstance, { baseURL } from "./axios";
import moment from "moment-timezone";
import { Prime } from "../components/ui/svg/index.jsx";
import { IMAGES } from "../components/ui/images/images.js";

export const items = [
  {
    name: "Prime",
    path: "/:id",
    src: IMAGES.prime_icon,
    hoverSrc: IMAGES.primeIcon,
    logo: IMAGES.primeIcon,
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
export function generateTailwindGradient(hexColor) {
  const toRGBA = (hex, alpha = 1) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const darkShade = "rgba(55, 16, 31, 1)";
  const midShade = toRGBA(hexColor);

  const gradient = `linear-gradient(141deg, ${darkShade} 0%, ${midShade} 100%)`;
  return `bg-[${gradient}]`;
}
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

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.3 } },
};
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
  if (!path?.startsWith(`${baseURL}/api/v1/`)) {
    return `${baseURL}/api/v1/${path}`;
  } else {
    return path;
  }
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
export function checkParams(param) {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  return pathSegments.includes(param);
}
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
  PLAYER_INVITATION: 12,
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
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
export function getIntervalCountdown(
  currentIntervalStartTime,
  intervalTimeMinutes
) {
  const now = new Date();
  const intervalStartTime = new Date(currentIntervalStartTime);

  if (intervalStartTime.getTime() > now.getTime()) {
    return "00:00";
  }

  const intervalTimeMs = intervalTimeMinutes * 1000;

  const currentIntervalEndTime = new Date(
    intervalStartTime.getTime() + intervalTimeMs
  );

  const remainingMs = currentIntervalEndTime.getTime() - now.getTime();

  if (remainingMs <= 0) {
    return "00:00";
  }

  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
export const stageTypes = {
  SingleElimination: "SingleElimination",
  DoubleElimination: "DoubleElimination",
  RoundRobin: "RoundRobin",
  Swiss: "Swiss",
  BattleRoyal: "BattleRoyal",
  Custom: "Custom",
};
export async function isPrivateMode() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
export const calculateSnakeDraftPosition = (interval, totalTeams) => {
  const round = Math.floor((interval - 1) / totalTeams);
  const positionInRound = (interval - 1) % totalTeams;

  return round % 2 === 0 ? positionInRound : totalTeams - 1 - positionInRound;
};

export const checkIsCurrentCaptainTurn = (
  draftComplete,
  draftData,
  teams,
  teamIdx
) => {
  if (
    draftComplete ||
    !draftData?.currentInterval == null ||
    draftData.currentInterval === -1
  )
    return false;
  const totalTeams = draftData?.totalTeams || teams.length;
  const interval = draftData.currentInterval + 1;

  const snakeOrder = [];
  let direction = 1;
  let currentRoundTeams = [];

  for (let i = 1; i <= interval; i++) {
    if (currentRoundTeams.length === 0) {
      currentRoundTeams =
        direction === 1
          ? [...Array(totalTeams).keys()]
          : [...Array(totalTeams).keys()].reverse();
    }
    snakeOrder.push(currentRoundTeams.shift());

    if (currentRoundTeams.length === 0) {
      direction *= -1;
    }
  }
  return snakeOrder[interval - 1] === teamIdx;
};

export const getPopupData = async () => {
  try {
    const response = await axiosInstance.get("/Popup");
    return response.data;
  } catch (error) {
    console.error("Error fetching popup data:", error);
    throw error;
  }
};
export const getTeamData = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/Team`, {
      params: { userId }, // becomes /Team?userId=<userId>
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
    throw error;
  }
};

export const shouldDisplayPopup = (popupData) => {
  if (!popupData || !Array.isArray(popupData) || popupData.length === 0) {
    return false;
  }

  const popup = popupData[0];

  if (popup.status == "inactive") {
    return false;
  }

  if (popup.expireDateTime) {
    const currentDate = new Date();
    const expireDate = new Date(popup.expireDateTime);

    if (currentDate > expireDate) {
      return false;
    }
  }

  return true;
};

export const findUserRolesById = (games, userId) => {
  return (games || [])
    .map((g) => {
      const user = (g.users || []).find((u) => u.id === userId);
      return user
        ? {
            gameName: g.game?.name,
            role: String(user.role || "").toLowerCase(),
          }
        : null;
    })
    .filter((entry) => entry !== null);
};

// Helper function to calculate time remaining until registration start
export const getTimeUntilRegistration = (regStart, t) => {
  if (!regStart) return null;
  const now = new Date();
  const start = new Date(regStart);
  if (now >= start) return null;

  const diffMs = start - now;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Translate numbers and units
  const transDays = days === 1 ? t("units.day") : t("units.days");
  const transHours = hours === 1 ? t("units.hour") : t("units.hours");
  const transMinutes = minutes === 1 ? t("units.minute") : t("units.minutes");
  const transNumbers = (num) => t(`numbers.${num}`);

  // Return only the largest non-zero unit
  if (days > 0) {
    return `${transNumbers(days)} ${transDays}`;
  } else if (hours > 0) {
    return `${transNumbers(hours)} ${transHours}`;
  } else {
    return `${transNumbers(minutes)} ${transMinutes}`;
  }
};

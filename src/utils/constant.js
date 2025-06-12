import prime_icon from "../assets/images/prime_icon.svg";
import prime_hover from "../assets/images/prime_hover.svg";


export const items = [
    {
      name: "Prime",
      path: "/:id",
      src: prime_icon,
      hoverSrc: prime_hover,
      docId: "68466ecb6e8d3444d55e85f1",
      id: "prime",
    },
  ];

  
  export function getDayFromISO(dateString) {

    const date = new Date(dateString);
    return String(date.getUTCDate()).padStart(2, '0');
  }
  export function getMonthAbbreviation(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  }
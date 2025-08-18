// LTR And RTL Start
export const leftToRight = {
    hidden: { opacity: 0, x: -100 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.5,
        type: "spring",
        stiffness: 60,
      },
    }),
  };
  
  export const rightToLeft = {
    hidden: { opacity: 0, x: 100 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.5,
        type: "spring",
        stiffness: 60,
      },
    }),
  };
  // LTR And RTL end

  
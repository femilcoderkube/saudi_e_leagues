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

  // card animation start
  export const cardVariantsAni = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};
// card animation End

  
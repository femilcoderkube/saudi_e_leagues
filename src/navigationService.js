// navigationService.js
let navigateFn;

export const setNavigator = (navigate) => {
  navigateFn = navigate;
};

export const globalNavigate = (to, options) => {
  if (navigateFn) {
    navigateFn(to, options);
  } else {
    console.warn("Navigator not set yet");
  }
};

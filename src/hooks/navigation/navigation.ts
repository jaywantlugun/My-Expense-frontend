let navigateFunction: (path: string) => void;

const setNavigateFunction = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

const navigateTo = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.log('URL_ENDPOINT_CONSTANTS.NAVIGATION.NAVIGATION_ERROR');
  }
};

export { setNavigateFunction, navigateTo };

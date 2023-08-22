import scssVars from "~/assets/scss/alias.module.scss";

export const useScreenDetection = () => {
  const screenSize = reactive({
    width: 0,
    height: 0,
  });

  const isMobileScreen = ref(false);

  const detectMobileScreen = (): boolean => {
    return window.matchMedia(`(max-width: ${scssVars.mediaMobileMaxWidth})`)
      .matches;
  };

  const onWindowResize = useThrottle(() => {
    const { innerWidth, innerHeight } = window;
    screenSize.width = innerWidth;
    screenSize.height = innerHeight;
    isMobileScreen.value = detectMobileScreen();
  }, 50);

  onMounted(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("resize", onWindowResize);
    isMobileScreen.value = detectMobileScreen();
  });

  onUnmounted(() => {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", onWindowResize);
  });

  return {
    screenSize,
    isMobileScreen,
  };
};

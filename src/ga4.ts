import ReactGA from "react-ga4";

export const initializeGA4 = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};
  
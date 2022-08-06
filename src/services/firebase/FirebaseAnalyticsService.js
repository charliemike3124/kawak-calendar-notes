// This is an example Firebase analytics service to log
// events to Google. For more information go to the following
// link: https://firebase.google.com/docs/analytics/get-started?platform=web
import { App } from "@/firebase.config";
import { logEvent, getAnalytics } from "firebase/analytics";

const analytics = getAnalytics(App);

function LogCustomEvent(eventName, params) {
  logEvent(analytics, eventName, params);
}

export default {
  LogCustomEvent,
};

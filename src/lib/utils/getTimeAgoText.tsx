const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

type CompareTimes = (t: number) => boolean;
const isLessThanTenSec: CompareTimes = (t) => t < 10 * ONE_SECOND;
const isLessThanOneMin: CompareTimes = (t) => t < ONE_MINUTE;
const isLessThanOneHour: CompareTimes = (t) => t < ONE_HOUR;
const isLessThanOneDay: CompareTimes = (t) => t < ONE_DAY;

type ConvertTime = (t: number) => number;
const toMinutes: ConvertTime = (t) => Math.floor(t / ONE_MINUTE);
const toHours: ConvertTime = (t) => Math.floor(t / ONE_HOUR);

type GetTimeAgoText = (timeDiff: number) => string;
export const getTimeAgoText: GetTimeAgoText = (timeDiff) => {
  if (isLessThanTenSec(timeDiff)) {
    return "just now";
  } else if (isLessThanOneMin(timeDiff)) {
    return `${timeDiff}s ago`;
  } else if (isLessThanOneHour(timeDiff)) {
    const timeDiffMins = toMinutes(timeDiff);
    return `${timeDiffMins}m ago`;
  } else if (isLessThanOneDay(timeDiff)) {
    const timeDiffHours = toHours(timeDiff);
    return `${timeDiffHours}h ago`;
  }
  return "> 1 day ago";
};

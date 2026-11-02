// Note:
// - Months are zero-based: 0 = January/Baishak (1st month), 11 = December/Chaitra (12th month).
// - Weekdays are zero-based: 0 = Sunday, 6 = Saturday.

// Simplified conversion principle:
//   the difference in BS dates equals the difference in AD dates
//   i.e. BSHigh - BSLow === ADHigh - ADLow

import BS_CALENDAR_YEARS from "./mapping.js";

function getCalendarDataByBsYear(bsYear) {
  const calendarData = BS_CALENDAR_YEARS.find((item) => item.bsYear === bsYear);
  return calendarData;
}

function getCalendarDataByAdYear(adYear) {
  const calendarData = BS_CALENDAR_YEARS.find(
    (item) => item.firstAdDate.year === adYear
  );
  return calendarData;
}

function getFirstAdDateByBsYear(bsYear) {
  const yearData = getCalendarDataByBsYear(bsYear);
  if (!yearData) {
    console.warn(
      `Cannot get first AD date for ${bsYear}BS, the year is not available in the BS_CALENDAR_YEARS! `
    );
    return null;
  }
  return yearData.firstAdDate;
}

function getFirstWeekdayByBsYear(bsYear) {
  const firstAdDate = getFirstAdDateByBsYear(bsYear);
  if (!firstAdDate) {
    console.warn(`Cannot get first weekday of ${bsYear} BS, year is invalid!`);
    return null;
  }
  const { year, month, day } = firstAdDate;
  const date = new Date(Date.UTC(year, month, day));
  return date.getUTCDay();
}

function getFirstWeekdayOfBsMonth(bsYear, bsMonth) {
  const yearData = getCalendarDataByBsYear(bsYear);
  if (!yearData) {
    console.warn(`Cannot get first weekday of BS month, year is invalid!`);
    return null;
  }
  if (bsMonth === null || bsMonth < 0 || bsMonth > 11) {
    console.warn(
      `Cannot get first weekday of BS month, month must be inclusively between 0 and 11!`
    );
    return null;
  }
  const firstWeekdayOfBsYear = getFirstWeekdayByBsYear(bsYear);
  let firstWeekdayOfBsMonth = 0;
  for (let i = 0; i < bsMonth; i++) {
    firstWeekdayOfBsMonth += yearData.daysInMonths[i];
  }
  firstWeekdayOfBsMonth += firstWeekdayOfBsYear;
  return firstWeekdayOfBsMonth % 7;
}

function addDaysToBsDate(bsYear, bsMonth, bsDay, daysToAdd) {
  let yearData = getCalendarDataByBsYear(bsYear);
  if (!yearData) {
    console.warn(
      `Cannot add ${daysToAdd} days to ${bsYear}/${bsMonth}/${bsDay}. ${bsYear} BS is not available in the BS_CALENDAR_YEARS!`
    );
    return null;
  }
  let i = bsMonth;
  let resultingYear = bsYear;
  daysToAdd += bsDay;
  while (daysToAdd > yearData.daysInMonths[i]) {
    daysToAdd -= yearData.daysInMonths[i];
    i++;
    if (i > 11) {
      i = 0;
      resultingYear++;
      yearData = getCalendarDataByBsYear(resultingYear);
      if (!yearData) {
        console.warn(
          `Cannot add ${daysToAdd} days to ${bsYear}/${bsMonth}/${bsDay} BS. Addition year overflow!`
        );
        return null;
      }
    }
  }

  const resultingDate = {
    year: resultingYear,
    month: i,
    day: daysToAdd,
  };

  return resultingDate;
}

function getAdLowFromAdHigh(adYear, adMonth, adDay) {
  const AdHigh = new Date(Date.UTC(adYear, adMonth, adDay));
  let AdLow = null;
  // Find relevant firstAdDate
  let yearData = getCalendarDataByAdYear(adYear);

  if (yearData) {
    // Data found
    let { year, month, day } = yearData.firstAdDate;
    AdLow = new Date(Date.UTC(year, month, day));

    if (AdLow > AdHigh) {
      yearData = getCalendarDataByAdYear(adYear - 1);
      if (yearData) {
        // Data found
        ({ year, month, day } = yearData.firstAdDate);
        AdLow = new Date(Date.UTC(year, month, day));
      } else {
        // Data not found
        return null;
      }
    } else {
      //do nothing
    }
  } else {
    // Date not found
    yearData = getCalendarDataByAdYear(adYear - 1);
    if (yearData) {
      // Data found
      let { year, month, day } = yearData.firstAdDate;
      AdLow = new Date(Date.UTC(year, month, day));
      const lastBsDate = {
        year: yearData.bsYear,
        month: 11,
        day: yearData.daysInMonths[11],
      };
      let lastAdDate = getAdFromBs(
        lastBsDate.year,
        lastBsDate.month,
        lastBsDate.day
      );

      ({ year, month, day } = lastAdDate);
      lastAdDate = new Date(Date.UTC(year, month, day));

      if (AdHigh <= lastAdDate) {
        //do nothing
      } else {
        return null;
      }
    } else {
      // Data not found
      return null;
    }
  }

  AdLow = {
    year: AdLow.getUTCFullYear(),
    month: AdLow.getUTCMonth(),
    day: AdLow.getUTCDate(),
  };

  return AdLow;
}

function getBsMonthInfo(bsYear, bsMonth) {
  const yearData = getCalendarDataByBsYear(bsYear);
  if (!yearData) {
    console.warn(
      `Cannot get BS calendar for Year: ${bsYear}, Month: ${bsMonth}`
    );
    return null;
  }
  if (bsMonth === null || bsMonth < 0 || bsMonth > 11) {
    console.warn(
      `Cannot get BS calendar, month must be inclusively between 0 and 11!`
    );
    return null;
  }
  const monthInfo = {
    month: bsMonth,
    totalDays: yearData.daysInMonths[bsMonth],
    firstWeekday: getFirstWeekdayOfBsMonth(bsYear, bsMonth),
  };

  return monthInfo;
}

function getAdFromBs(bsYear, bsMonth, bsDay) {
  const yearData = getCalendarDataByBsYear(bsYear);
  if (!yearData) {
    console.warn(
      `Cannot convert, the year ${bsYear} BS is not available in the BS_CALENDAR_YEARS!`
    );
    return null;
  }

  const { year, month, day } = yearData.firstAdDate;
  let targetAdDate = new Date(Date.UTC(year, month, day));

  let elapsedBsDays = 0;
  for (let i = 0; i < bsMonth; i++) {
    elapsedBsDays += yearData.daysInMonths[i];
  }
  elapsedBsDays += bsDay;

  // Subtract 1 day because the first day (i.e. Baishak 1) is already represented by targetAdDate
  elapsedBsDays -= 1;

  targetAdDate.setUTCDate(targetAdDate.getUTCDate() + elapsedBsDays);

  const resultingDateInAd = {
    year: targetAdDate.getUTCFullYear(),
    month: targetAdDate.getUTCMonth(),
    day: targetAdDate.getUTCDate(),
    weekday: targetAdDate.getUTCDay(),
  };

  return resultingDateInAd;
}

function getBsFromAd(adYear, adMonth, adDay) {
  const AdHigh = new Date(Date.UTC(adYear, adMonth, adDay));
  let AdLow = getAdLowFromAdHigh(adYear, adMonth, adDay);

  if (!AdLow) {
    console.warn("Cannot convert to BS. AdLow not found!");
    return null;
  }

  const { year, month, day } = AdLow;
  AdLow = new Date(Date.UTC(year, month, day));

  const difference = Math.floor((AdHigh - AdLow) / (1000 * 60 * 60 * 24));

  const calendarData = getCalendarDataByAdYear(year);

  const BsHigh = addDaysToBsDate(calendarData.bsYear, 0, 1, difference);

  if (!BsHigh) {
    console.warn("Cannot convert to BS. Addition year overflow!");
    return null;
  }

  return BsHigh;
}

export {
  getAdFromBs,
  getBsFromAd,
  getBsMonthInfo,
};

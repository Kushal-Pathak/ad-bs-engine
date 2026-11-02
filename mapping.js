// AD_BS_MAPPING is an array of year configurations for the Nepali calendar (BS).
// Each element represents one BS year and contains:
//   - year: the Nepali year number
//   - firstAdDate: the corresponding starting English (Gregorian) date
//                  for the first day of that Nepali year
//   - months: an array of integers where each value is the total number
//             of days in that month for the given Nepali year

const BS_CALENDAR_YEARS = [
  {
    bsYear: 2077,
    firstAdDate: { year: 2020, month: 3, day: 13 },
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  {
    bsYear: 2078,
    firstAdDate: { year: 2021, month: 3, day: 14 },
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  {
    bsYear: 2079,
    firstAdDate: { year: 2022, month: 3, day: 14 },
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  {
    bsYear: 2080,
    firstAdDate: { year: 2023, month: 3, day: 14 },
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  {
    bsYear: 2081,
    firstAdDate: { year: 2024, month: 3, day: 13 },
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  {
    bsYear: 2082,
    firstAdDate: { year: 2025, month: 3, day: 14 },
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  {
    bsYear: 2083,
    firstAdDate: { year: 2026, month: 3, day: 14 },
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  {
    bsYear: 2084,
    firstAdDate: { year: 2027, month: 3, day: 14 },
    daysInMonths: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  {
    bsYear: 2085,
    firstAdDate: { year: 2028, month: 3, day: 13 },
    daysInMonths: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  },
];

export default BS_CALENDAR_YEARS;

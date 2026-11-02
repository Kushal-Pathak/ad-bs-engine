# ad-bs-engine

A simple JavaScript package to convert dates between AD & BS and provide the basis for BS calendar generation.

## Installation

```bash
npm i ad-bs-engine
```

## Import

```js
import { getAdFromBs, getBsFromAd, getBsMonthInfo } from "ad-bs-engine";
```

## Features & Usage

- ### Convert date from BS to AD (BS->AD)
  ```js
  const dateInAd = getAdFromBs(2081, 10, 2);
  console.log(dateInAd);
  ```
- ### Convert date from AD to BS (AD->BS)
  ```js
  const dateInBs = getBsFromAd(2025, 1, 14);
  console.log(dateInBs);
  ```
- ### Get month info i.e. total days and starting weekday
  ```js
  // Sample code to generate calendar for Kartik month of 2082 BS
  const { totalDays, firstWeekday } = getBsMonthInfo(2082, 6);

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const calendar = [];

  for (let i = 0; i < totalDays; i++) {
    const weekday = weekdays[(firstWeekday + i) % 7];
    const day = i + 1;
    calendar.push({ weekday, day });
  }

  console.table(calendar);
  ```

### **NOTE**
Months are zero-based: 0 = January/Baishak (1st month), 11 = December/Chaitra (12th month).  
Weekdays are zero-based: 0 = Sunday, 6 = Saturday.

### **CAUTION**
Not all BS & AD years are supported out of the box.  
To support a specific year, add its configuration to `mapping.js`.

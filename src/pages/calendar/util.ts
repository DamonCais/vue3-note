interface DateEL {
  title?: string,
  textContent?: number,
  className?: string
}
export const useCalendar = () => {
  let curYear = $ref<number>();
  let curMonth = $ref<number>();
  let curDate = $ref<number>();
  let curDates = $ref<DateEL[]>([]);
  onMounted(() => {
    const defaultDate = new Date();
    curYear = defaultDate.getFullYear();
    curMonth = defaultDate.getMonth() + 1;
    curDate = defaultDate.getDate();
    init();
  });
  const getDayCount: (y: number, m: number) => number = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const getFirstDateCurMonth = () => {
    const day = new Date(curYear, curMonth - 1, 1).getDay();
    return day === 0 ? 7 : day;
  };
  const getLastMonthInfo = () => {
    let lastMonth = curMonth - 1;
    let yearOfLastMonth = curYear;
    if (lastMonth === 0) {
      lastMonth = 12;
      yearOfLastMonth -= 1;
    }
    const dayCountInLastMonth = getDayCount(yearOfLastMonth, lastMonth);

    return {
      lastMonth,
      yearOfLastMonth,
      dayCountInLastMonth
    };
  };

  const getNextMonthInfo = () => {
    let nextMonth = curMonth + 1;
    let yearOfNextMonth = curYear;
    if (nextMonth === 13) {
      nextMonth = 1;
      yearOfNextMonth += 1;
    }
    const dayCountInNextMonth = getDayCount(yearOfNextMonth, nextMonth);
    return {
      nextMonth,
      yearOfNextMonth,
      dayCountInNextMonth
    };
  };

  const getDateString = (year: number, month: number, date: number) => {
    if (date) {
      return `${year}-${month}-${date}`;
    } else {
      return `${year}-${month}`;
    }
  };

  const init = () => {
    const dayCountCurMonth = getDayCount(curYear, curMonth);
    const firstDay = getFirstDateCurMonth();
    const { lastMonth, yearOfLastMonth, dayCountInLastMonth } = getLastMonthInfo();
    const { nextMonth, yearOfNextMonth } = getNextMonthInfo();
    const dates: DateEL[] = [];
    for (let i = 1; i <= 42; i++) {
      let date; let dateString; let dateClass = '';
      if (firstDay > 1 && i < firstDay) {
        date = dayCountCurMonth - (firstDay - i) + 1;
        dateString = getDateString(yearOfLastMonth, lastMonth, date);
      } else if (i >= dayCountCurMonth + firstDay) {
        date = i - (dayCountCurMonth + firstDay) + 1;
        dateString = getDateString(yearOfNextMonth, nextMonth, date);
      } else {
        date = i - firstDay + 1;
        dateString = getDateString(curYear, curMonth, date);
        dateClass = 'curMonth';
      }
      dates.push({
        title: dateString,
        textContent: date,
        className: dateClass
      });
    }
    console.log(dates);
    curDates = dates;
  };
  const setMonth = (step: number) => {
    curMonth += step;
    if (curMonth > 12) {
      curMonth = 1;
      curYear++;
    } else if (curMonth < 1) {
      curMonth = 12;
      curYear--;
    }
    init();
  };

  const setYear = (step: number) => {
    curYear += step;
    init();
  };
  return $$({
    curYear,
    curMonth,
    curDate,
    curDates,
    setMonth,
    setYear
  });
};

export function useSetTimeout () {
  const timer: Record<string, any> = {};

  onBeforeUnmount(() => {
    Object.keys(timer).forEach(key => {
      clearTimeout(timer[key]);
    });
  });

  return { timer };
}

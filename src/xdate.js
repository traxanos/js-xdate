/*

Copyright (c) 2011 Marco Scholl

Contact:  https://github.com/traxanos/js-xdate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

XDate = function(mix, month, day, hour, minute, second, millisecond) {
  if (typeof(mix) === "string") {
    this.date = new Date(Date.parse(mix));
  } else if(typeof(mix) === "object") {
    this.date = mix;
  } else {
    if (mix) {
      this.date = new Date(mix, (month - 1 || 0), (day || 1), (hour || 0), (minute || 0), (second || 0), (millisecond || 0));
    } else {
      this.date = new Date();
    }
  }
};

XDate.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

XDate.prototype.clone = function() {
  return new XDate(new Date(this.date));
};

// Time
XDate.prototype.setTime = function(time) {
  if (time) {
    this.date.setTime(time);
    return this;
  } else {
    return this.date.getTime();
  }
};
XDate.prototype.setTime = function(time) {
  this.date.setTime(time);
  return this;
};
XDate.prototype.getTime = function() {
  return this.date.getTime();
};

// Date
XDate.prototype.date = function(date) {
  if (date) {
    this.date = date;
    return this;
  } else {
    return this.date;
  }
};
XDate.prototype.setDate = function(date) {
  this.date = date;
  return this;
};
XDate.prototype.getDate = function() {
  return this.date;
};

// Milliseconds
XDate.prototype.setMilliseconds = function(millisecond) {
  millisecond = (typeof(millisecond) == 'int' || typeof(millisecond) == 'number') ? millisecond : 0;
  this.date.setMilliseconds(millisecond);
  return this;
};
XDate.prototype.getMilliseconds = function() {
  return this.date.getMilliseconds();
};
XDate.prototype.changeMilliseconds = function(millisecond) {
  millisecond = (typeof(millisecond) == 'int' || typeof(millisecond) == 'number') ? millisecond : 0;
  this.setMilliseconds(this.getMilliseconds() + millisecond);
  return this;
};
XDate.prototype.nextMillisecond = function() {
  return this.changeMilliseconds(1);
};
XDate.prototype.previousMillisecond = function() {
  return this.changeMilliseconds(-1);
};

// Seconds
XDate.prototype.setSeconds = function(second) {
  this.date.setSeconds(second);
  return this;
};
XDate.prototype.getSeconds = function() {
  return this.date.getSeconds();
};
XDate.prototype.changeSeconds = function(second) {
  second = (typeof(second) == 'int' || typeof(second) == 'number') ? second : 0;
  this.setSeconds(this.getSeconds() + second);
  return this;
};
XDate.prototype.beginningOfSecond = function() {
  this.setMilliseconds(0);
  return this;
};
XDate.prototype.endOfSecond = function() {
  this.setMilliseconds(999);
  return this;
};
XDate.prototype.nextSecond = function() {
  return this.changeSeconds(1);
};
XDate.prototype.previousSecond = function() {
  return this.changeSeconds(-1);
};

// Minutes
XDate.prototype.setMinutes = function(minute) {
  this.date.setMinutes(minute);
  return this;
};
XDate.prototype.getMinutes = function() {
  return this.date.getMinutes();
};
XDate.prototype.changeMinutes = function(minute) {
  minute = (typeof(minute) == 'int' || typeof(minute) == 'number') ? minute : 0;
  this.setMinutes(this.getMinutes() + minute);
  return this;
};
XDate.prototype.beginningOfMinute = function() {
  this.date.setSeconds(0, 0);
  return this;
};
XDate.prototype.endOfMinute = function() {
  this.date.setSeconds(59, 999);
  return this;
};
XDate.prototype.nextMinute = function() {
  return this.changeMinutes(1);
};
XDate.prototype.previousMinute = function() {
  return this.changeMinutes(-1);
};

// Hours
XDate.prototype.setHours = function(hour) {
  this.date.setHours(hour);
  return this;
};
XDate.prototype.getHours = function() {
  return this.date.getHours();
};
XDate.prototype.changeHours = function(hour) {
  hour = (typeof(hour) == 'int' || typeof(hour) == 'number') ? hour : 0;
  this.setHours(this.getHours() + hour);
  return this;
};
XDate.prototype.beginningOfHour = function() {
  this.date.setMinutes(0, 0, 0);
  return this;
};
XDate.prototype.endOfHour = function() {
  this.date.setMinutes(59, 59, 999);
  return this;
};
XDate.prototype.nextHour = function() {
  return this.changeHours(1);
};
XDate.prototype.previousHour = function() {
  return this.changeHours(-1);
};

//  Day
XDate.prototype.setDay = function(day) {
  this.date.setDate(day);
  return this;
};
XDate.prototype.getDay = function() {
  return this.date.getDate();
};
XDate.prototype.changeDays = function(day) {
  day = (typeof(day) == 'int' || typeof(day) == 'number') ? day : 0;
  this.setHours(this.getHours() + (day * 24));
  return this;
};
XDate.prototype.beginningOfDay = function() {
  this.date.setHours(0, 0, 0, 0);
  return this;
};
XDate.prototype.endOfDay = function() {
  this.date.setHours(23, 59, 59, 999);
  return this;
};
XDate.prototype.nextDay = function() {
  return this.changeDays(1);
};
XDate.prototype.previousDay = function() {
  return this.changeDays(-1);
};

XDate.prototype.getWeekDay = function(offset) {
  offset = (typeof(offset) == 'int' || typeof(offset) == 'number') ? offset : 0;
  var weekDay = this.date.getDay() - offset;
  return (weekDay >= 0 ? weekDay : weekDay + 7);
};

XDate.prototype.getYearDays = function() {
  return Math.floor(((this.time() - this.clone().beginningOfYear().time()) / 86400000) + 1);
};

// Month
XDate.prototype.setMonth = function(month) {
  this.date.setMonth(month - 1);
  return this;
};

XDate.prototype.getMonth = function() {
  return this.date.getMonth() + 1;
};
XDate.prototype.changeMonth = function(month) {
  month = (typeof(month) == 'int' || typeof(month) == 'number') ? month : 0;
  this.setMonth(this.getMonth() + month);
  return this;
};
XDate.prototype.beginningOfMonth = function() {
  return this.beginningOfDay().setDay(1);
};
XDate.prototype.endOfMonth = function() {
  return this.beginningOfMonth().changeMonth(1).changeMilliseconds(-1);
};
XDate.prototype.nextMonth = function() {
  return this.changeMonth(1);
};
XDate.prototype.previousMonth = function() {
  return this.changeMonth(-1);
};

XDate.prototype.getMonthDays = function() {
  if (this.getMonth() === 2 && this.isLeapYear()) {
    return 29;
  }
  return XDate.DAYS_IN_MONTH[this.getMonth() - 1];
};

// Year
XDate.prototype.setYear = function(year) {
  this.date.setYear(year);
  return this;
};
XDate.prototype.getYear = function() {
  return this.date.getFullYear();
};
XDate.prototype.changeYears = function(year) {
  year = (typeof(year) == 'int' || typeof(year) == 'number') ? year : 0;
  this.setYear(this.getYear() + year);
  return this;
};
XDate.prototype.beginningOfYear = function() {
  return this.beginningOfDay().setDay(1).setMonth(1);
};
XDate.prototype.endOfYear = function() {
  return this.beginningOfYear().changeYears(1).changeMilliseconds(-1);
};
XDate.prototype.nextYear = function() {
  return this.changeYears(1);
};
XDate.prototype.previousYear = function() {
  return this.changeYears(-1);
};

// Quarter
XDate.prototype.getQuarter = function() {
  if (this.getMonth() >= 1 && this.getMonth() < 4) {
    return 1;
  } else if (this.getMonth() >= 4 && this.getMonth() < 7) {
    return 2;
  } else if (this.getMonth() >= 7 && this.getMonth() < 10) {
    return 3;
  } else {
    return 4;
  }
};
XDate.prototype.beginningOfQuarter = function() {
  return this.setMonth(((this.getQuarter() - 1) * 3) + 1).beginningOfMonth();
};
XDate.prototype.endOfQuarter = function() {
  return this.setMonth(((this.getQuarter() - 1) * 3) + 3).endOfMonth();
};
XDate.prototype.nextQuarter = function() {
  return this.changeMonth(3);
};
XDate.prototype.previousQuarter = function() {
  return this.changeMonth(-3);
};

XDate.prototype.isLeapYear = function() {
  var year = this.getYear();
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
};
XDate.prototype.between = function(start, end) {
  return start.time() <= this.time() && this.time() <= end.time();
};

XDate.prototype.toString = function() {
  return this.date.toString();
};
XDate.now = function() {
  return new XDate(new Date);
};
XDate.yesterday = function() {
  return (new XDate).previousDay();
};
XDate.tomorrow = function() {
  return (new XDate).nextDay();
};
XDate.today = function() {
  return XDate.now();
};
XDate.parse = function(str) {
  return Date.parse(str).toXDate();
};

Date.prototype.toXDate = function() {
  return new XDate(this);
};

// Weeks
XDate.prototype.getWeek = function (offset) {
  var refDate = this.clone();
  refDate.setDay(refDate.getDay() + 4 - refDate.getWeekDay(offset));
  var baseTime = refDate.getTime();
  refDate.setMonth(1);
  refDate.setDay(1);
  return Math.floor(Math.round((baseTime - refDate.getTime()) / 86400000) / 7) + 1;
};

XDate.prototype.getWeekYear = function (offset) {
  var weekYear = this.getYear();
  if (this.getWeek(offset) > 51 && this.getMonth() == 1) weekYear--;
  if (this.getWeek(offset) == 1 && this.getMonth() == 12) weekYear++;
  return weekYear;
};

XDate.prototype.beginningOfWeek = function(offset) {
  return this.beginningOfDay().changeDays(-this.getWeekDay(offset));
};

XDate.prototype.endOfWeek = function(offset) {
  return this.endOfDay().changeDays(6 - this.getWeekDay(offset));
};

XDate.prototype.changeWeeks = function(weeks) {
  return this.changeDays(7 * weeks);
};

XDate.prototype.nextWeek = function() {
  return this.changeWeeks(1);
};

XDate.prototype.previousWeek = function() {
  return this.changeWeeks(-1);
};



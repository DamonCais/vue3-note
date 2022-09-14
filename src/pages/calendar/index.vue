
<template>
  <div>
    <div class="calendar">
      <div class="header">
        <button @click="setYear(-1)" class="lastYear" title="Last year">
          &lt;&lt;
        </button>
        <button @click="setMonth(-1)" class="lastMonth" title="Last month">
          &lt;
        </button>
        <div class="currentDate">{{ curYear }} - {{ curMonth }} - {{ a }}</div>
        <button @click="setMonth(1)" class="nextMonth" title="Next month">
          &gt;
        </button>
        <button @click="setYear(1)" class="nextYear" title="Next year">
          &gt;&gt;
        </button>
      </div>
      <div class="days">
        <div class="day"> Mon </div>
        <div class="day"> Tue </div>
        <div class="day"> Wed </div>
        <div class="day"> Thu </div>
        <div class="day"> Fri </div>
        <div class="day"> Sat </div>
        <div class="day"> Sun </div>
      </div>
      <div class="dates">
        <div v-for="d in curDates" :key="d.title" :title="d.title" :class="d.className" class="date">
          {{ d.textContent }} {{ notes[d.title!] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCalendar } from './util';
const { curYear, curMonth, curDates, setMonth, setYear } = useCalendar();
const notes: Record<string, string> = {
  '2022-7-20': 'helloworld'
}
</script>

<style>
:root {
  font-size: 2vmin;
  --accent-color: #ff2189;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.calendar {
  width: 100%;
  padding: 30px;
  user-select: none;
}

/* header */
.header {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.currentDate {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-color);
  text-align: center;
  min-width: 28vmin;
}

.header button {
  border: 2px solid transparent;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.3s;
  font-size: 1.3rem;
}

.header button:hover {
  border: 2px solid var(--accent-color);
}

/* days */
.days {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 0;
  font-size: 1.2rem;
  color: var(--accent-color);
}

/* dates */
.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.date {
  text-align: center;
  padding: 20px 0;
  font-size: 1.6rem;
  transition: all 0.3s;
  border: 3px solid transparent;
  color: rgba(0, 0, 0, 0.36);
  cursor: pointer;
  background-color: transparent;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
}

.date.curMonth {
  color: #000;
}

.date:hover,
.date.selected {
  border-color: var(--accent-color);
}

.date.selected {
  background-color: var(--accent-color);
  color: #fff;
}
</style>

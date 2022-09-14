<template>
  <el-form class="demo-form-inline">
    <el-form-item label="开始日期">
      <el-date-picker v-model="startDate" :clearable="false" type="date" />
    </el-form-item>
    <el-form-item label="结束日期">
      <el-date-picker v-model="endDate" :clearable="false" type="date" />
    </el-form-item>
    <el-form-item class="w-250px" label="日宽度:">
      <el-slider :min="3" :max="40" v-model="unitWidth" />
    </el-form-item>
    <el-form-item label="区间">
      <el-select-v2 v-model="viewType" :options="viewOptions" />
    </el-form-item>
  </el-form>
  <div class="flex max-w-100% overflow-hidden">
    <div class="w-200px h-500px bg-blue-1 flex-shrink-0">
      <div class="overflow-hidden mt-120px">
        <div :style="{ transform: `translateY(-${scrollTop}px)` }" class="h-1000px w-100% bg-orange-1  ">
          lines

        </div>
      </div>

    </div>
    <div ref="wrap" class="max-w-1200px h-500px overflow-x-auto flex-shrink-1">
      <div :style="{ width: unitWidth * days.length + 'px' }" class="h-1000px pos-relative flex flex-col">
        <svg class="pos-absolute left-0 right-0 top-0 bottom-0 z--1" width="100%" height="100%">
          <line v-for="w in lines" :key="w.key" :x1="w.sum * unitWidth" y1="0" :x2="w.sum * unitWidth" y2="100%"
            stroke="black" style="stroke: rgba(0, 0, 0, 0.4); stroke-width: 1"></line>
        </svg>
        <div class="sticky top-0px z-1 flex flex-col h-120px z-2">
          <div v-for="key in dateKeys" :key="key" class="min-h-20px flex flex-grow">
            <div class="text-center bg-red-1 b-1px bd-black box-border flex justify-center items-center pos-relative"
              :style="{ width: unitWidth * q.value + 'px' }" v-for="q in (dateMap[key]!)" :key="q.key">
              <span :style="{ left: 0, right: 0 }" class="sticky overflow-hidden">{{ q.text }}</span>
            </div>
          </div>
        </div>
        <div  ref="dragArea" @drop="drop" @dragover="dragOver"  class="flex-grow" droppable="true">
          <!-- <div @mousedown="taskMouseDown"
            class="bg-blue-2 pos-absolute left-50px top-150px w-270px h-50px flex justify-center items-center pr-20px pos-relative z-1">
            <div class="sticky left-0 right-0">
              Task1
              <el-button>test</el-button>
            </div>
          </div> -->
        </div>

      </div>
    </div>
    <div class="w-300px h-500px bg-yellow-1 flex-shrink-0 flex flex-col">
      <div draggable="true" class="h-50px b-red b-1px lh-50px task-draggable">Task</div>
      <!-- <div @drop="drop" @dragover="dragOver" class="h-600px bg-green-1">

      </div> -->
    </div>
  </div>
  <div>
    {{ scrollLeft }}
  </div>
</template>

<script setup lang="ts">
import { getDays, groupBy, setWrap } from './util';
const startDate = $ref(new Date('2022-05-01'));
const endDate = $ref(new Date('2022-12-31'));
const days = $computed(() => {
  return getDays(startDate, endDate);
});
const viewOptions = ['year', 'quarter', 'month', 'week', 'dateK'].map(
  (val, idx) => ({
    value: val,
    label: val
  })
);
const viewType = $ref('week');
const unitWidth = $ref(3);
const dateMap = computed(() => {
  return {
    year: groupBy(days, 'year'),
    quarter: groupBy(days, 'quarter'),
    month: groupBy(days, 'month'),
    week: groupBy(days, 'week'),
    day: days.map((d) => ({
      key: `${d.year}-${d.month}-${d.date}`,
      text: d.day,
      value: 1
    })),
    date: days.map((d) => ({
      key: `${d.year}-${d.month}-${d.date}`,
      text: d.date,
      value: 1
    }))
  };
});
const dateKeys = computed(() => {
  let arr = ['year', 'quarter', 'month'];
  if (unitWidth >= 15) {
    arr = arr.concat(['week']);
  }
  if (unitWidth >= 25) {
    arr = arr.concat(['date', 'day']);
  }
  return arr;
});
// const dateKeys = ['year', 'quarter', 'month', 'week', 'date', 'day'];

const lines = computed(() => {
  return groupBy(days, viewType);
});
const wrap = ref<null | HTMLElement>(null);

const { scrollLeft, scrollTop } = setWrap(wrap);
const taskMouseDown = (e) => {
  e.stopPropagation();
  console.log('taskMouseDown');
};
const dragEnd = (e) => {
  console.log(e);
};
// const dragArea = $ref<HTMLElement|null>(null);
// onMounted(() => {
//   dragArea!.addEventListener('dragover', e => {
//     console.log(e);
//   });
// });
const dragOver = (e) => {
  // console.log(e);
  e.preventDefault();
};
const drop = (e) => {
  console.log(e);
  // e.preventDefault();
};
</script>

<style lang="scss" scoped>
.a {
  transform: tran;
}
.task-draggable{
  cursor: grab;
}
</style>

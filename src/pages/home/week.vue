<template>
  <div  class="w-500px h-500px  bg-red-1 overflow-x-auto">

    <div @click="unitWidth++">
      hello world
    </div>
    <div :style="{width:unitWidth*365+'px'}" class="bg-green-1 h-100% pos-relative">
      <svg class="pos-absolute left-0 right-0 top-0 bottom-0" width="100%" height="100%">
        <line v-for="w in weeks" :key="w.key" :x1="w.value*unitWidth" y1="0" :x2="w.value*unitWidth"  y2="100%" stroke="black"></line>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getDaysByTimes, groupBy } from './util';
const firstDay = new Date('2022-01-01');
const days = getDaysByTimes(firstDay, 365);
const unitWidth = $ref(3);
const months = computed(() => {
  return groupBy(days, 'month');
});
const weeks = computed(() => {
  return groupBy(days, 'week');
});
console.log(months, weeks);
</script>

<style lang="scss" scoped>

</style>

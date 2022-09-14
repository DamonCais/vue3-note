<template>
  <div>
    <p>{{ showTime }}</p>
    <el-button @click="start">
      Start
    </el-button>
    <el-button @click="stop">
      Stop
    </el-button>
    <el-button @click="stopObserver">
      StopObserver
    </el-button>
    <p>内部元素{{ isIntersectingVal?'可视':'不可视' }}</p>
    <div class="border-1px b-red w-200px h-200px  overflow-y-auto mt-10px">
      <p ref="target">
        内部元素
      </p>
      <div class="h-500px bg-green" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useTimer, useIntersectionObserver } from './util';
const { showTime, start, stop } = useTimer();
const target = ref<Element|null>(null);
let isIntersectingVal = $ref(false);
const { stopObserver } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isIntersectingVal = isIntersecting;
  if (isIntersecting) {
    console.log('元素变为可视,开始计时');
    start();
  } else {
    console.log('元素变为不可视,暂停计时');
    stop();
  }
});
</script>

<style>

</style>

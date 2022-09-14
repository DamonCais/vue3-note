
<template>
  <div class="w-200px">
    <div @mouseenter="handleTriggerEnter" @mouseleave="handleTriggerLeave" ref="wrapper">
      <div class="bg-green" ref="reference">reference</div>
      <teleport to='body'>
        <div @mouseenter="handleTriggerEnter" @mouseleave="handleTriggerLeave" class="bg-gray" v-show="currentVisible"
          ref="popper">
          tips
        </div>
      </teleport>

    </div>
  </div>

</template>

<script setup lang="ts">
import { createPopper } from '@popperjs/core';
import { WatchStopHandle } from 'vue';
import type { Placement, Modifier, Instance, Rect } from '@popperjs/core';
import { useSetTimeout } from './util';
const reference = $ref<HTMLElement | null>(null);
const popper = $ref<HTMLElement | null>(null);
let popperInstance: Instance | null = null;
let currentVisible = $ref(false);
function createPopperInstance () {
  if (reference && popper) {
    popperInstance = createPopper(reference, popper, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: 'window'
          }
        },
        {
          name: 'computeStyles',
          options: {
            gpuAcceleration: false
          }
        }
      ]
    });
    console.log(popperInstance);
  }
}
let stopWatchPopper: WatchStopHandle | null = null;
const { timer } = useSetTimeout();
onMounted(() => {
  nextTick(() => {
    createPopperInstance();

    stopWatchPopper = watch($$(popper), () => {
      popperInstance && popperInstance.destroy();
      createPopperInstance();
    });
  });
});
const handleTriggerEnter = () => {
  clearTimeout(timer.hover);
  timer.hover = setTimeout(
    () => {
      currentVisible = true;
    }, 250
  );
};
const handleTriggerLeave = () => {
  clearTimeout(timer.hover);
  timer.hover = setTimeout(
    () => {
      currentVisible = false;
    }, 250
  );
};
</script>

<style>
</style>


<template>
  <div class="w-200px h-300px">
    <div ref="boundary" class="bg-gray-2 w-300px h-350px overflow-auto">
      <div class="bg-red-1 w-300px h-600px"></div>
      <div @clickoutside="handleClickOutside" @mouseenter="handleTriggerEnter" @mouseleave="handleTriggerLeave"
        ref="wrapper" class="w-500px pos-relative">
        <div class="pos-absolute top-0px bottom-0px bg-red-2 w-50px h-50px">

        </div>
        <div @click="test" class="bg-green w-100px h-50px" ref="reference">reference</div>
        <div @mouseenter="handleTriggerEnter" @mouseleave="handleTriggerLeave" class="bg-gray p-5px" ref="popper">
          tips
        </div>
      </div>
      <div class="bg-red-1 w-300px h-600px"></div>

    </div>
    <!-- <div class="bg-gray-2 w-100px h-500px">

    </div> -->
  </div>

</template>

<script setup lang="ts">
import { createPopper } from '@popperjs/core';
import { WatchStopHandle } from 'vue';
import type { Placement, Modifier, Instance, Rect } from '@popperjs/core';
import { useSetTimeout } from './util';
const reference = $ref<HTMLElement | null>(null);
const popper = $ref<HTMLElement | null>(null);
const wrapper = $ref<HTMLElement | null>(null);
const boundary = $ref<HTMLElement | null>(null);
let popperInstance: Instance | null = null;
let currentVisible = $ref(false);
const router = useRouter();

function createPopperInstance() {
  if (reference && popper) {
    popperInstance = createPopper(reference, popper, {
      placement: 'top',
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary
          }
        },
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
const test = () => {
  router.push({
    name: 'test1'
  });
};
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
const handleClickOutside = () => {
  console.log('clickoutside');
};
watchEffect(() => {
  console.log(wrapper);
});
</script>

<style>
</style>

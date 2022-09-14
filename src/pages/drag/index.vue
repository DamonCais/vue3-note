<template>
    <div class="w-500px h-500px bg-green-1 pos-relative">
      {{containerProps}}-{{limitProps}}
      <div ref="containerRef" :style="style" class=" bg-red-1 pos-absolute">
        <div v-for="item in handlers" :key="item" class="vdr-handle"
        :class="'vdr-handle-'+item" @mousedown="resizeHandleDown($event,item)" ></div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { initParent, initState, initLimitSizeAndMethods, initResizeHandle } from './util';
const handlers = ref(['ml', 'mr']);
const containerProps = initState({
  initW: 100,
  initH: 50,
  x: 100,
  y: 100
});
const containerRef = ref();
const parentSize = initParent(containerRef);
const limitProps = initLimitSizeAndMethods(parentSize, containerProps);
const resizeHandle = initResizeHandle(
  containerProps,
  limitProps,
  parentSize
);
const { resizeHandleDown } = resizeHandle;
const { width, left, top, height } = containerProps;
const style = computed(() => {
  return {
    width: width.value + 'px',
    left: left.value + 'px',
    top: top.value + 'px',
    height: height.value + 'px'
  };
});

</script>

<style lang="scss">
.vdr-container {
  position: absolute;
  border: 1px solid transparent;
  box-sizing: border-box;
}
.vdr-container.active {
  border-color: #000;
  border-style: dashed;
}
.vdr-container.dragging {
  border-color: #000;
  border-style: solid;
}
.vdr-handle {
  box-sizing: border-box;
  position: absolute;
  width: 7px;
  height: 7px;
  background: #f0f0f0;
  border: 1px solid #333;
}
.vdr-handle-tl {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}
.vdr-handle-tm {
  top: -4px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.vdr-handle-tr {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}
.vdr-handle-ml {
  top: 50%;
  margin-top: -3px;
  left: -4px;
  cursor: w-resize;
}
.vdr-handle-mr {
  top: 50%;
  margin-top: -3px;
  right: -4px;
  cursor: e-resize;
}
.vdr-handle-bl {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}
.vdr-handle-bm {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
  cursor: s-resize;
}
.vdr-handle-br {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}

</style>

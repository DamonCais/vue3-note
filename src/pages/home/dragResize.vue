
<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-gray-2">
    <div @mousedown="dragHandleDown" :style="style" class="vdr-container bg-white">
      <div @mousedown="resizeHandleDown($event,item)" v-for="item in handlers" :class="'vdr-handle-'+item" :key="item" class="vdr-handle">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function getPosition (e: HandleEvent) {
  if ('touches' in e) {
    return [e.touches[0].pageX, e.touches[0].pageY];
  } else {
    return [e.pageX, e.pageY];
  }
}
const documentElement = document.documentElement;
const handlers = $ref(['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']);
let width = $ref(100);
let height = $ref(100);
let top = $ref(100);
let left = $ref(100);
const style = computed(() => ({
  width: width + 'px',
  height: height + 'px',
  top: top + 'px',
  left: left + 'px'
}));
let lstPageX = 0;
let lstPageY = 0;
let lstW = 0;
let lstH = 0;
let lstT = 0;
let lstL = 0;
let _handleType = '';
const dragHandleDown = (e) => {
  console.log(e);
};

const resizeHandleDrag = (e:Event) => {
  const [_pageX, _pageY] = getPosition(e);
  const deltaX = _pageX - lstPageX;
  const deltaY = _pageY - lstPageY;
  switch (_handleType) {
    case 'br':
      width = lstW + deltaX;
      height = lstH + deltaY;
      break;
    case 'tl':
      left = lstL + deltaX;
      top = lstT + deltaY;
      width = lstW - deltaX;
      height = lstH - deltaY;
      break;
  }
};
const resizeHandleUp = (e:Event) => {
  _handleType = '';
  documentElement.removeEventListener('mousemove', resizeHandleDrag);
  documentElement.removeEventListener('mouseup', resizeHandleUp);
};
const resizeHandleDown = (e:Event, handleType) => {
  console.log(e);
  e.stopPropagation();
  _handleType = handleType;
  const lstPagePosition = getPosition(e);
  lstPageX = lstPagePosition[0];
  lstPageY = lstPagePosition[1];
  lstW = width;
  lstH = height;
  lstT = top;
  lstL = left;
  documentElement.addEventListener('mousemove', resizeHandleDrag);
  documentElement.addEventListener('mouseup', resizeHandleUp);
};
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

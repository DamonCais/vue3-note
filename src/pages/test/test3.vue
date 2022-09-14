<template>
  <div
    class="p-10px h-300px"
    style="overflow: auto;"
  >
    <div class="h-1000px">
      <div
        class="bg-gray-400 border-red w-50px h-50px"
        ref="popcorn"
      >
        test3
      </div>
    </div>

    <div
      id="tooltip"
      ref="tooltip"
    >
      tooltipss
    </div>
  </div>
</template>

<script setup lang='tsx'>
import { createPopper } from '@popperjs/core';
const popcorn = $ref<HTMLElement|null>(null);
const tooltip = $ref<HTMLElement|null>(null);
onMounted(() => {
  // const dom = document.createElement('span');
  // document.body.appendChild(dom);
  // dom.innerText = 'tooltip';
  // console.log(dom);
  createPopper(popcorn!, tooltip!, {
    placement: 'top',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'right']
        }
      }
    ]
  });
});
</script>

<style>

#popcorn {
  display: inline-block;
  width: 134px;
  height: 120px;
  background-image: url('https://popper.js.org/images/popcorn-box.svg');
}

#tooltip {
  display: inline-block;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
}

#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}

</style>

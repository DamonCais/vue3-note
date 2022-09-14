<template>
  <div
    class="p-10px h-300px w-300px mt-500px"
    style="overflow: auto;"
  >
    <div id="reference" />
    <div id="floating">
      Tooltip
      <div id="arrow" />
    </div>
    <div class="h-1000px w-1000px pt-100px">
      <div
        class="bg-gray-400 border-red w-50px h-50px "
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
      <div
        id="arrow"
        ref="arrow"
      />
    </div>
  </div>
</template>

<script setup lang='tsx'>
import { computePosition, flip, hide, autoUpdate, offset, autoPlacement, arrow } from '@floating-ui/dom';
// const popcorn = $ref<HTMLElement|null>();
// const tooltip = $ref<HTMLElement|null>();
// const arrowEl = $ref<HTMLElement|null>();
onMounted(() => {
  const reference = document.getElementById('reference');
  const floating = document.getElementById('floating');
  const arrowEl = document.getElementById('arrow');

  const cleanup = autoUpdate(reference!, floating!, () => {
    computePosition(reference!, floating!, {
      strategy: 'fixed',
      placement: 'bottom',
      middleware: [flip(), hide(),
        offset(10), arrow({ element: arrowEl! })]

    }).then(({ x, y, middlewareData }) => {
      const { referenceHidden } = middlewareData.hide || {};
      const { x: arrowX } = middlewareData.arrow ?? {};
      console.log(x, y);
      Object.assign(arrowEl?.style ?? {}, {
        left: `${arrowX}px`,
        top: '-8px'
      });
      Object.assign(floating!.style, {
        left: `${x}px`,
        top: `${y}px`,
        visibility: referenceHidden ? 'hidden' : 'visible'
      });
    });
  });
});
</script>

<style>

#reference {
  width: 100px;
  height: 100px;
  border: 2px dashed black;
  margin: 50px;
}

#floating {
  position: fixed;
  background: gray;
  padding: 0.5rem;
  color: white;
  box-sizing: border-box;
}

#arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent gray transparent;
}

</style>

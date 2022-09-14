<template>
  <!-- <div>
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
  </div> -->
  <div />
  <span />
</template>

<script lang='ts'>
export default defineComponent({
  computed: {
    showTime () {
      return ((this as any).time / 1000).toFixed(3);
    }
  },
  data () {
    return {
      time: 0
    };
  }
});
</script>

<style>

</style>

import { Ref } from 'vue';

export const useTimer = function () {
  let time = $ref(0);
  let timer: number|null = null;
  const showTime = computed(() => {
    return (time / 1000).toFixed(3);
  });
  let startClickTime = 0;
  let runTime = 0;
  const start = () => {
    if (timer) return;
    startClickTime = new Date().getTime();
    runTime = time;
    timer = setInterval(() => {
      time = runTime + new Date().getTime() - startClickTime;
    }, 100);
  };
  const stop = () => {
    if (!timer) return;
    time = runTime + new Date().getTime() - startClickTime;
    clearInterval(timer!);
    timer = null;
  };
  return { showTime, start, stop };
};

export const useIntersectionObserver = function (target:Ref<Element|null>, callback:IntersectionObserverCallback) {
  let cleanup:Function|null = null;
  const options = {
    rootMargin: '0px',
    threshold: 0.1
  };
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup && cleanup();
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
    cleanup = () => {
      observer.disconnect();
      cleanup = null;
    };
  });
  const stopObserver = () => {
    cleanup && cleanup();
    stopWatch();
  };
  return { stopObserver };
};

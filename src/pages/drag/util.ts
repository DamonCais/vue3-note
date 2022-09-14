import { onMounted, onUnmounted, ref, watch, Ref, computed } from 'vue';
type HandleEvent = MouseEvent | TouchEvent

function getPosition (e: HandleEvent) {
  if ('touches' in e) {
    return [e.touches[0].pageX, e.touches[0].pageY];
  } else {
    return [e.pageX, e.pageY];
  }
}
export function getElSize (el: Element) {
  const style = window.getComputedStyle(el);
  return {
    width: parseFloat(style.getPropertyValue('width')),
    height: parseFloat(style.getPropertyValue('height'))
  };
}

export function initParent (containerRef: Ref<HTMLElement | undefined>) {
  const parentWidth = ref(0);
  const parentHeight = ref(0);
  onMounted(() => {
    if (containerRef.value && containerRef.value.parentElement) {
      const { width, height } = getElSize(containerRef.value.parentElement);
      parentWidth.value = width;
      parentHeight.value = height;
    }
  });
  return {
    parentWidth,
    parentHeight
  };
}

export function useState<T> (initialState: T): [Ref<T>, (value: T) => T] {
  const state = ref(initialState) as Ref<T>;
  const setState = (value: T): T => {
    state.value = value;
    return value;
  };
  return [state, setState];
}
export function initState (props: any, emit: any) {
  const [width, setWidth] = useState<number>(props.initW);
  const [height, setHeight] = useState<number>(props.initH);
  const [left, setLeft] = useState<number>(props.x);
  const [top, setTop] = useState<number>(props.y);
  const [enable, setEnable] = useState<boolean>(props.active);
  const [dragging, setDragging] = useState<boolean>(false);
  const [resizing, setResizing] = useState<boolean>(false);
  const [resizingHandle, setResizingHandle] = useState('');
  const [resizingMaxWidth, setResizingMaxWidth] = useState<number>(Infinity);
  const [resizingMaxHeight, setResizingMaxHeight] = useState<number>(Infinity);
  const [resizingMinWidth, setResizingMinWidth] = useState<number>(0);
  const [resizingMinHeight, setResizingMinHeight] = useState<number>(0);
  return {
    width,
    height,
    top,
    left,
    enable,
    dragging,
    resizing,
    resizingHandle,
    resizingMaxHeight,
    resizingMaxWidth,
    resizingMinWidth,
    resizingMinHeight,
    setEnable,
    setDragging,
    setResizing,
    setResizingHandle,
    setResizingMaxHeight,
    setResizingMaxWidth,
    setResizingMinWidth,
    setResizingMinHeight,
    setWidth: (val: number) => setWidth(Math.floor(val)),
    setHeight: (val: number) => setHeight(Math.floor(val)),
    setTop: (val: number) => setTop(Math.floor(val)),
    setLeft: (val: number) => setLeft(Math.floor(val))
  };
}

export function initLimitSizeAndMethods (
  parentSize: ReturnType<typeof initParent>,
  containerProps: ReturnType<typeof initState>
) {
  const {
    width,
    height,
    left,
    top,
    resizingMaxWidth,
    resizingMaxHeight,
    resizingMinWidth,
    resizingMinHeight
  } = containerProps;
  const { setWidth, setHeight, setTop, setLeft } = containerProps;
  const { parentWidth, parentHeight } = parentSize;
  const limitProps = {
    minWidth: computed(() => {
      return resizingMinWidth.value;
    }),
    minHeight: computed(() => {
      return resizingMinHeight.value;
    }),
    maxWidth: computed(() => {
      let max = Infinity;
      max = Math.min(parentWidth.value, resizingMaxWidth.value);
      return max;
    }),
    maxHeight: computed(() => {
      let max = Infinity;
      max = Math.min(parentHeight.value, resizingMaxHeight.value);
      return max;
    }),
    minLeft: computed(() => {
      return 0;
    }),
    minTop: computed(() => {
      return 0;
    }),
    maxLeft: computed(() => {
      return parentWidth.value - width.value;
    }),
    maxTop: computed(() => {
      return parentHeight.value - height.value;
    })
  };
  const limitMethods = {
    setWidth (val: number) {
      return setWidth(
        Math.min(
          limitProps.maxWidth.value,
          Math.max(limitProps.minWidth.value, val)
        )
      );
    },
    setHeight (val: number) {
      return setHeight(
        Math.min(
          limitProps.maxHeight.value,
          Math.max(limitProps.minHeight.value, val)
        )
      );
    },
    setTop (val: number) {
      return setTop(
        Math.min(
          limitProps.maxTop.value,
          Math.max(limitProps.minTop.value, val)
        )
      );
    },
    setLeft (val: number) {
      return setLeft(
        Math.min(
          limitProps.maxLeft.value,
          Math.max(limitProps.minLeft.value, val)
        )
      );
    }
  };
  return {
    ...limitProps,
    ...limitMethods
  };
}

export function initResizeHandle (
  containerProps:ReturnType<typeof initState>,
  limitProps:ReturnType<typeof initLimitSizeAndMethods>,
  parentSize: ReturnType<typeof initParent>
) {
  const { setWidth, setHeight, setLeft, setTop } = limitProps;
  const { width, height, left, top, resizingHandle } = containerProps;
  const {
    setResizing,
    setResizingHandle,
    setResizingMaxWidth,
    setResizingMaxHeight,
    setResizingMinWidth,
    setResizingMinHeight
  } = containerProps;
  const { parentWidth, parentHeight } = parentSize;
  let lstW = 0;
  let lstH = 0;
  let lstX = 0;
  let lstY = 0;
  let lstPageX = 0;
  let lstPageY = 0;
  const resizeHandleDrag = (e:HandleEvent) => {
    e.preventDefault();
    const [_pageX, _pageY] = getPosition(e);
    const deltaX = _pageX - lstPageX;
    const deltaY = _pageY - lstPageY;
    if (resizingHandle.value === 'ml') {
      if (lstW - deltaX > 0) {
        setWidth(lstW - deltaX);
        setLeft(lstX + deltaX);
      } else {
        setWidth(0);
        setLeft(lstX + lstW);
      }
    } else if (resizingHandle.value === 'mr') {
      setWidth(lstW + deltaX);
    }
  };
  const resizeHandleUp = () => {
    setResizingHandle('');
    document.documentElement.removeEventListener('mousemove', resizeHandleDrag);
    document.documentElement.removeEventListener('mouseup', resizeHandleUp);
  };
  const resizeHandleDown = (e:HandleEvent, handleType:string) => {
    console.log(e);
    e.stopPropagation();
    setResizingHandle(handleType);
    lstW = width.value;
    lstH = height.value;
    lstX = left.value;
    lstY = top.value;
    const lstPagePosition = getPosition(e);
    lstPageX = lstPagePosition[0];
    lstPageY = lstPagePosition[1];
    const maxWidth = handleType === 'ml' ? left.value + width.value : parentWidth.value - left.value;
    setResizingMaxWidth(maxWidth);
    document.documentElement.addEventListener('mousemove', resizeHandleDrag);
    document.documentElement.addEventListener('mouseup', resizeHandleUp);
  };
  return {
    resizeHandleDown
  };
}

export function useClickPosition () {
  const mousePositionRef = ref<{x:number, y:number}|null>(null);
  document.addEventListener('click', (e) => {
    console.log(e);
    mousePositionRef.value = {
      x: e.clientX,
      y: e.clientY
    };
  }, true);
  return mousePositionRef;
}

function getYearWeek (a, b, c) {
  const date1 = new Date(a, parseInt(b) - 1, c);
  const date2 = new Date(a, 0, 1);
  const diff = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((diff + (date2.getDay())) / 7);
}

export function getDaysByTimes (firstDay:Date, times:Number) {
  const days = [];
  const Day1 = 1000 * 60 * 60 * 24;
  for (let i = 0; i < times; i++) {
    const curDay = new Date(new Date(firstDay).getTime() + Day1 * i);
    const year = curDay.getFullYear();
    const month = curDay.getMonth() + 1;
    const date = curDay.getDate();
    const week = getYearWeek(year, month, date);
    const day = curDay.getDay();
    days.push({
      year, month, date, week, day
    });
  }

  return days;
}

export function groupBy (arr, key) {
  const map = arr.reduce((pre, acc) => {
    const val = acc[key];
    if (!pre.get(val)) {
      pre.set(val, 1);
    } else {
      pre.set(val, pre.get(val) + 1);
    }
    return pre;
  }, new Map());
  const res = [];
  for (const [key, value] of map) {
    res.push({ key, value });
  }
  let sum = 0;
  return res.sort((a, b) => a.key - b.key).reduce((pre, acc) => {
    sum += acc.value;
    pre.push({ key: acc.key, value: sum! });
    return pre;
  }, [] as any);
}

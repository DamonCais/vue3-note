<!-- <template>
  <span @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" class="nc-tooltip">
    <slot />
  </span>
</template> -->

<script>
import { getTooltip } from './util';
import { debounce } from 'lodash'
export default {
  mounted() {
    console.log(this.$el);
    this.$el.addEventListener('mouseenter',()=>{
      this.onMouseEnter()
    })
    this.$el.addEventListener('mouseleave',()=>{
      this.onMouseLeave()
    })
    this.tooltip = getTooltip();
    this.activateTooltip = debounce( tooltip =>{
       tooltip.handleShowPopper();
       tooltip.currentPlacement = '';
       tooltip.updatePopper();
    },50);
  },
  methods:{
    onMouseEnter(){
      const tooltip = this.tooltip;
      tooltip.referenceElm = this.$el;
      Object.assign(tooltip,{
        content:this.$el.innerText || this.$el.textContent,
        effect:'dark',
        placement:'bottom',
        ...this.$attrs
      });
      console.log({
        content:this.$el.innerText || this.$el.textContent,
        effect:'dark',
        placement:'bottom',
        ...this.$attrs
      })
      tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
      tooltip.doDestroy();
      tooltip.setExpectedState(true);
      this.activateTooltip(tooltip);
    },
    onMouseLeave(){
      const tooltip = this.tooltip;
      tooltip.setExpectedState(false);
      tooltip.handleClosePopper();
    },
    getFirstElement() {
      const slots = this.$slots.default;
      if (!Array.isArray(slots)) return null;
      let element = null;
      return slots[0];
    }
  },
  render(h){
    const firstElement = this.getFirstElement();
    return firstElement
  }
};
</script>

<style scoped>
.nc-tooltip{
  display: unset;
}
</style>

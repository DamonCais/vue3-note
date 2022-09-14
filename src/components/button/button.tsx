import { useNameSpace } from '@/hooks/useNamespace';
import { ExtractPropTypes, PropType } from 'vue';
import './button.scss';
type IButtonType =
| 'default'
| 'primary'
| 'info'
| 'success'
| 'warning'
| 'error'
const buttonType = {
  type: {
    type: String as PropType<IButtonType>,
    default: ''
  },
  disabled: Boolean,
  icon: String,
  loading: Boolean
};
type ButtonType = ExtractPropTypes<typeof buttonType>
export default defineComponent({
  name: 'NcButton',
  props: buttonType,
  emits: ['click'],
  setup (_props:ButtonType, { emit, slots }) {
    const ns = useNameSpace('button');
    const _type = $computed(() => _props.type || '');
    const className = $computed(() => {
      return {
        [ns.b()]: true,
        [ns.bs('vars')]: true,
        [ns.bm(_type)]: _type !== 'default'
      };
    });
    function handleClick (event: MouseEvent) {
      emit('click', event);
    }

    return () => h(
      'button', {
        class: className,
        onClick: handleClick,
        disabled: _props.disabled
      },
      [
        slots.default ? slots.default() : null
      ]
    );
  }

});

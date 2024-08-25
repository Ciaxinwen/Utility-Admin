<script lang="tsx">
  import { Tooltip } from 'ant-design-vue';
  import { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'EllipsisText',
    props: {
      line: { type: Number, default: 1 },
      text: { type: String, default: '' },
      style: {
        type: [Object, String] as PropType<CSSProperties | string>,
        default: () => ({
          maxWidth: '100%',
        }),
      },
    },
    emits: [],
    setup(props) {
      const ellipsisRef = ref<HTMLElement>();
      const visible = ref(false);

      const handleExpand = () => {
        if (!ellipsisRef.value) return;
        if (ellipsisRef.value.style.webkitLineClamp === 'unset') {
          ellipsisRef.value.style.webkitLineClamp = String(props.line);
        } else {
          ellipsisRef.value.style.webkitLineClamp = 'unset';
        }
        visible.value = false;
      };

      const handleMouseover = () => {
        if (ellipsisRef.value?.style.webkitLineClamp === 'unset') {
          visible.value = false;
          return;
        }
        visible.value = true;
      };

      return () => (
        <Tooltip open={visible.value} title={props.text} overlayClassName="ellipsis-tooltip">
          <div
            ref={ellipsisRef}
            class="ellipsis"
            style={props.style}
            onClick={handleExpand}
            onMouseover={handleMouseover}
            onMouseleave={() => (visible.value = false)}
          >
            {props.text}
          </div>
        </Tooltip>
      );
    },
  });
</script>

<style lang="scss">
  .ellipsis-tooltip {
    max-width: 50vw;
  }
</style>
<style lang="scss" scoped>
  .ellipsis {
    /* stylelint-disable-next-line value-no-vendor-prefix */
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: v-bind('line');
    overflow: hidden;
    cursor: text;
  }
</style>

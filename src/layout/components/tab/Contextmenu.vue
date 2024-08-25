<template>
  <a-dropdown v-bind="$attrs" :trigger overlayClassName="system-tab-dropdown">
    <slot />
    <template #overlay>
      <a-menu>
        <template v-for="item in actionMenu" :key="item.value">
          <a-menu-divider v-if="item.divided" />
          <a-menu-item
            :disabled="disabledActionItems.has(item.value)"
            @click="executeFuncs[item.value](target)"
          >
            <template #icon>
              <component :is="item.icon" style="margin-right: 6px; font-size: 12px" />
            </template>
            <div class="text-sm"> {{ $t(item.label) }} </div>
          </a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { TabActionKeys } from '@/enum/system';
  import { useTabNav } from '@/hook/web/useTabNav';
  import { PropType } from 'vue';

  defineProps({
    trigger: {
      type: Array as PropType<Array<'click' | 'hover' | 'contextmenu'>>,
      default: () => ['click'],
    },
    disabledActionItems: {
      type: Object as PropType<Set<TabActionKeys>>,
      default: () => new Set(),
    },
    target: {
      type: String,
      default: '',
    },
  });

  const { actionMenu, executeFuncs } = useTabNav();
</script>

<style lang="scss" scoped></style>

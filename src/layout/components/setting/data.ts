import { Layout } from '@/enum/system';
import { LeftModeItem, TopModeItem, MixModeItem } from './NavModeItem';
import { type Component } from 'vue';

export type ConfigurationsFileds = keyof Configurations;

export interface SwitchItemType {
  label: string;
  filed: ConfigurationsFileds;
  disabled?: boolean;
}

export const ThemeModeMap: Record<Layout, Component> = {
  [Layout.LEFT]: LeftModeItem,
  [Layout.TOP]: TopModeItem,
  [Layout.MIX]: MixModeItem,
};

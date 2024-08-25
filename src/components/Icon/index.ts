import { withInstall } from '@/utils/withInstall';
import _SvgIcon from './src/SvgIcon.vue';
import _IconPicker from './src/IconPicker.vue';

const SvgIcon = withInstall(_SvgIcon);
const IconPicker = withInstall(_IconPicker);

export { SvgIcon, IconPicker };

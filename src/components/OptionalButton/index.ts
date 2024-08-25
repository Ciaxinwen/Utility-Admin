import { withInstall } from '@/utils/withInstall';
import _OptionalButton from './src/OptionalButton.vue';
import _OptionalButtonGroup, { type OptionsItem } from './src/OptionalButtonGroup.vue';

const OptionalButton = withInstall(_OptionalButton);
const OptionalButtonGroup = withInstall(_OptionalButtonGroup);

export { OptionalButton, OptionalButtonGroup, OptionsItem };

import { withInstall } from '@/utils/withInstall';
import _PageHeader from './src/PageHeader.vue';
import _PageWrapper from './src/PageWrapper.vue';

const PageHeader = withInstall(_PageHeader);
const PageWrapper = withInstall(_PageWrapper);

export { PageHeader, PageWrapper };

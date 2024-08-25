import { withInstall } from '@/utils/withInstall';
import _BasicResizer from './src/BasicResizer.vue';
import _UploadResizerModal from './src/UploadResizerModal.vue';

const BasicResizer = withInstall(_BasicResizer);
const UploadResizerModal = withInstall(_UploadResizerModal);

export { BasicResizer, UploadResizerModal };

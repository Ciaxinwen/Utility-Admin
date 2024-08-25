import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

//全局进度条的配置
Nprogress.configure({
  easing: 'ease',
  speed: 800,
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.3,
});

export const startProgress = () => {
  Nprogress.start();
};

export const closeProgress = () => {
  Nprogress.done();
};

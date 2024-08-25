import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from 'echarts/components';
import {
  LineChart,
  PieChart,
  RadarChart,
  BarChart,
  ScatterChart,
  GaugeChart,
  SunburstChart,
  MapChart,
  EffectScatterChart,
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import * as ChinaMap from './china.json';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  CanvasRenderer,
  UniversalTransition,
  LineChart,
  PieChart,
  RadarChart,
  BarChart,
  ScatterChart,
  GaugeChart,
  SunburstChart,
  MapChart,
  EffectScatterChart,
]);

echarts.registerMap('china', ChinaMap as any);

export default echarts;

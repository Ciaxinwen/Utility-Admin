<template>
  <PageWrapper
    title="文本溢出省略"
    subTitle="文本溢出显示省略号，添加tooltip，点击展开/收缩"
    defaultBgColor
  >
    <EllipsisText style="max-width: 500px; line-height: 24px" :line="3" :text="text" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { EllipsisText } from '@/components/EllipsisText';

  const text = ref(
    `夜，如墨般滴在天空的画布上，渗透、晕开，用画笔轻点几下，便有了星辰，再描上几下，柔和的月光将射进你的心房。
  萤火虫的光足以媲美点点繁星，却要温暖几分。蟋蟀拿出小提琴，与微风合作，演奏出一曲优美的圆舞曲。
  溪水缓缓地流着，像时间的输送带，一点点流逝。花朵就算在夜晚也会散发芳香，池里的鱼儿吐着泡泡，泡泡里是一帘又一帘的美梦。
  天边下起了雨，一颗又一颗，明亮至极，美丽且悲伤，仿佛那就是天空的眼泪。
  蝈蝈在歌唱，这是花开的声音；月的皎洁光芒，是花的柔瓣；闪亮的星辰，是花的丽蕊，这是一朵墨色的夜花。
  轻轻拉上窗帘，是怕惊扰那份宁静；轻轻地躺下，是怕吵醒那些熟睡的星星；轻轻地盖上被子，是怕打破那甜美的乡下秋梦。`,
  );
</script>

<style lang="scss" scoped></style>

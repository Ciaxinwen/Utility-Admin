<template>
  <div class="flex gap-3">
    <a-card flex-1 title="访问数" shadow-sm :loading size="small">
      <template #extra>
        <a-tag color="green">日</a-tag>
      </template>
      <div class="flex items-center justify-between px-2">
        <div class="text-7">
          <NumberAnimate :count="28000" />
          <div class="text-4.5 color-emerald mt-1">+88%</div>
        </div>
        <SvgIcon name="sensitometry" :size="40" />
      </div>
    </a-card>
    <a-card flex-1 title="成交额" shadow-sm :loading size="small">
      <template #extra>
        <a-tag color="cyan">月</a-tag>
      </template>
      <div class="flex items-center justify-between px-2">
        <div class="text-7">
          $<NumberAnimate :count="28888" />
          <div class="text-4.5 color-emerald mt-1">+88%</div>
        </div>
        <SvgIcon name="fixtureSum" :size="40" />
      </div>
    </a-card>
    <a-card flex-1 title="下载数" shadow-sm :loading size="small">
      <template #extra>
        <a-tag color="blue">季</a-tag>
      </template>
      <div class="flex items-center justify-between px-2">
        <div class="text-7">
          <NumberAnimate :count="9999" />+
          <div class="text-4.5 color-emerald mt-1">+88%</div>
        </div>
        <SvgIcon name="download" :size="40" />
      </div>
    </a-card>
    <a-card flex-1 title="成交数" shadow-sm :loading size="small">
      <template #extra>
        <a-tag color="purple">年</a-tag>
      </template>
      <div class="flex items-center justify-between px-2">
        <div class="text-7">
          <NumberAnimate :count="1000" />+
          <div class="text-4.5 color-emerald mt-1">+88%</div>
        </div>
        <SvgIcon name="fixtureNum" :size="40" />
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
</script>

<style lang="scss" scoped></style>

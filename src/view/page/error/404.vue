<template>
  <a-result class="w-full" status="404" title="404" :sub-title="$t('common.pageWith404.subTitle')">
    <template #extra>
      <a-button type="link" @click="router.back()">
        <template #icon>
          <ArrowLeftOutlined />
        </template>
        {{ $t('common.back') }}
      </a-button>
      <a-button type="primary" @click="router.push('/')">
        <template #icon>
          <HomeOutlined />
        </template>
        {{ $t('common.pageWith404.backHome') }}
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<style lang="scss" scoped></style>

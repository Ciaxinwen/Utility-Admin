<template>
  <a-result class="w-full" status="403" title="403" :sub-title="$t('common.pageWith403.subTitle')">
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
        {{ $t('common.pageWith403.backHome') }}
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<style lang="scss" scoped></style>

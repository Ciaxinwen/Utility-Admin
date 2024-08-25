<template>
  <div></div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'redirect',
});

const router = useRouter();
const route = useRoute();

router.replace({ path: `/${route.params.path}`, query: route.query });
</script>

<style lang="less" scoped></style>

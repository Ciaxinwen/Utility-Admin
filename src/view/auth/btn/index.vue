<template>
  <PageWrapper
    title="按钮权限示例"
    sub-title="组件、函数、指令三种方式可选"
    contentClass="flex flex-col gap-3"
    dense
  >
    <div>
      <span class="pl-2">切换用户：</span>
      <UserSelector @change="router.go(0)" />
    </div>
    <a-card title="函数方式">
      <a-button type="primary" v-if="hasPermission('btn:auth_add')">
        拥有“btn:auth_add”权限可见
      </a-button>
      <a-button type="primary" ghost v-if="hasPermission(['btn:auth_add', 'btn:auth_edit'])">
        拥有['btn:auth_add', 'btn:auth_edit']权限可见
      </a-button>
      <a-button
        type="primary"
        danger
        v-if="hasPermission(['btn:auth_add', 'btn:auth_edit', 'btn:auth_delete'])"
      >
        拥有['btn:auth_add', 'btn:auth_edit', 'btn:auth_delete']权限可见
      </a-button>
    </a-card>
    <a-card title="组件方式">
      <Auth code="btn:auth_add">
        <a-button type="primary"> 拥有“btn:auth_add”权限可见 </a-button>
      </Auth>
      <Auth :code="['btn:auth_add', 'btn:auth_edit']">
        <a-button type="primary" ghost> 拥有['btn:auth_add', 'btn:auth_edit']权限可见 </a-button>
      </Auth>
      <Auth :code="['btn:auth_add', 'btn:auth_edit', 'btn:auth_delete']">
        <a-button type="primary" danger>
          拥有['btn:auth_add', 'btn:auth_edit', 'btn:auth_delete']权限可见
        </a-button>
      </Auth>
    </a-card>
    <a-card title="指令方式">
      <a-button type="primary" v-auth="'btn:auth_add'"> 拥有“btn:auth_add”权限可见 </a-button>
      <a-button type="primary" ghost v-auth="['btn:auth_add', 'btn:auth_edit']">
        拥有['btn:auth_add', 'btn:auth_edit']权限可见
      </a-button>
      <a-button type="primary" danger v-auth="['btn:auth_add', 'btn:auth_edit', 'btn:auth_delete']">
        拥有['btn:auth_add', 'btn:auth_edit', 'btn:auth_delete']权限可见
      </a-button>
    </a-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { usePermission } from '@/hook/web/usePermission';
  import UserSelector from '../components/UserSelector.vue';

  const { hasPermission } = usePermission();
  const router = useRouter();
</script>

<style lang="scss" scoped></style>

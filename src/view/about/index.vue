<template>
  <PageWrapper
    title="关于"
    sub-title="utility-admin 是一个基于Vue5.0、Vite、 Ant-Design-Vue、UnoCss 、TypeScript 的后台解决方案，目标是为中大型项目开发，
      提供现成的开箱解决方案及丰富的示例， 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。"
    dense
  >
    <a-card title="项目信息" shadow-sm>
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="版本">
          <a-tag color="blue">{{ pkgJson.version }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="最后编译时间">
          <a-tag color="blue">{{ BuildTime }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="文档地址">
          <a href="javaScript:;">github文档地址</a>
        </a-descriptions-item>
        <a-descriptions-item label="预览地址">
          <a href="javaScript:;">预览地址</a>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card class="mt-3" title="生产依赖" shadow-sm>
      <a-descriptions bordered :column="2">
        <a-descriptions-item
          v-for="item in pkgJson.dependencies"
          :key="item.name"
          :label="item.name"
        >
          {{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card class="mt-3" title="开发依赖" shadow-sm>
      <a-descriptions bordered :column="2">
        <a-descriptions-item
          v-for="item in pkgJson.devDependencies"
          :key="item.name"
          :label="item.name"
        >
          {{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import pkg from '~/package.json';

  interface PkgJson {
    name: string;
    version: string;
    dependencies: PkgVersionInfo[];
    devDependencies: PkgVersionInfo[];
  }

  interface PkgVersionInfo {
    name: string;
    version: string;
  }

  const { name, version, dependencies, devDependencies } = pkg;

  const transformVersionData = (entry: [string, string]): PkgVersionInfo => {
    const [name, version] = entry;
    return {
      name,
      version,
    };
  };

  const pkgJson: PkgJson = {
    name,
    version,
    dependencies: Object.entries(dependencies).map((item) => transformVersionData(item)),
    devDependencies: Object.entries(devDependencies).map((item) => transformVersionData(item)),
  };
  const BuildTime = __APP_BUILD_TIME__;
</script>

<style lang="scss" scoped></style>

<template>
  <PageWrapper title="打印" subTitle="使用print-js" defaultBgColor>
    <a-button class="mr-3" type="primary" @click="printWithJson">打印JSON</a-button>
    <a-button type="primary" @click="printWithImg">打印图片</a-button>

    <div id="print-form" mt-5>
      <h3>Print</h3>
    </div>
    <a-button type="primary" @click="printWithHTML">打印HTML</a-button>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import PrintJS from 'print-js';

  const someJSONdata = [
    {
      name: '中国电信',
      email: 'zgdx@10000.com',
      phone: '10000',
    },
    {
      name: '中国移动',
      email: 'zgyd@10086.com',
      phone: '10086',
    },
    {
      name: '中国联通',
      email: 'zglt@10010.com',
      phone: '10010',
    },
  ];

  const printWithJson = () => {
    PrintJS({
      printable: someJSONdata,
      properties: [
        { field: 'name', displayName: '运营商' },
        { field: 'email', displayName: '邮箱' },
        { field: 'phone', displayName: '官方电话' },
      ],
      type: 'json',
    });
  };

  const printWithImg = () => {
    PrintJS({
      printable: [
        'https://printjs.crabbly.com/images/print-01.jpg',
        'https://printjs.crabbly.com/images/print-04.jpg',
      ],
      type: 'image',
    });
  };

  const printWithHTML = () => {
    PrintJS({
      printable: 'print-form',
      type: 'html',
      header: '打印HTML',
    });
  };
</script>

<style lang="scss" scoped></style>

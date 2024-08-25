<template>
  <a-popover
    trigger="click"
    :arrow="false"
    :overlayStyle="{ width: '400px' }"
    :overlayInnerStyle="{ paddingTop: 'unset' }"
    overlayClassName="notice-popover"
  >
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" :tab="`通知${notices.length ? `（${notices.length}）` : ''}`">
          <a-list item-layout="horizontal" :data-source="notices">
            <template #renderItem="{ item }">
              <a-list-item
                :class="[item.isRead && 'opacity-30 line-through']"
                @click="item.isRead = true"
              >
                <a-list-item-meta :description="item.content">
                  <template #title>
                    <div class="flex items-center justify-between">
                      <div>
                        <span>{{ item.title }}</span>
                        <a-tag class="ml-2" :color="item.significance">{{ item.tag }}</a-tag>
                      </div>
                      <span class="text-coolgray text-12px">{{ item.date }}</span>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          :tab="`消息${messages.length ? `（${messages.length}）` : ''}`"
          force-render
        >
          <a-list item-layout="horizontal" :data-source="messages">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :description="item.content">
                  <template #title>
                    <div class="flex items-center justify-between">
                      <div>
                        <strong>{{ item.user }}</strong>
                        &nbsp;的{{ item.type }}
                      </div>
                      <span class="text-coolgray text-12px">{{ item.dateStr }}</span>
                    </div>
                  </template>
                  <template #avatar>
                    <a-avatar class="bg-#5473e8">{{ item.avatar }} </a-avatar>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="`代办${backlogs.length ? `（${backlogs.length}）` : ''}`">
          <a-list item-layout="horizontal" :data-source="backlogs">
            <template #renderItem="{ item }">
              <a-list-item
                :class="[item.isRead && 'opacity-30 line-through']"
                @click="item.isRead = true"
              >
                <a-list-item-meta :description="item.content">
                  <template #title>
                    <div class="flex items-center justify-between">
                      <strong>{{ item.title }}</strong>
                      <a-tag>{{ item.status }}</a-tag>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </template>
    <slot />
  </a-popover>
</template>

<script lang="ts" setup>
  const activeKey = ref('1');

  const notices = ref([
    {
      title: '续费通知',
      content: '您的产品使用期限即将截止，如需继续使用产品请前往购买',
      date: '2022-01-01',
      tag: '三天后到期',
      significance: 'red',
      isRead: false,
    },
    {
      title: '开通成功',
      content: '您自动续费会员服务开通成功，请移步会员中心查看详情',
      date: '2024-01-01',
      tag: '有效期一个月',
      significance: 'orange',
      isRead: false,
    },
  ]);

  const messages = ref([
    {
      avatar: 'W',
      user: '隔壁老王',
      type: '回复',
      content: '我昨晚在你家',
      dateStr: '今天 12:30',
    },
    {
      avatar: 'K',
      user: 'ikun',
      type: '私信',
      content: '一起唱跳、rap、打篮球~',
      dateStr: '昨天 16:30',
    },
    {
      avatar: 'H',
      user: '小红',
      type: '回复',
      content: '收到！李总，晚上不醉不归！',
      dateStr: '今天 13:30',
    },
  ]);

  const backlogs = ref([
    {
      title: 'Bug制造',
      content: '在公司的项目中，写几个bug，或者写只有自己看得懂的代码',
      status: '未开始',
      isRead: false,
    },
  ]);
</script>

<style lang="scss">
  .notice-popover {
    .ant-tabs {
      &-nav {
        margin-bottom: unset;
      }
    }
  }

  .ant-list .ant-list-item {
    padding: 12px;
    cursor: pointer;
  }
</style>

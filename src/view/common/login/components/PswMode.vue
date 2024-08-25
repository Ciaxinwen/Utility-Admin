<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item name="username">
      <a-input
        v-model:value="formState.username"
        size="large"
        :placeholder="$t('login.placeholder.username')"
      />
    </a-form-item>

    <a-form-item name="password">
      <a-input-password
        v-model:value="formState.password"
        size="large"
        :placeholder="$t('login.placeholder.psw')"
      />
    </a-form-item>

    <a-form-item>
      <div class="w-full flex justify-between items-center">
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        <a-button type="link" @click="emits('reset-password')">
          {{ $t('login.forgetPsw') }}
        </a-button>
      </div>
    </a-form-item>

    <a-form-item>
      <a-button class="w-full" size="large" type="primary" :loading @click="handleLogin">
        {{ $t('login.login') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { Rule } from 'ant-design-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import { login } from '@/api/common';
  import { useUserStore } from '@/store/module/user';
  import { storeToRefs } from 'pinia';

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }

  const emits = defineEmits(['reset-password']);

  const router = useRouter();
  const { t } = useI18n();

  const userStore = useUserStore();
  const { token } = storeToRefs(userStore);
  const loading = ref(false);

  const formRef = ref();
  const formState = reactive<FormState>({
    username: 'utility',
    password: '123456',
    remember: true,
  });
  const rules: Record<string, Rule[]> = {
    username: [{ required: true, message: t('login.vaildMsg.username') }],
    password: [{ required: true, message: t('login.vaildMsg.psw') }],
  };

  const loginFn = async (params: FormState) => {
    const res = await login(params);
    token.value = res.data.token;
    router.push('/');
  };

  const handleLogin = async () => {
    loading.value = true;
    try {
      const valid = await formRef.value.validate();
      loginFn(valid);
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  };

  defineExpose({
    login: loginFn,
  });
</script>

<style lang="scss" scoped></style>

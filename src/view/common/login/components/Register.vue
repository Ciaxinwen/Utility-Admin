<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item name="phone">
      <a-input
        v-model:value="formState.phone"
        size="large"
        :placeholder="$t('login.placeholder.phone')"
      />
    </a-form-item>

    <a-form-item name="code">
      <div class="flex items-center justify-between gap-4">
        <a-input
          v-model:value="formState.code"
          size="large"
          :placeholder="$t('login.placeholder.code')"
        />
        <a-button size="large" :disabled="disabled" @click="getCode">{{ text }}</a-button>
      </div>
    </a-form-item>

    <a-form-item name="password">
      <a-input-password
        v-model:value="formState.password"
        size="large"
        :placeholder="$t('login.placeholder.psw')"
      />
    </a-form-item>

    <a-form-item name="confirmPsw">
      <a-input-password
        v-model:value="formState.confirmPsw"
        size="large"
        :placeholder="$t('login.placeholder.confirmPsw')"
      />
    </a-form-item>

    <a-form-item>
      <a-button class="w-full" size="large" type="primary" @click="handleLogin">
        {{ $t('login.login') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { Rule } from 'ant-design-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import { useMessageAuthCode } from '@/hook/web/useMessageAuthCode';

  interface FormState {
    phone: string;
    code: string;
    password: string;
    confirmPsw: string;
  }

  const { t } = useI18n();

  const { text, disabled, getCode } = useMessageAuthCode();

  const formRef = ref();
  const formState = reactive<FormState>({
    phone: '',
    code: '',
    password: '',
    confirmPsw: '',
  });
  const rules: Record<string, Rule[]> = {
    phone: [{ required: true, message: t('login.vaildMsg.phone') }],
    code: [{ required: true, message: t('login.vaildMsg.code') }],
    password: [{ required: true, message: t('login.vaildMsg.psw') }],
    confirmPsw: [{ required: true, message: t('login.vaildMsg.confirmPsw') }],
  };

  const handleLogin = async () => {
    try {
      const valid = await formRef.value.validate();
      console.log(valid);
    } catch (error) {
      console.warn(error);
    }
  };
</script>

<style lang="scss" scoped></style>

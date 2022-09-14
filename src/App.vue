<template>
  <el-config-provider :locale="language">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import localeZh from 'element-plus/lib/locale/lang/zh-cn';
import localeEn from 'element-plus/lib/locale/lang/en';
const { t, locale } = useI18n();
const language = computed(() => {
  return locale.value === 'en' ? localeEn : localeZh;
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  place-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0;
  overflow: hidden;
}
</style>

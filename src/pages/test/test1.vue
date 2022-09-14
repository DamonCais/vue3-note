<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { useTestStore } from '@/store/modules/test';
import { storeToRefs } from 'pinia';
const { t, locale } = useI18n();

const user = useTestStore();
const name = $ref(user.savedName);
const name0 = user.savedName;
const name2 = toRef(user, 'savedName');
let count = $ref(0);
const userStore = useUserStore();
const refUser = storeToRefs(userStore);

const { avatar } = storeToRefs(userStore);
const avatar2 = refUser.getAvatar;
const router = useRouter();
const setAvatar = () => {
  console.log(name, name0, user.savedName);
  console.log(count);
  userStore.setAvatar('bcd');
  user.setNewName('defgg');
  console.log(name2, user);
  locale.value = locale.value === 'en' ? 'zh' : 'en';
  count++;
  router.push('/admin/test1');
};
</script>

<template>
  <div>
    {{ $t('hello') }}
    {{ count }} - {{ avatar }} -{{ avatar2 }} -{{ user.savedName }}-{{ name }} -{{ name2 }}
    <div>
      <button @click="setAvatar">
        test {{ $t('header_menu.login') }}
      </button>
    </div>
  </div>
</template>

<style>

</style>

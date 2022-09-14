<template>
  <el-container class="h-100vh">
    <el-aside style="width:180px;">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
        <subMenu />
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
        <!-- <router-view v-slot="{Component}">
          <keep-alive>
            <component
              :is="Component"
              :key="$route.path"
            />
          </keep-alive>
        </router-view> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='tsx'>
import { routes } from '@/router';
import { RouteRecordRaw } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeIndex = route.name;
console.log(activeIndex);
const handleSelect = (key: string) => {
  console.log(key);
  router.push({
    name: key
  });
};
const subMenus = (r: RouteRecordRaw, index: number) => {
  if (r.children?.length) {
    return <el-sub-menu index={r.path}
      v-slots={{
        title: () => <span>{r?.meta?.title}</span>
      }}
    >
      {
        r.children.map((itm: RouteRecordRaw, index) => subMenus(itm, index))
      }
    </el-sub-menu>;
  } else {
    return (
      <el-menu-item index={r.name}>
        {r?.meta?.title}
      </el-menu-item>
    );
  }
};
const subMenu = () => {
  return routes.map((r, index) => {
    return subMenus(r, index);
  });
};
</script>

<style>
.el-menu-demo {
  height: 100%;
}
</style>

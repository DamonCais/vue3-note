import { defineStore } from 'pinia';
import { store } from '@/store';
export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: '',
    username: '',
    welcome: '',
    avatar: 'abc',
    permissions: [],
    info: ''
  }),
  getters: {
    getToken (): string {
      return this.token;
    },
    getAvatar (): string {
      return 'hello' + this.avatar;
    },
    getNickname (): string {
      return this.username;
    },
    getPermissions (): [any][] {
      return this.permissions;
    },
    getUserInfo (): object {
      return this.info;
    }
  },
  actions: {
    setToken (token: string) {
      this.token = token;
    },
    setAvatar (avatar: string) {
      this.avatar = avatar;
    },
    setPermissions (permissions:[any][]) {
      this.permissions = permissions;
    },
    setUserInfo (info: object) {
      this.info = info;
    },

    // 获取用户信息
    GetInfo () {

    },

    // 登出
    async logout () {

    }
  }
});

// Need to be used outside the setup
export function useUserStoreWidthOut () {
  return useUserStore(store);
}

import request from '@/utils/request';

export const getMsg = () => {
  return request<any>({
    method: 'POST',
    url: '/getChatInGroup'
  });
};

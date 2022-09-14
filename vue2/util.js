export const loading = function(loadingKey,  ) {
    return function(target, name, descriptor) {
        console.log(loadingKey);
      const fn = descriptor.value; // 这个是原来的方法，这里做一次保存
      // 扩展原来的方法
      descriptor.value = async function(...rest) { // 这里要使用function才能保证this的指向正确
        this[loadingKey] = true; // 最后无论如何 取消loading          this[loadingKey] = true; // 将loading设置为true
          return await fn.call(this, ...rest).finally(()=>{
            this[loadingKey] = false; // 最后无论如何 取消loading
          }); // 执行原来的方法
 
      };
    };
  };
 

import {Tooltip} from 'element-ui';
import Vue from "vue";
let instance = null;
export function getTooltip(){
  if(!instance){
    const TooltipConstruct = Vue.extend(Tooltip);
    instance = new TooltipConstruct({
    }).$mount();
    document.body.appendChild(instance.$el);
  }
  return instance;
}
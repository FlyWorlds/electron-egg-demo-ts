<template>
  <div id="app-os-window">
    <div class="one-block-1">
      <span>
        1. 新窗口中加载web内容
      </span>
    </div>  
    <div class="one-block-2">
      <a-space>
        <a-button @click="createWindow(0)">打开哔哩哔哩</a-button>
      </a-space>
    </div>
    <div class="one-block-1">
      <span>
        2. 新窗口中加载html内容
      </span>
    </div>  
    <div class="one-block-2">
      <a-space>
        <a-button @click="createWindow(1)">打开html页面</a-button>
      </a-space>
    </div>
    <div class="one-block-1">
      <span>
        3. 新窗口中加载当前项目页面
      </span>
    </div>  
    <div class="one-block-2">
      <a-space>
        <a-button @click="createWindow(2)">打开vue页面</a-button>
      </a-space>
    </div>    
  </div>
</template>
<script setup lang="ts">
import { ipcApiRoute } from '@/api';
import { ipc } from '@/utils/ipcRenderer';

const views = [
  {
    type: 'web',
    content: 'https://www.bilibili.com/',
    windowName: 'window-web',
    windowTitle: 'bilibili'
  },
  {
    type: 'html',
    content: '/public/html/view_example.html',
    windowName: 'window-html',
    windowTitle: 'html window'
  },
  {
    type: 'vue',
    content: '#/special/subwindow',
    windowName: 'window-vue',
    windowTitle: 'vue window'
  }, 
];

function createWindow(index: number) {
  ipc.invoke(ipcApiRoute.os.createWindow, views[index])
}
</script>
<style lang="less" scoped>
#app-os-window {
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }
  .one-block-2 {
    padding-top: 10px;
  }
}
</style>

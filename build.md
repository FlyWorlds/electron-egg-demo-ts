
# 打包 （windows版）
npm run build-w
npm run build-w-32 (32位系统)
# 打包 （mac版）
npm run build-m
npm run build-m-arm64 (m1芯片架构)
npm run build-m-arm64-32 (m1芯片架构32位系统)
# 打包 （go版）
npm run build-go-w
npm run build-go-w-32 (32位系统)
# 打包 （python版）
npm run build-python
npm run build-python-32 (32位系统)
# 启动
npm run start



# 程序
目录：electron-egg/out
Windows安装包：out/electron-egg-windows-2.0.3.exe  
Windows免安装包：out/ee-win-3.0.1-ia32.7z
Mac软件包：out/xxxx.dmg
Linux软件包：out/xxx.deb 


# 临时禁用代码签名（可选）
```
如果你只是构建 Windows .exe，暂时不打算签名，可以在 builder.json 或相应配置中设置：

```json
"win": {
  "sign": false
}

以管理员身份运行终端，执行以下命令：
```
npm run build-w-32
```





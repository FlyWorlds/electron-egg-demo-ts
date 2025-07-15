/**
 * ee-bin 配置
 * 仅适用于开发环境
 */
module.exports = {
  /**
   * 命令：ee-bin dev
   * 
   * 开发模式服务配置
   */
  dev: {
    // frontend：前端服务
    // 说明：该配置的意思是，进入 frontend 目录，执行 npm run dev
    // 运行后的服务为 http://localhost:8080 
    // 如果 protocol 属性为 'file://' 那么不会执行命令，项目直接加载 indexPath 对应的文件。
    frontend: {
      directory: './frontend', // frontend 目录
      cmd: 'npm',              // 命令
      args: ['run', 'dev'],    // 参数
      protocol: 'http://',     // 协议：'http://' 'file://'
      hostname: 'localhost',   // hostname
      port: 8080,              // port
      indexPath: 'index.html',  // 'file://'协议时有效，入口文件
      force: false,          // 强制加载前端服务
      sync: false,            // (非常住进程才能使用) 是否串行执行命令
    },
    // electron：主进程服务
    // 说明：该配置的意思是，在根目录，执行 electron . --env=local
    electron: {
      directory: './',
      cmd: 'electron',
      args: ['.', '--env=local'], // --env: local|prod; '--color=always' 控制台颜色
      // 是否监听文件变化，如果监听，那么每次文件变化都会重新执行命令
      watch: true,     
      delay: 0,                // 延迟启动时间，单位：毫秒          
      loadingPage: '/public/html/loading.html', // 如果前端启动时间过长，可先加载一个loading页
      sync: false,            // (非常住进程才能使用) 是否串行执行命令
    }
  },

  /**
   * 构建
   * 命令：ee-bin build
   * 说明：用来构建可执行程序、前端、主进程、go、或者自定义命令
   * 
   * 可执行程序
   * 举例：ee-bin build --cmds=win64      构建exe
   * 
   * 前端
   * 举例：ee-bin build --cmds=frontend (构建 前端 dist资源)
   * 
   * 主进程 ./electron
   * 举例：ee-bin build --cmds=electron (构建 主进程./electron目录代码)
   * 
   * 自定义
   * 举例：ee-bin build --cmds=go_w (构建 go windows平台程序)
   * 举例：ee-bin build --cmds=go_m (构建 go macos平台程序)
   * 举例：ee-bin build --cmds=go_l (构建 go linux平台程序)
   */
  build: {
    // 构建 前端代码，根据实际 frontend 项目配置
    frontend: {
      directory: './frontend',
      cmd: 'npm',
      args: ['run', 'build'],
    },
    // 构建 主进程代码 ./electron
    electron: {
      // javascript | typescript
      type: 'javascript',
      // 打包器 esbuild
      bundler: 'esbuild',
      // js 模式选择copy模块，便于调试；
      // ts 模式只能选择bundle，因为主进程加载的是构建后的 js 代码
      bundleType: 'bundle', // copy | bundle
      // esbuild 配置，不要改动
      javascript: {
        entryPoints: ['./electron/**/*.js'],
        platform: 'node',
        bundle: false,
        minify: true,
        outdir: 'public/electron',
        packages: 'external',
        sourcemap:false,
        sourcesContent: false
      },
      typescript: {
        entryPoints: ['./electron/**/*.ts'],
        tsconfig: './tsconfig.json',
        platform: 'node',
        format: 'cjs',
        bundle: false,
        minify: true,
        outdir: 'public/electron',
        packages: 'external',
        sourcemap:false,
        sourcesContent: false
      }
    },
    // 可执行程序，可以根据 electron-builder 官方自行扩展
    // 构建32位exe
    win32: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder.json', '-w=nsis', '--ia32'],
    },
    // 构建64位exe
    win64: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder.json', '-w=nsis', '--x64'],
    },
    // 构建便携包
    win_e: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder.json', '-w=portable', '--x64'],
    },
    // 构建压缩包
    win_7z: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder.json', '-w=7z', '--x64'],
    },
    // 构建macOS inter芯片 dmg
    mac: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder-mac.json', '-m'],
    },
    // 构建macOS M芯片 dmg
    mac_arm64: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder-mac-arm64.json', '-m', '--arm64'],
    },
    // 构建 exe
    linux: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder-linux.json', '-l=deb', '--x64'],
    },
    // 构建 exe
    linux_arm64: {
      cmd: 'electron-builder',
      directory: './',
      args: ['--config=./cmd/builder-linux.json', '-l=deb', '--arm64'],
    },    
    //（可选）go
    go_w: {
      directory: './go',
      cmd: 'go',
      args: ['build', '-o=../build/extraResources/goapp.exe'],
    },
    go_m: {
      directory: './go',
      cmd: 'go',
      args: ['build', '-o=../build/extraResources/goapp'],
    },
    go_l: {
      directory: './go',
      cmd: 'go',
      args: ['build', '-o=../build/extraResources/goapp'],
    },
    // (可选）python
    python: {
      directory: './python',
      cmd: 'python',
      args: ['./setup.py', 'build'],
    },
  },

  /**
   * 移动资源
   * 
   * 命令：ee-bin move
   * 说明：移动前端、go、配置等静态资源到指定目录，供生产环境使用。支持文件、目录。
   * 
   * 举例1：ee-bin move --flag=frontend_dist (移动 前端 dist资源)
   * 举例2：ee-bin move --flag=go_static,go_config,go_package,go_images (移动 go 资源)
   */
  move: {
    frontend_dist: {
      src: './frontend/dist',
      dest: './public/dist'
    },
    go_static: {
      src: './frontend/dist',
      dest: './go/public/dist'
    },
    go_config: {
      src: './go/config',
      dest: './go/public/config'
    },
    go_package: {
      src: './package.json',
      dest: './go/public/package.json'
    },
    go_images: {
      src: './public/images',
      dest: './go/public/images'
    },
    python_dist: {
      src: './python/dist',
      dest: './build/extraResources/py'
    },
  },

  /**
   * 预发布模式（prod）
   * 命令：ee-bin start
   * 说明：该配置的意思是，在根目录，执行 electron . --env=prod
   */
  start: {
    directory: './',
    cmd: 'electron',
    args: ['.', '--env=prod']
  },

  /**
   * 加密
   * 命令：ee-bin encrypt
   * 说明：多种加密功能，支持对主进程和 前端代码的加密，保护您的源码安全。
   */  
  encrypt: {
    frontend: {
      // 支持: none - 不加密, confusion - 压缩混淆加密
      type: 'none',
      // 文件匹配
      // ! 符号开头的意思是过滤
      files: [
        './public/dist/**/*.(js|json)',
      ],
      // 需要加密的文件后缀，只支持js
      fileExt: ['.js'],
      // 混淆加密配置
      confusionOptions: {
        // 压缩成一行
        compact: true, 
        // 删除字符串文字并将其放置在一个特殊数组中     
        stringArray: true,
        // 对stringArray的所有字符串文字进行编码，值：'none' | 'base64' | 'rc4'
        stringArrayEncoding: ['none'],
        // 注入死代码，注：影响性能
        deadCodeInjection: false, 
        // 死代码比例
        deadCodeInjectionThreshold: 0.1,  
        // 调用的所有参数都可以提取到不同的对象中
        stringArrayCallsTransform: true,
        // 数字转表达式
        numbersToExpressions: true,
        target: 'browser',
      }
    },
    electron: {
      // none - 不加密
      // confusion - 压缩混淆加密
      // bytecode - 字节码加密
      // strict - 先混淆加密，然后字节码加密 
      type: 'confusion',
      files: [
        './public/electron/**/*.(js|json)',
      ],
      fileExt: ['.js'],
      // 特殊处理的文件，仅混淆加密
      specificFiles: [
        './public/electron/main.js',
        './public/electron/preload/bridge.js',
      ],
      confusionOptions: {
        compact: true,      
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        deadCodeInjection: false,
        stringArrayCallsTransform: true,
        numbersToExpressions: true,
        target: 'node',
      }      
    }
  },

  /**
   * 执行自定义命令
   * ee-bin exec
   */
  exec: {
    node_v: {
      directory: './',
      cmd: 'node',
      args: ['-v'],
      sync: false,  // (非常住进程才能使用) 是否同步执行命令
    },
    // 单独调试，air 实现 go 热重载
    go: {
      directory: './go',
      cmd: 'air',
      args: ['-c=config/.air.toml' ],
    },
    // windows 单独调试，air 实现 go 热重载 
    go_w: {
      directory: './go',
      cmd: 'air',
      args: ['-c=config/.air.windows.toml' ],
    },    
    // 单独调试，以基础方式启动 go
    go2: {
      directory: './go',
      cmd: 'go',
      args: ['run', './main.go', '--env=dev','--basedir=../', '--port=7073'],
    },    
    python: {
      directory: './python',
      cmd: 'python',
      args: ['./main.py', '--port=7074'],
      stdio: "inherit", // ignore
    },
  },  
};

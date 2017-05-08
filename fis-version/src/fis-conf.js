// npm install [-g] fis3-hook-module
/*
cnpm i -g fis3-hook-module
cnpm i -g fis-parser-layout
cnpm i -g fis3-parser-less-2.5.x
cnpm i -g fis-parser-node-sass
*/




// 引入模块化开发插件，设置规范为 commonJs 规范。
fis.hook('commonjs');

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});

// npm i fis-parser-layout
fis.match('/**.html', {
    parser: fis.plugin('layout', {
        // layout输出位置的元素 
        lopm: 'layout-block',
        // 存放layout输出位置的标签ID 的属性 
        lopa: 'name',

        // page获取布局文件的元素 
        pqlfm: 'layout',
        // 存放layout文件的路径的属性 
        pqlfa: 'layout-src',
        // 存放指定输出位置ID的属性，优先于pqlbm 
        pqlfoba: 'layout-block',

        // 指定输出位置的元素 
        pqlbm: 'layout-block',
        // 存放指定输出位置ID的属性 
        pqlba: 'name',


        // 引入组件（页面碎片）的元素 
        pqwm: 'include',
        // 存放引入组件（页面碎片）的路径 
        pqwa: 'include-src',

        // 内置了 artTemplate 模板 
        // 注：<% %> 定界符不兼容 
        template_openTag: '{%',
        template_closeTag: '%}',
        template_escape: true,
        template_cache: true,
        template_compress: true,
        template_helper: {
            // 页面调用 <%=add(1,2)%> 
            'add': function (sum1, sum2) {
                return sum1 + sum2;
            }
        },

        // {%=_id%} 获取 随机的id 
        // 随机ID长度 
        randomIDLen: 8,
        // 随机ID的前缀 
        randomIDPrefix: 'id_',

        // 格式化 html 代码 
        beautify: true
    }),
    release: false
});

fis.match(/^\/pages.*?\/([\w-]+?\.html)/, {
    release: '/$1'
});

/* js */
fis.match('*.js', {
    isMod: true
});

fis.match('/common/js/*.js', {
    isMod: false
});

fis.match('/pages/**.js', {
    isMod: true,
    release: '/static/$0'
});

[
    '/common/js/mod.js',
    '/common/js/jquery.min.js',
    '/common/js/swiper-3.4.2.min.js'
].forEach((file, i)=>{
    fis.match(file, {
        packTo: '/static/js/common.js',
        packOrder: i
    });
});

fis.match('/common/js/mod.js', {
    packTo: '/static/js/common.js',
    packOrder: 1
});

fis.match('/common/css/bootstrap.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.5.x', {
        // fis3-parser-less-2.5.x option
    })
});

fis.match('*.scss', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('node-sass', {
        // option
    })
});

fis.match('/common/css/bootstrap/**', {
    release: false
});

fis.match('/common/css/*', {
    release: '$0'
});

fis.match('/pages/**.scss', {
    isMod: true,
    release: '/static/$0'
});

[
    '/common/css/bootstrap.less',
    '/common/css/common.scss'
].forEach((file, i)=>{
    fis.match(file, {
        packTo: '/static/css/common.css',
        packOrder: i
    });
});



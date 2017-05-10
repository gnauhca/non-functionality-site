// npm install [-g] fis3-hook-module
/*
cnpm i -g fis3-hook-module
cnpm i -g fis-parser-layout
cnpm i -g fis3-parser-less-2.5.x
cnpm i -g fis-parser-node-sass
*/
var template = require('art-template');



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
    parser: function(content, file, setting) {
        template.defaults.extname = '.html';
        var html = template(file.realpath, {});
        // console.log(html);
        return html;
    },
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



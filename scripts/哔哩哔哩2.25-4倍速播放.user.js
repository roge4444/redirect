// ==UserScript==
// @name         哔哩哔哩2.25-4倍速播放
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @license      GPL-3.0
// @description  哔哩哔哩N倍速 bilibilin倍速播放 哔哩哔哩播放 bilibibli播放 哔哩哔哩加速播放
// @author       Roger Chu
// @include      *://www.bilibili.com/video/av*
// @include      *://www.bilibili.com/video/BV*
// @include      *://www.bilibili.com/bangumi/play/ep*
// @include      *://www.bilibili.com/bangumi/play/ss*
// @include      *://m.bilibili.com/bangumi/play/ep*
// @include      *://m.bilibili.com/bangumi/play/ss*
// @include      *://bangumi.bilibili.com/anime/*
// @include      *://bangumi.bilibili.com/movie/*
// @include      *://www.bilibili.com/bangumi/media/md*
// @include      *://www.bilibili.com/blackboard/html5player.html*
// @include      *://www.bilibili.com/watchroom/*
// @include      *://space.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function my_sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

(async function() {
    'use strict';

    var detect_menu = document.querySelector(".bpx-player-ctrl-playbackrate-menu")
    while (null == detect_menu) {
        await my_sleep(500)
        detect_menu = document.querySelector(".bpx-player-ctrl-playbackrate-menu")
    }

    var menu = document.querySelector(".bpx-player-ctrl-playbackrate-menu")
    var node1_5 = document.querySelector(".bpx-player-ctrl-playbackrate-menu-item[data-value='1.5']")

    // 新增1.75 DOM
    var li = document.createElement('li')
    var text = document.createTextNode('1.75x')
    li.setAttribute('class','bpx-player-ctrl-playbackrate-menu-item')
    li.setAttribute('data-value','1.75')
    li.appendChild(text)

    // insertBefore
    if (menu) {
        menu.insertBefore(li, node1_5)
    }

    // click 1.75
    var DOM1_7_5 = document.querySelector(".bpx-player-ctrl-playbackrate-menu-item[data-value='1.75']")
    if (DOM1_7_5) {
        DOM1_7_5.addEventListener('click',function(){
            document.querySelector('video').playbackRate = 1.75
        })
    }

    var node2_0 = document.querySelector(".bpx-player-ctrl-playbackrate-menu-item[data-value='2']")

    var texts = ['2.25x','2.5x','2.75x','3.0x','3.25x','3.5x','3.75x','4.0x']
    var data_values = ['2.25','2.5','2.75','3','3.25','3.5','3.75','4']
    var speeds = [2.25,2.5,2.75,3,3.25,3.5,3.75,4]

    // 新增 DOMs
    for (let i = (data_values.length - 1); i >= 0; i--) {
        let li = document.createElement('li')
        let text = document.createTextNode(texts[i])
        li.setAttribute('class','bpx-player-ctrl-playbackrate-menu-item')
        li.setAttribute('data-value', data_values[i])
        li.appendChild(text)

        // insertBefore
        if (menu) {
            menu.insertBefore(li, node2_0)
        }

        // click
        let DOM_target = document.querySelector(".bpx-player-ctrl-playbackrate-menu-item[data-value='"+ data_values[i] +"']")
        if (DOM_target) {
            DOM_target.addEventListener('click',function(){
                document.querySelector('video').playbackRate = speeds[i]
            })
        }
    }
})();
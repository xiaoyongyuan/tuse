(function (doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        dpr = 1,
        scale = 1 / dpr,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function () {
        var width = docEl.clientWidth;
        if (width / dpr > 4096) {
            width = 4096 * dpr;
        }
        // 乘以100，px : rem = 100 : 1
        docEl.style.fontSize = 100 * (width / 4096) + 'px';
        let myCanvas = document.getElementById('myCanvas');
        myCanvas.style.transform = 'scale('+ 1.5 * (width / 4096) +')';
        docEl.style.fontSize = 100 * (width / 4096) + 'px';
        // if(width < 1300){
        //     myCanvas.style.left = '-' + 0.3 * (4096 / width) + 'rem';
        // }else if(width < 1200){
        //     myCanvas.style.left = 0;
        // }
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);
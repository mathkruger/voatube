/**
 * Copyright (c) 2012 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 **/


/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('player.html', {
        id: "voaTube",
        frame: "none",
        alwaysOnTop: true,
        innerBounds: {
            width: 400,
            height: 380,
            minWidth: 200,
            minHeight: 200
        }
    }, 
    function(win) {
        win.contentWindow.onload = function() {
            var webview = win.contentWindow.document.getElementById('video_youtube');
            console.log(webview);
            webview.addEventListener('newwindow', function(e) {
                e.preventDefault();
                window.open(e.targetUrl);
            });

            webview.addEventListener('permissionrequest', function(e) {
                if (e.permission === 'fullscreen') {
                    e.request.allow();
                }
            });
        };
    });
});

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
var firebaseConfig = {
    apiKey: "AIzaSyDzoMkC0M7zPubSwJDaOe--ZeGgr_NOR9I",
    authDomain: "fir-testdb-7de37.firebaseapp.com",
    databaseURL: "https://fir-testdb-7de37-default-rtdb.firebaseio.com",
    projectId: "fir-testdb-7de37",
    storageBucket: "fir-testdb-7de37.firebasestorage.app",
    messagingSenderId: "228882620095",
    appId: "1:228882620095:web:53017dc3c2be73b00a",
    measurementId: "G-D9RTP4ZLY2"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, database_1.getDatabase)(app);
window.addEventListener("DOMContentLoaded", function () {
    renderComments();
    var usernameInput = document.getElementById("usernameInput");
    if (usernameInput) {
        var savedUsername = getCookie("username");
        if (savedUsername)
            usernameInput.value = savedUsername;
    }
});
(_a = document.getElementById("commentSubmit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var usernameInput = document.getElementById("usernameInput");
    var commentInput = document.getElementById("commentInput");
    if (!usernameInput || !commentInput)
        return;
    var username = usernameInput.value.trim() || "익명";
    var comment = commentInput.value.trim();
    if (comment === "")
        return;
    setCookie("username", username, 7);
    var commentsRef = (0, database_1.ref)(db, "comments");
    (0, database_1.push)(commentsRef, {
        username: username,
        comment: comment,
        timestamp: Date.now()
    });
    commentInput.value = "";
});
function renderComments() {
    var commentList = document.getElementById("commentList");
    if (!commentList)
        return;
    var commentsRef = (0, database_1.ref)(db, "comments");
    // 실시간 댓글 불러오기
    (0, database_1.onValue)(commentsRef, function (snapshot) {
        var data = snapshot.val();
        commentList.innerHTML = "";
        if (data) {
            // 최신 댓글이 위로 오도록 정렬
            var commentsArray = Object.values(data);
            commentsArray
                .sort(function (a, b) { return b.timestamp - a.timestamp; })
                .forEach(function (_a) {
                var username = _a.username, comment = _a.comment, timestamp = _a.timestamp;
                var item = document.createElement("div");
                item.className = "comment-item";
                var dateStr = new Date(timestamp).toLocaleString();
                item.innerHTML = "<strong>".concat(username, "</strong>: ").concat(comment, " <small>").concat(dateStr, "</small>");
                commentList.appendChild(item);
            });
        }
    });
}
function setCookie(name, value, days) {
    var expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = "".concat(name, "=").concat(encodeURIComponent(value), ";expires=").concat(expires.toUTCString(), ";path=/");
}
function getCookie(name) {
    var cookies = document.cookie.split(";");
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.trim().split("="), key = _a[0], val = _a[1];
        if (key === name)
            return decodeURIComponent(val);
    }
    return null;
}

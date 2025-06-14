var _a;
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
    var commentList = document.getElementById("commentList");
    if (!usernameInput || !commentInput || !commentList)
        return;
    var username = usernameInput.value.trim() || "익명";
    var comment = commentInput.value.trim();
    if (comment === "")
        return;
    setCookie("username", username, 7);
    var newComment = { username: username, comment: comment };
    var comments = loadFromLocalStorage();
    comments.push(newComment);
    saveToLocalStorage(comments);
    renderComments();
    commentInput.value = "";
});
function setCookie(name, value, days) {
    var expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = "".concat(name, "=").concat(encodeURIComponent(value), ";expires=").concat(expires.toUTCString(), ";path=/");
}
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.trim().split('='), key = _a[0], val = _a[1];
        if (key === name)
            return decodeURIComponent(val);
    }
    return null;
}
var STORAGE_KEY = "savedComments";
function saveToLocalStorage(comments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}
function loadFromLocalStorage() {
    var data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}
function renderComments() {
    var commentList = document.getElementById("commentList");
    if (!commentList)
        return;
    commentList.innerHTML = "";
    var saved = loadFromLocalStorage();
    saved.forEach(function (_a) {
        var username = _a.username, comment = _a.comment;
        var item = document.createElement("div");
        item.className = "comment-item";
        item.innerHTML = "<strong>".concat(username, "</strong>: ").concat(comment);
        commentList.appendChild(item);
    });
}

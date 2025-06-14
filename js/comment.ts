interface CommentItem {
    username: string;
    comment: string;
}

window.addEventListener("DOMContentLoaded", () => {
    renderComments();

    const usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    if (usernameInput) {
        const savedUsername = getCookie("username");
        if (savedUsername) usernameInput.value = savedUsername;
    }
});

document.getElementById("commentSubmit")?.addEventListener("click", () => {
    const usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    const commentInput = document.getElementById("commentInput") as HTMLInputElement;
    const commentList = document.getElementById("commentList");

    if (!usernameInput || !commentInput || !commentList) return;

    const username = usernameInput.value.trim() || "익명";
    const comment = commentInput.value.trim();
    if (comment === "") return;

    setCookie("username", username, 7)
    const newComment: CommentItem = { username, comment };
    const comments = loadFromLocalStorage();
    comments.push(newComment);
    saveToLocalStorage(comments);

    renderComments();
    commentInput.value = "";
});

function setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, val] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(val);
    }
    return null;
}

const STORAGE_KEY = "savedComments";
function saveToLocalStorage(comments: CommentItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function loadFromLocalStorage(): CommentItem[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}
function renderComments() {
    const commentList = document.getElementById("commentList");
    if (!commentList) return;

    commentList.innerHTML = "";
    const saved = loadFromLocalStorage();

    saved.forEach(({ username, comment }) => {
        const item = document.createElement("div");
        item.className = "comment-item";
        item.innerHTML = `<strong>${username}</strong>: ${comment}`;
        commentList.appendChild(item);
    });
}
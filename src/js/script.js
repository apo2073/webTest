document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
window.addEventListener('load', function (e) {
    var isPc = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isPc)
        return;
    alert('Pc 접속을 권장합니다.');
});
var cursor = document.getElementById('cursor');
window.addEventListener('mousemove', function (e) {
    cursor.style.top = "".concat(e.clientY, "px");
    cursor.style.left = "".concat(e.clientX, "px");
});
hoverCode();
function hoverCode() {
    var javaCode = document.querySelector(".language-java");
    if (!javaCode)
        return;
    var contentJ = javaCode.textContent;
    javaCode.addEventListener("mouseover", function () {
        document.body.style.cursor = '';
        javaCode.classList.replace('language-java', 'language-javascript');
        javaCode.textContent = '   function main() {\n   \tconsole.log(\'Hello, World!\');\n   }';
        window.hljsAll();
        // hljs.highlightAll();
    });
    javaCode.addEventListener("mouseout", function () {
        javaCode.classList.replace('language-javascript', 'language-java');
        javaCode.textContent = contentJ;
        window.hljsAll();
        // hljs.highlightAll();
    });
    var kotlinCode = document.querySelector(".language-kotlin");
    if (!kotlinCode)
        return;
    var contentK = kotlinCode.textContent;
    kotlinCode.addEventListener("mouseover", function () {
        kotlinCode.classList.replace('language-kotlin', 'language-typescript');
        kotlinCode.textContent = '   function main() {\n   \tconst hello:String=\'Hello\';\n   \tconsole.log(`$\{hello\}, World!`);\n   }';
        // hljs.highlightAll();
        window.hljsAll();
    });
    kotlinCode.addEventListener("mouseout", function () {
        kotlinCode.classList.replace('language-typescript', 'language-kotlin');
        kotlinCode.textContent = contentK;
        window.hljsAll();
        // hljs.highlightAll();
    });
}
function hello() {
    console.log("Hello, World!");
    alert('Hello, World!');
}
consoleCode();
function consoleCode() {
    var cmd = document.getElementById("console");
    var header = document.getElementById("consoleHeader");
    var offsetX = 0;
    var offsetY = 0;
    var isDragging = false;
    header.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - cmd.offsetLeft;
        offsetY = e.clientY - cmd.offsetTop;
    });
    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            cmd.style.left = "".concat(e.clientX - offsetX, "px");
            cmd.style.top = "".concat(e.clientY - offsetY, "px");
        }
    });
    document.addEventListener("mouseup", function () {
        isDragging = false;
    });
    var consoleBody = document.querySelector(".console-body");
    var consoleContent = document.querySelector("#console-content");
    var consoleInput = document.getElementById('console-input');
    consoleInput.addEventListener("keypress", function (e) {
        if (e.key.valueOf() == "Enter") {
            var command = consoleInput.value.trim();
            var content = document.createElement("p");
            var result = document.createTextNode("p");
            content.id = 'console-log';
            result.textContent = eval(command);
            content.textContent = " > ".concat(command);
            consoleContent.appendChild(content);
            consoleContent.appendChild(result);
            consoleContent.scrollTop = content.scrollHeight;
            consoleInput.value = '';
        }
    });
}
function closePopup() {
    var popup = document.getElementById("console");
    popup.style.display = "none";
}
anime();
function anime() {
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    var observerCallback = function (entries, _) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                //observer.unobserve(entry.target)
            }
            else {
                entry.target.classList.remove('show');
            }
        });
    };
    var observer = new IntersectionObserver(observerCallback, observerOptions);
    var animatedBoxes = document.querySelectorAll('.visible');
    animatedBoxes.forEach(function (box) {
        observer.observe(box);
    });
}

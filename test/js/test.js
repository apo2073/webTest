function test1() {
    console.log("Hello, World!");
    var greeting = document.getElementById("greeting");
    greeting.innerText = "Hello, WOlrd!";
    var titleElement = document.getElementById("main_text");
    titleElement.textContent = "Main Text!";
    var firstParagraphElement = document.querySelector(".content-text");
    var allParagraphElement = document.querySelectorAll(".content-text");
    firstParagraphElement.textContent = "YEAH";
    allParagraphElement.forEach(function (p) {
        console.log(p);
    });
}
test1();
function test2() {
    var myButton = document.getElementById("myButton");
    var messageElement = document.getElementById("message");
    myButton.addEventListener("click", function () {
        messageElement.textContent = "Clicked At ".concat(Date.now().valueOf());
    });
    var myInput = document.getElementById("myInput");
    var inputElement = document.getElementById("inputValueDisplay");
    myInput.addEventListener("keyup", function (e) {
        inputElement.textContent = "Key typing...";
    });
    var hoverBox = document.getElementById("hoverBox");
    hoverBox.addEventListener("mouseover", function () {
        hoverBox.style.backgroundColor = "coral";
        hoverBox.textContent = 'mouse is on here';
    });
    hoverBox.addEventListener("mouseout", function () {
        hoverBox.style.backgroundColor = "lightblue";
        hoverBox.textContent = 'over the mouse here';
    });
}
test2();

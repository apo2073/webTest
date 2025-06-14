function test1() {
    console.log("Hello, World!");

    const greeting=document.getElementById("greeting");
    greeting.innerText="Hello, WOlrd!";

    const titleElement=document.getElementById("main_text");
    titleElement.textContent="Main Text!";

    const firstParagraphElement=document.querySelector(".content-text");
    const allParagraphElement=document.querySelectorAll(".content-text");
    firstParagraphElement.textContent="YEAH";

    allParagraphElement.forEach((p)=> {
        console.log(p);
    })
}
test1()

function test2() {
    const myButton=document.getElementById("myButton");
    const messageElement=document.getElementById("message");

    myButton.addEventListener("click", ()=> {
        messageElement.textContent=`Clicked At ${Date.now().valueOf()}`;
    })

    const myInput=document.getElementById("myInput");
    const inputElement=document.getElementById("inputValueDisplay");

    myInput.addEventListener("keyup", (e)=> {
        inputElement.textContent=`Key typing...`;
    })

    const hoverBox=document.getElementById("hoverBox");
    hoverBox.addEventListener("mouseover", ()=>{
        hoverBox.style.backgroundColor="coral";
        hoverBox.textContent='mouse is on here'
    })
    hoverBox.addEventListener("mouseout", ()=>{
        hoverBox.style.backgroundColor="lightblue";
        hoverBox.textContent='over the mouse here'
    })
}
test2()
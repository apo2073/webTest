function test1() {
    console.log("Hello, World!");

    const greeting=document.getElementById("greeting") as HTMLElement;
    greeting.innerText="Hello, WOlrd!";

    const titleElement=document.getElementById("main_text") as HTMLElement;
    titleElement.textContent="Main Text!";

    const firstParagraphElement=document.querySelector(".content-text") as HTMLElement;
    const allParagraphElement=document.querySelectorAll(".content-text");
    firstParagraphElement.textContent="YEAH";

    allParagraphElement.forEach((p)=> {
        console.log(p);
    })
}
test1()

function test2() {
    const myButton=document.getElementById("myButton")  as HTMLButtonElement;
    const messageElement=document.getElementById("message") as HTMLElement;

    myButton.addEventListener("click", ()=> {
        messageElement.textContent=`Clicked At ${Date.now().valueOf()}`;
    })

    const myInput=document.getElementById("myInput") as HTMLInputElement;
    const inputElement=document.getElementById("inputValueDisplay") as HTMLElement;

    myInput.addEventListener("keyup", (e)=> {
        inputElement.textContent=`Key typing...`;
    })

    const hoverBox=document.getElementById("hoverBox") as HTMLElement;
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
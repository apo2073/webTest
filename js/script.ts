document.addEventListener('contextmenu', event => event.preventDefault());

window.addEventListener('load', (e)=> {
    const isPc=!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isPc) return
    alert('Pc 접속을 권장합니다.')
})

const cursor = document.getElementById('cursor');

window.addEventListener('mousemove', (e) => {
    cursor!.style.top = `${e.clientY}px`;
    cursor!.style.left = `${e.clientX}px`;
});

hoverCode()
function hoverCode() {
    const javaCode=document.querySelector(".language-java");
    if (!javaCode) return
    const contentJ=javaCode.textContent
    javaCode.addEventListener("mouseover", ()=>{
        document.body.style.cursor = '';
        javaCode.classList.replace('language-java','language-javascript');
        javaCode.textContent='   function main() {\n   \tconsole.log(\'Hello, World!\');\n   }';
        (window as any).hljsAll();
        // hljs.highlightAll();
    });

    javaCode.addEventListener("mouseout", ()=>{
        javaCode.classList.replace('language-javascript','language-java');
        javaCode.textContent=contentJ;
        (window as any).hljsAll();
        // hljs.highlightAll();
    });

    const kotlinCode=document.querySelector(".language-kotlin");
    if (!kotlinCode) return
    const contentK=kotlinCode.textContent;
    kotlinCode.addEventListener("mouseover", ()=>{
        kotlinCode.classList.replace('language-kotlin','language-typescript');
        kotlinCode.textContent='   function main() {\n   \tconst hello:String=\'Hello\';\n   \tconsole.log(`$\{hello\}, World!`);\n   }';
        // hljs.highlightAll();
        (window as any).hljsAll();
    });
    kotlinCode.addEventListener("mouseout", ()=>{
        kotlinCode.classList.replace('language-typescript','language-kotlin');
        kotlinCode.textContent=contentK;
        (window as any).hljsAll();
        // hljs.highlightAll();
    })
}

function hello() {
    console.log(`Hello, World!`);
    alert('Hello, World!');
}

consoleCode()
function consoleCode() {
    const cmd = document.getElementById("console") as HTMLElement;
    const header = document.getElementById("consoleHeader") as HTMLElement;

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    header.addEventListener("mousedown", (e: MouseEvent) => {
        isDragging = true;
        offsetX = e.clientX - cmd.offsetLeft;
        offsetY = e.clientY - cmd.offsetTop;
    });

    document.addEventListener("mousemove", (e: MouseEvent) => {
        if (isDragging) {
            cmd.style.left = `${e.clientX - offsetX}px`;
            cmd.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    const consoleBody=document.querySelector(".console-body") as HTMLElement;
    const consoleContent=document.querySelector("#console-content") as HTMLElement;
    const consoleInput=document.getElementById('console-input') as HTMLInputElement;
    consoleInput.addEventListener("keypress", (e)=> {
        if (e.key.valueOf()=="Enter") {
            const command=consoleInput.value.trim();
            let content=document.createElement("p")
            let result=document.createTextNode("p");
            content.id='console-log'
            if (command=="help" || command=="?") {
                result.textContent="repo  - redirect to this site's github repo" +
                    "\ngithub  - redirect to owner's github" +
                    "\nhelp  - show this"
            } else {
                result.textContent=eval(command)
            }
            switch (command) {
                case "repo":
                    window.location.href=`https://github.com/apo2073/popolio`
                    break
            }
            content.textContent=` > ${command}`;

            consoleContent.appendChild(content);
            consoleContent.appendChild(result)
            consoleContent.scrollTop=content.scrollHeight;
            consoleInput.value='';
        }
    })
}

function closePopup(): void {
    const popup = document.getElementById("console") as HTMLElement;
    popup.style.display = "none";
}

anime()
function anime() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries: any[], _: any) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                 //observer.unobserve(entry.target)
            } else {
                entry.target.classList.remove('show');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatedBoxes = document.querySelectorAll('.visible');
    animatedBoxes.forEach(box => {
        observer.observe(box);
    });
}
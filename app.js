let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let msg=document.querySelector("#msg");
let msgcontainer=document.querySelector(".msg-container")
let newbtn=document.querySelector("#new-btn");
let turnO=true;
let ct=0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetgame=()=>{
    turnO=true;
    ct=0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const gamedraw=()=>{
    msg.innerText=`The game is draw`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        ct++;

        let iswinner= checkwinner();

        if(ct===9 && !iswinner){
            gamedraw();
        }
    })
})

const showwinner=(winner)=>{
    msg.innerText=`Congratulations winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}


const checkwinner=()=>{
    for(let pattern of winPatterns){
        let val1=boxes[pattern[0]].innerText;
        let val2=boxes[pattern[1]].innerText;
        let val3=boxes[pattern[2]].innerText;

        if(val1!="" && val2!="" && val3!=""){
            if(val1===val2 && val2===val3){
                showwinner(val1);
                return true;
            }
        }
    }
}

resetbtn.addEventListener("click",resetgame);
newbtn.addEventListener("click",resetgame);

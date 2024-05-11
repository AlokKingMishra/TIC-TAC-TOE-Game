let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0=true;

const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetgame=()=>{
    turn0=true;
    enablebox();
    msgcontainer.classList.add("hide");
};

let cnt =0 ;
let k =9;
boxes.forEach((it) => {
    it.addEventListener("click" , () => {
        if(turn0===true)
        {
            it.innerText="O";
            turn0=false;            
        }
        else
        {
            it.innerText="X";
            turn0=true;
        }

        it.disabled=true;
        let a = checkwinner();
        let b = checkdraw();

        if(b==9 && a==0){
                msg.innerText=`draw happend `;
                msgcontainer.classList.remove("hide");
                disablebox();
        }
    });
});

const disablebox = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const checkdraw=()=>{
    let cnt =0;
    for(let box of boxes){
        if(box.innerText!="")
          cnt++;
    }
    return cnt;
}
const enablebox = ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const showwinner=(winner)=>{
    msg.innerText=`congratulations , winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebox();
};

const checkwinner = () =>{
    for(let pattern of winpatterns){
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if(posval1 !="" && posval2 !="" && posval3 !=""){
            if(posval1===posval2 && posval2===posval3){
                console.log("winner" ,posval1 );
                showwinner(posval1);
                return 1;
            }
        }
    }
    return 0;
};

newgamebtn.addEventListener("click" , resetgame);
resetbtn.addEventListener("click",resetgame);
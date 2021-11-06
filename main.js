// Start Game
let control = document.querySelector(".control-btns");
let controlBtn = document.querySelector(".control-btns button");

// Hide The Welcome Interface
controlBtn.onclick = ()=>{
    control.remove();
}

// Flip On Click And Reorder Elements And Do the Check
let game = document.querySelector(".game");
// Making Array From The Children Of The Game Container
let boxs = Array.from(game.children);
let backFace = document.querySelectorAll(".game .element .back");
// Making Array From The Keys Of Boxs Array
let orderRange = Array.from(Array(boxs.length).keys());
// Shuffle The Array Of Element Keys
shuffle(orderRange);

boxs.forEach((box, index)=>{
    // ReOrder Elements
    box.style.order = orderRange[index];
    box.onclick = () => {
    //    Flip The Element
       flipBlock(box);
    }
});
// The Shuffle Function
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
// The Flip Function
let flipBlock = (element) => {
    element.classList.add("flip");
    let flipCounter = boxs.filter(box=> box.classList.contains("flip"));
    if(flipCounter.length === 2){
        // Stoping CLick
        stopClicking();
        // Check I The Two Elements Are Same
        checkSimilarity(flipCounter[0], flipCounter[1]);
    }
}
// Stop Clicking Function
function stopClicking(){
    game.classList.add("no-click");
    setTimeout(()=>{
        game.classList.remove("no-click");
    }, 1000)
}
// The Checking Function
function checkSimilarity(elOne, elTwo){
    let tries = document.querySelector(".tries");

    // In Case Of The Two Elements Are Similar
    if(elOne.dataset.tech === elTwo.dataset.tech){
        elOne.classList.remove("flip");
        elTwo.classList.remove("flip");

        elOne.classList.add("matched");
        elTwo.classList.add("matched");

        // Decrease The Volume Of The Sound (Too Loudy)
        document.getElementById("win").volume = 0.5;
        // Play The Sound
        document.getElementById("win").play();
    }
    // In Case Of The Two Elements Are Not Similar
    else {
        // Increase The Wrong Tries
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        // To Wait Till The Flip Is Over To Check
        setTimeout(()=>{
            elOne.classList.remove("flip");
            elTwo.classList.remove("flip");
        }, 500);

        document.getElementById("lose").volume = 0.25;

        // Make The Sound Wait For The Flip To Happen
        setTimeout(()=>{
            document.getElementById("lose").play();
        }, 100);
    }
}

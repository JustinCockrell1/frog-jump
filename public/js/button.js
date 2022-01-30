const nameButton = document.getElementById("name-button");
const nameInput = document.getElementById("name-input");
const resumeButton = document.getElementById("resume-button");

nameButton.addEventListener("click",()=>{
    document.querySelector(".name").style.display="none";
    console.log(nameInput.value);
    socket.emit("setname", nameInput.value);
    player[uniqueId].name=nameInput.value;
});

resumeButton.addEventListener("click",()=>{
    document.querySelector(".scoreboard").style.display="none";
});
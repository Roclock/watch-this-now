//this is to save the notes to the local storage. 

var noteInput = document.querySelector("#notes");
var saveButton = document.querySelector("#save");

renderLastRegistered();

function renderLastRegistered(){
    var notes = localStorage.getItem("notes");
    if(!notes){
        return;
    }
noteInput.textContent = notes;
console.log("mynotes " + notes);
$("#notes-list").append($("<li>").text(notes));
}

saveButton.addEventListener("click", function(event){
    event.preventDefault();
    var notes = document.querySelector("#notes").value;
    localStorage.setItem("notes", notes);
    renderLastRegistered();
});
    
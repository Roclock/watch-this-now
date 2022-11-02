//this is to save the notes to the local storage. 

var noteInput = document.querySelector("#notes");
var saveButton = document.querySelector("#note-save");

renderLastRegistered();

function renderLastRegistered(){
    $("#notes-list").empty();
    var notes =JSON.parse(localStorage.getItem("notes"));

    if(!notes){
        return;
    }
    for( var i=0; i<notes.length; i++) {
        $("#notes-list").append($("<li>").text(notes[i]));
    };

}

saveButton.addEventListener("click", function(event){
    event.preventDefault();
    var note = document.querySelector("#notes").value;
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (!notes) {
        notes = [];
    }
    
    var note = document.querySelector("#notes").value;
    notes.push(note+"");
    localStorage.setItem("notes", JSON.stringify(notes));
    renderLastRegistered();
    $("#notes").val("");
});

$("#notes").on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#note-save").click();
    }
});

$("#notes-clear").on("click", function(event){
    event.preventDefault();
    localStorage.removeItem("notes");
    renderLastRegistered();
});
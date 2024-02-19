var makeRemember = document.querySelector(".make-remember");
var add = document.querySelector(".add-new");
var header = document.querySelector("header");
var addbtn = document.querySelector("#addbtn");
var close = document.querySelector("#close")

add.addEventListener('click', function () {
    makeRemember.style.opacity = "1";
    header.style.filter = "blur(3px)"
})
close.addEventListener('click', function () {
    makeRemember.style.opacity = "0";
    header.style.filter = "blur(0)";
})

addbtn.addEventListener('click', function () {

    let addTxt = document.querySelector("#addtxt");
    let addTitle = document.querySelector("#addtitle")
    if (addTitle.value.trim() === '' || addTxt.value.trim() === '') {
        alert("Please enter both title and text before adding a note.");
        return; // Stop execution if the input is empty
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
        if (!Array.isArray(notesObj)) {
            notesObj = [];
        }
    }

    let newNote = {
        title: addTitle.value,
        text: addTxt.value,
        dateTime: new Date().toISOString() 
    };
    notesObj.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    addTitle.value = "";
    addTxt.value = "";
    console.log(notesObj);

    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
        if (!Array.isArray(notesObj)) {
            notesObj = [];
        }
    }

    function getRandomColor() {
        // Generate a random 6-digit hex color code
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    let html = "";
    notesObj.forEach(function (note, index) {
        let randomColor = getRandomColor();
        const formattedDateTime = formatDateTime(note.dateTime);
        html += ` <div id="notecard" class="w-[18vw] px-[10px] py-[5px] bg-green-200 text-start rounded-[10px] m-[10px]">
        <h5 class="text-xl font-semibold">${note.title}</h5>
        <hr>
        <p class="my-[5px]">${note.text}</p>

        <hr>
        <p class="text-black text-sm">${formattedDateTime}</p>
         <hr>
        <button id="${index}" onclick ="${deleteNote(index)}"  class="bg-white cursor-pointer text-[15px] font-semibold py-[8px] rounded-[5px] px-[12px] my-[10px]">Delete
            note</button>
    </div>`
    });
    let notesElm = document.querySelector("#notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
}

// Function to format date and time
function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return dateTime.toLocaleDateString("en-US", options);
}

document.addEventListener("DOMContentLoaded", function () {
    shownotes();
});
// -----------function to delete note-------
function deleteNote(index) {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
        if (!Array.isArray(notesObj)) {
            notesObj = [];
        }
    }
}

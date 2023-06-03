let notearea = document.querySelector(".note-area");
let notetext = document.querySelector(".note-text");
let title = document.querySelector(".title");
let notes = document.querySelector(".notes");
let note = document.querySelector(".note");

const showNoteArea = () => {
    notetext.style = "display:block";
    notearea.classList.add("note-now");
    title.setAttribute("placeholder", "Title");
    title.styl = "font-size:20px";
};

const hideNoteArea = () => {
    notetext.style = "display:none";
    notearea.classList.remove("note-now");
};

const addNoteToLocalStorage = (note) => {
    if (note.length < 0) {
        return;
    }

    console.log(note);

    let oldNote;

    if (localStorage.getItem("notes") === null) {
        oldNote = [];
    } else {
        oldNote = JSON.parse(localStorage.getItem("notes"));
    }

    oldNote.push(note);
    localStorage.setItem("notes", JSON.stringify(oldNote));
};

const getNotesFromLocalStorage = () => {
    let oldNote;

    if (localStorage.getItem("notes") === null) {
        oldNote = [];
    } else {
        oldNote = JSON.parse(localStorage.getItem("notes"));
    }

    oldNote.forEach((note) => {
        notes.innerHTML += `
     <div class="note">
                    <h3 id="title-text" class="tile-text">${note[0]}</h3>
                    <p class="note-blog">${note[1]}
                    </p>
                    <i class="fa fa-trash"></i>
                </div>`;
    });
};

const deleteFromLocalSorage = (deletedNote) => {
    let oldNote;

    if (localStorage.getItem("notes") === null) {
        oldNote = [];
    } else {
        oldNote = JSON.parse(localStorage.getItem("notes"));
    }
    oldNote.map((note, index) => {
        // console.log(deletedNote);
        if (
            note[0] == deletedNote.children[0].textContent.trim() &&
            note[1] == deletedNote.children[1].textContent.trim()
        ) {
            oldNote.splice(index, 1);
            return oldNote;
        }
    });
    localStorage.setItem("notes", JSON.stringify(oldNote));
};

document.addEventListener("DOMContentLoaded", getNotesFromLocalStorage);

const addNote = (t, n) => {
    notes.innerHTML += `
     <div class="note">
                    <h3 id="title-text" class="tile-text">${t}</h3>
                    <p class="note-blog">${n}
                    </p>
                    <i class="fa fa-trash"></i>
                </div>`;
    title.value = "";
    notetext.value = "";
};

notearea.addEventListener("click", showNoteArea);

document.addEventListener("click", (event) => {
    let iscliked = notearea.contains(event.target);
    if (!iscliked) {
        hideNoteArea();
        if (title.value.length === 0 && notetext.value.length === 0) {
            return;
        } else {
            addNoteToLocalStorage([title.value, notetext.value]);
            addNote(title.value, notetext.value);
        }
    }
});

document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("note")) {
        event.target.querySelector("i").classList.add("show");
    }
});

document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("note")) {
        event.target.querySelector("i").classList.remove("show");
    }
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash")) {
        event.target.parentElement.remove();
        deleteFromLocalSorage(event.target.parentElement);
    }
});

// local storage

// localStorage.setItem("name", "moh");
// console.log(localStorage.getItem("name"));

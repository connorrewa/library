const myLibrary = [];

function Book(title, author, numPages, isRead) {
    // the constructor ...
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, numPages, isRead) {
    // do stuff here
    newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);
}

addBookToLibrary("title", "the_author", 48, true);

let form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = event.target;
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let numPages = document.querySelector("#numPages");
    let isRead = document.querySelector("#isRead");
    let span = document.querySelector(".error");

    if (title.value === '' || author.value === '' || numPages.value === '' || isRead.value === '') {
        span.textContent = 'Please fill all fields'
        return;
    }

    span.textContent = '';
    console.log(title.value, author.value, numPages.value, isRead.value == 'yes' ? true : false);
    addBookToLibrary(title.value, author.value, numPages.value, isRead.value == 'yes' ? true : false);
    displayBooks();
    // resetForm();
});

function resetForm() {
    document.querySelector("#title").value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#numPages").value = '';
    document.querySelector("#isRead").value = '';
}

function acceptNewBook(event) {
    let data = event.currentTarget;
    console.log(data);
    let title = document.querySelector("#author")
    console.log(title.value);
}

function displayBooks() {
    library = document.querySelector(".library");
    console.log(library);
    library.innerHTML = '';
    myLibrary.forEach((book, index) => {
        let elem = document.createElement("div")
        elem.textContent = `\'${book.title}\' by ${book.author} has ${book.numPages} pages and has ` + ((book.isRead) ? "been read." : "not been read.");
        elem.classList.add("book");
        library.appendChild(elem);

        // Make Delete Button
        let btn = document.createElement("button");
        btn.setAttribute("index", index)
        btn.textContent = 'delete';
        btn.addEventListener("click", (e) => {
            myLibrary.splice(e.target.getAttribute(index), 1);
            console.log(e.target.getAttribute("index"));
            displayBooks();
        });
        elem.appendChild(btn);

        // Make Toggle Read Button
        let read_btn = document.createElement("button");
        read_btn.setAttribute("index", index)
        read_btn.textContent = 'read book';
        read_btn.addEventListener("click", (e) => {    
            let ind = e.target.getAttribute("index");
            console.log(ind)
            console.log(myLibrary, ind);
            myLibrary[ind].toggleRead();
            displayBooks();
        });
        elem.appendChild(read_btn);



    });
}

displayBooks();
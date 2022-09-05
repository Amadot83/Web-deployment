//TODO login check if admin

window.onload = function() {
    createForm();
    getBooklist();
}

var mode = 0;

createForm = () => {
    let ankkuriAdmin = document.getElementById("ankkuriAdmin");
    let form = document.createElement("form");
    form.setAttribute("id", "form");

    //name input
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "nameInput");
    nameInput.setAttribute("name", "nameInput");
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "nameInput");
    let nameText = document.createTextNode("Name");
    nameLabel.appendChild(nameText);

    //author input
    let authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("id", "authorInput");
    authorInput.setAttribute("name", "authorInput");
    let authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "authorInput");
    let authorText = document.createTextNode("Author");
    authorLabel.appendChild(authorText);

    //year input
    let yearInput = document.createElement("input");
    yearInput.setAttribute("type", "text");
    yearInput.setAttribute("id", "yearInput");
    yearInput.setAttribute("name", "yearInput");
    let yearLabel = document.createElement("label");
    yearLabel.setAttribute("for", "yearInput");
    let yearText = document.createTextNode("Year");
    yearLabel.appendChild(yearText);

    //genre input
    let genreInput = document.createElement("input");
    genreInput.setAttribute("type", "text");
    genreInput.setAttribute("id", "genreInput");
    genreInput.setAttribute("name", "genreInput");
    let genreLabel = document.createElement("label");
    genreLabel.setAttribute("for", "genreInput");
    let genreText = document.createTextNode("Genre");
    genreLabel.appendChild(genreText);

    //loaned input (check checkbox boolean status: true/false)
    let loanedInput = document.createElement("input");
    loanedInput.setAttribute("type", "checkbox");
    loanedInput.setAttribute("id", "loanedInput");
    loanedInput.setAttribute("name", "loanedInput");
    let loanedLabel = document.createElement("label");
    loanedLabel.setAttribute("for", "loanedInput");
    let loanedText = document.createTextNode("Loaned");
    loanedLabel.appendChild(loanedText);


    //lähetys-buttoni
    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Add new book");
    submitButton.setAttribute("id", "submitButton");

    //Build form

    let br = document.createElement("br");
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
   
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
 
    form.appendChild(yearLabel);
    form.appendChild(yearInput);
    
    form.appendChild(genreLabel);
    form.appendChild(genreInput);
    
    form.appendChild(loanedLabel);
    form.appendChild(loanedInput);

    form.appendChild(submitButton);
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    })
    ankkuriAdmin.appendChild(form);
}

// return Boolean(loanedInput.checked);

// rest api
addBook = async () => {
    let nameInput = document.getElementById("nameInput");
    let authorInput = document.getElementById("authorInput");
    let yearInput = document.getElementById("yearInput");
    let genreInput = document.getElementById("genreInput");
    let loanedInput = document.getElementById("loanedInput");
    let book = {
        name: nameInput.value,
        author: authorInput.value,
        year: yearInput.value,
        genre: genreInput.value,
        loaned: loanedInput.checked
    }
    let method = "POST";
    let url = "/api/admin/books";
    if(mode) {
        method = "PUT";
        url = "/api/admin/books/" + mode;
        mode = 0;
        submitButton = document.getElementById("submitButton");
        submitButton.value = "Add new book";
    }
    let request = {
        method: method,
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(book)
    }
    let response = await fetch(url, request)
    if(response.ok) {
        nameInput.value = "";
        authorInput.value = "";
        yearInput.value = "";
        genreInput.value = "";
        loanedInput.checked = false;
        getBooklist();
    }
    else {
        console.log("Response with a status ", response.status);
    }
}

getBooklist = async () => {
    let request = {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json"}
    }
    let response = await fetch("/api/admin/books", request);
    if(response.ok) {
        let data = await response.json();
        populateBooklist(data);
    }
    else {
        console.log("Response with a status ", response.status);
    }
}

removeBook = async (id) => {
    let request = {
        method: "DELETE",
        mode: "cors",
        headers: {"Content-Type": "application/json"}
    }
    let response = await fetch("/api/admin/books/" + id, request);
    if(response.ok) {
        getBooklist();
    }
    else {
        console.log("Failed to remove a book from a list. Please, check error status: ", response.status);
    }
    
}

// Edit "mode"
changeToEditMode = (book) => {
    mode = book.id;
    let nameInput = document.getElementById("nameInput");
    let authorInput = document.getElementById("authorInput");
    let yearInput = document.getElementById("yearInput");
    let genreInput = document.getElementById("genreInput");
    let loanedInput = document.getElementById("loanedInput");
    nameInput.value = book.name;
    authorInput.value = book.author;
    yearInput.value = book.year;
    genreInput.value = book.genre;
    loanedInput.checked = book.loaned;
    let submitButton = document.getElementById("submitButton");
    submitButton.value = "Save changes";
}

//Create table
populateBooklist = (data) => {
    let ankkuriAdmin = document.getElementById("ankkuriAdmin");
    let oldList = document.getElementById("booklist");
    if(oldList) {
        ankkuriAdmin.removeChild(oldList);
    }
    let booklist = document.createElement("table");

    //Create table header

    let header = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let nameHeader = document.createElement("th");
    let nameHeaderText = document.createTextNode("Name");
    nameHeader.appendChild(nameText);

    let authorHeader = document.createElement("th");
    let authorHeaderText = document.createTextNode("Author");
    authorHeader.appendChild(authorText);

    let yearHeader = document.createElement("th");
    let yearHeaderText = document.createTextNode("Year");
    yearHeader.appendChild(yearText);

    let genreHeader = document.createElement("th");
    let genreHeaderText = document.createTextNode("Genre");
    genreHeader.appendChild(genreText);

    let loanedHeader = document.createElement("th");
    let loanedHeaderText = document.createTextNode("Loaned");
    loanedHeader.appendChild(loanedText);

    let removeHeader = document.createElement("th");
    let removeHeaderText = document.createTextNode("Remove");
    removeHeader.appendChild(removeText);

    let editHeader = document.createElement("th");
    let editHeaderText = document.createTextNode("Edit");
    editHeader.appendChild(editText);

    headerRow.appendChild(nameHeader);
    headerRow.appendChild(authorHeader);
    headerRow.appendChild(yearHeader);
    headerRow.appendChild(genreHeader);
    headerRow.appendChild(loanedHeader);
    headerRow.appendChild(removeHeader);
    headerRow.appendChild(editHeader);

    header.appendChild(headerRow);
    booklist.appendChild(header);

    //Table body

    let tableBody = document.createElement("tbody");

    for(let i = 0; i < data.length; i++) {
        let tableRow = document.createElement("tr");
        for(x in data[i]) {
            if(x == "id") {
                continue;
            }
            let column = document.createElement("td");
            let info = document.createTextNode(data[i][x]);
            column.appendChild(info);
            tableRow.appendChild(column);
        }
        //removal
        let removeColumn = document.createElement("td");
        let removeButton = document.createElement("input");
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "Remove");
        removeButton.setAttribute("name", data[i].id);
        removeButton.addEventListener("click", function(event) {
            removeBook(event.target.name);
        })
        removeColumn.appendChild(removeButton);

        //edit
        let editColumn = document.createElement("td");
        editButton = document.createElement("input");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("value", "Edit");
        editButton.addEventListener("click", function(event) {
            changeToEditMode(data[i]);
        })
        editColumn.appendChild(editButton);
        tableRow.appendChild(removeColumn);
        tableRow.appendChild(editColumn);
        tableBody.appendChild(tableRow);
    }
    booklist.appendChild(tableBody);
    booklist.setAttribute("id", "booklist");
    ankkuriAdmin.appendChild(booklist);
}


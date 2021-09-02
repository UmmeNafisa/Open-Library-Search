const bookContainer = document.getElementById("books-details");
const foundBooks = document.getElementById("found-items");

//spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleBookDetails = displayStyle => {
    document.getElementById('books-details').style.display = displayStyle;
}

//input field
const searchBook = () => {
    const searchInput = document.getElementById("input-field");
    let searchText = searchInput.value;
    // display spinner and disappear previous data 
    toggleSpinner('block')
    toggleBookDetails("none");

    loadBook(searchText);

    //clear the filed 
    searchInput.value = "";

    // error handling when the input field is empty
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
}

// load data 
function loadBook(searchText) {
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetails(data))
        .catch((error) => displayError());
}

//error massage display 
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
}

// displayBookDetails
const displayBookDetails = books => {
    console.log(books)
    bookContainer.textContent = "";
    let searchText = document.getElementById("input-field").value;
    const bookDoc = books.docs;
    const foundBooks = document.getElementById("found-items");
    console.log(books.numFound);
    //found total books number display
    if (books.numFound > 11) {
        foundBooks.innerText = `1-6 of ${books.numFound} results for "${searchText}"`
    } else if (books.numFound <= 10 && bookDoc.length > 0) {
        foundBooks.innerText = `${books.numFound} results for "${searchText}"`
    } else if (books.numFound === 0) {
        foundBooks.innerText = `No result found, please enter a valid name`
        toggleSpinner('none')
    }

    //books details 
    bookDoc.slice(0, 10)?.forEach(book => {
        const div = document.createElement('div')
        div.classList.add("divDisplay")
        div.innerHTML = ` 
        <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"> By <small class="text-muted">${book.author_name.map(name => (" " + name))}</small></p>
                <p class="card-text"> First publish year : ${book.first_publish_year} </p>
                <p class="card-text"> Publisher : ${book.publisher[0]} </p>
            
            </div>
        </div>
    `
        bookContainer.appendChild(div);
        document.getElementById('error-message').style.display = 'none';
        // display data and disappear spinner
        toggleSpinner('none')
        toggleBookDetails("block");
    })


}
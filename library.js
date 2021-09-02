const bookContainer = document.getElementById("books-details");
const foundBooks = document.getElementById("found-items");
let text;
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
    text = searchText;
    // display spinner and disappear previous data 
    toggleSpinner('block')
    foundBooks.innerText = ""
    toggleBookDetails("none");

    loadBook(searchText);

    //clear the filed 
    searchInput.value = "";
}

// load data 
function loadBook(searchText) {
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetails(data))

}

// displayBookDetails
const displayBookDetails = books => {
    console.log(books)
    //clear text content 
    bookContainer.textContent = "";

    const bookDoc = books.docs;

    //found total books number display
    const foundBooks = document.getElementById("found-items");
    console.log(books.numFound);
    if (books.numFound > 21) {
        foundBooks.innerText = `1-20 of ${books.numFound} results for "${text}"`
        foundBooks.style.color = "white"
    } else if (books.numFound <= 20 && bookDoc.length > 0) {
        foundBooks.innerText = `${books.numFound} results for "${text}"`
        foundBooks.style.color = "white"
    } else if (books.numFound === 0) {
        //error handling
        foundBooks.innerText = `No result found, please enter a valid name`
        foundBooks.style.color = "white"
        toggleSpinner('none')
    }

    //books details 
    bookDoc.slice(0, 20)?.forEach(book => {
        const div = document.createElement('div')
        div.classList.add("divDisplay")
        div.innerHTML = ` 
        <div class="col-md-3">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"> By <small class="text-muted">${book.author_name.map(name => (" " + name))}</small></p>
                <p class="card-text"> First publish year : ${book.first_publish_year ? book.first_publish_year : " 'Not available' "} </p>
                <p class="card-text"> Publisher : ${book.publisher[0] ? book.publisher[0] : " 'Not available' "} </p>
            </div>
        </div>
        <div class="col-md-2">
        <button type="button" class="btn btn-secondary"> View details </button> <br><br>
        <button type="button" class="btn btn-secondary">Add to cart </button> <br><br>
        <button type="button" class="btn btn-secondary">Buy now </button> 
        
    </div>
    `
        bookContainer.appendChild(div);
        // display data and disappear spinner
        toggleSpinner('none')
        toggleBookDetails("block");
    })


}
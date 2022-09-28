let myLibrary = [];
let bookInfo = ['Author', 'Title', 'Pages', 'Book read'];


function Book(info) {
    this.author = info[0];
    this.title = info[1];
    this.pages = info[2];
    this.bookRead = info[3];
}
Book.prototype.equals = function(bookObj){
    return (this.author === bookObj.author &&
    this.title === bookObj.title &&
    this.pages === bookObj.pages &&
    this.bookRead === bookObj.bookRead);
}
Book.prototype.getIndex = function(){
    return getLibrary().indexOf(this);
}

/* ----------------------------------------------- */

function getFormValues() {
    let author = document.querySelector('form #author').value;
    let title = document.querySelector('form #title').value;
    let pages = document.querySelector('form #pages').value;
    let radio = document.querySelector('form input[type="radio"]:checked');
    
    radio = (radio != null) ? radio.id : 'Not specified';

    return [author,title,pages,radio];
}

function valid(info) {
    let emptyInp = info.map(item => item.trim())
    .filter(item => item.length <= 0).length;
    
    return (emptyInp === 0) ? true : false; 
}

function addBookToLibrary(info) {
    if (valid(info)){
        addLibrary(new Book(info));
        refreshDisplay();
    } else {
        //highlight empty inputs
        warnInputs();
    }
}

function refreshDisplay() {
    let container = document.querySelector('.book-display');

    removeDisplayCont();

    getLibrary().forEach(book => {
        let card = makeElement('div','card');
        
        let itemIndex = 0;
        
        for (const key in book) {
            if(!book.hasOwnProperty(key)) continue;
            let item = makeElement('p','card-item');
            item.textContent = `${getBookInfo(itemIndex)} : ${book[key]}`;

            card.appendChild(item);
            itemIndex++;
        }
        let btnCont = makeElement('div','btn-content')

        let remBtn = makeElement('button','remove-card');
        remBtn.textContent = 'Remove';

        let toggleBtn = makeElement('button','toggle-read');
        toggleBtn.textContent = 'Toggle read';

        btnCont.appendChild(remBtn);
        btnCont.appendChild(toggleBtn);
        
        card.appendChild(btnCont);

        container.appendChild(card);
    });
}

function makeElement(type,className){
    let item = document.createElement(type);
    item.classList.add(className);
    return item;
}

function warnInputs() {

}

function removeDisplayCont(){
    let container = document.querySelector('.book-display');
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
function removeLibraryItem(index){
    myLibrary = getLibrary().slice(0,index)
        .concat(getLibrary().slice(index+1,getLibrary().length));

    refreshDisplay();
}
function clearLibrary(){
    myLibrary = [];
}
function addLibrary(item){
    myLibrary.push(item);
}
function getLibrary(){
    return [...myLibrary];
}
function getBookInfo(index){
    return bookInfo[index];
}

function listenAddBook(){
    document.querySelector('.create-book').addEventListener('click',()=>{
        console.log('clicked');        
    });
}

listenAddBook();
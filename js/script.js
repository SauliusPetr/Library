let myLibrary = new Map();
let bookInfo = ['Author', 'Title', 'Pages', 'Book read'];
let bookId = 0;
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

/* ----------------------------------------------- */

function getFormValues() {
    let author = document.querySelector('form #author').value;
    let title = document.querySelector('form #title').value;
    let pages = document.querySelector('form #pages').value;
    let radio = document.querySelector('form input[type="radio"]:checked');
    
    radio = (radio != null) ? radio.id : 'Not specified';

    cleanInputs();

    return [author,title,pages,radio];
}

function cleanInputs(){
    document.querySelectorAll('form input').forEach((item)=>{
        item.value = '';
    });
}

function valid(info) {
    let emptyInp = info.map(item => item.trim())
    .filter(item => item.length <= 0).length;
    
    return (emptyInp === 0) ? true : false; 
}

function addBookToLibrary(info) {
    if (valid(info)){
        addLibrary(bookId++, new Book(info));
        refreshDisplay();

        let form = document.querySelector('form');
        form.classList.remove('show-form');
        return true;
    } else {
        //highlight empty inputs
        inputWarning();
        return false;
    }
}

function inputWarning(){
    
}

function refreshDisplay() {
    let container = document.querySelector('.book-display');

    removeDisplayCont();

   myLibrary.forEach((book,Id) => {
        let card = makeElement('div','card');
        
        let itemIndex = 0;
        
        for (const key in book) {
            if(!book.hasOwnProperty(key)) continue;
            let item = makeElement('p','card-item');
            item.textContent = `${bookInfo[itemIndex]} : ${book[key]}`;

            card.appendChild(item);
            itemIndex++;
        }
        let btnCont = makeElement('div','btn-container')

        let remBtn = makeElement('button','remove-card');
        remBtn.textContent = 'Remove';
        remBtn.addEventListener('click',()=>{
            removeBook(Id);
        });

        let toggleBtn = makeElement('button','toggle-read');
        toggleBtn.textContent = 'Toggle read';
        toggleBtn.addEventListener('click',()=>{
            toggleRead(Id);
            refreshDisplay();
        });

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
function toggleRead(Id){
    let status = myLibrary.get(Id).bookRead; 
    myLibrary.get(Id).bookRead = (status === 'no')? 'yes': 
    (status==='Not specified')? 'yes' : 'no';
}

function removeDisplayCont(){
    let container = document.querySelector('.book-display');
        while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    
    
}
function removeBook(Id){
    myLibrary.delete(Id);
    refreshDisplay();
}
function addLibrary(nr,item){
    myLibrary.set(nr,item);
}

function displayForm(){
    let form = document.querySelector('form');
    let body = document.querySelector('.body-container');

    document.querySelector('.new-book').addEventListener('click',()=>{
        form.classList.toggle('show-form');
        body.classList.toggle('dim-background');
    });
     document.querySelector('.form-btn').addEventListener('click',()=>{
        form.classList.remove('show-form');
        body.classList.remove('dim-background');
        cleanInputs();
    });
}



function listenForm(){
    document.querySelector('.create-book').addEventListener('click',()=>{
        (addBookToLibrary(getFormValues())? '' : alert('Not added, check inputs.'));
    });

    document.querySelector('.close-form').addEventListener('click',()=>{
        document.querySelector('form').classList.remove('show-form');
    });
}

// so nothing gets excecuted before elements are created
window.onload = function(){
    listenForm();
    displayForm();
    addBookToLibrary(['J.R.Tolkein' ,'The Hobbit', '200','yes']);
    addBookToLibrary(['Michael Crichton' ,'Jurassic Park', '200','yes']);
    addBookToLibrary(['Jhon Messier' ,'The Messier Objects', '180','yes']);
}

/////////kazkaip sugalvok istrinti korta is masyvo

var qntddText = document.querySelector("h2");
var inputElement = document.querySelector(".inputTodo");
var buttonElement = document.querySelector(".form button");
var listElement = document.querySelector(".tarefas ul");

var todos = JSON.parse(sessionStorage.getItem('lista_tarefas')) || [];

renderTodos()

function renderTodos() {
    listElement.innerHTML = '';

    for (todo of todos) {
        var todoElement = document.createElement("li");
        var todoText = document.createTextNode('\n' + todo + ' ');

        var pos = todos.indexOf(todo)

        var linkElement = document.createElement("a");
        var linkText = document.createTextNode("x");

        var date = new Date();
        var month = date.getMonth() + 1
        var addEm = document.createTextNode('Adicionado em ' + date.getDate() + '/' + month);
        var dateParag = document.createElement("div");
        dateParag.setAttribute("class", "results")


        linkElement.setAttribute("onclick", "removeTodos(" + pos + ")")
        linkElement.setAttribute("href", "#")
        linkElement.appendChild(linkText);


        dateParag.appendChild(addEm);
        todoElement.appendChild(dateParag)
        todoElement.appendChild(todoText);
        dateParag.appendChild(linkElement);
        listElement.appendChild(todoElement);

        var qntddTodo = todos.length;
        qntddText.innerHTML = `Você possui ${qntddTodo} tarefas pendentes!`
    }

}


function addTodos() {
    var text = inputElement.value;


    todos.push(text)
    inputElement.value = ''; // limpar o input

    renderTodos();
    saveToStorage();

}

buttonElement.onclick = addTodos;

function removeTodos(pos) {
    todos.splice(pos, 1);

    var qntddTodo = todos.length;
    if (qntddTodo == 0) {
        qntddText.innerHTML = '';
    } else {
        qntddText.innerHTML = `Você possui ${qntddTodo} tarefas pendentes!`
    }


    console.log(todos)
    renderTodos();
    saveToStorage();

}

function saveToStorage(){
    sessionStorage.setItem('lista_tarefas', JSON.stringify(todos)) // o localstorage não tem a habilidade de guardar vetores dentro dele
    // o stringify transforma o nosso vetor em uma string

}
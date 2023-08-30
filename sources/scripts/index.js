
//Elementos Cpaturados
const divTasks = document.getElementById('tasks');
const buttoNew = document.getElementById('main__add');

//Dados Fictícios
const dados = ['0'];

//TaskTemplate
function generateNewTask() {
    //Div
    const newTask = document.createElement('div');
    newTask.classList.add('task__item', 'taskInit');
    newTask.id = '';

    //CheckBox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('item__check', 'task__style', 'button', 'taskInit');
    newTask.appendChild(checkBox);

    //Divider
    const divider = document.createElement('div');
    divider.classList.add('item__div', 'taskInit');
    newTask.appendChild(divider);
    
    //Input de texto
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.maxLength = '70';
    inputText.classList.add('item__input', 'task__style', 'taskInit');
    inputText.placeholder = 'My task...';
    newTask.appendChild(inputText);

    //Outro Divider
    const divider2 = document.createElement('div');
    divider2.classList.add('item__div', 'taskInit');
    newTask.appendChild(divider2);

    //Inserir Nova Task
    const buttoNewTask = document.createElement('div');
    buttoNewTask.classList.add('item__add', 'task__style', 'button', 'taskInit');
    buttoNewTask.textContent = '+';
    newTask.appendChild(buttoNewTask);

    //Outro Divider
    const divider3 = document.createElement('div');
    divider3.classList.add('item__div', 'taskInit');
    newTask.appendChild(divider3);

    //Deletar Task
    const buttoDeleteTask = document.createElement('div');
    buttoDeleteTask.classList.add('item__delete', 'task__style', 'button', 'taskInit');
    buttoDeleteTask.textContent = 'x';
    newTask.appendChild(buttoDeleteTask);

    //Retorno
    return newTask;
}

//Add Task
function addTask(index) {

    //Nova task
    const newTask = generateNewTask();

    //É a segunda Task?
    if (dados.length === 1) { //Ativar exclusão da task id 0
        divTasks.children[0].children[6].classList.add('button');
        divTasks.children[0].children[6].classList.remove('task__style__desatived');
        divTasks.children[0].children[5].classList.remove('task__style__desatived');
    }

    //Onde colocar?
    if ((typeof(index) != 'number') || (dados.find(item => item === index.toString()) == undefined)) {
        //Index e Evento
        newTask.id = (dados.length).toString();
        newTask.children[0].addEventListener('change', () => {
            newTask.children[2].classList.toggle('scratched');
        });
        newTask.children[4].addEventListener('click', () => {addTask(Number(newTask.id)+1)});
        newTask.children[6].addEventListener('click', () => {
            if (dados.length === 1) return;
            if ((dados.length > 1) && (newTask.id < dados.length)) {
                newTask.classList.remove('taskInit');
                newTask.classList.add('taskEnd');
                for (let c = 0; c < newTask.children.length; c++) {
                    const child = newTask.children[c];
                    child.classList.remove('taskInit');
                    child.classList.add('taskEnd');
                }
                newTask.addEventListener('animationend', () => {
                    deleteTask(newTask.id);
                });
            }
        });
        //Adicionar na Lista
        dados.push(newTask.id);

        //Adicionar no HTML
        divTasks.appendChild(newTask);
        newTask.scrollIntoView({behavior: 'smooth', block: 'center'});

        //Selecionar um Input
        (newTask.querySelector('.item__input')).focus();
        return;
    }
    
    //Mover o index de todo mundo para frente
    for (let c = index; c < divTasks.children.length; c++) {
        const child = divTasks.children[c];
        child.id = (Number(child.id) + 1).toString();
    }

    //Adicionar Task
    newTask.id = index.toString();
    newTask.children[0].addEventListener('change', () => {
        newTask.children[2].classList.toggle('scratched');
    });
    newTask.children[4].addEventListener('click', () => {addTask(Number(newTask.id)+1)});
    newTask.children[6].addEventListener('click', () => {
        if (dados.length === 1) return;
        if ((dados.length > 1) && (newTask.id < dados.length)) {
            newTask.classList.remove('taskInit');
            newTask.classList.add('taskEnd');
            for (let c = 0; c < newTask.children.length; c++) {
                const child = newTask.children[c];
                child.classList.remove('taskInit');
                child.classList.add('taskEnd');
            }
            newTask.addEventListener('animationend', () => {
                deleteTask(newTask.id);
            });
        }
    });

    //Adicionar na Lista
    dados.push((dados.length).toString());

    //Adicionar no HTML
    divTasks.insertBefore(newTask, divTasks.children[index]);
    newTask.scrollIntoView({behavior: 'smooth', block: 'center'});

    //Selecionar o input
    (newTask.querySelector('.item__input')).focus();
}

//Delete Task
function deleteTask(index) {
    //É possível?
    if ((dados.length <= 1) || (index >= dados.length)) return;

    //Deletar
    const childrenForDelete = divTasks.querySelectorAll('.task__item');
    divTasks.removeChild(childrenForDelete[index]);

    //Subtratir todos os index
    for (let c = index; c < divTasks.children.length; c++) {
        const child = divTasks.children[c];
        child.id = (Number(child.id) - 1).toString();
    }

    //Retirar item da lista
    dados.pop();

    //Só existe uma task?
    if (dados.length === 1) { //Desativar exclusão da task id 0
        divTasks.children[0].children[6].classList.remove('button');
        divTasks.children[0].children[6].classList.add('task__style__desatived');
        divTasks.children[0].children[5].classList.add('task__style__desatived');
    }
}

//Events
buttoNew.addEventListener('click', addTask); //Botão global de Add
divTasks.children[0].children[0].addEventListener('change', () => {
    divTasks.children[0].children[2].classList.toggle('scratched');
}); //1º Task
divTasks.children[0].children[4].addEventListener('click', () => {addTask(Number(divTasks.children[0].id)+1)}); //1º Task
divTasks.children[0].children[6].addEventListener('click', () => {
    if (dados.length === 1) return;
    if ((dados.length > 1) && (divTasks.children[0].id < dados.length)) {
        divTasks.children[0].classList.remove('taskInit');
        divTasks.children[0].classList.add('taskEnd');
        for (let c = 0; c < divTasks.children[0].children.length; c++) {
            const child = (divTasks.children[0]).children[c];
            child.classList.remove('taskInit');
            child.classList.add('taskEnd');
        }
        (divTasks.children[0]).addEventListener('animationend', () => {
            deleteTask((divTasks.children[0]).id);
        });
    }
}); //1º Task

//Events Keys
document.addEventListener('keydown', function(event) {
    if (event.key === '+') {
        addTask();
        divTasks.lastChild.scrollIntoView({behavior: 'smooth', block: 'center'});
        divTasks.lastChild.addEventListener('animationstart', () => {divTasks.lastChild.children[2].value = '';});
    }
    
}); //Add Task
document.addEventListener('keydown', function(event) {
    if (event.key === '-') {
        if (dados.length === 1) return;
        if ((dados.length > 1) && (divTasks.lastChild.id < dados.length)) {
            divTasks.lastChild.classList.remove('taskInit');
            divTasks.lastChild.classList.add('taskEnd');
            for (let c = 0; c < divTasks.lastChild.children.length; c++) {
                const child = divTasks.lastChild.children[c];
                child.classList.remove('taskInit');
                child.classList.add('taskEnd');
            }
            divTasks.lastChild.addEventListener('animationend', () => {
                deleteTask(divTasks.lastChild.id);
            });
        }
    }
}); //Delete Task

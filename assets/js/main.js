const input = document.querySelector('.inputTarefa');
const botaoAdicionaTarefa = document.querySelector('.botaoAdicionaTarefa');
const listaDeTarefas = document.querySelector('.listaDeTarefas');
const titulo = document.querySelector('.titulo');

// Função para recuperar as tarefas salvas no armazenamento do navegador
function salvarTarefas() {
    const liTarefas = listaDeTarefas.querySelectorAll('li');
    const tarefas = [];

    for (let tarefa of liTarefas) {
        let textoTarefa = tarefa.innerText;
        textoTarefa = textoTarefa.replace('Apagar', ' ').trim();
        tarefas.push(textoTarefa);
    }

    const tarefasJSON = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}


// Função para recuperar as tarefas salvas no armazenamento do navegador
function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const tarefasArray = JSON.parse(tarefas);

    for (let tarefa of tarefasArray) {
        criaTarefa(tarefa);
    }
}

// Adiciona a data atual ao título
function adicionaDataAtual() {
    const date = new Date();
    titulo.innerHTML += date.toLocaleDateString('pt-BR', {
        dateStyle: 'full'
    });
}

// Cria elemento da lista
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// Limpa o campo para inserção da tarefa e volta o foco a ele
function limpaInput() {
    input.value = '';
    input.focus();
}

// Cria o botão para apagar
function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'botao botaoApagar');
    li.appendChild(botaoApagar);
}

//Cria a tarefa, a adicionando à lista
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    listaDeTarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

// Torna a tecla ENTER um "adicionador de tarefa"
input.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        if (!input.value) return;
        criaTarefa(input.value);
    }
});


// Monitora o evento de clique do mouse para adicionar uma nova tarefa
botaoAdicionaTarefa.addEventListener('click', e => {
    if (!input.value) return;
    criaTarefa(input.value);
});

// Adiciona funcionalidade ao botao apagar
document.addEventListener('click', e => {
    const elemento = e.target;
    if (elemento.classList.contains('botaoApagar')) {
        elemento.parentElement.remove();
    }
    salvarTarefas();
});

// Chamada das funções para recuperar as tarefas e atualizar a data atual
adicionaTarefasSalvas();
adicionaDataAtual();
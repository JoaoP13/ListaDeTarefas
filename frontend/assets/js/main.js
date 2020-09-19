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

		// Se o texto da tarefa inclui o botão concluída,
		// é porque o usuário ainda tem a opção de concluir
		let tarefaConcluida = !textoTarefa.includes('Concluída');

        textoTarefa = textoTarefa.replace('Apagar', ' ').trim();
        textoTarefa = textoTarefa.replace('Concluída', ' ').trim();
        tarefas.push({
			texto: textoTarefa,
			concluida: tarefaConcluida
		});
    }

    const tarefasJSON = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

// Função para recuperar as tarefas salvas no armazenamento do navegador
function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas') || '[]';
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

// Cria o botão para concluir
function criaBotaoConcluido(li) {
    li.innerText += ' ';
    const botaoConcluido = document.createElement('button');
    botaoConcluido.innerText = 'Concluída';
	botaoConcluido.setAttribute('class', 'botao botaoConcluido');
    li.appendChild(botaoConcluido);
}

// Cria o botão para apagar
function criaBotaoApagar(li) {
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'botao botaoApagar');
    li.appendChild(botaoApagar);
}

//Cria a tarefa, a adicionando à lista
function criaTarefa(objetoInput) {
	const li = criaLi();
	li.innerText = objetoInput.texto;
    listaDeTarefas.appendChild(li);
	limpaInput();

	if (objetoInput.concluida)
		li.classList.add('textoConcluido');
	else
		criaBotaoConcluido(li);

    criaBotaoApagar(li);
    salvarTarefas();
}

// Torna a tecla ENTER um "adicionador de tarefa"
input.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        if (!input.value) return;
        criaTarefa({ texto: input.value });
    }
});


// Monitora o evento de clique do mouse para adicionar uma nova tarefa
botaoAdicionaTarefa.addEventListener('click', e => {
    if (!input.value) return;
	criaTarefa({ texto: input.value });
});

// Adiciona funcionalidade ao botao apagar
document.addEventListener('click', e => {
    const elemento = e.target;
    if (elemento.classList.contains('botaoApagar')) {
        elemento.parentElement.remove();
    }
    salvarTarefas();
});

// Adiciona funcionalidade ao botao concluido
document.addEventListener('click', e => {
    const elemento = e.target;
    if (elemento.classList.contains('botaoConcluido')) {
		elemento.parentElement.classList.add('textoConcluido');
		elemento.remove();
    }
    salvarTarefas();
});

// Chamada das funções para recuperar as tarefas e atualizar a data atual
adicionaTarefasSalvas();
adicionaDataAtual();

const exibeTarefas =() => {
    const lista =document.getElementById('idListadeTarefas');
    const tbody = lista.querySelector('tbody');


tbody.innerHTML =
`<tr>
<th>DATA</th>
<th>NOME</th>
<th>STATUS</th>
<th>EDITAR</th>
<th>EXCLUIR</th>
</tr>`;

const dados =JSON.parse(localStorage.getItem('dados')) || [];
dados.forEach((dado ,index) => {
    const conteudoDado =
    `<tr>
                <td>${dado.data}</td>
                <td>${dado.nome}</td>
                <td>${dado.status}</td>
                <th><i class="fa fa-pencil-square-o" aria-hidden="true" onclick="editaDado(${index})"></i></th>
                <th><i class="fa fa-trash" aria-hidden="true" onclick="deleteDado(${index})"></i></th>
            </tr>`;

        const row = tbody.insertRow();
     row.innerHTML = conteudoDado;
});

}

const addDado =(event) => {
    event.preventDefault();
    let form = document.getElementById('idDadoForm');
    let data = document.getElementById('idData').value.trim();
    let nome = document.getElementById('idNome').value.trim();
    let status= document.getElementById('idStatus').value.trim();
    let camposVazios = [];

    data =="" ? camposVazios.push("Data") : '';

    
    if(nome ==""){
        camposVazios.push("Nome");
    }

    if(status =="") {
        camposVazios.push("Status");
    }
    if(data == "" || nome =="" || status ==""){
        alert("Por favor, preencha todos os campos!" + camposVazios);
    }else {
        const dado = {
            data: data,
            nome: nome,
            status: status,
        }
     let dados = JSON.parse(localStorage.getItem('dados')) || [];

     dados.push(dado);
     localStorage.setItem('dados' , JSON.stringify(dados));

     form.reset();
     exibeTarefas();
    }
}
const cancelaForm = (event) => {
    event.preventDefaut();
    document.getElementById('idDadoForm').reset();
}

const deleteDado =(index) => {
    let dados = JSON.parse(localStorage.getItem('dados')) || [];

    dados.splice(index, 1);

    localStorage.setItem('dados', JSON.stringify(dados));
    exibeTarefas();
}

const editaDado = (index) => {
    const dados = JSON.parse(localStorage.getItem('dados')) || [];
    const dado = dados[index];
    localStorage.setItem('dados', JSON.stringify(dados));
    // exibeTarefas();

    document.getElementById('idData').value = dado.data;
    document.getElementById('idNome').value = dado.nome;
    document.getElementById('idStatus').value = dado.status;

    const atualizaDado = (event) => {
        event.preventDefault();

        dado.data = document.getElementById('idData').value.trim();
        dado.nome = document.getElementById('idNome').value.trim();
        dado.status = document.getElementById('idStatus').value.trim();
        
        const upDado = JSON.stringify(dados);
        localStorage.setItem('dados', upDado);

        document.getElementById('idDadoForm').reset();
        
        document.querySelector('.btnAdicionar').value="Adicionar";
        document.querySelector('.btnAdicionar').removeEventListener('click', atualizaDado);
        document.querySelector('.btnAdicionar').addEventListener('click', addDado);
        exibeTarefas();

    } 
    document.querySelector('.btnAdicionar').value="Salva";
    document.querySelector('.btnAdicionar').removeEventListener('click', addDado);
    document.querySelector('.btnAdicionar').addEventListener('click', atualizaDado);
    
}


const buscaDado  = () => {
    const barraPesquisa = document.getElementById('idPesquisa').value.trim().toLowerCase();
    const tabela = document.getElementById('idTabelaContatos');
    const linhas = tabela.getElementsByTagName('tr');
    const quantidadeLinhas = linhas.length;

    for (let i = 1; i < quantidadeLinhas; i++){
        const celulas = linhas[i].getElementsByTagName('td');
        const quantidadeCelulas = celulas.length;
        let busca = false;

        for(let j = 0; j < quantidadeCelulas; j++){
            const textoCelulas = celulas[j].textContent.toLocaleLowerCase();
            if(textoCelulas.includes(barraPesquisa)){
                busca = true;
                break;
            }
        }
        busca ? linhas[i].style.display = '' : linhas[i].style.display = 'none';
    }

}
const init = () => {
    document.querySelector('.btnAdicionar').addEventListener('click', addDado);
    exibeTarefas();

}

init(); //inicializo a aplicação

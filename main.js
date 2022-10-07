var carros = [];
var flag = 0;
var contador = 0; 
var soma_total = 0;
var quantidade = 0;

var botao_salvar = document.getElementById("Salvar");
botao_salvar.addEventListener("click", salvar);

function salvar(){

    let marca_input = document.getElementById("marca");
    let modelo_input = document.getElementById("modelo");
    let valor_input = document.getElementById("valor");

    console.log(marca_input.length);

    //verifica se algum campo nao esta vazio
    if( marca_input.value.length > 0 && modelo_input.value.length > 0 && valor_input.value.length > 0){
        //cria objeto carro
        var carro_obj = {};  

        carro_obj.marca = marca_input.value;
        carro_obj.modelo = modelo_input.value;
        carro_obj.valor = valor_input.value;
        carro_obj.vender = document.createElement("button");

        carro_obj.vender.innerHTML = "Vender";
        carro_obj.vender.id = `botao${contador}`;
        
        //vetor carros recebe os objetos
        carros.push(carro_obj);
        fabrica_tabela(carro_obj.marca, carro_obj.modelo, carro_obj.valor, carro_obj.vender);

        contador++;
    }else{
        alert("Impossível cadastrar carro, há algum campo vazio!");
    }
}

//adiciona elementos na tabela
function fabrica_tabela(marca, modelo, _valor, _vender){

    let tabela = document.getElementById("conteiner_carros").style.visibility = "visible";

    //recebe tabela e verifica o numero de linhas para inserir abaixo
    let tb = document.getElementById("tabela_carros");
    let qtdLinhas = tb.rows.length;
    let linha = tb.insertRow(qtdLinhas);

    //insere variaveis nas colunas correspondentes
    let C_marca = linha.insertCell(0);
    let C_nome = linha.insertCell(1);
    let C_valor = linha.insertCell(2);
    let C_vender = linha.insertCell(3);

    C_marca.innerHTML = marca;
    C_nome.innerHTML = modelo;
    C_valor.innerHTML = _valor;
    C_vender.innerHTML = _vender.outerHTML;

    flag = 2;
    iniciar_vendas(flag);
}

//funcao auxiliar para chamar a funcao quando botar vender eh acionado
function iniciar_vendas(x){
    if(flag === 2){
        var botao_vender = document.getElementById(`botao${contador}`);
        botao_vender.addEventListener("click", carro_vendido); 
    }
}

//verifica qual carro foi vendido atraves do id e exclui sua linha
function carro_vendido(){   
    let i = 0;
    let flag = 0;
    let aux = (this.id);
    let table = document.getElementById("tabela_carros");

    let achar_carro = (x) => {
        if(x === aux){
            return aux;
        }else{
            return 0;
        }
    }

    while(i < table.rows.length - 1 && flag === 0){
        let resto = achar_carro(carros[i].vender.id);

        if(resto === aux){
            flag = 1;
            quantidade++;
            soma_total += parseFloat(carros[i].valor);
            let lixo = carros.splice(i, 1);
        }
        i++;
    }
    fabricar_tabela2(quantidade, soma_total);
    document.getElementById("tabela_carros").deleteRow(i);
}   

//atualiza os dados do painel de vendas
function fabricar_tabela2(_qtd, _smt){
    let linha1 = document.getElementById("linha_1");
    linha1.innerHTML = _qtd;

    let linha2 = document.getElementById("linha_2");
    linha2.innerHTML = _smt;
}

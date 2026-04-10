export async function getRates(base: string){
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    return data;
}

/*
notas de estudo:

Criação de uma função assíncrona para obter as taxas de cambio
na API

o 'export' é usado para expor a função para outros arquivos que
importarem esse módulo

A função é assincrona porque o fetch na API não é instantaneo
portanto precisa esperar a resposta com o comando 'await'
o comando 'await' só pode ser usando dentro de uma async function 
o comando 'await' pausa a execução até receber resposta

'base' é a moeda base para bater na API
'base' está identada para ser parametro na URL da API

'fetch' é a função para fazer requisições HTTP
é criada a variável data para armazerar a resposta
a resposta é convertida para JSON usando o metodo .json()

por fim, retorna 'data'
*/
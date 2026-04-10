import { useState } from "react";
import { getRates } from "../services/currencyService";

export default function Converter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

    const convert = async () => {
        try {
            const data = await getRates(fromCurrency);
            const rate = data.rates[toCurrency];

            setConvertedAmount(amount * rate);
        }
        catch (error) {
            alert('Erro na conversão');
        }
    };

    return ( //tudo dentro do return é JSX(HTML + JS)
        <div>
            <h2>Conversor de Moedas</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            ></input>

            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {currencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>


        </div>

    );
}

/*
notas de estudo:

importando useState e a função do currencyService.ts

declarando a function do Converter:
    criando variaveis com valores iniciais usando useState:
    amount: valor a ser convertido, inicia com 1
    setAmount: função para atualizar o valor de amount

    delcara a const currencies com os valores para seleção la no JSX
    criando a função convert para fazer a conversão:
        chama a função getRates passando o parametro moeda de origem
        armazena a resposta na variavel data
        extrai a taxa de cambio usando data.rates[toCurrency]
            aqui precisa saber o formato da resposta da API em json
            aqui ele entra no data, depois na propriedade rates, onde estão as taxas
        atualiza o estado convertedAmount multiplicando o valor pelo rate
        caso haja algum erro na conversão, exibe um alerta

no return, temos o JSX que define a interface do conversor
"Em um componente funcional do React, o return define o que será renderizado na tela. Tudo dentro dos parênteses é JSX, uma sintaxe que mistura HTML com JavaScript"
esse return vai criar os elementos visuais na tela


criando o return do JSX:
    <div> //div é um container para agrupar os elementos
    depois um titulo

    criando um input: 
    definindo o tipo como number para aceitar apenas numeros
    o valor do input é exibido usando a variável amount
    onChange é um evento de gatilho que aciona quando o valor do input muda
    o onChange:
        (e) é o evento que ocorre
        e.target é o elemento que estamos interagindo
        e.target.value é o valor atual do input, que é uma string
        usamos Number() para converter essa string em um numero e atualizamos o estado amount com setAmount
        setAmout é utilizado para atualizar o valor de amount
        essa função pode ser criada separadamente ou diretamente no onChange, como foi feito aqui
    
    criando o select de moeda base:
        entender e documentar o select


    criando o select de moeda destino:
        criar o select se baseando no anterior


    criando o botão de converter:
        botão devera chamar a funcão OnClick q deve receber a funcao convert


    exibir resultado:
        

    fim da div

    fecha o return
*/
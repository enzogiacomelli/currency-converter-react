import { useState } from "react";
import { getRates } from "../services/currencyService";
import "./Converter.css";


export default function Converter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("BRL");
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    const currencies = ["BRL", "USD", "EUR", "GBP", "JPY", "AUD"];

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
        <div className="converter-box">
            <h2 className="titulo">Conversor de Moedas</h2>
            <input
                className="input-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            ></input>

            <select className="select-currencies" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {currencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select className="select-currencies" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {currencies.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            
            <button onClick={convert}>Converter</button>
            
            <p>Resultado: {convertedAmount !== null ? convertedAmount.toFixed(2) : "0.00"}</p>

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
        o valor do select é controlado pela variável fromCurrency
        quando o evento onChange ocorre, atualiza o estado fromCurrency com o valor selecionado com e.target.value
        para listar as opções do select, o metodo map é chamado para criar um option para cada item do array currencies(como se fosse um for)
        cada option tem uma key unica (nesse caso, o proprio valor da moeda) e o valor do option é a moeda (c)
        a moeda é exibida dentro do option com o mesmo valor do option
        c é o item da lista currencies


    criando o select de moeda destino:
        igual o select anterior mas controlado pela variavel toCurrency
        

    criando o botão de converter:
        botão com o texto "Converter"
        no evento de onClick, chama a função convert para realizar a conversão
        a função convert atualiza o valor de convertedAmount


    exibir resultado:
        um paragrafo que exibe o resultado da conversão
        se convertedAmount for diferente de null, exibe o valor formatado com 2 casas decimais usando toFixed(2)
        caso contrário, exibe "0.00" como valor padrão

    fim da div

    fecha o return
*/
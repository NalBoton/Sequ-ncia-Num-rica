let numeros = [];

function adicionarNumero() {
    let num = parseInt(document.getElementById('numero').value);
    if (isNaN(num) || num < 0 || num > 100) {
        document.getElementById('status').innerText = "Número inválido! Digite entre 0 e 100.";
        return;
    }
    if (numeros.length >= 20) {
        document.getElementById('status').innerText = "Já foram inseridos 20 números.";
        return;
    }
    numeros.push(num);
    document.getElementById('status').innerText = `Número ${num} adicionado. (${numeros.length}/20)`;
    document.getElementById('numero').value = "";
}

function analisar() {
    if (numeros.length < 20) {
        document.getElementById('status').innerText = "Digite todos os 20 números antes de analisar.";
        return;
    }

    let original = [...numeros];
    let ordenados = [...numeros].sort((a,b) => b - a);
    let somaTotal = numeros.reduce((acc, val) => acc + val, 0);
    let maior = Math.max(...numeros);
    let menor = Math.min(...numeros);

    let contagem = {};
    numeros.forEach(n => contagem[n] = (contagem[n] || 0) + 1);

    let repetidos = Object.keys(contagem).filter(k => contagem[k] > 1).map(Number).sort((a,b) => b-a);
    let somaRepetidos = repetidos.reduce((acc, val) => acc + (val * contagem[val]), 0);
    let porcentagemRepetidos = ((somaRepetidos / somaTotal) * 100).toFixed(2);

    // Resultados textuais
    let resultadoHTML = `
        <h2>Resultados</h2>
        <p><b>Sequência Original:</b> ${original.join(", ")}</p>
        <p><b>Ordenados (decrescente):</b> ${ordenados.join(", ")}</p>
        <p><b>Soma Total:</b> ${somaTotal}</p>
        <p><b>Maior:</b> ${maior} | <b>Menor:</b> ${menor}</p>
        <p><b>Números Repetidos:</b> ${repetidos.join(", ") || "Nenhum"}</p>
        <p><b>Soma dos Repetidos:</b> ${somaRepetidos}</p>
        <p><b>Porcentagem dos Repetidos:</b> ${porcentagemRepetidos}%</p>
    `;
    document.getElementById('resultado').innerHTML = resultadoHTML;

    // Criar gráfico de barras
    new Chart(document.getElementById('graficoBarras'), {
        type: 'bar',
        data: {
            labels: Object.keys(contagem),
            datasets: [{
                label: 'Quantidade de Ocorrências',
                data: Object.values(contagem),
                backgroundColor: 'skyblue'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Criar gráfico de pizza
    new Chart(document.getElementById('graficoPizza'), {
        type: 'pie',
        data: {
            labels: ['Soma Repetidos', 'Outros'],
            datasets: [{
                data: [somaRepetidos, somaTotal - somaRepetidos],
                backgroundColor: ['red', 'lightgreen']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

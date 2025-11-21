let historicoInvestido = [];
let historicoLucro = [];

function atualizarValores() {
    let totalInvestido = historicoInvestido.reduce((a, b) => a + b, 0);
    let totalLucro = historicoLucro.reduce((a, b) => a + b, 0);

    let roi = totalInvestido > 0 ? (totalLucro / totalInvestido * 100).toFixed(2) : 0;

    document.getElementById("valorInvestido").innerText = 
        "R$ " + totalInvestido.toFixed(2);

    document.getElementById("lucroTotal").innerText = 
        "R$ " + totalLucro.toFixed(2);

    document.getElementById("roi").innerText = roi + "%";

    atualizarGrafico();
}

function adicionarEntrada() {
    let investido = Number(document.getElementById("inputInvestido").value);
    let lucro = Number(document.getElementById("inputLucro").value);

    if (!investido || !lucro) {
        alert("Preencha os campos!");
        return;
    }

    historicoInvestido.push(investido);
    historicoLucro.push(lucro);

    document.getElementById("inputInvestido").value = "";
    document.getElementById("inputLucro").value = "";

    atualizarValores();
}

let grafico;

function atualizarGrafico() {
    let ctx = document.getElementById("graficoGanho").getContext("2d");

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "line",
        data: {
            labels: historicoInvestido.map((_, i) => "Entrada " + (i+1)),
            datasets: [{
                label: "Lucro",
                data: historicoLucro,
                borderWidth: 3
            }]
        }
    });
}

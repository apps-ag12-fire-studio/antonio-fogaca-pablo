// --- LÓGICA DO REDIRECIONADOR AUTOMÁTICO COM DELAY ---

// 1. Lista com os seus links do WhatsApp, revertida para o formato universal.
const whatsappLinks = [
  "https://api.whatsapp.com/send/?phone=5512981362010&text=Resgatar%20convite%20do%20Encontro%20-%20Antônio%20Fogaça%20e%20Pablo%20Marçal",
  "https://api.whatsapp.com/send/?phone=5512981362010&text=Resgatar%20convite%20do%20Encontro%20-%20Antônio%20Fogaça%20e%20Pablo%20Marçal",
  "https://api.whatsapp.com/send/?phone=556234420246&text=Resgatar%20convite%20do%20Encontro%20-%20Antônio%20Fogaça%20e%20Pablo%20Marçal",
  "https://api.whatsapp.com/send/?phone=556234420961&text=Resgatar%20convite%20do%20Encontro%20-%20Antônio%20Fogaça%20e%20Pablo%20Marçal"
];

// 2. Pega o contador de acessos do localStorage.
let accessCount = parseInt(localStorage.getItem('whatsappAccessCount')) || 0;

// 3. Calcula qual link usar.
const linkParaRedirecionar = whatsappLinks[accessCount % whatsappLinks.length];

// 4. Mostra no console o link que será aberto (bom para depuração).
console.log(`Acesso #${accessCount + 1}: Redirecionando para ${linkParaRedirecionar} em 5 segundos.`);

// 5. Incrementa e salva o contador para o próximo acesso.
accessCount++;
localStorage.setItem('whatsappAccessCount', accessCount);


// --- LÓGICAS DE CONTAGEM E REDIRECIONAMENTO ---

// Seleciona os elementos da página uma única vez
const countdownElement = document.getElementById('countdown');
const filaElement = document.getElementById('fila-counter');

// Variáveis para os contadores
let segundosRestantes = 5;
let pessoasNaFila = 238;
const maxPessoas = 507;
const saltos = [7, 11, 15, 20];

// Variáveis para controlar os intervalos
let countdownInterval;
let filaTimeout;

// Função para atualizar o contador da fila
function atualizarFila() {
    if (pessoasNaFila >= maxPessoas) {
        filaElement.textContent = maxPessoas;
        return; 
    }

    const salto = saltos[Math.floor(Math.random() * saltos.length)];
    pessoasNaFila += salto;

    if (pessoasNaFila > maxPessoas) {
        pessoasNaFila = maxPessoas;
    }
    
    filaElement.textContent = pessoasNaFila;
    
    // Agenda a próxima atualização
    const proximoIntervalo = Math.random() * 400 + 250;
    filaTimeout = setTimeout(atualizarFila, proximoIntervalo);
}

// Função para atualizar a contagem regressiva
function iniciarCountdown() {
    countdownInterval = setInterval(() => {
        segundosRestantes--;
        if (countdownElement) {
            countdownElement.textContent = segundosRestantes > 0 ? segundosRestantes : 0;
        }
        if (segundosRestantes <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Função principal que inicia tudo
function iniciarProcesso() {
    // Inicia os contadores visuais
    iniciarCountdown();
    atualizarFila();

    // Agenda o redirecionamento e a limpeza final
    setTimeout(() => {
        // Para qualquer contador que ainda possa estar rodando
        clearInterval(countdownInterval);
        clearTimeout(filaTimeout);
        
        // Redireciona o usuário
        window.location.href = linkParaRedirecionar;
    }, 5000); // 5000ms = 5 segundos
}

// Inicia todo o processo quando a página carrega
iniciarProcesso();

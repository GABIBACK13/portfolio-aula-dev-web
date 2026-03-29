// Dados dos signos
const signos = [
    {
        nome: 'Capricórnio',
        dataInicio: '22/12',
        dataFim: '20/01',
        descricao: 'Capricórnio é regido por Saturno e simboliza ambição e responsabilidade. Os capricornianos são disciplinados, práticos e persistentes. Valorizam trabalho duro e conquistas.',
        emoji: '♑️'
    },
    {
        nome: 'Aquário',
        dataInicio: '21/01',
        dataFim: '19/02',
        descricao: 'Aquário é regido por Urano e representa inovação e humanitarismo. Os aquarianos são originais, independentes e visionários. Valorizam liberdade e causas sociais.',
        emoji: '♒️'
    },
    {
        nome: 'Peixes',
        dataInicio: '20/02',
        dataFim: '20/03',
        descricao: 'Peixes é regido por Netuno e simboliza sensibilidade e espiritualidade. Os piscianos são empáticos, criativos e intuitivos. Possuem forte conexão com o mundo emocional e espiritual.',
        emoji: '♓️'
    },
    {
        nome: 'Áries',
        dataInicio: '21/03',
        dataFim: '20/04',
        descricao: 'Áries é o primeiro signo do zodíaco, regido por Marte. Os arianos são conhecidos por sua energia, coragem e espírito pioneiro. São determinados, impulsivos e gostam de liderar.',
        emoji: '♈️'
    },
    {
        nome: 'Touro',
        dataInicio: '21/04',
        dataFim: '20/05',
        descricao: 'Touro é regido por Vênus e representa estabilidade e praticidade. Os taurinos são pacientes, leais e apreciam conforto e segurança. Possuem forte determinação e persistência.',
        emoji: '♉️'
    },
    {
        nome: 'Gêmeos',
        dataInicio: '21/05',
        dataFim: '20/06',
        descricao: 'Gêmeos é regido por Mercúrio e simboliza comunicação e versatilidade. Os geminianos são curiosos, adaptáveis e sociáveis. Adoram aprender e compartilhar conhecimento.',
        emoji: '♊️'
    },
    {
        nome: 'Câncer',
        dataInicio: '21/06',
        dataFim: '21/07',
        descricao: 'Câncer é regido pela Lua e representa emoção e intuição. Os cancerianos são sensíveis, protetores e valorizam família e lar. Possuem forte conexão emocional com os outros.',
        emoji: '♋️'
    },
    {
        nome: 'Leão',
        dataInicio: '22/07',
        dataFim: '22/08',
        descricao: 'Leão é regido pelo Sol e simboliza criatividade e liderança. Os leoninos são confiantes, generosos e carismáticos. Gostam de estar no centro das atenções e inspirar outros.',
        emoji: '♌️'
    },
    {
        nome: 'Virgem',
        dataInicio: '23/08',
        dataFim: '22/09',
        descricao: 'Virgem é regido por Mercúrio e representa análise e perfeccionismo. Os virginianos são detalhistas, organizados e práticos. Buscam sempre melhorar e ajudar os outros.',
        emoji: '♍️'
    },
    {
        nome: 'Libra',
        dataInicio: '23/09',
        dataFim: '22/10',
        descricao: 'Libra é regido por Vênus e simboliza equilíbrio e harmonia. Os librianos são diplomáticos, justos e apreciam beleza e arte. Buscam paz e relacionamentos harmoniosos.',
        emoji: '♎️'
    },
    {
        nome: 'Escorpião',
        dataInicio: '23/10',
        dataFim: '21/11',
        descricao: 'Escorpião é regido por Plutão e Marte, simbolizando intensidade e transformação. Os escorpianos são profundos, determinados e misteriosos. Possuem forte intuição e paixão.',
        emoji: '♏️'
    },
    {
        nome: 'Sagitário',
        dataInicio: '22/11',
        dataFim: '21/12',
        descricao: 'Sagitário é regido por Júpiter e representa expansão e otimismo. Os sagitarianos são aventureiros, filosóficos e honestos. Amam liberdade e buscar novos horizontes.',
        emoji: '♐️'
    }
];

// Definir data máxima como hoje
document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data_nascimento').setAttribute('max', hoje);
});

// Função para encontrar o signo
function encontrarSigno(dataNascimento) {
    const data = new Date(dataNascimento + 'T00:00:00');
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // getMonth() retorna 0-11

    for (let signo of signos) {
        const [diaInicio, mesInicio] = signo.dataInicio.split('/').map(Number);
        const [diaFim, mesFim] = signo.dataFim.split('/').map(Number);

        // Signo que atravessa o ano (ex: Capricórnio)
        if (mesInicio > mesFim) {
            if ((mes === mesInicio && dia >= diaInicio) || (mes === mesFim && dia <= diaFim)) {
                return signo;
            }
        } 
        // Signos normais
        else {
            if (mes === mesInicio && mes === mesFim) {
                if (dia >= diaInicio && dia <= diaFim) {
                    return signo;
                }
            } else if (mes === mesInicio && dia >= diaInicio) {
                return signo;
            } else if (mes === mesFim && dia <= diaFim) {
                return signo;
            } else if (mes > mesInicio && mes < mesFim) {
                return signo;
            }
        }
    }

    return null;
}

// Função para formatar data
function formatarData(dataString) {
    const data = new Date(dataString + 'T00:00:00');
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para exibir resultado
function exibirResultado(signo, dataNascimento) {
    document.getElementById('signo-emoji').textContent = signo.emoji;
    document.getElementById('signo-nome').textContent = signo.nome;
    document.getElementById('signo-periodo').textContent = `${signo.dataInicio} a ${signo.dataFim}`;
    document.getElementById('data-formatada').textContent = formatarData(dataNascimento);
    document.getElementById('signo-descricao').textContent = signo.descricao;

    // Esconder formulário e mostrar resultado
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

// Função para voltar ao formulário
function voltarFormulario() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('signo-form').reset();
}

// Event listener para o formulário
document.getElementById('signo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dataNascimento = document.getElementById('data_nascimento').value;
    
    if (!dataNascimento) {
        alert('Por favor, informe sua data de nascimento.');
        return;
    }

    const signo = encontrarSigno(dataNascimento);
    
    if (signo) {
        exibirResultado(signo, dataNascimento);
    } else {
        alert('Não foi possível identificar seu signo. Por favor, verifique a data informada.');
    }
});

<?php 
include('layouts/header.php'); 

if (!isset($_POST['data_nascimento']) || empty($_POST['data_nascimento'])) {
    header('Location: index.php');
    exit;
}

$data_nascimento = $_POST['data_nascimento'];

$signos = simplexml_load_file("signos.xml");

function converterData($dataStr, $ano) {
    list($dia, $mes) = explode('/', $dataStr);
    return DateTime::createFromFormat('Y-m-d', "$ano-$mes-$dia");
}

$dataNascimentoObj = DateTime::createFromFormat('Y-m-d', $data_nascimento);
$diaNasc = $dataNascimentoObj->format('d');
$mesNasc = $dataNascimentoObj->format('m');

$signoEncontrado = null;

// Mapeamento de signos para emojis
$signoEmojis = [
    'Áries' => '♈️',
    'Touro' => '♉️',
    'Gêmeos' => '♊️',
    'Câncer' => '♋️',
    'Leão' => '♌️',
    'Virgem' => '♍️',
    'Libra' => '♎️',
    'Escorpião' => '♏️',
    'Sagitário' => '♐️',
    'Capricórnio' => '♑️',
    'Aquário' => '♒️',
    'Peixes' => '♓️'
];

foreach ($signos->signo as $signo) {
    $dataInicio = (string)$signo->dataInicio;
    $dataFim = (string)$signo->dataFim;
    
    list($diaInicio, $mesInicio) = explode('/', $dataInicio);
    list($diaFim, $mesFim) = explode('/', $dataFim);
    
    if ($mesInicio > $mesFim) {
        if (($mesNasc == $mesInicio && $diaNasc >= $diaInicio) || 
            ($mesNasc == $mesFim && $diaNasc <= $diaFim)) {
            $signoEncontrado = $signo;
            break;
        }
    } else {
        if ($mesNasc == $mesInicio && $mesNasc == $mesFim) {
            if ($diaNasc >= $diaInicio && $diaNasc <= $diaFim) {
                $signoEncontrado = $signo;
                break;
            }
        } elseif ($mesNasc == $mesInicio && $diaNasc >= $diaInicio) {
            $signoEncontrado = $signo;
            break;
        } elseif ($mesNasc == $mesFim && $diaNasc <= $diaFim) {
            $signoEncontrado = $signo;
            break;
        } elseif ($mesNasc > $mesInicio && $mesNasc < $mesFim) {
            $signoEncontrado = $signo;
            break;
        }
    }
}

$dataFormatada = $dataNascimentoObj->format('d/m/Y');
?>

<div class="main-container">
    <div class="content-card">
        <?php if ($signoEncontrado): ?>
            <div class="signo-result">
                <div class="zodiac-icon">
                    <?php 
                    $nomeSigno = (string)$signoEncontrado->signoNome;
                    echo isset($signoEmojis[$nomeSigno]) ? $signoEmojis[$nomeSigno] : '⭐'; 
                    ?>
                </div>
                <h2><?php echo $signoEncontrado->signoNome; ?></h2>
                <p class="signo-period">
                    <?php echo $signoEncontrado->dataInicio; ?> a <?php echo $signoEncontrado->dataFim; ?>
                </p>
                
                <div class="alert alert-info">
                    <strong>Sua data de nascimento:</strong> <?php echo $dataFormatada; ?>
                </div>
                
                <div class="signo-description">
                    <?php echo $signoEncontrado->descricao; ?>
                </div>
                
                <a href="index.php" class="btn btn-secondary btn-lg mt-3">
                    ← Voltar
                </a>
            </div>
        <?php else: ?>
            <div class="alert alert-warning text-center">
                <h4>Ops! Não conseguimos identificar seu signo.</h4>
                <p>Por favor, verifique a data informada e tente novamente.</p>
                <a href="index.php" class="btn btn-secondary mt-3">
                    ← Voltar
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>

</body>
</html>

<?php include('layouts/header.php'); ?>

<div class="main-container">
    <div class="content-card">
        <div class="page-header">
            <div class="zodiac-icon">✨</div>
            <h1>Descubra seu Signo</h1>
            <p>Informe sua data de nascimento e descubra qual é o seu signo</p>
        </div>

        <form id="signo-form" method="POST" action="show_zodiac_sign.php">
            <div class="mb-4">
                <label for="data_nascimento" class="form-label">Data de Nascimento</label>
                <input 
                    type="date" 
                    class="form-control" 
                    id="data_nascimento" 
                    name="data_nascimento" 
                    required
                    max="<?php echo date('Y-m-d'); ?>"
                >
                <div class="form-text">Selecione sua data de nascimento para descobrir seu signo</div>
            </div>

            <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">
                    Descobrir meu Signo
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>

</body>
</html>

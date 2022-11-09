<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

    echo "exibir ceps <br/>";

    include("conexao.php");

    $stmt = $pdo -> prepare("select * from tbcliente");
    $stmt ->execute();

        while($row = $stmt -> fetch(PDO::FETCH_BOTH)) 
        {
            echo '<table border="15px solid">';
                echo '<tr>';
                    echo '<th>';
                        echo $row['idCliente'];
                    echo '<th/>';
                    echo '<td>';
                        echo $row['cepCliente'];
                    echo '<td/>';
                echo '<tr/>';
            echo '<table/>';

        }

    ?>
</body>
</html>
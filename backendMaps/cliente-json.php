<?php

    header("Access-Control-Allow-Origin: *");

    include("./conexao.php");

    $stmt = $pdo->prepare("select * from tbCliente");
    $stmt -> execute();

    $data = array();
    while($row = $stmt -> fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }

    $tudo = "{\"cepCliente\":" . json_encode($data). "}";
    
    echo $tudo;


?>
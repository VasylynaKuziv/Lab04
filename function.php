<?php
$servername = "https://nit.tron.net.ua/api/product/list";
$username = "root";
$password = "";
$dbname = "https://nit.tron.net.ua/api/product/list";

function connect(){
    $conn = mysqli_connect("https://nit.tron.net.ua/api/product/list", "root", "", "https://nit.tron.net.ua/api/product/list");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

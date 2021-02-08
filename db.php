<?php

$servername = $_SERVER['HTTP_HOST'];
$username = "root";
$password = "123456";
$dbname = "inordinatus";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connection established!";

mysqli_close($conn);
?>
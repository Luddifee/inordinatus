<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="lib/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>This is the body</h1>
    <?php include 'db.php'; ?>
    <p><?php
            echo $_SERVER['HTTP_HOST'];
            $servername = $_SERVER['HTTP_HOST'];
            $username = "root";
            $password = "123456";
            $dbname = "inordinatus";

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                echo "Connection failed: " . $conn->connect_error;
                die("Connection failed: " . $conn->connect_error);
            }

            echo "Connection established!";

            mysqli_close($conn);
        ?></p>
</body>
</html>
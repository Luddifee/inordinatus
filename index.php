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
    <p>
        <?php
            echo $_SERVER['HTTP_HOST'];
        ?>
    </p>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="stylesheet" type="text/css" media="screen" href="main.css" /> -->
    <script src="p5.min.js"></script>
    <script src="p5.dom.min.js"></script>
</head>
<body>
<form action="welcome.php" method="post">
        <select name="number">
            <option value="1">Dodge attack</option>    
        </select>
<input type="submit">
</form>
    <script src="games/game"<?php echo $_POST["number"] ?>".js"></script>

</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>VideoGames</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="stylesheet" type="text/css" media="screen" href="lib/css/style.css" />
     <link href="https://fonts.googleapis.com/css?family=Bungee|Bungee+Shade" rel="stylesheet">
    <script src="lib/js/p5.min.js"></script>
    <script src="lib/js/p5.dom.min.js"></script>
</head>
<body>
    <h1>Manarobe Games</h1>
<form action="index.php" method="get">
        <select name="number">
            <option value="1">Dodge attack</option>
            <option value="2">Running man</option>
            <option value="3">Hold the button</option>
            <option value="4">Pong</option>   
            <option value="5">Endless Jump</option> 
            <option value="6">Tic Tac Toe</option>   
        </select>

<input type="submit">
</form>
    
    <div id="gamebox"></div>
    <?php if($_SERVER['REQUEST_METHOD'] == 'GET'){?>
    <script src="games/game<?php echo $_GET['number']?>.js"></script>
    <?php } ?>
    <p>First design of the Manarobe games website. More games to come in the future. Better design to come in the future. Games are buggy at the moment. If you have complaints, keep them to yourself.</p>
</body>
</html>
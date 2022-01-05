<?php
    if(isset($_POST["orders"]) && isset($_FILES["uploads"])){
        $count = count($_POST["orders"]);
        $objects = array();
        $orders = $_POST["orders"];
        $uploads = $_FILES["uploads"];
        $captions = $_POST["captions"];
        for($i = 0; $i < $count; $i++){
            $obj = array(
                "order" => $orders[$i],
                "filepath" => "uploads\\" . ($uploads["name"][$i] === "" ? $_POST["hidden"][$i] : $uploads["name"][$i]),
                "caption" => $captions[$i]
            );
            $objects[] = $obj;
        }

        $json_str = json_encode($objects);
        $file = fopen("data.json", "w");
        fwrite($file, $json_str);
        fclose($file);

        foreach ($_FILES["uploads"]["error"] as $key => $error) {
            if ($error == UPLOAD_ERR_OK && $_FILES["uploads"]["name"][$key] !== "") {
                $tmp_name = $_FILES["uploads"]["tmp_name"][$key];
                $name = "uploads/" . $_FILES["uploads"]["name"][$key];
                move_uploaded_file($tmp_name, "$name");
            }
        }
    }
?>
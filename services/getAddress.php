<?php

include 'config.php';

$sql = "select a.nama, b.kategori, a.id_alamat, b.icon, a.latitude, a.alamat, " .
        "a.longtitude, a.kode_pos, a.no_telepon from tb_alamat a, tb_kategori b " .
        "where a.id_kategori = b.id_kategori and a.id_alamat=:id";

try {
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam("id", $_GET[id]);
    $stmt->execute();
    $category = $stmt->fetchObject();
    $dbh = null;
    echo '{"item":' . json_encode($category) . '}';
} catch (PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
}
?>
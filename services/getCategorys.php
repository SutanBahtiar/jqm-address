<?php

include 'config.php';

$sql = "select k.id_kategori, k.icon, k.kategori, count(a.nama) namaCount from tb_kategori k, tb_alamat a " .
        "where k.id_kategori = a.id_kategori";

try {
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $dbh->query($sql);
    $category = $stmt->fetchAll(PDO::FETCH_OBJ);
    $dbh = null;
    echo '{"items":' . json_encode($category) . '}';
} catch (PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
}
?>

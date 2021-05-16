<?php
$origin = '*';
// if (array_key_exists('HTTP_ORIGIN', $_SERVER)) {
//     $origin = $_SERVER['HTTP_ORIGIN'];
// }
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS');
header('Access-Control-Allow-Headers: content-type');
header("Content-Type: application/json; charset=UTF-8");

try {
    ob_start();
    $content = trim(file_get_contents("php://input"));
    $input = json_decode($content);
    $output = [
        "ok" => start($input)
    ];
} 
catch (Exception $e) {
    $output = [ "ko" => $e->getMessage() ];
}

ob_clean();
error_log("output = " . json_encode($output));
echo json_encode($output);


function start($input) {
    error_log("Call: " . json_encode($input));
    $cmd = $input->cmd;
    switch ($cmd) {
        case 'list': return execList();
        case 'add': return execAdd($input->title);
        case 'del': return execDel($input->id);
        case 'get': return execGet($input->id);
        case 'borrow': return execBorrow($input->id, $input->borrower);
        case 'release': return execRelease($input->id);
        default: throw new Exception("Unknown command \"$cmd\"!");
    }
}

function execBorrow($id, $borrower) {
    $file = load($id);
    if (!$file) return false;

    $file->borrower = $borrower;
    $file->date = time();
    save($id, $file);
    return true;
}

function execRelease($id) {
    $file = load($id);
    if (!$file) return false;

    save($id, [
        "id" => $file['id'],
        "title" => $file['title'],
        "date" => time()
    ]);
    return true;
}

function execDel($id) {
    $base = getBaseDir();
    $path = "$base/$id.json";
    if (file_exists($path)) {
        error_log("Delete $path");
        unlink($path);
        return true;
    }
    return false;
}

function execGet($id) {
    $file = load($id);
    return $file;
}

function execAdd($title) {
    $files = execList();
    $id = 0;
    foreach ($files as $file) {
        $id = max($id, $file->id);
    }
    $file = [
        "id" => $id + 1,
        "title" => $title,
        "date" => time()
    ];
    save($file['id'], $file);
    return $file;
}

function execList() {
    $base = getBaseDir();
    $dir = dir($base);
    $files = json_decode('[]');
    while (false !== ($entry = $dir->read())) {
        if (substr($entry, -5) != '.json') continue;

        $id = intval(substr($entry, 0, -5));
        $file = load($id);
        if (!$file) continue;

        $files[] = $file;
    }
    return $files;
}

function getBaseDir() {
    $path = dirname(__FILE__) . '/data';
    if (!file_exists($path)) {
        error_log("mkdir: $path");
        mkdir($path, 0777, true);
    }
    return $path;
}

function load($id) {
    $path = getBaseDir() . '/' . $id . '.json';
    if(!file_exists($path)) return null;

    $content = file_get_contents($path);
    try {
        return json_decode($content);
    } catch (Exception $e) {
        return null;
    }
}

function save($id, $file) {
    $path = getBaseDir() . '/' . $id . '.json';
    file_put_contents($path, json_encode($file));
}
?>
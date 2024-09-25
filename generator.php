<?php
// Убедитесь, что на сервере установлен wget
$siteUrl = 'https://agrosdoma.com/admin/?object=landings.preview&id=2210'; // Замените на нужный URL

// Имя папки для скачивания сайта
$folderName = 'downloaded_site';

// Команда wget для скачивания сайта
// Параметры:
$command = "wget --mirror --convert-links --adjust-extension --page-requisites --no-parent -P $folderName $siteUrl";

// Выполняем команду
exec($command, $output, $return_var);

if ($return_var === 0) {
    // Успешно скачали сайт
    echo "Сайт успешно скачан в папку $folderName.<br>";

    // Архивируем скачанные файлы
    $zipFile = 'site_archive.zip';
    $zip = new ZipArchive();
    if ($zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($folderName),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($folderName) + 1);

                $zip->addFile($filePath, $relativePath);
            }
        }

        $zip->close();

        // Предлагаем архив для скачивания
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="site_archive.zip"');
        header('Content-Length: ' . filesize($zipFile));
        readfile($zipFile);

        // Удаляем архив после скачивания
        unlink($zipFile);

        // Удаляем скачанные файлы
        exec("rm -rf $folderName");
    } else {
        echo "Ошибка при создании архива.";
    }
} else {
    echo "Ошибка при скачивании сайта.";
}
?>

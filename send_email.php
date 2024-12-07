<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Tangkap data dari form
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Email tujuan
    $to = "aqshabaru21@gmail.com"; // Ganti dengan email Anda

    // Subjek email
    $subject = "Pesan dari $name melalui Formulir Kontak";

    // Isi email
    $body = "Anda menerima pesan baru melalui formulir kontak:\n\n";
    $body .= "Nama: $name\n";
    $body .= "Email: $email\n";
    $body .= "Pesan:\n$message\n";

    // Header email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Kirim email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Terima kasih! Pesan Anda telah dikirim.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Maaf, pesan Anda gagal dikirim. Silakan coba lagi.'); window.location.href='index.html';</script>";
    }
}
?>

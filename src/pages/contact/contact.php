<?php


$allowed_domains = [
  "http://www.manonet.org",
  "https://www.manonet.org",
];

if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_domains)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Origin: "*"');
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");


$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "";

if ($contentType === "application/json") {
  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  $decoded = json_decode($content, true);

  //If json_decode failed, the JSON is invalid.
  if(is_array($decoded)) {

    // Get values from front-end
    $raw_name = $decoded["name"];
    $raw_email = $decoded["email"];
    $raw_to = $decoded["to"];
    $raw_subject = $decoded["subject"];
    $raw_message = $decoded["message"];
    $raw_debug = $decoded["debug"];
    $raw_lang = $decoded["lang"];
    $raw_version = $decoded["version"];

    // Format sender as "name<email@domain.tld>"
    $sender = $raw_name . "<" . $raw_email . ">";

    $recipient;
    switch ($raw_to) {
      case "dominik":
        $recipient = "dominik.soczewka@manonet.org";
        break;
      
      default:
        $recipient = "info@manonet.org";
        break;
    }

    // Create table row for each debug info line
    $rows = "";
    foreach ($raw_debug as $key => $value) {
      $rows .= "
<tr>
  <td style='
    opacity: 0.5;
    padding-right: 20px;
    border-top: 1px solid rgba(0,0,0,0.1)
  '>
    {$key}
  </td>
  <td style='
    border-top: 1px solid rgba(0,0,0,0.1)
  '>
    {$value}
  </td>
</tr>
";
    };

    // Create HTML message
    $message = "
<html>
<head>
  <title>Manonet message</title>
</head>
<body>
  <div style='margin-bottom: 2em; white-space: pre-wrap;'>{$raw_message}</div>

  <hr />
  <div style='font-weight: bold'>Debug info</div>
  <table style='font-size: 80%;'>
    {$rows}
  </table>
</body>
</html>
";

    // To send HTML mail, the Content-type header must be set
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
    $headers .= "From: " . $sender  . "\r\n";
    $headers .= "Reply-To: " . $sender  . "\r\n";

    if ($raw_to != "manonet") {
      $headers .= "Cc: info@manonet.org" . "\r\n";
    }

    // Mail it
    mail($recipient, $raw_subject, $message, $headers);
    echo '{"response":"success"}';
  } else {
    // Send error back to user.
    echo '{"response":"error"}';
  }
} else {
  echo '{"response":"Direct access not allowed"}';
}

?>
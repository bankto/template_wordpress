<?php
  function add_google_analytics() {
    $analytics = <<<EOS
      <!-- ここに解析ソースを記載 -->\n
      EOS;
    echo $analytics;
  }
  add_action('wp_head', 'add_google_analytics', 100);
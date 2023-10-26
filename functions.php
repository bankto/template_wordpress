<?php
/**
 *
 * @package theme template.
 */

// フロント用function
(function() {
  if (is_admin()) return false;

  require_once(__DIR__ . '/functions/front/common.php');
  require_once(__DIR__ . '/functions/front/analytics.php');
})();

// 管理画面用function
(function() {
  if (!is_admin()) return false;

  require_once(__DIR__ . '/functions/admin/common.php');
})();

// プラグイン用function
require_once(__DIR__ . '/functions/plugins/ewww.php');

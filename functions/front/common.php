<?php
  // 絵文字を無効化
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_print_styles', 'print_emoji_styles');

  // WordPress テーマカラーの無効化
  add_action( 'wp_enqueue_scripts', 'remove_global_styles' );
  function remove_global_styles(){
      wp_dequeue_style( 'global-styles' );
  }

  /**
   * キャッシュ対策
   * ファイルのバージョン更新
   * @param $file
   * @return string
   */
  function update_version($file) {
    return date_i18n('YmdHi', filemtime(get_template_directory() . $file));
  }
  
  // JavaScript, CSSのバージョン管理
  add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('style', get_stylesheet_uri(), array(), update_version('/style.css'), 'all');
    wp_enqueue_style('app', get_template_directory_uri() . '/assets/stylesheets/app.css', array(), null, 'all'); 

    wp_enqueue_script('container-queries-polyfill', 'https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js', array(), false, true);
    
    wp_enqueue_script('app', get_template_directory_uri() . '/assets/scripts/app.js', array('container-queries-polyfill'), false, true);
  });
<?php
  add_theme_support('post-thumbnails');

  function token_remove_menu() {
    remove_menu_page( 'edit.php' );
    remove_menu_page( 'edit-comments.php' );
  }
  add_action( 'admin_menu', 'token_remove_menu' );
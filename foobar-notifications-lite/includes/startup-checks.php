<?php
/**
 * Does some preliminary checks before the plugin is loaded
 */


if ( !function_exists('foobar_min_php_admin_notice' ) ) {
	/**
	 * Show an admin notice to administrators when the minimum PHP version could not be reached
	 */
	function foobar_min_php_admin_notice() {
        //only show the admin message to users who can install plugins
        if ( !current_user_can('install_plugins' ) ) { return; }

        echo '<div class="notice notice-error">';
        echo '<p>' . sprintf( __( '%s could not be initialized because you need to be running at least PHP version %s, and you are running version %s', 'foobar' ), '<strong>FooBar</strong>', FOOBAR_MIN_PHP, phpversion() );
        echo '</p></div>';
	}
}

if ( !function_exists('foobar_min_wp_admin_notice' ) ) {
	/**
	 * Show an admin notice to administrators when the minimum WP version could not be reached
	 */
	function foobar_min_wp_admin_notice() {
        //only show the admin message to users who can install plugins
        if ( !current_user_can('install_plugins' ) ) { return; }

		global $wp_version;
		echo '<div class="notice notice-error">';
		echo '<p>' . sprintf( __( '%s could not be initialized because you need WordPress to be at least version %s, and you are running version %s', 'foobar' ), '<strong>FooBar</strong>', FOOBAR_MIN_WP, $wp_version );
		echo '<a href="' . admin_url('update-core.php') . '">' . __( 'Update WordPress now.', 'foobar' ) . '</a>';
		echo '</p></div>';
	}
}

//check minimum PHP version
if ( version_compare( phpversion(), FOOBAR_MIN_PHP, "<" ) ) {
    add_action( 'admin_notices', 'foobar_min_php_admin_notice' );
	return false;
}

//check minimum WordPress version
global $wp_version;
if ( version_compare( $wp_version, FOOBAR_MIN_WP, '<' ) ) {
    add_action( 'admin_notices', 'foobar_min_wp_admin_notice' );
	return false;
}

//if we got here, then we passed all startup checks and the plugin can be loaded
return true;

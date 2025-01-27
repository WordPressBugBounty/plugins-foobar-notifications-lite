<?php
/*
Plugin Name: FooBar WordPress Notifications
Description: WordPress notifications to help you grow your business
Version:     2.1.35
Author:      FooPlugins
Plugin URI:  https://fooplugins.com/foobar-wordpress-notification-bars/
Author URI:  https://fooplugins.com/
Text Domain: foobar
License:     GPL-2.0+
Domain Path: /languages

*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Define some FooBar essentials constants.
if ( ! defined( 'FOOBAR_SLUG' ) ) {
	define( 'FOOBAR_SLUG', 'foobar' );
	define( 'FOOBAR_NAMESPACE', 'FooPlugins\FooBar' );
	define( 'FOOBAR_DIR', __DIR__ );
	define( 'FOOBAR_PATH', plugin_dir_path( __FILE__ ) );
	define( 'FOOBAR_URL', plugin_dir_url( __FILE__ ) );
	define( 'FOOBAR_ASSETS_URL', FOOBAR_URL . 'assets/' );
	define( 'FOOBAR_FILE', __FILE__ );
	define( 'FOOBAR_VERSION', '2.1.35' );
	define( 'FOOBAR_MIN_PHP', '5.6.0' ); // Minimum of PHP 5.4 required for autoloading, namespaces, etc.
	define( 'FOOBAR_MIN_WP', '4.4.0' );  // Minimum of WordPress 4.4 required.
}

// Include other essential FooBar constants.
require_once FOOBAR_PATH . 'includes/constants.php';

// Include common global FooBar functions.
require_once FOOBAR_PATH . 'includes/functions.php';

// Do a check to see if either free/pro version of the plugin is already running.
if ( function_exists( 'foobar_fs' ) ) {
	foobar_fs()->set_basename( false, __FILE__ );
} else {
	if ( ! function_exists( 'foobar_fs' ) ) {
		require_once FOOBAR_PATH . 'includes/freemius.php';
	}
}

// Check minimum requirements before loading the plugin.
if ( require_once FOOBAR_PATH . 'includes/startup-checks.php' ) {

	// Start autoloader.
	require_once FOOBAR_PATH . 'vendor/autoload.php';

	spl_autoload_register( 'foobar_autoloader' );

	// Hook in activation.
	register_activation_hook( __FILE__, array( 'FooPlugins\FooBar\Activation', 'activate' ) );

	// Start the plugin!
	new FooPlugins\FooBar\Init();
}

<?php
/**
 * FooBar Init Class
 * Runs at the startup of the plugin
 * Assumes after all checks have been made, and all is good to go!
 *
 * @package FooPlugins\FooBar
 */

namespace FooPlugins\FooBar;

if ( ! class_exists( 'FooPlugins\FooBar\Init' ) ) {

	/**
	 * Class Init
	 *
	 * @package FooPlugins\FooBar
	 */
	class Init {

		/**
		 * Initialize the plugin by setting localization, filters, and administration functions.
		 */
		public function __construct() {
			// Load the plugin text domain.
			add_action( 'init', function() {
				$plugin_rel_path = dirname( plugin_basename( FOOBAR_FILE ) ) . '/languages/';
				load_plugin_textdomain( FOOBAR_SLUG, false, $plugin_rel_path );
			} );

			new namespace\PostTypes\Notification();

			if ( is_admin() ) {
				new namespace\Admin\Init();
			} else {
				new namespace\Front\Init();
			}

			// Check if the PRO version of FooBar is running and run the PRO code.
			if ( foobar_is_pro() ) {
				new namespace\Pro\Init();
			} else {
				if ( is_admin() ) {
					// Include PRO promotions.
					new namespace\Admin\Promotions();
				}
			}
		}
	}
}

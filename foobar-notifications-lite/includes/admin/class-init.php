<?php
namespace FooPlugins\FooBar\Admin;

/**
 * FooBar Admin Init Class
 * Runs all classes that need to run in the admin
 */

if ( !class_exists( 'FooPlugins\FooBar\Admin\Init' ) ) {

	class Init {

		/**
		 * Init constructor.
		 */
		function __construct() {
			new namespace\Updates();
			new namespace\Help();
			new namespace\ContainerManager();
			new namespace\Settings();
			new namespace\Promotions();

			if ( foobar_admin_is_notification_edit() ) {
				new namespace\Notification\Metabox\Types();
				new namespace\Notification\Metabox\Settings();
				new namespace\Notification\Metabox\InlinePreview();
				new namespace\Notification\Metabox\Shortcode();
				new namespace\Notification\Metabox\Preview();
				if ( foobar_is_debug() ) {
					new namespace\Notification\Metabox\Debug();
				}
			}

			if ( foobar_admin_is_notification_list() ) {
				new namespace\Notification\Columns();
				new namespace\Notification\Preview();
				new namespace\Notification\Duplicate();
			}
		}
	}
}

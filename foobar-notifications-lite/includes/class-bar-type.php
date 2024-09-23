<?php
namespace FooPlugins\FooBar;

/**
 * Bar Type Abstract Class
 */

if ( !class_exists( __NAMESPACE__ . '\BarType' ) ) {

	abstract class BarType {

		function __construct() {
			add_filter( 'foobar_registered_bar_types', array( $this, 'add_bar_type' ) );
			add_filter( 'foobar_registered_renderers', array( $this, 'add_bar_renderer' ) );

			if ( is_admin() && foobar_admin_is_notification_edit() ) {
				add_filter( 'foobar_admin_notification_settings_fields-' . $this->get_bar_type_key(), array( $this, 'get_settings_metabox_content_fields' ), 10, 2 );
				add_filter( 'foobar_admin_notification_settings_fields_config-' . $this->get_bar_type_key(), array( $this, 'get_settings_metabox_fields_config' ), 10, 2 );
			}
		}

		abstract function get_bar_type_key();

		abstract function add_bar_type( $registered_bar_types );

		abstract function add_bar_renderer( $registered_bar_renderers );

		abstract function get_settings_metabox_fields_config( $default, $visible );

		abstract function get_settings_metabox_content_fields( $default, $visible );
	}
}

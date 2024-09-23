<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\Content' ) ) {

	class Content {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields', array( $this, 'append_content_tabs' ), 20 );
		}

		function append_content_tabs( $fields ) {
			$selected_type = foobar_get_instance_admin_type();

			$types = array();

			//if we have no type set (a new foobar), then add all content tabs for all bar types
			if ( empty( $selected_type ) ) {
				$types = array_keys( foobar_registered_bar_types() );
			} else {
				//only add the content fields for the selected bar type
				$types[] = $selected_type;
			}

			foreach ( $types as $type ) {
				$content_tab_config = apply_filters( 'foobar_admin_notification_settings_fields-' . $type, false, $selected_type === $type );

				if ( $content_tab_config !== false ) {
					$fields['content-' . $type] = $content_tab_config;
				}
			}

			return $fields;
		}
	}
}

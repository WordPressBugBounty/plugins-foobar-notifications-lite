<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\Advanced' ) ) {

	class Advanced {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields', array( $this, 'append_advanced_fields' ), 50 );
		}

		function append_advanced_fields( $fields ) {
			$fields['advanced'] = array(
				'id'     => 'advanced',
				'label'  => __( 'Advanced', 'foobar' ),
				'icon'   => 'dashicons-admin-settings',
				'order'  => 50,
				'fields' => array(
					array(
						'id'      => 'custom_settings',
						'class'   => 'foofields-full-width',
						'label'   => __( 'Custom Settings', 'foobar' ),
						'desc'    => __( 'Add any custom settings which will be merged with the existing settings. Only to be used by developers!', 'foobar' ),
						'type'    => 'textarea',
						'default' => '',
						'order' => 10,
					),
				),
			);

			return $fields;
		}
	}
}

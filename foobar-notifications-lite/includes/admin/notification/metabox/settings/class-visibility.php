<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\Visibility' ) ) {

	class Visibility {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields', array( $this, 'append_visibility_fields' ), 40 );
		}

		function append_visibility_fields( $fields ) {
			$fields['visibility'] = array(
				'id'     => 'visibility',
				'label'  => __( 'Visibility', 'foobar' ),
				'icon'   => 'dashicons-visibility',
				'order'  => 40,
				'fields' => array(
					'general_group' => array(
						'id' => 'general_group',
						'type' => 'field-group',
						'label' => __( 'Visibility', 'foobar' ),
						'desc' => __( 'Select where you want the notification to be shown on your site.', 'foobar' ),
						'order' => 10,
						'fields' => array(
							array(
								'id'      => 'visibility',
								'class'   => 'foofields-full-width',
								'label'   => __( 'Show Where?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '',
								'choices' => $this->get_visibility_choices(),
								'order' => 10,
								'data'  => array(
									'show-when' => array(
										'field' => 'layout',
										'operator' => '!==',
										'value' => 'fbr-layout-inline',
									)
								)
							),
							array(
								'id'      => 'visibility-inline',
								'class'   => 'foofields-full-width',
								'label'   => __( 'Show When?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '',
								'choices' => array(
									'' => array(
										'label'   => __( 'Shortcode', 'foobar' ),
										'tooltip' => __( 'Only show the notification when the shortcode has been included in the page content.', 'foobar' )
									)
								),
								'order' => 11,
								'data'  => array(
									'show-when' => array(
										'field' => 'layout',
										'value' => 'fbr-layout-inline',
									)
								)
							),
							array(
								'id'      => 'visibility-shortcode-help',
								'class'   => 'foofields-full-width',
								'text'    => __( 'The notification will only show on pages where you have included the shortcode.', 'foobar' ),
								'type'    => 'help',
								'order' => 20,
								'data'  => array(
									'show-when' => array(
										'field' => 'visibility',
										'value' => '',
									)
								)
							),
							array(
								'id'      => 'visibility-never-help',
								'class'   => 'foofields-full-width',
								'text'    => __( 'The notification will NEVER be shown on the site. This will override all other conditions, even if the shortcode for the notification is included in a page.', 'foobar' ),
								'type'    => 'error',
								'order' => 30,
								'data'  => array(
									'show-when' => array(
										'field' => 'visibility',
										'value' => 'never',
									)
								)
							),
							array(
								'id'      => 'visibility-always-help',
								'class'   => 'foofields-full-width',
								'text'    => __( 'The notification will be shown on every page of the site.', 'foobar' ),
								'type'    => 'help',
								'order' => 40,
								'data'  => array(
									'show-when' => array(
										'field' => 'visibility',
										'value' => 'all',
									)
								)
							),
						)
					), //general_group
				),
			);

			return $fields;
		}

		function get_visibility_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_visibility_choices', array(
				'never' => array(
					'label'   => __( 'Nowhere', 'foobar' ),
					'tooltip' => __( 'Force the notification to never be shown. This overrides everything else!', 'foobar' )
				),
				'' => array(
					'label'   => __( 'By Shortcode', 'foobar' ),
					'tooltip' => __( 'Only show the notification when the shortcode has been included in the page content.', 'foobar' )
				),
				'all'     => array(
					'label'   => __( 'Everywhere', 'foobar' ),
					'tooltip' => __( 'Display the notification on every page of the website', 'foobar' ),
				),
			) );
		}
	}
}

<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\ContentCallToAction' ) ) {

	class ContentCallToAction {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields-cta', array( $this, 'get_content_fields' ), 10, 2 );
			add_filter( 'foobar_admin_notification_settings_fields_config-cta', array( $this, 'get_fields_config' ), 10, 2 );
		}

		function get_fields_config( $default, $visible ) {
			return array(
				'tab' => 'content-cta',
				'defaults' => array(
					'color' => 'fbr-orange',
					'layout' => 'fbr-layout-top',
					'toggle' => 'fbr-toggle-overlap'
				)
			);
		}

		function get_content_fields( $default, $visible ) {
			$fields = array(
				'id'     => 'content-cta',
				'label'  => __( 'Content', 'foobar' ),
				'icon'   => 'dashicons-text',
				'class'  => $visible ? '' : ' foofields-hidden',
				'order'  => 20,
				'fields' => array(
					array(
						'id'     => 'cta_group',
						'type'   => 'field-group',
						'label'  => __( 'Message', 'foobar' ),
						'desc'   => __( 'Set the message displayed for the Call-To-Action.', 'foobar' ),
						'order'  => 10,
						'fields' => array(
							array(
								'id'            => 'cta_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => sprintf( __( 'You can use %s in this field 😀', 'foobar' ), '<a href="https://getemoji.com/" target="_blank">' . __( 'emoji\'s', 'foobar' ) . '</a>' ),
								'default'       => __( 'Get a 15% discount before our sale ends!', 'foobar' ),
								'type'          => 'textarea',
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode'
							), //cta_text
							array(
								'id'      => 'cta_show_link',
								'class'   => 'foofields-full-width',
								'label'   => __( 'Show Link?', 'foobar' ),
								'desc'    => __( 'Do you want to show an anchor link next to the message?', 'foobar' ),
								'default' => 'no',
								'type'    => 'radiolist',
								'choices' => array(
									'no'  => __( 'No', 'foobar' ),
									'yes' => __( 'Yes', 'foobar' ),
								)
							), //cta_show_link
						)
					),
					array(
						'id'     => 'cta_link_group',
						'type'   => 'field-group',
						'label'  => __( 'Link', 'foobar' ),
						'desc'   => __( 'Set the options for the link displayed next to the message.', 'foobar' ),
						'class'  => 'foofields-cols-3',
						'data'   => array(
							'show-when' => array(
								'field' => 'cta_show_link',
								'value' => 'yes',
							)
						),
						'fields' => array(
							array(
								'id'            => 'cta_link_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => __( 'The text to display for the link.', 'foobar' ),
								'type'          => 'text',
								'default'       => '#',
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode',
							), //cta_link_text
							array(
								'id'    => 'cta_link_url',
								'class' => 'foofields-colspan-2',
								'label' => __( 'URL', 'foobar' ),
								'desc'  => __( 'The URL the link will navigate to when clicked.', 'foobar' ),
								'type'  => 'text',
							), //cta_link_url
							array(
								'id'      => 'cta_link_target',
								'label'   => __( 'Target', 'foobar' ),
								'desc'  => __( 'How to open the URL?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '_self',
								'choices' => array(
									'_self'  => __( 'Same Window', 'foobar' ),
									'_blank' => __( 'New Tab', 'foobar' ),
								),
							), //cta_link_target
						)
					),
					array(
						'id'     => 'cta_button_group',
						'type'   => 'field-group',
						'label'  => __( 'Button', 'foobar' ),
						'desc'   => __( 'Set the options for the button displayed next to the message.', 'foobar' ),
						'class'  => 'foofields-cols-3',
						'fields' => array(
							array(
								'id'            => 'cta_button_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => __( 'The text to display for the button.', 'foobar' ),
								'default'       => __( 'Shop Now', 'foobar' ),
								'type'          => 'text',
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode'
							), //cta_button_text
							array(
								'id'      => 'cta_button_url',
								'class' => 'foofields-colspan-2',
								'label'   => __( 'URL', 'foobar' ),
								'desc'  => __( 'The URL the button will navigate to when clicked.', 'foobar' ),
								'default' => trailingslashit( home_url() ) . 'shop',
								'type'    => 'text',
							), //cta_button_url
							array(
								'id'      => 'cta_button_target',
								'label'   => __( 'Target', 'foobar' ),
								'desc'  => __( 'How to open the URL?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '_self',
								'choices' => array(
									'_self'  => __( 'Same Window', 'foobar' ),
									'_blank' => __( 'New Tab', 'foobar' ),
								),
							), //cta_button_target
							array(
								'id'      => 'cta_button_position',
								'class' => 'foofields-full-width',
								'label'   => __( 'Position', 'foobar' ),
								'desc'    => __( 'You can override the position of the button.', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '',
								'choices' => array(
									'' => array(
										'label'   => __( 'Default', 'foobar' ),
										'tooltip' => __( 'The default button position, depending on the RTL orientation.', 'foobar' )
									),
									'fbr-buttons-left'     => array(
										'label'   => __( 'Before Message', 'foobar' ),
										'tooltip' => __( 'Display the button before the message.', 'foobar' ),
									),
									'fbr-buttons-right'     => array(
										'label'   => __( 'After Message', 'foobar' ),
										'tooltip' => __( 'Display the button after the message.', 'foobar' ),
									),
								),
							)  //cta_button_position
						)
					)
				)
			);

			return $fields;
		}
	}
}

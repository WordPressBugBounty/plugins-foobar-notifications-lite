<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\ContentCookie' ) ) {

	class ContentCookie {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields-cookie', array( $this, 'get_content_fields' ), 10, 2 );
			add_filter( 'foobar_admin_notification_settings_fields_config-cookie', array( $this, 'get_fields_config' ), 10, 2 );
		}

		function get_fields_config() {
			return array(
				'tab'      => 'content-cookie',
				'defaults' => array(
					'color'  => 'fbr-yellow',
					'layout' => 'fbr-layout-bottom',
					'toggle' => 'fbr-toggle-default'
				)
			);
		}

		function get_content_fields( $default, $visible ) {
			return array(
				'id'     => 'content-cookie',
				'label'  => __( 'Content', 'foobar' ),
				'icon'   => 'dashicons-text',
				'class'  => $visible ? '' : ' foofields-hidden',
				'order'  => 20,
				'fields' => array(
					array(
						'id'     => 'cookie_group',
						'type'   => 'field-group',
						'label'  => __( 'Message', 'foobar' ),
						'desc'   => __( 'Set the message displayed for the Call-To-Action.', 'foobar' ),
						'order'  => 10,
						'fields' => array(
							array(
								'id'            => 'cookie_notice',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => sprintf( __( 'You can use %s in this field 😀', 'foobar' ), '<a href="https://getemoji.com/" target="_blank">' . __( 'emoji\'s', 'foobar' ) . '</a>' ),
								'default'       => sprintf( __( '%s uses cookies to personalise and improve your user experience. If you continue to use this website, you will be providing consent to our use of cookies.', 'foobar' ), get_bloginfo( 'name' ) ),
								'type'          => 'textarea',
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode'
							), //cookie_notice
							array(
								'id'      => 'cookie_show_policy_link',
								'label'   => __( 'Show Policy Link?', 'foobar' ),
								'desc'    => __( 'Do you want to show an anchor link to your privacy policy page?', 'foobar' ),
								'default' => 'no',
								'type'    => 'radiolist',
								'choices' => array(
									'no'  => __( 'No', 'foobar' ),
									'yes' => __( 'Yes', 'foobar' ),
								),
							), //cookie_show_policy_link
						)
					),
					array(
						'id'     => 'cookie_policy_link_group',
						'type'   => 'field-group',
						'label'  => __( 'Policy Link', 'foobar' ),
						'desc'   => __( 'Set the options for the policy link displayed next to the message.', 'foobar' ),
						'class'  => 'foofields-cols-3',
						'data'   => array(
							'show-when' => array(
								'field' => 'cookie_show_policy_link',
								'value' => 'yes',
							)
						),
						'fields' => array(
							array(
								'id'            => 'cookie_policy_link_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => __( 'The text to display for the link.', 'foobar' ),
								'type'          => 'text',
								'default'       => __( 'Privacy Policy', 'foobar' ),
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode',
							), //cookie_policy_link_text
							array(
								'id'      => 'cookie_policy_link_url',
								'class'   => 'foofields-colspan-2',
								'label'   => __( 'URL', 'foobar' ),
								'desc'    => __( 'The URL the link will navigate to when clicked.', 'foobar' ),
								'type'    => 'text',
								'default' => get_privacy_policy_url(),
							), //cookie_policy_link_url
							array(
								'id'      => 'cookie_policy_link_target',
								'label'   => __( 'Target', 'foobar' ),
								'desc'    => __( 'How to open the URL?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '_self',
								'choices' => array(
									'_self'  => __( 'Same Window', 'foobar' ),
									'_blank' => __( 'New Tab', 'foobar' ),
								),
							), //cookie_policy_link_target
						)
					),
					array(
						'id'     => 'cookie_button_group',
						'type'   => 'field-group',
						'label'  => __( 'Accept Button', 'foobar' ),
						'desc'   => __( 'Set the options for the accept button. When clicked the notification will be dismissed.', 'foobar' ),
						'fields' => array(
							array(
								'id'            => 'cookie_button_text',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => __( 'The text to display for the button.', 'foobar' ),
								'default'       => __( 'Accept', 'foobar' ),
								'type'          => 'text',
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode'
							), //cookie_button_text
							array(
								'id'      => 'cookie_button_position',
								'label'   => __( 'Position', 'foobar' ),
								'desc'    => __( 'You can override the position of the button.', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '',
								'choices' => array(
									''                  => array(
										'label'   => __( 'Default', 'foobar' ),
										'tooltip' => __( 'The default button position, depending on the RTL orientation.', 'foobar' )
									),
									'fbr-buttons-left'  => array(
										'label'   => __( 'Before Message', 'foobar' ),
										'tooltip' => __( 'Display the button before the message.', 'foobar' ),
									),
									'fbr-buttons-right' => array(
										'label'   => __( 'After Message', 'foobar' ),
										'tooltip' => __( 'Display the button after the message.', 'foobar' ),
									),
								),
							), //cookie_button_position
							array(
								'id'      => 'cookie_show_decline_button',
								'label'   => __( 'Allow Decline?', 'foobar' ),
								'desc'    => __( 'Do you want to show a button allowing the user to decline?', 'foobar' ),
								'default' => 'no',
								'type'    => 'radiolist',
								'choices' => array(
									'no'  => __( 'No', 'foobar' ),
									'yes' => __( 'Yes', 'foobar' ),
								),
							), //cookie_show_decline_button
						)
					),
					array(
						'id'     => 'cookie_decline_button_group',
						'type'   => 'field-group',
						'label'  => __( 'Decline Button', 'foobar' ),
						'desc'   => __( 'Set the options for the decline button. When clicked the user will be sent to the provided URL.', 'foobar' ),
						'class'  => 'foofields-cols-3',
						'data'   => array(
							'show-when' => array(
								'field' => 'cookie_show_decline_button',
								'value' => 'yes',
							)
						),
						'fields' => array(
							array(
								'id'            => 'cookie_decline_button_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => __( 'The text to display for the button.', 'foobar' ),
								'type'          => 'text',
								'default'       => __( 'Decline', 'foobar' ),
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode',
							), //cookie_policy_link_text
							array(
								'id'      => 'cookie_decline_button_url',
								'class'   => 'foofields-colspan-2',
								'label'   => __( 'URL', 'foobar' ),
								'desc'    => __( 'The URL the button will navigate to when clicked.', 'foobar' ),
								'type'    => 'text',
								'default' => '#',
							), //cookie_decline_button_url
							array(
								'id'      => 'cookie_decline_button_target',
								'label'   => __( 'Target', 'foobar' ),
								'desc'    => __( 'How to open the URL?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '_self',
								'choices' => array(
									'_self'  => __( 'Same Window', 'foobar' ),
									'_blank' => __( 'New Tab', 'foobar' ),
								),
							), //cookie_decline_button_target
						)
					),
				),
			);
		}
	}
}

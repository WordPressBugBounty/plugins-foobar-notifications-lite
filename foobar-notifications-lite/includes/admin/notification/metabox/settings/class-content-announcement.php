<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\ContentAnnouncement' ) ) {

	class ContentAnnouncement {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields-message', array(
				$this,
				'get_content_fields'
			), 10, 2 );
			add_filter( 'foobar_admin_notification_settings_fields_config-message', array(
				$this,
				'get_fields_config'
			), 10, 2 );
		}

		function get_fields_config() {
			return array(
				'tab'      => 'content-message',
				'defaults' => array(
					'color'  => 'fbr-blue',
					'layout' => 'fbr-layout-top',
					'toggle' => 'fbr-toggle-default'
				)
			);
		}

		function get_content_fields( $default, $visible ) {
			return array(
				'id'     => 'content-message',
				'label'  => __( 'Content', 'foobar' ),
				'icon'   => 'dashicons-text',
				'class'  => $visible ? '' : ' foofields-hidden',
				'order'  => 20,
				'fields' => array(
					array(
						'id'     => 'announcement_group',
						'type'   => 'field-group',
						'label'  => __( 'Message', 'foobar' ),
						'desc'   => __( 'Set the message displayed for the announcement.', 'foobar' ),
						'order'  => 10,
						'fields' => array(
							array(
								'id'            => 'message_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'default'       => __( 'Welcome to our website. Please enjoy your visit...', 'foobar' ),
								'desc'          => sprintf( __( 'You can use %s in this field 😀', 'foobar' ), '<a href="https://getemoji.com/" target="_blank">' . __( 'emoji\'s', 'foobar' ) . '</a>' ),
								'type'          => 'textarea',
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode',
								'required'      => true
							), //message_text
							array(
								'id'      => 'message_show_link',
								'class'   => 'foofields-full-width',
								'label'   => __( 'Show Link?', 'foobar' ),
								'desc'    => __( 'Do you want to show an anchor link next to the message?', 'foobar' ),
								'default' => 'no',
								'type'    => 'radiolist',
								'choices' => array(
									'no'  => __( 'No', 'foobar' ),
									'yes' => __( 'Yes', 'foobar' ),
								)
							), //message_show_link
						)
					),
					array(
						'id'     => 'announcement_link_group',
						'type'   => 'field-group',
						'class'  => 'foofields-cols-3',
						'label'  => __( 'Link', 'foobar' ),
						'desc'   => __( 'Set the options for the link displayed next to the message.', 'foobar' ),
						'data'   => array(
							'show-when' => array(
								'field' => 'message_show_link',
								'value' => 'yes',
							)
						),
						'fields' => array(
							array(
								'id'            => 'message_link_text',
								'class'         => 'foofields-full-width',
								'label'         => __( 'Text', 'foobar' ),
								'desc'          => __( 'The text to display for the link.', 'foobar' ),
								'type'          => 'text',
								'default'       => __( 'Read More', 'foobar' ),
								'value_encoder' => 'urlencode',
								'value_decoder' => 'urldecode',
							), //message_link_text
							array(
								'id'      => 'message_link_url',
								'class'   => 'foofields-colspan-2',
								'label'   => __( 'URL', 'foobar' ),
								'desc'    => __( 'The URL the link will navigate to when clicked.', 'foobar' ),
								'type'    => 'text',
								'default' => '#',
							), //message_link_url
							array(
								'id'      => 'message_link_target',
								'label'   => __( 'Target', 'foobar' ),
								'desc'    => __( 'How to open the URL?', 'foobar' ),
								'type'    => 'radiolist',
								'default' => '_self',
								'layout'  => 'inline',
								'choices' => array(
									'_self'  => __( 'Same Window', 'foobar' ),
									'_blank' => __( 'New Tab', 'foobar' ),
								),
							), //message_link_target
						)
					)
				),
			);
		}
	}
}

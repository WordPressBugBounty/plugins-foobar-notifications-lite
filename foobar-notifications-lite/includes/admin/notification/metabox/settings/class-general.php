<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\General' ) ) {

	class General {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields', array( $this, 'append_general_fields' ), 10 );
		}

		function append_general_fields( $fields ) {
			$general_fields = array(
				'layout_group' => array(
					'id'     => 'layout_group',
					'type'   => 'field-group',
					'label'  => __( 'Layout', 'foobar' ),
					'desc'   => __( 'Set how the notification is displayed within your page.', 'foobar' ),
					'order'  => 10,
					'fields' => array(
						array(
							'id'      => 'layout',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Position', 'foobar' ),
							'desc'    => __( 'Where do you want the notification to show?', 'foobar' ),
							'type'    => 'radiolist',
							'default' => 'fbr-layout-top',
							'order'   => 10,
							'choices' => foobar_layout_choices()
						), //position
						array(
							'id'      => 'inline-specific-help',
							'class'   => 'foofields-full-width',
							'text'    => __( 'Inline notifications will show where you have included the shortcode on the page.', 'foobar' ),
							'order'   => 20,
							'type'    => 'help',
							'data'  => array(
								'show-when' => array(
									'field' => 'layout',
									'value' => 'fbr-layout-inline',
								)
							)
						), //inline help
						array(
							'id'       => 'layout_push',
							'class'    => 'foofields-full-width',
							'label'    => __( 'Push Content', 'foofields' ),
							'desc'     => __( 'Do you want the notification to try push the page to avoid hiding content?', 'foofields' ),
							'order'    => 30,
							'type'     => 'radiolist',
							'default'  => 'yes',
							'choices'  => $this->get_layout_push_choices(),
							'data'  => array(
								'show-when' => array(
									'field' => 'layout',
									'operator' => 'regex',
									'value' => 'fbr-layout-top|fbr-layout-top-inline|fbr-layout-left|fbr-layout-right',
								)
							)
						), //push content
						array(
							'id'      => 'push_content_help',
							'class'   => 'foofields-full-width',
							'text'    => __( 'The notification pushes the page by changing the margin of the &lt;HTML/&gt; element. This is the same way WordPress displays the admin bar however it may not be supported by all themes.', 'foobar' ),
							'order'   => 40,
							'type'    => 'help',
							'data'  => array(
								'show-when' => array(
									'field' => 'layout_push',
									'value' => 'yes',
								)
							)
						), //inline help
					)
				),
				'state_group' => array(
					'id'     => 'state_group',
					'type'   => 'field-group',
					'label'  => __( 'State', 'foobar' ),
					'desc'   => __( 'The "state" of the notification can be opened or closed. These settings allow you to control the state of the notification and when it changes from opened to closed.', 'foobar' ),
					'order'  => 10,
					'fields' => array(
						array(
							'id'      => 'open',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Initial State', 'foobar' ),
							'desc'    => __( 'Is the notification opened or closed when the page loads?', 'foobar' ),
							'type'    => 'radiolist',
							'default' => 'open',
							'choices' => $this->get_open_choices(),
							'order' => 50
						), //initial state
						array(
							'id'      => 'remember',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Remember State', 'foobar' ),
							'desc'    => __( 'Remember the state of the notification across page refreshes. If a visitor collapses or dismisses the bar, when they refresh the page again, it will stay in the previous state.', 'foobar' ),
							'type'    => 'radiolist',
							'default' => '',
							'choices' => $this->get_remember_choices(),
							'order' => 60
						),  //remember state
						array(
							'id'      => 'state_expires',
							'class'   => 'foofields-full-width',
							'label'   => __( 'State Expires?', 'foobar' ),
							'desc'    => __( 'Should the remembered state expire? Once expired the bars initial state will be applied.', 'foobar' ),
							'type'    => 'radiolist',
							'default' => 'no',
							'choices' => $this->get_remember_expires_choices(),
							'order' => 60,
							'data'    => array(
								'show-when' => array(
									'field'    => 'remember',
									'operator' => '===',
									'value'    => '',
								)
							)
						),  //remember expires
						array(
							'id'      => 'state_duration',
							'class'   => 'foofields-full-width',
							'label'   => __( 'State Duration', 'foobar' ),
							'desc'    => __( 'How long should the state be remembered?', 'foobar' ),
							'type'    => 'numeric',
							'default' => 14,
							'suffix'  => 'day(s)',
							'order' => 60,
							'data'    => array(
								'show-when' => array(
									'field'    => 'state_expires',
									'operator' => '===',
									'value'    => 'yes',
								)
							)
						),  //remember expiry
					)
				),
				'toggle_group' => array(
					'id' => 'toggle_group',
					'type' => 'field-group',
					'label' => __( 'Toggle Button', 'foobar' ),
					'desc' => __( 'The toggle is the small button on the side of the notification with an icon, that collapses or dismisses the notification. To disable the toggle button, select a Toggle Shape of "None".', 'foobar' ),
					'order' => 20,
					'fields' => array(
						array(
							'id'      => 'toggle',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Shape', 'foobar' ),
							'desc'    => __( 'What do you want the toggle button shape to look like?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 10,
							'default' => 'fbr-toggle-default',
							'choices' => $this->get_toggle_choices()
						), //toggle shape
						array(
							'id'      => 'toggle_position',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Position', 'foobar' ),
							'desc'    => __( 'Where do you want the toggle button to show?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 20,
							'default' => '',
							'choices' => $this->get_toggle_position_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'toggle',
									'operator' => '!==',
									'value'    => 'fbr-toggle-none',
								)
							)
						), //toggle position
						array(
							'id'      => 'toggle_action',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Action', 'foobar' ),
							'desc'    => __( 'What happens when the toggle button is clicked? ', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 30,
							'default' => '',
							'choices' => $this->get_toggle_action_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'toggle',
									'operator' => '!==',
									'value'    => 'fbr-toggle-none',
								)
							)
						) //toggle action
					)
				)
			);

			$fields['general'] = array(
				'id'     => 'general',
				'label'  => __( 'General', 'foobar' ),
				'icon'   => 'dashicons-admin-settings',
				'fields' => $general_fields,
				'order'  => 10
			);

			return $fields;
		}

		function get_layout_push_choices(){
			return apply_filters( 'foobar_admin_notification_metaboxsettings_layout_push_choices', array(
				'yes' => array(
					'label'   => __( 'Yes', 'foobar' ),
					'tooltip' => __( 'The notification will push the page to try avoid hiding content', 'foobar' )
				),
				'no' => array(
					'label'   => __( 'No', 'foobar' ),
					'tooltip' => __( 'The notification is simply positioned within the page and may overlap content', 'foobar' )
				)
			) );
		}

		function get_toggle_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_toggle_choices', array(
				'fbr-toggle-default' => array(
					'label'   => __( 'Square', 'foobar' ),
					'tooltip' => __( 'The default toggle button shape, which is square', 'foobar' )
				),
				'fbr-toggle-circle'     => array(
					'label'   => __( 'Circle', 'foobar' ),
					'tooltip' => __( 'A circular toggle button', 'foobar' ),
				),
				'fbr-toggle-overlap'     => array(
					'label'   => __( 'Overlap', 'foobar' ),
					'tooltip' => __( 'A square toggle button which overlaps the bar', 'foobar' ),
				),
				'fbr-toggle-none'     => array(
					'label'   => __( 'None', 'foobar' ),
					'tooltip' => __( 'Do not show a toggle button', 'foobar' ),
				)
			) );
		}

		function get_toggle_position_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_toggle_position_choices', array(
				'' => array(
					'label'   => __( 'Default', 'foobar' ),
					'tooltip' => __( 'The default toggle button position, which could change based on the type and position.', 'foobar' )
				),
				'fbr-toggle-left'     => array(
					'label'   => __( 'Force Left', 'foobar' ),
					'tooltip' => __( 'Forces the toggle to be displayed on the left', 'foobar' ),
				),
				'fbr-toggle-right'     => array(
					'label'   => __( 'Force Right', 'foobar' ),
					'tooltip' => __( 'Forces the toggle to be displayed on the left', 'foobar' ),
				),
			) );
		}

		function get_toggle_action_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_toggle_action_choices', array(
				'' => array(
					'label'   => __( 'Toggle', 'foobar' ),
					'tooltip' => __( 'The toggle button will expand or collapse the bar.', 'foobar' )
				),
				'dismiss'     => array(
					'label'   => __( 'Dismiss', 'foobar' ),
					'tooltip' => __( 'Dismissing the bar will remove it from the page completely.', 'foobar' ),
				),
//				'dismiss_immediate'     => array(
//					'label'   => __( 'Close Immediately', 'foobar' ),
//					'tooltip' => __( 'Closing the bar will remove it completely, with NO transition.', 'foobar' ),
//				),
			) );
		}

		function get_open_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_open_choices', array(
				'open' => array(
					'label'   => __( 'Opened', 'foobar' ),
					'tooltip' => __( 'Open the bar when the page loads', 'foobar' )
				),
				'closed'     => array(
					'label'   => __( 'Closed', 'foobar' ),
					'tooltip' => __( 'The bar will be closed/collapsed when the page loads', 'foobar' ),
				)
			) );
		}

		function get_remember_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_remember_choices', array(
				'' => array(
					'label'   => __( 'Yes', 'foobar' ),
					'tooltip' => __( 'The bar state will be remembered when the page is refreshed.', 'foobar' )
				),
				'disabled'     => array(
					'label'   => __( 'No', 'foobar' ),
					'tooltip' => __( 'The state of the bar will not be remembered when the page is refreshed.', 'foobar' ),
				)
			) );
		}

		function get_remember_expires_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_remember_expires_choices', array(
				'yes' => array(
					'label'   => __( 'Yes', 'foobar' ),
					'tooltip' => __( 'The bar state will expire after the selected duration.', 'foobar' )
				),
				'no'     => array(
					'label'   => __( 'No', 'foobar' ),
					'tooltip' => __( 'The state of the bar will be persisted indefinitely.', 'foobar' ),
				)
			) );
		}
	}
}

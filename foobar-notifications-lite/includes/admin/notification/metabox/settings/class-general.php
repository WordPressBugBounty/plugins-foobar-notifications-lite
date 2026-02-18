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
						array(
							'id'      => 'max_content_width',
							'label'   => __( 'Max Content Width', 'foobar' ),
							'desc'    => __( 'Do you want to constrain the content displayed within the notification to a specific size?' ),
							'type'    => 'unit',
							'default' => '',
							'default_unit' => 'px'
						), //max content width
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
							'default' => 'fbr-toggle-circle',
							'choices' => $this->get_toggle_choices()
						), //toggle shape
						array(
							'id'      => 'toggle_size',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Size', 'foobar' ),
							'desc'    => __( 'The size of the toggle button.', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 20,
							'default' => 'fbr-toggle-size-sm',
							'choices' => $this->get_toggle_size_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'toggle',
									'operator' => '!==',
									'value'    => 'fbr-toggle-none',
								)
							)
						), //toggle size
						array(
							'id'      => 'toggle_position',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Position', 'foobar' ),
							'desc'    => __( 'Where do you want the toggle button to show?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 30,
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
							'order'   => 40,
							'default' => '',
							'choices' => $this->get_toggle_action_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'toggle',
									'operator' => '!==',
									'value'    => 'fbr-toggle-none',
								)
							)
						), //toggle action
						array(
							'id'      => 'toggle_full_height',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Full Height', 'foobar' ),
							'desc'    => __( 'Should the toggle take up the full height of the notification when opened?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 50,
							'default' => 'fbr-toggle-static',
							'choices' => $this->get_toggle_full_height_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'toggle',
									'operator' => 'regex',
									'value'    => 'fbr-toggle-default|fbr-toggle-circle',
								)
							)
						), //toggle full height
						array(
							'id'      => 'toggle_balance',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Balanced', 'foobar' ),
							'desc'    => __( 'Should space be reserved on the opposite side from the toggle to balance the notification layout?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 60,
							'default' => 'fbr-toggle-balance',
							'choices' => $this->get_toggle_balance_choices(),
							'data'    => array(
								'show-when' => array(
									array(
										'field'    => 'layout',
										'operator' => 'regex',
										'value'    => 'fbr-layout-top|fbr-layout-top-inline|fbr-layout-bottom|fbr-layout-inline',
									),
									array(
										'field'    => 'toggle',
										'operator' => '!==',
										'value'    => 'fbr-toggle-none',
									)
								)
							)
						) //toggle balance
					)
				)
			);

			if ( foobar_check_capability_admin( array( 'has_nav' ) ) ) {
				$general_fields['nav_group'] = array(
					'id'      => 'nav_group',
					'type'    => 'field-group',
					'label'   => __( 'Previous & Next Buttons', 'foobar' ),
					'desc'	=> __( 'The previous and next buttons are displayed on either side of the notification content if it has two or more messages.', 'foobar' ),
					'order'   => 30,
					'fields' => array(
						array(
							'id'      => 'nav',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Shape', 'foobar' ),
							'desc'    => __( 'What do you want the previous and next buttons to look like?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 10,
							'default' => 'fbr-nav-circle',
							'choices' => $this->get_nav_choices()
						), //nav enabled
						array(
							'id'      => 'nav_full_height',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Full Height', 'foobar' ),
							'desc'    => __( 'Should the previous and next buttons take up the full height of the notification?', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 20,
							'default' => 'fbr-nav-static',
							'choices' => $this->get_nav_full_height_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'nav',
									'operator' => '!==',
									'value'    => 'fbr-nav-none',
								)
							)
						), //nav full height
						array(
							'id'      => 'nav_size',
							'class'   => 'foofields-full-width',
							'label'   => __( 'Size', 'foobar' ),
							'desc'    => __( 'The size of the previous and next button.', 'foobar' ),
							'type'    => 'radiolist',
							'order'   => 30,
							'default' => 'fbr-nav-size-sm',
							'choices' => $this->get_nav_size_choices(),
							'data'    => array(
								'show-when' => array(
									'field'    => 'nav',
									'operator' => '!==',
									'value'    => 'fbr-nav-none',
								)
							)
						) //nav size
					)
				);
			}

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

		function get_toggle_full_height_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_toggle_full_height_choices', array(
				'' => array(
					'label'   => __( 'Yes', 'foobar' ),
					'tooltip' => __( 'The toggle button expands to the full height of the notification when opened.', 'foobar' )
				),
				'fbr-toggle-static'     => array(
					'label'   => __( 'No', 'foobar' ),
					'tooltip' => __( 'The toggle button stays the same size as when the notification is closed.', 'foobar' ),
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

		function get_toggle_balance_choices() {
			return apply_filters(  'foobar_admin_notification_metaboxsettings_toggle_balance_choices', array(
				'fbr-toggle-balance' => array(
					'label'   => __( 'Yes', 'foobar' ),
					'tooltip' => __( 'Space is reserved on the opposite side of the notification from the toggle to balance the layout.', 'foobar' )
				),
				''     => array(
					'label'   => __( 'No', 'foobar' ),
					'tooltip' => __( 'No space is reserved.', 'foobar' ),
				)
			) );
		}
		
		function get_toggle_size_choices() {
			return apply_filters(  'foobar_admin_notification_metaboxsettings_toggle_size_choices', array(
				'fbr-toggle-size-sm' => array(
					'label'   => __( 'Small', 'foobar' ),
					'tooltip' => __( 'A small toggle size.', 'foobar' )
				),
				'fbr-toggle-size-md'     => array(
					'label'   => __( 'Medium', 'foobar' ),
					'tooltip' => __( 'A medium toggle size.', 'foobar' ),
				),
				'fbr-toggle-size-lg'     => array(
					'label'   => __( 'Large', 'foobar' ),
					'tooltip' => __( 'A large toggle size.', 'foobar' ),
				)
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

		function get_nav_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_nav_choices', array(
				'fbr-nav-default' => array(
					'label'   => __( 'Square', 'foobar' ),
					'tooltip' => __( 'The default previous and next button shape, which is square', 'foobar' )
				),
				'fbr-nav-circle'     => array(
					'label'   => __( 'Circle', 'foobar' ),
					'tooltip' => __( 'A circular previous and next button', 'foobar' ),
				),
				'fbr-nav-none'     => array(
					'label'   => __( 'None', 'foobar' ),
					'tooltip' => __( 'Do not show the previous and next button', 'foobar' ),
				)
			) );
		}

		function get_nav_full_height_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_nav_full_height_choices', array(
				'' => array(
					'label'   => __( 'Yes', 'foobar' ),
					'tooltip' => __( 'The previous and next buttons expand to the full height of the notification.', 'foobar' )
				),
				'fbr-nav-static'     => array(
					'label'   => __( 'No', 'foobar' ),
					'tooltip' => __( 'The previous and next buttons stay a fixed size.', 'foobar' ),
				)
			) );
		}
		
		function get_nav_size_choices() {
			return apply_filters(  'foobar_admin_notification_metaboxsettings_nav_size_choices', array(
				'fbr-nav-size-sm' => array(
					'label'   => __( 'Small', 'foobar' ),
					'tooltip' => __( 'A small previous & next button size.', 'foobar' )
				),
				'fbr-nav-size-md'     => array(
					'label'   => __( 'Medium', 'foobar' ),
					'tooltip' => __( 'A medium previous & next button size.', 'foobar' ),
				),
				'fbr-nav-size-lg'     => array(
					'label'   => __( 'Large', 'foobar' ),
					'tooltip' => __( 'A large previous & next button size.', 'foobar' ),
				)
			) );
		}
	}
}

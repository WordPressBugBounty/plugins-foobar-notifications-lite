<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox\Settings;

if ( ! class_exists( __NAMESPACE__ . '\Appearance' ) ) {

	class Appearance {

		function __construct() {
			add_filter( 'foobar_admin_notification_settings_fields', array( $this, 'append_appearance_fields' ), 30 );
			add_filter( 'foobar_render_get_meta', array( $this, 'override_render_meta' ), 10, 3 );
		}

		function override_render_meta( $value, $key, $default ) {

			if ( ! foobar_is_pro() ) {
				if ( $key === 'color' && $value === 'fbr-custom-color' ) {
					return $default;
				}
			}

			return $value;
		}

		function append_appearance_fields( $fields ) {
			if ( ! foobar_is_pro() ) {
				$fields['appearance'] = array(
					'id'     => 'appearance',
					'label'  => __( 'Appearance', 'foobar' ),
					'icon'   => 'dashicons-admin-appearance',
					'order'  => 30,
					'fields' => array(
						array(
							'id'     => 'appearance_group',
							'type'   => 'field-group',
							'label'  => __( 'Appearance', 'foobar' ),
							'order'  => 20,
							'fields' => array(
								array(
									'id'      => 'color',
									'class'   => 'foofields-full-width',
									'label'   => __( 'Color Scheme', 'foobar' ),
									'desc'    => __( 'Choose from one of the pre-defined color schemes available.', 'foobar' ),
									'order'   => 10,
									'type'    => 'htmllist',
									'default' => 'fbr-blue',
									'choices' => $this->get_color_choices()
								),
								array(
									'id'      => 'transition',
									'class'   => 'foofields-full-width',
									'label'   => __( 'Transition', 'foobar' ),
									'desc'    => __( 'What transition should the notification use when opening or closing?', 'foobar' ),
									'order'   => 20,
									'type'    => 'radiolist',
									'default' => 'fbr-transition-slide',
									'choices' => $this->get_transition_choices()
								)
							)
						)
					)
				);
			}

			return $fields;
		}

		function get_color_choices() {
			return array(
				'fbr-blue'   => array(
					'tooltip' => __( 'Blue', 'foobar' ),
					'html'    => '<span style="background-color:#63aeff"></span>'
				),
				'fbr-green'  => array(
					'tooltip' => __( 'Green', 'foobar' ),
					'html'    => '<span style="background-color:#51cb94"></span>'
				),
				'fbr-purple' => array(
					'tooltip' => __( 'Purple', 'foobar' ),
					'html'    => '<span style="background-color:#b479f2"></span>'
				),
				'fbr-red'    => array(
					'tooltip' => __( 'Red', 'foobar' ),
					'html'    => '<span style="background-color:#ff716d"></span>'
				),
				'fbr-orange' => array(
					'tooltip' => __( 'Orange', 'foobar' ),
					'html'    => '<span style="background-color:#fea76d"></span>'
				),
				'fbr-yellow' => array(
					'tooltip' => __( 'Yellow', 'foobar' ),
					'html'    => '<span style="background-color:#fbdc70"></span>'
				),
				'fbr-dark'   => array(
					'tooltip' => __( 'Dark', 'foobar' ),
					'html'    => '<span style="background-color:#333"></span>'
				),
				'fbr-light'  => array(
					'tooltip' => __( 'Light', 'foobar' ),
					'html'    => '<span style="background-color:#eee"></span>'
				)
			);
		}


		function get_transition_choices() {
			return apply_filters( 'foobar_admin_notification_metaboxsettings_transition_choices', array(
				'fbr-transition-slide'      => array(
					'label'   => __( 'Slide', 'foobar' ),
					'tooltip' => __( 'A slide animation is used when opening or closing the bar', 'foobar' )
				),
				'fbr-transition-fade'       => array(
					'label'   => __( 'Fade', 'foobar' ),
					'tooltip' => __( 'A fade animation is used when opening or closing the bar', 'foobar' )
				),
				'fbr-transition-slide-fade' => array(
					'label'   => __( 'Slide + Fade', 'foobar' ),
					'tooltip' => __( 'The bar will slide and fade at the same time', 'foobar' )
				),
				''                          => array(
					'label'   => __( 'None', 'foobar' ),
					'tooltip' => __( 'No transition is used - it is immediate', 'foobar' ),
				)
			) );
		}
	}
}

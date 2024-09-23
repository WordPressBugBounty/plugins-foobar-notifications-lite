<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox;

use FooPlugins\FooBar\Admin\FooFields\Fields\Field;
use FooPlugins\FooBar\Admin\FooFields\Metabox;

if ( ! class_exists( __NAMESPACE__ . '\Debug' ) ) {

	class Debug extends Metabox {

		function __construct() {
			parent::__construct(
				array(
					'manager'        => FOOBAR_SLUG,
					'post_type'      => FOOBAR_CPT_NOTIFICATION,
					'metabox_id'     => 'debug',
					'metabox_title'  => __( 'Debug Information', 'foobar' ),
					'priority'       => 'low',
					'suppress_meta_key_error' => true,
					'fields'         => array(
						array(
							'id'     => 'debug_help',
							'type'   => 'help',
							'text'   => __( 'Debug information is showing here because the enabled debug mode on the settings page. To hide this, disable debug mode.', 'foobar' )
						),
						array(
							'id'     => 'debug',
							'type'   => 'debug',
							'render' => array( $this, 'render_debug' )
						)
					)
				)
			);

			$this->add_filter( 'must_add_meta_boxes', array( $this, 'must_add_meta_boxes' ) );
		}

		/**
		 * Determines if the metabox should be shown or not
		 * @return bool
		 */
		function must_add_meta_boxes() {
			$foobar = foobar_get_instance_admin();

			return $foobar !== false;
		}

		/**
		 * Render the preview contents
		 *
		 * @param $field Field
		 */
		function render_debug( $field ) {
			$foobar = foobar_get_instance_admin();

			if ( $foobar !== false ) {
				var_dump( $foobar->meta );
			} else {
				echo __( 'No debug info available.', 'foobar' );
			}
		}
	}
}

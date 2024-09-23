<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox;

use FooPlugins\FooBar\Admin\FooFields\Fields\Field;
use FooPlugins\FooBar\Admin\FooFields\Metabox;

if ( ! class_exists( __NAMESPACE__ . '\InlinePreview' ) ) {

	class InlinePreview extends Metabox {

		function __construct() {
			parent::__construct(
				array(
					'manager'        => FOOBAR_SLUG,
					'post_type'      => FOOBAR_CPT_NOTIFICATION,
					'metabox_id'     => 'inline_preview',
					'metabox_title'  => __( 'Inline Preview', 'foobar' ),
					'priority'       => 'high',
					'suppress_meta_key_error' => true,
					'fields'         => array(
						array(
							'id'     => 'preview',
							'type'   => 'preview',
							'render' => array( $this, 'render_inline_preview' )
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

			if ( $foobar !== false ) {
				return true;
			}

			return false;
		}

		/**
		 * Render the preview contents
		 *
		 * @param $field Field
		 */
		function render_inline_preview( $field ) {
			$foobar = foobar_get_instance_admin();

			if ( $foobar !== false && $foobar->is_inline() ) {
				foobar_render_bar( $foobar );
			} else {
				echo '<style>#foobar_notification-inline_preview { display: none; }</style>';
				echo '<div class="foobar_metabox_inline_preview_container">';
				echo '<span class="foobar_metabox_inline_preview_content">' . __( 'Preview not available.', 'foobar' ) . '</span>';
				echo '</div>';
			}
		}
	}
}

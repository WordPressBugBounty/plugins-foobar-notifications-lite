<?php

namespace FooPlugins\FooBar\Renderers\Items;

use FooPlugins\FooBar\Renderers\Items;

/**
 * FooBar CallToAction Item Renderer Class
 */

if ( ! class_exists( 'FooPlugins\FooBar\Renderers\Items\CallToAction' ) ) {

	class CallToAction extends Item {

		function get_item_classes() {
			$classes = parent::get_item_classes();

			// get the various item specific options here
			$button_position = $this->bar_renderer->get_meta( 'cta_button_position', '' );
			if ( $button_position !== '' ) {
				// if it's not the default which requires no CSS class then add the value
				$classes[] = $button_position;
			}

			return $classes;
		}

		function render() {
			$bar = $this->item->bar;

			$this->render_message_by_meta_keys( 'cta_text', 'cta_show_link', 'cta_link_text', 'cta_link_target', 'cta_link_url' );

			$this->render_buttons( array(
				array(
					'type'   => 'link',
					'text'   => $bar->get_meta( 'cta_button_text', '' ),
					'target' => $bar->get_meta( 'cta_button_target', '_self' ),
					'href'   => $bar->get_meta( 'cta_button_url', '#' )
				),
			) );
		}
	}
}

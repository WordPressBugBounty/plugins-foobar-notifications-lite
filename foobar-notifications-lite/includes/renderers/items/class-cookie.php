<?php

namespace FooPlugins\FooBar\Renderers\Items;

use FooPlugins\FooBar\Renderers\Renderer;

/**
 * FooBar Cookie Item Renderer Class
 */

if ( ! class_exists( 'FooPlugins\FooBar\Renderers\Items\Cookie' ) ) {

	class Cookie extends Item {

		function get_item_classes() {
			$classes = parent::get_item_classes();

			// get the various item specific options here
			$button_position = $this->bar_renderer->get_meta( 'cookie_button_position', '' );
			if ( $button_position !== '' ) {
				// if it's not the default which requires no CSS class then add the value
				$classes[] = $button_position;
			}

			return $classes;
		}

		function render() {
			$bar = $this->item->bar;

			$this->render_message_by_meta_keys( 'cookie_notice', 'cookie_show_policy_link', 'cookie_policy_link_text', 'cookie_policy_link_target', 'cookie_policy_link_url' );

			$has_decline = $bar->get_meta( 'cookie_show_decline_button', 'no' ) === 'yes';
			$buttons = array(
				array(
					'type'   => 'action',
					'action' => 'dismiss',
					'text'   => $bar->get_meta( 'cookie_button_text', __( 'Accept', 'foobar' ) ),
					'class' => $has_decline ? 'fbr-mobile-50' : 'fbr-mobile-100'
				),
			);

			if ( $has_decline ) {
				$buttons[] = array(
					'type'   => 'link',
					'target' => $bar->get_meta( 'cookie_decline_button_target', '_self' ),
					'text'   => $bar->get_meta( 'cookie_decline_button_text', __( 'Decline', 'foobar' ) ),
					'href'   => $bar->get_meta( 'cookie_decline_button_url', '#' ),
					'class'  => 'fbr-mobile-50 fbr-button-secondary',
				);
			}

			$this->render_buttons( $buttons );
		}
	}
}

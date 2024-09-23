<?php
namespace FooPlugins\FooBar\Renderers\Items;

use FooPlugins\FooBar\Renderers\Renderer;

/**
 * FooBar Message Item Renderer Class
 */

if ( !class_exists( 'FooPlugins\FooBar\Renderers\Items\Message' ) ) {

	class Message extends Item {
		function render( $args = null ) {
			$this->render_message_by_meta_keys(
				'message_text',
				'message_show_link',
				'message_link_text',
				'message_link_target',
				'message_link_url'
			);
		}
	}
}

<?php
namespace FooPlugins\FooBar\Renderers\Items;

use FooPlugins\FooBar\Renderers\Renderer;

/**
 * FooBar Base Item Renderer Class
 */

if ( !class_exists( 'FooPlugins\FooBar\Renderers\Items\Item' ) ) {

	class Item extends Renderer {
		/**
		 * @var \FooPlugins\FooBar\Objects\Items\Item
		 */
		protected $item;

		/**
		 * @var \FooPlugins\FooBar\Renderers\Bars\Bar
		 */
		protected $bar_renderer;

		/**
		 * Base constructor.
		 *
		 * @param $item \FooPlugins\FooBar\Objects\Items\Item
		 * @param $bar_renderer \FooPlugins\FooBar\Renderers\Bars\Bar
		 */
		function __construct( $item, $bar_renderer ) {
			$this->item = $item;
			$this->bar_renderer = $bar_renderer;
		}

		/**
		 * Render the start of the item
		 */
		function render_start(){
			$this->render_html_tag( 'li', $this->get_item_attributes(), null, false );
			echo '<div class="fbr-item-inner">';
		}

		/**
		 * Return the attributes for an item, including the class
		 *
		 * @return array
		 */
		function get_item_attributes(){
			$attributes = array( 'class' => $this->build_classes() );

			$data_options = $this->build_data_options();
			if ( $data_options !== false ){
				$attributes['data-options'] = $data_options;
			}

			return $attributes;
		}

		/**
		 * Builds up the class attribute
		 *
		 * @return mixed|void
		 */
		function build_classes(){
			$classes = apply_filters( 'foobar_render_item_classes', $this->get_item_classes(), $this->item );

			$classes = array_filter( $classes );

			return implode(' ', $classes );
		}

		/**
		 * Returns the array of classes for the item
		 * @return string[]
		 */
		function get_item_classes() {
			return array(
				'fbr-item',
				'fbr-item-' . $this->item->type
			);
		}

		/**
		 * Builds up the data-options attribute and returns a JSON encoded string.
		 *
		 * @return string|boolean Returns FALSE if there are no options.
		 */
		function build_data_options() {
			$data_options = apply_filters( 'foobar_render_item_data_options', $this->get_data_options(), $this->item );
			if ( !empty( $data_options ) ){
				if ( defined( 'JSON_UNESCAPED_UNICODE' ) ) {
					return json_encode( $data_options, JSON_UNESCAPED_UNICODE );
				} else {
					return json_encode( $data_options );
				}
			}
			return false;
		}

		function get_data_options(){
			return array();
		}

		function render() {

		}

		function render_end(){
			echo '</div></li>';
		}

		function is_demo() {
			return $this->bar_renderer->is_demo();
		}

		/**
		 * Renders a long piece of text within the message
		 *
		 * @param $text
		 */
		function render_message_text( $text ) {
			echo nl2br( urldecode( $text ) );
		}

		/**
		 * Renders a link within the message
		 *
		 * @param $link_text
		 * @param $link_target
		 * @param $link_href
		 */
		function render_message_link( $link_text, $link_target, $link_href ) {
			$link_text = urldecode( $link_text );

			if ( '' !== $link_text ) {
				$this->render_html_tag( 'a', array(
					'target' => $link_target,
					'href' => esc_url( $link_href )
				), $link_text );
			}
		}

		/**
		 * Render a message with an optional link
		 *
		 * @param $message_text
		 * @param $show_link
		 * @param $link_text
		 * @param $link_target
		 * @param $link_href
		 */
		function render_message( $message_text, $show_link = false, $link_text = '', $link_target = '_self', $link_href = '#' ) {
			echo '<span class="fbr-message">';

			$this->render_message_text( $message_text );
			if ( $show_link ) {
				$this->render_message_link( $link_text, $link_target, $link_href );
			}

			echo '</span>';
		}

		/**
		 * Renders a message and optional link by passing in the meta keys
		 *
		 * @param $message_text_meta_key
		 * @param $show_link_meta_key
		 * @param $link_text_meta_key
		 * @param $link_target_meta_key
		 * @param $link_href_meta_key
		 */
		function render_message_by_meta_keys( $message_text_meta_key, $show_link_meta_key, $link_text_meta_key, $link_target_meta_key, $link_href_meta_key ) {
			$bar = $this->item->bar;

			$this->render_message(
				$bar->get_meta( $message_text_meta_key, '' ),
				$bar->get_meta( $show_link_meta_key, 'no' ) === 'yes',
				$bar->get_meta( $link_text_meta_key ),
				$bar->get_meta( $link_target_meta_key, '_self' ),
				$bar->get_meta( $link_href_meta_key, '#' )
			);
		}

		/**
		 * Renders buttons
		 *
		 * @param $buttons
		 */
		function render_buttons( $buttons ) {
			if ( is_array( $buttons ) && count( $buttons ) > 0 ) {

				echo '<div class="fbr-buttons">';

				foreach( $buttons as $button ) {
					if ( isset( $button['type'] ) ) {
						$class = apply_filters( 'foobar_render_button_class', isset( $button['class'] ) ? $button['class'] : 'fbr-mobile-100', $this->item->bar );
						if ( 'link' === $button['type'] ) {
							$this->render_link_button( $button['text'], $button['target'], $button['href'], $class );
						} else if ( 'action' === $button['type'] ) {
							$this->render_action_button( $button['text'], isset( $button['action'] ) ? $button['action'] : '', $class );
						}
					}
				}

				echo '</div>';
			}
		}

		function get_button_class( $button_additional_class = '' ){
			if ( strpos( $button_additional_class, 'fbr-mobile-' ) === false ){
				return 'fbr-button ' . $button_additional_class;
			}
			return 'fbr-button fbr-mobile-100 ' . $button_additional_class;
		}

		/**
		 * Render a link button
		 *
		 * @param $button_text
		 * @param $button_target
		 * @param $button_href
		 * @param string $button_additional_class
		 */
		function render_link_button( $button_text, $button_target, $button_href, $button_additional_class = '' ) {
			if ( !empty( $button_text ) ) {
				$this->render_html_tag( 'a', array(
					'class' => $this->get_button_class( $button_additional_class ),
					'target' => $button_target,
					'href' => esc_url( $button_href )
				), null, false );
				$this->render_html_tag( 'span', array( 'class' => 'fbr-button-text' ), urldecode( $button_text ) );
				echo '</a>';
			}
		}

		/**
		 * Renders an action button
		 *
		 * @param $button_text
		 * @param $button_action
		 * @param string $button_additional_class
		 */
		function render_action_button( $button_text, $button_action, $button_additional_class = '' ) {
			if ( !empty( $button_text ) ) {
				$args = array(
					'class' => $this->get_button_class( $button_additional_class ),
					'type' => 'button',
				);
				if ( !empty( $button_action ) ) {
					$args['data-foobar-action'] = $button_action;
				}
				$this->render_html_tag( 'button', $args, null, false );
				$this->render_html_tag( 'span', array( 'class' => 'fbr-button-text' ), urldecode( $button_text ) );
				echo '</button>';
			}
		}
	}
}

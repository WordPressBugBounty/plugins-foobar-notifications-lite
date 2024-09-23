<?php
namespace FooPlugins\FooBar\Renderers\Bars;

use FooPlugins\FooBar\Renderers\Renderer;

/**
 * FooBar Base Bar Renderer Class
 */

if ( !class_exists( 'FooPlugins\FooBar\Renderers\Bars\Bar' ) ) {

	class Bar extends Renderer {

		/**
		 * @var \FooPlugins\FooBar\Objects\Bars\Bar
		 */
		public $bar;

		/**
		 * @var array
		 */
		public $args;

		/**
		 * Base constructor.
		 *
		 * @param $bar \FooPlugins\FooBar\Objects\Bars\Bar
		 * @param $args array
		 */
		function __construct( $bar, $args ) {
			$this->bar = $bar;
			$this->args = $args;
		}

		/**
		 * Renders the notification
		 *
		 * @param $args
		 */
		function render() {
			if ( !is_admin() ) {
				//check that visibility is not never
				if ( $this->get_meta( 'visibility', '' ) === 'never' ) {
					return;
				}
			}

			$unique_id = $this->bar->unique_id();
			//render container div
			$this->render_html_tag( 'div', array(
				'id' => $unique_id,
				'style' => 'display:none',
				'class' => $this->build_classes(),
				'data-options' => $this->build_data_options(),
			), null, false );

			//render content div
			echo '<div class="fbr-content">';

			//render items
			$this->render_items();

			echo '</div>'; //close content div

			$toggle_class = apply_filters( 'foobar_render_toggle_class', 'fbr-toggle', $this->bar );

			echo '<button class="' . esc_attr( $toggle_class ) . '"></button>';

			echo '</div>'; //close container div

			$custom_css = $this->build_custom_css();

			//output any custom CSS here
			if ( ! empty( $custom_css ) ) {
				echo '<style id="' . $unique_id . '_custom" type="text/css">';
				echo $custom_css;
				echo '</style>';
			}
		}

		function build_custom_css() {
			return apply_filters( 'foobar_notification_custom_css', $this->bar->custom_css, $this );
		}

		function build_classes(){
			$classes = apply_filters( 'foobar_render_container_classes', $this->get_classes(), $this->bar );

			$classes = array_filter( $classes );

			return implode(' ', $classes );
		}

		function get_classes(){
			$classes = array( 'foobar', 'foobar-' . $this->bar->type() );

			$layout = $this->get_meta( 'layout', 'fbr-layout-top' );
			$color = $this->get_meta( 'color', 'fbr-blue' );
			$toggle = $this->get_meta( 'toggle', 'fbr-toggle-default' );
			$transition = $this->get_meta( 'transition', 'fbr-transition-slide' );
			$toggle_position = $this->get_meta( 'toggle_position', '' );

			$classes['layout'] = $layout;
			$classes['color'] = $color;
			$classes['toggle'] = $toggle;
			$classes['transition'] = $transition;
			$classes['toggle_position'] = $toggle_position;

			if ( $this->has_capability( 'has_items') ) {
				$item_transition = $this->determine_item_transition_class();
				if ( $item_transition !== false ){
					$classes['item-transition'] = $item_transition;
				}
			}

			//check for RTL support
			if ( is_rtl() ) {
				$classes['rtl'] = 'fbr-rtl';
			}

			return $classes;
		}

		/**
		 * Determined the transition class based on the layout and transition
		 *
		 * @return false|string
		 */
		protected function determine_item_transition_class(){
			$transition = $this->get_meta( 'transition', 'fbr-transition-slide' );
			if ( $this->starts_with( $transition, 'fbr-transition-slide' ) ){
				$layout = $this->get_meta( 'layout', 'fbr-layout-top' );
				// slide items horizontally
				return 'fbr-transition-item-slide-x';
//				if ( $this->starts_with( $layout, 'fbr-layout-left' ) || $this->starts_with( $layout, 'fbr-layout-right' ) ){
//					// slide items horizontally
//					return 'fbr-transition-item-slide-x';
//				} else {
//					// slide items vertically
//					return 'fbr-transition-item-slide-y';
//				}
			} else if ( $transition === 'fbr-transition-fade' ){
				return 'fbr-transition-item-fade';
			}
			return false;
		}

		/**
		 * Builds up the data-options attribute
		 *
		 * @return mixed|void
		 */
		function build_data_options() {
			$data_options = apply_filters( 'foobar_render_data_options', $this->get_data_options(), $this->bar );

			if ( defined( 'JSON_UNESCAPED_UNICODE' ) ) {
				return json_encode( $data_options, JSON_UNESCAPED_UNICODE );
			} else {
				return json_encode( $data_options );
			}
		}

		function get_data_options(){
			$data_options = array();

			$open = $this->get_meta( 'open', 'open' ) === 'open';
			$toggle_action = $this->get_meta( 'toggle_action', '' );
			$layout_push = $this->get_meta( 'layout_push', 'yes' );

			if ( 'dismiss' === $toggle_action ) {
				$data_options['dismiss'] = true;
			}
			if ( 'dismiss_immediate' === $toggle_action ) {
				$data_options['dismiss'] = true;
				$data_options['dismissImmediate'] = true;
			}
			if ( 'yes' === $layout_push ) {
				$data_options['push'] = true;
			}

			if ( $open ) {
				$transition = $this->get_meta( 'transition', 'fbr-transition-slide' );
				if ( $transition !== '' ) {
					$open = 'transition';
				} else {
					$open = 'immediate';
				}
				$data_options['open'] = array(
					'name' => $open
				);
			}

			$preview = $this->get_meta( 'preview', false );
			if ( $preview || $this->is_demo() ) {
				$data_options['preview'] = true;
			} else {
				$data_options['remember'] = $this->get_meta( 'remember', '' ) === '';
				if ( $this->get_meta( 'state_expires', 'no' ) === 'yes' ) {
					$state_duration = intval( $this->get_meta( 'state_duration', 14 ) );
					$data_options['stateDuration'] = $state_duration;
				}
			}

			$custom_settings = $this->get_meta( 'custom_settings', '' );

			if ( !empty( $custom_settings ) ) {
				$settings_array = @json_decode($custom_settings, true);

				if ( isset( $settings_array ) ) {
					$data_options = array_merge_recursive( $data_options, $settings_array );
				}
			}

			return $data_options;
		}

		/**
		 * Gets the setting for a specific key
		 * Priority is given to the anything passed in via args
		 * Then the value is pulled from the saved meta
		 * Lastly, the default value is return if nothing else can be found
		 *
		 * @param $key
		 * @param $default
		 * @param $args
		 *
		 * @return mixed
		 */
		function get_meta( $key, $default ) {
			//first, check to see if args includes the key
			if ( is_array( $this->args ) && array_key_exists( $key, $this->args ) ) {
				return $this->args[$key];
			}
			//otherwise, get the value from the saved settings
			return apply_filters( 'foobar_render_get_meta', $this->bar->get_meta( $key, $default ), $key, $default );
		}

		/**
		 * Render the bar items
		 */
		public function render_items() {
			$items = $this->bar->items();

			echo '<ul class="fbr-items">';

			foreach ( $items as $item ) {
				$item_renderer = foobar_locate_item_renderer( $item, $this );
				if ( $item_renderer !== false ) {
					$item_renderer->render_start();
					$item_renderer->render();
					$item_renderer->render_end();
				}
			}

			echo '</ul>';
		}

		/**
		 * Returns true if the bar is being displayed as a demo
		 *
		 * @return bool
		 */
		public function is_demo() {
			return isset( $this->args['demo'] ) && $this->args['demo'];
		}

		/**
		 * Returns the id used when the bar is rendered
		 *
		 * @return string
		 */
		public function bar_unique_id() {
			return $this->bar->unique_id();
		}

		/**
		 * Returns true if the bar has a specific capability
		 *
		 * @param $capability
		 *
		 * @return bool
		 */
		public function has_capability( $capability ) {
			return foobar_check_capability( $this->bar, $capability );
		}
	}
}

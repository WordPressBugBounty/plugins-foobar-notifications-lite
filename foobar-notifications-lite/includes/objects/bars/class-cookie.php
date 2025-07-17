<?php
namespace FooPlugins\FooBar\Objects\Bars;

/**
 * The Cookie Bar
 */
if ( ! class_exists( 'FooPlugins\FooBar\Objects\Bars\Cookie' ) ) {

	class Cookie extends Bar {

		public function items() {
			$item = new \FooPlugins\FooBar\Objects\Items\Cookie( $this );
			return array( $item );
		}

		public function type() {
			return FOOBAR_BAR_TYPE_COOKIE;
		}
	}
}

<?php
namespace FooPlugins\FooBar;

/**
 * FooBar Enqueue Class.
 * This class handles including a bar on the frontend
 */

if ( !class_exists( 'FooPlugins\FooBar\Enqueue' ) ) {

	class Enqueue {

		/**
		 * @var array
		 */
		private $bars = array();
		private $shown_inline_bar = false;

		/**
		 * Enqueue private constructor.
		 */
		private function __construct() {

		}

		/**
		 * Static function to get the only instance of the Enqueue class
		 *
		 * @return Enqueue
		 */
		public static function instance() {
			global $foobar_enqueue_instance;

			if ( is_null( $foobar_enqueue_instance ) ) {
				$foobar_enqueue_instance = new self();
			}

			return $foobar_enqueue_instance;
		}

		/**
		 * Enqueues bars from the enqueue cache
		 */
		public function enqueue_from_cache() {
			$cache = get_option( FOOBAR_OPTION_ENQUEUE_CACHE );

			add_filter( 'foobar_enqueue_get_bars_to_enqueue_from_cache-all', array( $this, 'enqueue_bars_for_all' ), 10, 3 );

			if ( is_array( $cache ) ) {
				foreach ( $cache as $visibility => $cache_data ) {
					$bars = apply_filters( 'foobar_enqueue_get_bars_to_enqueue_from_cache-' . $visibility, false, $cache_data, $visibility );
					if ( $bars !== false && is_array( $bars ) ) {
						foreach ( $bars as $bar ) {
							if ( is_array( $bar ) ) {
								$id = $bar['id'];
								$args = array( 'type' => $bar['type'] );
							} else {
								$id = $bar;
								$args = null;
							}
							$this->enqueue( intval( $id ), $args );
						}
					}
				}
			}
		}

		/**
		 * Handle building up a cache item for bars that are set to show on all pages
		 *
		 * @param $bars
		 * @param $cache_data
		 * @param $visibility
		 *
		 * @return mixed
		 */
		function enqueue_bars_for_all( $bars, $cache_data, $visibility ) {
			return $cache_data;
		}

		/**
		 * Rebuild the enqueue cache from scratch
		 */
		public function rebuild_cache() {
			delete_option( FOOBAR_OPTION_ENQUEUE_CACHE );

			$cache = array();
			$save_cache = false;

			add_filter( 'foobar_enqueue_handle_cache_rebuild-all', array( $this, 'handle_cache_rebuild_all' ), 10, 3 );

			//loop through all published notifications
			$bars = foobar_get_all_bars();
			foreach ( $bars as $bar ) {
				if ( $bar !== false ) {
					$visibility = $bar->get_meta( 'visibility', '' );

					$cache_data = apply_filters( 'foobar_enqueue_handle_cache_rebuild-' . $visibility, false, $bar, $visibility );
					if ( $cache_data !== false ) {
						//make sure the cache has the visibility key
						if ( ! array_key_exists( $visibility, $cache ) ) {
							$cache[ $visibility ] = array();
						}

						//add the cache data for the bar
						$cache[ $visibility ][] = $cache_data;

						//make sure the cache is saved
						$save_cache = true;
					}
				}
			}

			if ( $save_cache ) {
				add_option( FOOBAR_OPTION_ENQUEUE_CACHE, $cache );
			}
		}

		/**
		 * Handle building up a cache item for bars that are set to show on all pages
		 *
		 * @param $cache_data
		 * @param $bar
		 * @param $visibility
		 *
		 * @return mixed
		 */
		function handle_cache_rebuild_all( $cache_data, $bar, $visibility ) {
			return array(
				'id' => $bar->ID,
				'type' => $bar->type(),
			);
		}

		/**
		 * Enqueue a bar so that it will be rendered on the frontend
		 *
		 * @param $id int
		 * @param $args
		 */
		public function enqueue( $id, $args = null ) {
			if ( !array_key_exists( $id, $this->bars ) ) {
				$this->bars[$id] = array(
					'id' => $id,
					'args' => $args
				);
			}
		}

		/**
		 * Returns all the enqueued bars
		 *
		 * @return array
		 */
		public function bars() {
			return $this->bars;
		}

		/**
		 * Returns true if there are any bars that are enqueued
		 * @return bool
		 */
		public function has_bars() {
			return $this->shown_inline_bar || ( is_array( $this->bars ) && count( $this->bars ) > 0 );
		}

		/**
		 * Returns true if there are bars of a certain type enqueued
		 *
		 * @param $bar_type
		 *
		 * @return bool
		 */
		public function has_bar_type( $bar_type ) {
			if ( $this->has_bars() ) {
				foreach ( $this->bars as $bar ) {
					if ( isset( $bar['args'] ) &&
					     isset( $bar['args']['type'] ) &&
					     $bar['args']['type'] === $bar_type ) {
						return true;
					}
				}
			}
			return false;
		}

		/**
		 * Sets the inline shown variable to true
		 */
		public function set_inline_bar_to_shown() {
			$this->shown_inline_bar = true;
		}
	}
}

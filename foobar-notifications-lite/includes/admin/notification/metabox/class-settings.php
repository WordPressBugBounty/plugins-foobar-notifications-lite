<?php

namespace FooPlugins\FooBar\Admin\Notification\Metabox;

use FooPlugins\FooBar\Admin\FooFields\Custom\FoobarMetabox;
use FooPlugins\FooBar\Enqueue;

if ( ! class_exists( __NAMESPACE__ . '\Settings' ) ) {

	class Settings extends FoobarMetabox {

		function __construct() {
			$suffix = foobar_is_debug() ? '' : '.min';

			parent::__construct(
				array(
					'manager'        => FOOBAR_SLUG,
					'post_type'      => FOOBAR_CPT_NOTIFICATION,
					'metabox_id'     => 'settings',
					'priority'       => 'high',
					'meta_key'       => FOOBAR_NOTIFICATION_META_SETTINGS,
					'disable_close'  => true,
					'scripts'        => array(
						array(
							'handle' => 'foobar-notification-edit',
							'src'    => FOOBAR_URL . 'assets/admin/js/notification.edit' . $suffix . '.js',
							'deps'   => array( 'jquery', 'foobar-core', 'foofields' ),
							'ver'    => FOOBAR_VERSION
						)
					),
					'styles'         => array(
						array(
							'handle' => 'foobar-notification-edit',
							'src'    => FOOBAR_URL . 'assets/admin/css/notification' . $suffix . '.css',
							'deps'   => array( 'foobar-core', 'foofields' ),
							'ver'    => FOOBAR_VERSION
						)
					)
				)
			);

			$this->add_filter( 'can_save', array( $this, 'can_save_meta' ), 10, 2 );
			$this->add_filter( 'after_save_post_meta', array( $this, 'update_enqueue_cache' ), 10, 2 );

			new Settings\General();
			new Settings\Content();
			new Settings\Appearance();
			new Settings\Visibility();
			new Settings\Advanced();

			new Settings\ContentAnnouncement();
			new Settings\ContentCallToAction();
			new Settings\ContentCookie();
		}

		function get_metabox_title() {
			return __( 'Notification Settings', 'foobar' );
		}

		function get_tabs() {
			//filter to allow fields to be overridden
			return apply_filters( 'foobar_admin_notification_settings_fields', array() );
		}

		/**
		 * Updates the enqueue cache for the front-end
		 *
		 * @param $post_id
		 * @param $state
		 */
		function update_enqueue_cache( $post_id, $state ) {
			Enqueue::instance()->rebuild_cache();
		}

		/**
		 * Determines if the metabox can save it's data based on the type
		 *
		 * @param $can_save
		 * @param $metabox
		 *
		 * @return bool
		 */
		function can_save_meta( $can_save, $metabox ) {
			return foobar_get_instance_admin_type() !== '';
		}
	}
}

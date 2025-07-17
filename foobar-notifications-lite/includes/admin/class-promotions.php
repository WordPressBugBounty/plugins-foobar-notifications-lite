<?php
namespace FooPlugins\FooBar\Admin;

/**
 * FooBar Admin Promotions Class
 * Runs all coded used for promoting the PRO version of FooBar
 */

if ( !class_exists( 'FooPlugins\FooBar\Admin\Promotions' ) ) {

	class Promotions {

		/**
		 * Init constructor.
		 */
		function __construct() {
			add_filter( 'fs_show_trial_foobar-notifications-lite', array( $this, 'force_trial_hide' ) );
			add_action( 'admin_init', array( $this, 'force_hide_trial_notice' ), 99 );
		}

		/**
		 * Make sure the trail banner admin notice is not shown
		 *
		 * @param $show_trial
		 *
		 * @return false
		 */
		function force_trial_hide( $show_trial ) {
			if ( 'on' === foobar_get_setting( 'force_hide_trial', false ) ) {
				$show_trial = false;
			}

			return $show_trial;
		}

		/**
		 * Force the trial promotion admin notice to be removed
		 */
		function force_hide_trial_notice() {
			if ( 'on' === foobar_get_setting( 'force_hide_trial', false ) ) {
				$freemius_sdk = foobar_fs();
				$plugin_id    = $freemius_sdk->get_slug();
				$admin_notice_manager = \FS_Admin_Notice_Manager::instance( $plugin_id );
				$admin_notice_manager->remove_sticky( 'trial_promotion' );
			}
		}
	}
}

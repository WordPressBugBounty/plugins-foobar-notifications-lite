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

			add_action( 'init', array( $this, 'init_promotions' ) );
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

		/**
         * Determines whether promotions should be hidden or not.
         *
         * @return bool Whether promotions should be hidden.
         */
        private function must_hide_promos() {
            if ( 'on' === foobar_get_setting( 'hide_promos' ) ) {
                return true;
            }

            // If in trial mode, skip showing promotions
            if ( foobar_fs()->is_trial() ) {
                return true;
            }

            // If paying, skip showing promotions
            if ( !foobar_fs()->is_not_paying() ) {
                return true;
            }

            return false;
        }

		/**
         * Initialises all promotions.
         *
         * @since 1.0.0
         */
        public function init_promotions() {
            // Only show promotions if valid!
            if ( $this->must_hide_promos() ) {
                return;
            }

			add_filter( 'foobar_registered_bar_types', array( $this, 'add_pro_bar_types' ) );
			add_action( 'foobar_admin_notification_types_custom_css', array( $this, 'add_pro_bar_types_custom_css' ) );
		}

		function add_pro_bar_types_custom_css() {
			$button_text_create = __( 'Create Notification', 'foobar' );
			$button_text_purchase = __( 'Upgrade to PRO to unlock this feature!', 'foobar' );
			$payment_url = foobar_admin_pricing_url();

			echo "<script type='text/javascript'>
					document.addEventListener( 'DOMContentLoaded', function() {
						// Handle PRO bar type button behavior
						const typeTabs = document.querySelectorAll('.foobar-type-tab input');
						const createButton = document.querySelector('#foobar_notification-types_footer-field button.button-hero');
						
						if (createButton && typeTabs.length > 0) {
							const proTypes = ['sign-up', 'countdown', 'tweet', 'free-shipping', 'html'];
														
							function updateButton(selectedType) {
								const isPro = proTypes.includes(selectedType);
								
								if (isPro) {
									// Hide the create button
									createButton.style.display = 'none';

									const link = document.getElementById('foobar-pro-bar-type-button');
									if (!link) {
										// Create a link to the pricing page
										const link = document.createElement('a');
										link.href = '$payment_url';
										link.id = 'foobar-pro-bar-type-button';
										link.textContent = '$button_text_purchase';
										link.classList.add('button', 'button-hero', 'button-primary');
										createButton.parentNode.appendChild(link);
									}
							} else {
								// Show the create button
								createButton.style.display = 'block';

									// Remove the link to the pricing page
									const link = document.getElementById('foobar-pro-bar-type-button');
									if (link) {
										link.parentNode.removeChild(link);
									}
								}
							}
							
							// Set initial button state
							const selectedTab = document.querySelector('.foobar-type-tab.foofields-selected');
							if (selectedTab) {
								const selectedType = selectedTab.getAttribute('data-value');
								updateButton(selectedType);
							}
							
							// Listen for tab changes
							typeTabs.forEach(tab => {
								tab.addEventListener('click', function(event) {
									event.stopPropagation();
									updateButton(this.value);
								});
							});
						}
					} );
				</script>";
		}
		

		function add_pro_bar_types( $bar_types ) {
			$pro_types = array(
				FOOBAR_BAR_TYPE_SIGNUP => array(
					'type'    => 'FooPlugins\FooBar\Pro\BarTypes\SignUp\Bar',
					'label'   => __( 'Sign Up', 'foobar' ) . ' <i class="dashicons dashicons-star-filled"></i>',
					'tooltip' => __( 'Shows an email sign up form', 'foobar' ),
					'capabilities' => array(
						'has_button',
						'has_text_input',
						'has_input_with_button',
						'has_items'
					),
					'attributes' => array(
						'class' => 'foobar-pro'
					),
					'blurb' => array(
						'title' => __( 'Sign Up', 'foobar' ),
						'desc' => __( 'This notification can increase your mailing list subscribers count by displaying a simple sign up form.', 'foobar' ),
						'features' => array(
							__( 'Easy integration with reCAPTCHA v3.', 'foobar' ),
							__( 'Customizable success and error messages.', 'foobar' ),
						),
						//'upgrade_notice' => __( 'Upgrade to PRO to unlock this feature!', 'foobar' ),
						'images' => array(
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-sign-up.png',
								'caption' => __( 'The initial message displayed to visitors.', 'foobar' )
							),
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-sign-up_success.png',
								'caption' => __( 'The message displayed to visitors who successfully sign up.', 'foobar' )
							),
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-sign-up_error.png',
								'caption' => __( 'The message displayed when an error occurs.', 'foobar' )
							),
						)
					)
				),
				FOOBAR_BAR_TYPE_COUNTDOWN => array(
					'type'    => 'FooPlugins\FooBar\Pro\BarTypes\Countdown\Bar',
					'label'   => __( 'Countdown', 'foobar' ) . ' <i class="dashicons dashicons-star-filled"></i>',
					'tooltip' => __( 'Shows a message with a call-to-action button and a countdown', 'foobar' ),
					'capabilities' => array(
						'has_button',
						'has_items'
					),
					'attributes' => array(
						'class' => 'foobar-pro'
					),
					'blurb' => array(
						'title' => __( 'Countdown', 'foobar' ),
						'desc' => __( 'This notification can help generate awareness of upcoming events to your visitors in a clear and visible way. It can also help during those events by displaying limited time offers.', 'foobar' ),
						'features' => array(
							__( 'Countdown to a fixed date time. e.g. Show a countdown to 15 May 2023 at 10:30 pm.', 'foobar' ),
							__( 'Countdown to a relative date time. e.g. 5 minutes from when the notification is first seen it expires.', 'foobar' ),
							__( 'Customizable styles for the countdown.', 'foobar' ),
							__( 'Customizable expiry message.', 'foobar' ),
						),
						//'upgrade_notice' => __( 'Upgrade to PRO to unlock this feature!', 'foobar' ),
						'images' => array(
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-countdown.png',
								'caption' => __( 'Announce upcoming or ongoing sales!', 'foobar' ),
							),
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-countdown_expired.png',
								'caption' => __( 'Expiry message displayed to visitors who see the countdown expire.', 'foobar' ),
							),
						)
					),
				),
				FOOBAR_BAR_TYPE_TWEET => array(
					'type'    => 'FooPlugins\FooBar\Pro\BarTypes\Tweet\Bar',
					'label'   => __( 'Tweet', 'foobar' ) . ' <i class="dashicons dashicons-star-filled"></i>',
					'tooltip' => __( 'Shows a message with a Tweet button', 'foobar' ),
					'capabilities' => array(
						'has_button',
						'has_border'
					),
					'attributes' => array(
						'class' => 'foobar-pro'
					),
					'blurb' => array(
						'title' => __( 'Tweet', 'foobar' ),
						'desc' => __( 'This notification lets your visitors easily tweet out predefined messages.', 'foobar' ),
						//'upgrade_notice' => __( 'Upgrade to PRO to unlock this feature!', 'foobar' ),
						'images' => array(
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-tweet.png',
								'caption' => __( 'A tweet notification displayed at the top of your page.', 'foobar' )
							),
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-tweet_inline.png',
								'caption' => __( 'A tweet notification displayed inline.', 'foobar' )
							),
						)
					)
				),
				FOOBAR_BAR_TYPE_FREE_SHIPPING => array(
					'type'    => 'FooPlugins\FooBar\Pro\BarTypes\FreeShipping\Bar',
					'label'   => __( 'Free Shipping', 'foobar' ) . ' <i class="dashicons dashicons-star-filled"></i>',
					'tooltip' => __( 'Shows a message with the amount required to get free shipping.', 'foobar' ),
					'capabilities' => array(
						'has_buttons',
						'has_items',
						'has_progress_bar'
					),
					'attributes' => array(
						'class' => 'foobar-pro'
					),
					'blurb' => array(
						'title' => __( 'Free Shipping', 'foobar' ),
						'desc' => __( 'This notification can help boost minimum sales by offering free shipping once a certain cart total has been reached.', 'foobar' ),
						'features' => array(
							__( 'Easy integration with WooCommerce.', 'foobar' ),
							__( 'Customizable messages for new customers, those with items in their cart, and those who have qualified for free shipping.', 'foobar' ),
							__( 'Customizable progress bar.', 'foobar' ),
						),
						//'upgrade_notice' => __( 'Upgrade to PRO to unlock this feature!', 'foobar' ),
						'images' => array(
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-free-shipping.png',
								'caption' => __( 'The initial message displayed to visitors.', 'foobar' )
							),
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-free-shipping_progress.png',
								'caption' => __( 'The message displayed to visitors with items in their cart.', 'foobar' )
							),
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-free-shipping_qualified.png',
								'caption' => __( 'The message displayed to visitors who qualify for free shipping.', 'foobar' )
							),
						)
					)
				),
				FOOBAR_BAR_TYPE_HTML => array(
					'type'    => 'FooPlugins\FooBar\Pro\BarTypes\Html\Bar',
					'label'   => __( 'HTML', 'foobar' ) . ' <i class="dashicons dashicons-star-filled"></i>',
					'tooltip' => __( 'Display custom HTML content with multiple sections', 'foobar' ),
					'capabilities' => array(
						'has_button',
						'has_border'
					),
					'attributes' => array(
						'class' => 'foobar-pro'
					),
					'blurb' => array(
						'title' => __( 'HTML', 'foobar' ),
						'desc' => __( 'This notification lets you display custom HTML content with multiple sections. All content is sanitized for security.', 'foobar' ),
						'features' => array(
							__( 'Add any HTML that you can add to a page.', 'foobar' ),
							__( 'Add multiple sections of HTML content.', 'foobar' ),
							__( 'Navigation buttons to move between sections.', 'foobar' ),
						),
						'images' => array(
							array(
								'src' => FOOBAR_URL . 'assets/admin/img/foobar-blurb-html.png',
								'caption' => __( 'Add multiple sections of HTML content to your notification.', 'foobar' )
							)
						)
					)
				)
			);
	
			// Merge PRO types with free types
			return array_merge( $bar_types, $pro_types );
		}
	}
}

<?php
/**
 * FooBar Admin Help View
 */

$title = __( 'FooBar', 'foobar' );
$tagline = __( 'Thank you for choosing FooBar, the WordPress Notification Plugin that helps your business grow!', 'foobar' );
$made_by = __( 'Made with ❤️ by %s', 'foobar' );
$fooplugins_link = '<a href="https://fooplugins.com/?utm_source=foobar_plugin_help" target="_blank">' . __( 'FooPlugins', 'foobar' ) . '</a>';
$link = '<a href="https://fooplugins.com/foobar-wordpress-notification-bars/?utm_source=foobar_plugin_help" target="_blank">' . __( 'Visit the FooBar Homepage', 'foobar' ) . '</a>';
$support_url = 'https://fooplugins.link/support?utm_source=foobar_plugin_help_support';

$logo = FOOBAR_URL . 'assets/img/logo.png';
$loader = FOOBAR_URL . 'assets/admin/img/loader.gif';

$fs_instance = foobar_fs();
$is_free = $fs_instance->is_free_plan();
$is_trial = $fs_instance->is_trial();
$show_trial_message = !$is_trial && $is_free && !$fs_instance->is_trial_utilized();
$show_thanks_for_pro = foobar_is_pro();
$upgrade_tab_text = __( 'PRO Features', 'foobar' );

$demos_created = foobar_get_setting( 'demo_content' ) === 'on';

?>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$.foobar_help_tabs = {

			init : function() {
				$(".foobar-help nav a").click( function(e) {
					e.preventDefault();

					$this = $(this);

					$this.addClass("foobar-tab-active");

					$(".foobar-tab-active").not($this).removeClass("foobar-tab-active");

					$(".foobar-section:visible").hide();

					var hash = $this.attr("href");

					$(hash+'_section').show();

					window.location.hash = hash;
				} );

				if (window.location.hash) {
					$('.foobar-help nav a[href="' + window.location.hash + '"]').click();
				}

				return false;
			}

		}; //End of foobar_help_tabs

		$.foobar_help_tabs.init();

		$.foobar_import_data = {
			init : function() {
				$(".foobar-import-demos").click( function(e) {
					e.preventDefault();


					var $this = $(this),
						data = {
							'action': 'foobar_admin_import_demos',
							'_wpnonce': $this.data( 'nonce' ),
							'_wp_http_referer': encodeURIComponent( $( 'input[name="_wp_http_referer"]' ).val() )
						};

					$this.addClass("foobar-loading").removeAttr('href');

					$.ajax({
						type: 'POST',
						url: ajaxurl,
						data: data,
						cache: false,
						success: function( html ) {
							alert( html );
						}
					}).always(function(){
						$this.removeClass("foobar-loading").attr('href', '#demo_content');
					});
				} );
			}
		};

		$.foobar_import_data.init();

		$.foobar_demos = {
			init : function() {
				$(".foobar-demo").click( function(e) {
					e.preventDefault();

					var $this = $(this),
						demo_id = $this.data('foobar-demo'),
							data = {
								'action': 'foobar_admin_help_demo',
								'demo': demo_id,
								'_wpnonce': $( '#foobar_help_demo_nonce' ).val(),
								'_wp_http_referer': encodeURIComponent( $( 'input[name="_wp_http_referer"]' ).val() )
							};

					$this.addClass("foobar-loading").removeAttr('href');

					$.ajax({
						type: 'POST',
						url: ajaxurl,
						data: data,
						cache: false,
						success: function( html ) {
							FooBar.dismissAll(true);

							//remove all foobars from the page
							$('.foobar').remove();

							var $html = $(html);

							//append the bar content to end of body
							$( 'body' ).append( $html );

							//init the bar
							const bar = FooBar.create( $html.attr('id') );
							if ( bar instanceof FooBar.Bar ) {
								bar.init();
							}
						}
					}).always(function(){
						$this.removeClass("foobar-loading").attr('href', '#demo');
					});
				} );
			}
		};

		$.foobar_demos.init();
	});
</script>
<style>
	body {
		background-color: #484c50;
	}
	#wpcontent {
		padding-right: 20px;
	}
	@media screen and (max-width: 782px){
		.auto-fold #wpcontent {
			padding-right: 10px;
		}
	}

	.foobar-help {
		max-width: 1000px;
		margin: 24px auto;
		clear: both;
		background-color: #23282d;
		border-radius: 20px;
		color: #ffffff;
	}

		.foobar-help h2,
		.foobar-help h3,
		.foobar-help h4 {
			color: inherit;
		}

		.foobar-help a {
			color: #35beff;
			text-decoration: none;
		}
			.foobar-help a:hover {
				color: #0097de;
			}
			.foobar-help a:focus {
				box-shadow: none;
			}

		.foobar-header {
			margin: 0;
			color: #FFFFFF;
			position: relative;
			text-align: center;
			padding: 20px;
		}
		.foobar-header > img {
			max-width: 100%;
			height: auto;
			margin: 3em 0;
			box-sizing: border-box;
		}

		.foobar-tagline {
			margin: 0;
			padding: 10px;
			font-size: 1.5em;
		}

	.foobar-ribbon {
		position: absolute;
		right: -5px;
		top: -5px;
		z-index: 1;
		overflow: hidden;
		width: 75px;
		height: 75px;
		text-align: right;
	}
		.foobar-ribbon span {
			font-size: 10px;
			font-weight: 600;
			color: #2b2400;
			text-transform: uppercase;
			text-align: center;
			line-height: 20px;
			transform: rotate(45deg);
			width: 100px;
			display: block;
			background: #d67935;
			box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
			position: absolute;
			top: 19px; right: -21px;
		}
		.foobar-ribbon span::before {
			content: "";
			position: absolute;
			left: 0;
			top: 100%;
			z-index: -1;
			border-left: 3px solid #d67935;
			border-right: 3px solid transparent;
			border-bottom: 3px solid transparent;
			border-top: 3px solid #d67935;
		}
		.foobar-ribbon span::after {
			content: "";
			position: absolute;
			right: 0;
			top: 100%;
			z-index: -1;
			border-left: 3px solid transparent;
			border-right: 3px solid #d67935;
			border-bottom: 3px solid transparent;
			border-top: 3px solid #d67935;
		}

	.foobar-help nav {
		background: #32373c;
		clear: both;
		padding-top: 0;
		color: #0097de;
		display: flex;
	}

		.foobar-help nav a {
			margin-left: 0;
			padding: 24px 32px 18px 32px;
			font-size: 1.3em;
			line-height: 1;
			border-width: 0 0 6px;
			border-style: solid;
			border-color: transparent;
			background: transparent;
			color: inherit;
			text-decoration: none;
			font-weight: 600;
			box-shadow: none;
		}

			.foobar-help nav a:hover {
				background-color: #0073aa;
				color: #ffffff;
				border-width: 0;
			}

			.foobar-help nav a.foobar-tab-active {
				background-color: #0073aa;
				color: #ffffff;
				border-color: #ffffff;
			}

	.foobar-section {
	}

	.foobar-centered {
		text-align: center;
	}

		.foobar-section .foobar-section-feature {
			margin: 32px;
		}

			.foobar-section .foobar-section-feature h2 {
				text-align: center;
				font-size: 1.6em;
				margin: 0;
				padding: 20px 0;
				font-weight: 600;
			}

			.foobar-section .foobar-section-feature .foobar-2-columns {
				display: -ms-grid;
				display: grid;
				grid-template-columns: 1fr 2fr;
			}

				.foobar-section .foobar-section-feature .foobar-2-columns .foobar-column {
					padding: 32px;
				}

				.foobar-button-cta {
					background: #0073aa;
					color: #ffffff !important;
					padding: 12px 36px;
					font-size: 1.3em;
					border-radius: 10px;
					text-decoration: none;
					font-weight: 600;
					display: inline-block;
					min-width: 250px;
				}
					.foobar-button-cta:hover {
						background: #016b99;
					}

					.foobar-button-cta.foobar-loading {
						position: relative;
						cursor: wait;
					}

						.foobar-button-cta.foobar-loading:before {
							content: '';
							background: url('<?php echo $loader ?>') no-repeat;
							background-size: 20px 20px;
							display: inline-block;
							opacity: 0.7;
							filter: alpha(opacity=70);
							width: 20px;
							height: 20px;
							border: none;
							position: absolute;
							top: 50%;
							right: 8px;
							transform: translateY(-50%);
						}

		.foobar-footer {
			margin: 0;
			color: #ffffff;
			text-align: center;
			padding: 20px;
			font-size: 1.3em;
		}

</style>
<div class="foobar-help">
	<div class="foobar-header">
		<div class="foobar-ribbon"><span><?php echo FOOBAR_VERSION; ?></span></div>
		<img src="<?php echo $logo; ?>" width="200">
		<p class="foobar-tagline"><?php echo $tagline; ?></p>
		<p class="foobar-tagline"><?php echo $link; ?></p>
	</div>
	<nav>
		<a class="foobar-tab-active" href="#help">
			<?php _e( 'Getting Started', 'foobar' ); ?>
		</a>
		<a href="#pro">
			<?php _e( $upgrade_tab_text, 'foobar' ); ?>
		</a>
		<a href="#demos">
			<?php _e( 'Demos', 'foobar' ); ?>
		</a>
		<a href="#support">
			<?php _e( 'Support', 'foobar' ); ?>
		</a>
	</nav>
	<div class="foobar-content">
		<div id="help_section" class="foobar-section">
			<?php if ( !$demos_created ) { ?>
			<div class="foobar-section-feature foobar-centered">
				<h2><?php _e( 'Create Demo Notifications', 'foobar' );?></h2>
				<p><?php _e( 'It\'s always best to see what is possible by looking at the real thing. If you want to get started really quickly without any hassle, then we can import some demo notification bars for you. This will create a number of pre-defined notification bars which you can easily edit and make your own.', 'foobar' );?></p>
				<a class="foobar-button-cta foobar-import-demos" data-nonce="<?php echo esc_attr( wp_create_nonce( 'foobar_admin_import_demos' ) ); ?>" href="#demo_content"><?php _e( 'Create Notifications', 'foobar' ); ?></a>
			</div>
			<?php } ?>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Preview Your Notifications', 'foobar' );?></h2>
				<div class="foobar-2-columns">
					<div class="foobar-column">
						<h3></h3>
						<p>
							<?php printf( __( 'You can easily preview all your notifications from one place : %s', 'foobar' ), sprintf( '<a target="_blank" href="%s">%s</a>', esc_url( admin_url( 'edit.php?post_type=' . FOOBAR_CPT_NOTIFICATION ) ), __( 'FooBar &rarr; Notifications', 'foobar' ) ) ); ?>
						</p>

						<h4><?php _e( '1. Hover over a notification', 'foobar' );?></h4>

						<h4><?php _e( '2. Click Preview', 'foobar' );?></h4>

						<p><?php _e( 'A preview will load in the WordPress admin, to show you exactly how it will look.', 'foobar' );?></p>

						<p><?php _e( 'TIP : Want to see how it will look on your actual site? Edit a notification, and click "Launch Frontend Preview".', 'foobar' );?></p>
					</div>
					<div class="foobar-column">
						<img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-previews.png'); ?>" />
					</div>
				</div>
			</div>

			<div class="foobar-section-feature">
				<h2><?php _e( 'How To Create Your First Notification', 'foobar' );?></h2>
				<div class="foobar-2-columns">
					<div class="foobar-column">
						<h3><?php printf( '<a target="_blank" href="%s">%s</a>', esc_url ( admin_url( 'post-new.php?post_type=' . FOOBAR_CPT_NOTIFICATION ) ), __( 'FooBar &rarr; Add Notification', 'foobar' ) ); ?></h3>
						<p><?php _e( 'To create your first notification, simply click the Add New button or click the Add Notification link in the main menu under FooBar.', 'foobar' ); ?></p>

						<h4><?php _e( '1. Enter a Title', 'foobar' );?></h4>

						<h4><?php _e( '2. Choose Notification Type', 'foobar' );?></h4>

						<h4><?php _e( '3. Customize Settings', 'foobar' );?></h4>
					</div>
					<div class="foobar-column">
						<img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-add.png'); ?>" />
					</div>
				</div>
			</div>

			<div class="foobar-section-feature">
				<div class="feature-section">
					<h2><?php _e( 'Make Your Notification Visible', 'foobar' );?></h2>
					<div class="foobar-2-columns">
						<div class="foobar-column">
							<p><?php _e( 'By default, your notification will not be visible. You decide when and where to make it visible.', 'foobar' );?></p>

							<h3><?php _e( 'Show Everywhere','foobar' ); ?></h3>
							<p><?php _e( 'If you want to show on all pages, under Visibility, set the Show When setting to "Always".', 'foobar' );?></p>

							<h3><?php printf( __( 'The <em>[%s]</em> Short Code','foobar' ), foobar_shortcode() );?></h3>
							<p><?php _e( 'Simply copy the shortcode code from the notifications listing and paste it into your posts or pages.', 'foobar' );?></p>
						</div>
						<div class="foobar-column">
							<img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-show.png'); ?>" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="pro_section" class="foobar-section foobar-centered" style="display: none">
			<?php if ( $show_trial_message ) { ?>
				<div class="foobar-section-feature">
					<h2><?php _e( 'FooBar PRO Free Trial 🤩', 'foobar' );?></h2>
					<p><?php _e( 'Want to test out all the PRO features below? No problem! You can start a 7-day free trial immediately!', 'foobar' );?></p>
					<a class="foobar-button-cta" href="<?php echo esc_url ( foobar_admin_freetrial_url() ); ?>"><?php _e( 'Start Your 7-day Free Trial', 'foobar' ); ?></a>
				</div>
			<?php } else if ( $show_thanks_for_pro ) { ?>
				<div class="foobar-section-feature">
					<h2><?php _e( 'Thanks for your support by purchasing a PRO license 😍', 'foobar' );?></h2>
					<p><?php _e( 'See below for the PRO features you can start using immediately...', 'foobar' );?></p>
				</div>
			<?php } else if ( $is_trial ) { ?>
				<div class="foobar-section-feature">
					<h2><?php _e( 'Thanks for trying out PRO 😍', 'foobar' );?></h2>
					<p><?php _e( 'See below for the PRO features you can try out immediately...', 'foobar' );?></p>
				</div>
			<?php }?>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Sign Up Bars','foobar' ); ?></h2>
				<p><?php _e( 'Create an email sign up bar to capture leads and emails for your newsletter list. Comes with Mailchimp integration.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-signup.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Countdown Bars','foobar' ); ?></h2>
				<p><?php _e( 'Show a countdown bar to create a fear of missing out for your visitors. FOMO has been proven to increase conversion rates.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-countdown.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Free Shipping Bars','foobar' ); ?></h2>
				<p><?php _e( 'Show a bar to your shoppers to entice them with free shipping if they buy more. Integrates with your WooCommerce store settings.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-freeshipping.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Scheduling','foobar' ); ?></h2>
				<p><?php _e( 'Decide when your bar shows, by selecting a start and end date/time.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-scheduling.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Attention-grabbing Effects','foobar' ); ?></h2>
				<p><?php _e( 'Increase your conversions by grabbing the attention of visitors, to make them click on your buttons or open the bar.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-effects.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Left & Right Bar Positions','foobar' ); ?></h2>
				<p><?php _e( 'Why only have top or bottom bars? You can now have right or left-positioned bars. There are now 12 bar positions for you to choose from!', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-left-right.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Full Customization','foobar' ); ?></h2>
				<p><?php _e( 'You have full control over how your notifications will look, including gradient backgrounds, custom icons, custom colors and font sizes.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-customization.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Visibility Conditions','foobar' ); ?></h2>
				<p><?php _e( 'Choose where your notifications will show with conditions of your choosing. Show for a specific post type, or on specific pages only, or for certain categories.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-visibility.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Open / Close Triggers','foobar' ); ?></h2>
				<p><?php _e( 'Open or close your notifications depending on specific events or triggers e.g. Exit Intent, scroll, time delay & more!', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-triggers.png'); ?>" /></p>
			</div>
			<div class="foobar-section-feature">
				<h2><?php _e( 'Custom CSS','foobar' ); ?></h2>
				<p><?php _e( 'Take customization to the next level with the ability to add custom CSS for your notifications.', 'foobar' );?></p>
				<p><img src="<?php echo esc_url( FOOBAR_URL . 'assets/admin/img/foobar-help-pro-customcss.png'); ?>" /></p>
			</div>
		</div>
		<div id="demos_section" class="foobar-section foobar-centered" style="display: none">
			<div class="foobar-section-feature">
				<h2><?php _e( 'FooBar Demos 😎', 'foobar' );?></h2>
				<p><?php _e( 'Try the demos below by clicking on the buttons:', 'foobar' );?></p>
				<?php
				wp_nonce_field( 'foobar_admin_help_demo', 'foobar_help_demo_nonce' );
				$demo_content = foobar_get_admin_demo_content();

				foreach ( $demo_content as $demo ) {
					echo '<p><a class="foobar-button-cta foobar-demo" data-foobar-demo="' . esc_attr( $demo['foobar_demo_id'] ) . '" href="#demo">' . esc_html( $demo['post_title'] ) . '</a></p>';
				}

				?>
			</div>
		</div>
		<div id="support_section" class="foobar-section" style="display: none">
			<div class="foobar-section-feature">
				<h2><?php _e( '🚑 Need help? We\'re here for you...' , 'foobar' );?></h2>

				<p><span class="dashicons dashicons-editor-help"></span><a href="https://fooplugins.com/documentation/foobar/" target="_blank"><?php _e('FooBar Documentation','foobar'); ?></a> - <?php _e('Our documentation covers everything you need to know from how to install the plugin and use it, to troubleshooting common issues.', 'foobar'); ?></p>

				<p><span class="dashicons dashicons-editor-help"></span><a href="https://wordpress.org/support/plugin/foobar-notifications-lite/" target="_blank"><?php _e('Foobar WordPress.org Support','foobar'); ?></a> - <?php _e('We actively monitor and answer all questions posted on WordPress.org for FooBar.', 'foobar'); ?></p>

				<div class="feature-cta">
					<p><?php _e('Still stuck? Please open a support ticket and we will help:', 'foobar'); ?></p>
					<a target="_blank" href="<?php echo esc_url ( $support_url ); ?>"><?php _e('Open a support ticket', 'fooplugins' ); ?></a>
				</div>
			</div>
		</div>
	</div>
	<div class="foobar-footer">
		<?php echo sprintf( $made_by, $fooplugins_link ); ?>
	</div>
</div>

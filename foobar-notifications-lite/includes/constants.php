<?php
/**
 * Contains the Global constants used throughout FooBar
 */

//options
define( 'FOOBAR_OPTION_DATA', 'foobar-settings' );
define( 'FOOBAR_OPTION_ENQUEUE_CACHE', 'foobar_enqueue_cache' );
define( 'FOOBAR_OPTION_SIGNUP_STATS', 'foobar_signup_stats' );
define( 'FOOBAR_OPTION_SIGNUP_MAILCHIMP_DATA', 'foobar_mailchimp' );

//transients
define( 'FOOBAR_TRANSIENT_UPDATED', 'foobar_updated' );
define( 'FOOBAR_TRANSIENT_ACTIVATION_REDIRECT', 'foobar_redirect' );

//custom post types
define( 'FOOBAR_CPT_NOTIFICATION', 'foobar_notification' );

//post meta
define( 'FOOBAR_NOTIFICATION_META_TYPE', '_type' );
define( 'FOOBAR_NOTIFICATION_META_SETTINGS', '_settings' );
define( 'FOOBAR_NOTIFICATION_META_CUSTOM_CSS', '_custom_css' );
define( 'FOOBAR_NOTIFICATION_META_SIGNUP_STATS', '_foobar_signup_stats' );

//other
define( 'FOOBAR_ADMIN_MENU_PARENT_SLUG', 'edit.php?post_type=foobar_notification' );
define( 'FOOBAR_ADMIN_MENU_HELP_SLUG', 'foobar-help' );
define( 'FOOBAR_ADMIN_MENU_PRICING_SLUG', 'foobar-notifications-lite-pricing' );
define( 'FOOBAR_ADMIN_MENU_SETTINGS_SLUG', 'foobar-settings' );
define( 'FOOBAR_FRONT_PREVIEW', 'foobar_show_preview' );

//Bar Types
define( 'FOOBAR_BAR_TYPE_MESSAGE', 'message' );
define( 'FOOBAR_BAR_TYPE_CTA', 'cta' );
define( 'FOOBAR_BAR_TYPE_COOKIE', 'cookie' );
define( 'FOOBAR_BAR_TYPE_SIGNUP', 'sign-up' );
define( 'FOOBAR_BAR_TYPE_COUNTDOWN', 'countdown' );
define( 'FOOBAR_BAR_TYPE_TWEET', 'tweet' );
define( 'FOOBAR_BAR_TYPE_FREE_SHIPPING', 'free-shipping' );

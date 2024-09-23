<?php

/**
 * Runs all the Freemius initialization code for FooBar
 */

if ( !function_exists( 'foobar_fs' ) ) {
    // Create a helper function for easy SDK access.
    function foobar_fs()
    {
        global  $foobar_fs ;
        
        if ( !isset( $foobar_fs ) ) {
            // Activate multisite network integration.
            if ( !defined( 'WP_FS__PRODUCT_6696_MULTISITE' ) ) {
                define( 'WP_FS__PRODUCT_6696_MULTISITE', true );
            }
            // Include Freemius SDK.
            require_once FOOBAR_PATH . '/freemius/start.php';
            $pro_available = true;
            $has_addons = false;
            if ( defined( 'FOOBAR_PRO_AVAILABLE' ) ) {
                $pro_available = FOOBAR_PRO_AVAILABLE;
            }
            if ( defined( 'FOOBAR_ADDONS_AVAILABLE' ) ) {
                $has_addons = FOOBAR_ADDONS_AVAILABLE;
            }
            $foobar_fs = fs_dynamic_init( array(
                'id'             => '6696',
                'slug'           => 'foobar-notifications-lite',
                'premium_slug'   => 'foobar-premium',
                'type'           => 'plugin',
                'public_key'     => 'pk_66340abdc312fe16c68bd10b41948',
                'is_premium'     => false,
                'has_addons'     => $has_addons,
                'has_paid_plans' => $pro_available,
                'trial'          => array(
                'days'               => 7,
                'is_require_payment' => true,
            ),
                'menu'           => array(
                'slug'       => 'edit.php?post_type=' . FOOBAR_CPT_NOTIFICATION,
                'first-path' => 'edit.php?post_type=' . FOOBAR_CPT_NOTIFICATION . '&page=' . FOOBAR_ADMIN_MENU_HELP_SLUG,
                'account'    => $pro_available || $has_addons,
                'contact'    => false,
                'support'    => false,
            ),
                'is_live'        => true,
            ) );
        }
        
        return $foobar_fs;
    }
    
    // Init Freemius.
    foobar_fs();
    // Signal that SDK was initiated.
    do_action( 'foobar_fs_loaded' );
    foobar_fs()->add_filter(
        'plugin_icon',
        function ( $icon ) {
        return FOOBAR_PATH . 'assets/img/foobar.jpg';
    },
        10,
        1
    );
}

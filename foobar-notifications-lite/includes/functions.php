<?php

/**
 * Contains all the Global common functions used throughout FooBar
 */
use  FooPlugins\FooBar\Admin\ContainerManager ;
use  FooPlugins\FooBar\Enqueue ;
use  FooPlugins\FooBar\Objects\Bars\Bar ;
use  FooPlugins\FooBar\Objects\Items\Item ;
use  FooPlugins\FooBar\Renderers\Renderer ;
/**
 * Custom Autoloader used throughout FooBar
 *
 * @param $class
 */
function foobar_autoloader( $class )
{
    /* Only autoload classes from this namespace */
    if ( false === strpos( $class, FOOBAR_NAMESPACE ) ) {
        return;
    }
    /* Remove namespace from class name */
    $class_file = str_replace( FOOBAR_NAMESPACE . '\\', '', $class );
    /* Convert sub-namespaces into directories */
    $class_path = explode( '\\', $class_file );
    $class_file = array_pop( $class_path );
    $class_path = strtolower( implode( '/', $class_path ) );
    /* Convert class name format to file name format */
    $class_file = foobar_uncamelize( $class_file );
    $class_file = str_replace( '_', '-', $class_file );
    $class_file = str_replace( '--', '-', $class_file );
    /* Load the class */
    require_once FOOBAR_DIR . '/includes/' . $class_path . '/class-' . $class_file . '.php';
}

/**
 * Convert a CamelCase string to camel_case
 *
 * @param $str
 *
 * @return string
 */
function foobar_uncamelize( $str )
{
    $str = lcfirst( $str );
    $lc = strtolower( $str );
    $result = '';
    $length = strlen( $str );
    for ( $i = 0 ;  $i < $length ;  $i++ ) {
        $result .= (( $str[$i] == $lc[$i] ? '' : '_' )) . $lc[$i];
    }
    return $result;
}

/**
 * Safe way to get value from an array
 *
 * @param $key
 * @param $array
 * @param $default
 *
 * @return mixed
 */
function foobar_safe_get_from_array( $key, $array, $default )
{
    
    if ( is_array( $array ) && array_key_exists( $key, $array ) ) {
        return $array[$key];
    } else {
        if ( is_object( $array ) && property_exists( $array, $key ) ) {
            return $array->{$key};
        }
    }
    
    return $default;
}

/**
 * Safe way to get value from a multi-dimensional array
 *
 * @param $key
 * @param $array
 * @param $default
 *
 * @return mixed
 */
function foobar_safe_get_from_array_recursive( $key, $array, $default )
{
    $return = $default;
    
    if ( is_array( $array ) ) {
        if ( array_key_exists( $key, $array ) ) {
            return $array[$key];
        }
        foreach ( $array as $k => $value ) {
            
            if ( is_array( $value ) ) {
                $return = foobar_safe_get_from_array_recursive( $key, $value, $default );
                if ( $return !== $default ) {
                    break;
                }
            }
        
        }
    } else {
        
        if ( is_object( $array ) ) {
            if ( property_exists( $array, $key ) ) {
                return $array->{$key};
            }
            foreach ( $array as $k => $value ) {
                
                if ( is_object( $value ) ) {
                    $return = foobar_safe_get_from_array_recursive( $key, $value, $default );
                    if ( $return !== $default ) {
                        break;
                    }
                }
            
            }
        }
    
    }
    
    return $return;
}

/**
 * Safe way to get value from the request object
 *
 * @param $key
 *
 * @return mixed
 */
function foobar_safe_get_from_request( $key )
{
    return foobar_safe_get_from_array( $key, $_REQUEST, null );
}

/**
 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
 * Non-scalar values are ignored.
 *
 * @param string|array $var Data to sanitize.
 *
 * @return string|array
 */
function foobar_clean( $var )
{
    
    if ( is_array( $var ) ) {
        return array_map( 'foobar_clean', $var );
    } else {
        return ( is_scalar( $var ) ? sanitize_text_field( $var ) : $var );
    }

}

/**
 * Safe way to get value from the request object
 *
 * @param $key
 * @param null $default
 * @param bool $clean
 *
 * @return mixed
 */
function foobar_safe_get_from_post( $key, $default = null, $clean = true )
{
    
    if ( isset( $_POST[$key] ) ) {
        $value = wp_unslash( $_POST[$key] );
        if ( $clean ) {
            return foobar_clean( $value );
        }
        return $value;
    }
    
    return $default;
}

/**
 * Run foobar_clean over posted textarea but maintain line breaks.
 *
 * @param string $var Data to sanitize.
 *
 * @return string
 */
function foobar_sanitize_textarea( $var )
{
    return implode( "\n", array_map( 'foobar_clean', explode( "\n", $var ) ) );
}

/**
 * Return a sanitized and unslashed key from $_GET
 *
 * @param $key
 *
 * @return string|null
 */
function foobar_sanitize_key( $key )
{
    if ( isset( $_GET[$key] ) ) {
        return sanitize_key( wp_unslash( $_GET[$key] ) );
    }
    return null;
}

/**
 * Return a sanitized and unslashed value from $_GET
 *
 * @param $key
 *
 * @return string|null
 */
function foobar_sanitize_text( $key )
{
    if ( isset( $_GET[$key] ) ) {
        return sanitize_text_field( wp_unslash( $_GET[$key] ) );
    }
    return null;
}

/**
 * Returns the menu parent slug
 *
 * @return string
 */
function foobar_get_menu_parent_slug()
{
    return apply_filters( 'foobar_admin_menuparentslug', 'edit.php?post_type=' . FOOBAR_CPT_NOTIFICATION );
}

/**
 * Returns the foobar settings from options table
 */
function foobar_get_settings()
{
    return get_option( FOOBAR_OPTION_DATA );
}

/**
 * Returns a specific option based on a key
 *
 * @param $key
 * @param $default
 *
 * @return mixed
 */
function foobar_get_setting( $key, $default = false )
{
    $settings = foobar_get_settings();
    return foobar_safe_get_from_array( $key, $settings, $default );
}

/**
 * Sets a specific option based on a key
 *
 * @param $key
 * @param $value
 *
 * @return mixed
 */
function foobar_set_setting( $key, $value )
{
    $settings = foobar_get_settings();
    $settings[$key] = $value;
    update_option( FOOBAR_OPTION_DATA, $settings );
}

/**
 * Returns true if FooBar is in debug mode
 * @return bool
 */
function foobar_is_debug()
{
    return foobar_get_setting( 'debug', false );
}

/**
 * Enqueue the core FooBar stylesheet
 */
function foobar_enqueue_stylesheet()
{
    $suffix = ( foobar_is_debug() ? '' : '.min' );
    $handle = 'foobar-core';
    $src = apply_filters( 'foobar_stylesheet_src', FOOBAR_ASSETS_URL . 'css/foobar' . $suffix . '.css', $suffix );
    $deps = apply_filters( 'foobar_stylesheet_deps', array() );
    wp_enqueue_style(
        $handle,
        $src,
        $deps,
        FOOBAR_VERSION
    );
    do_action(
        'foobar_enqueue_stylesheet',
        $handle,
        $src,
        $deps,
        FOOBAR_VERSION
    );
}

/**
 * Enqueue the core FooBar script
 */
function foobar_enqueue_script()
{
    $suffix = ( foobar_is_debug() ? '' : '.min' );
    $handle = 'foobar-core';
    $src = apply_filters( 'foobar_script_src', FOOBAR_ASSETS_URL . 'js/foobar' . $suffix . '.js', $suffix );
    $deps = apply_filters( 'foobar_script_deps', array( 'jquery' ) );
    
    if ( foobar_get_setting( 'enqueue_polyfills', false ) ) {
        foobar_enqueue_polyfills();
        $deps[] = 'foobar-polyfills';
    }
    
    wp_enqueue_script(
        $handle,
        $src,
        $deps,
        FOOBAR_VERSION
    );
    do_action(
        'foobar_enqueue_script',
        $handle,
        $src,
        $deps,
        FOOBAR_VERSION
    );
}

function foobar_enqueue_polyfills()
{
    $suffix = ( foobar_is_debug() ? '' : '.min' );
    $handle = 'foobar-polyfills';
    $src = apply_filters( 'foobar_polyfills_src', FOOBAR_ASSETS_URL . 'js/foobar.polyfills' . $suffix . '.js', $suffix );
    $deps = apply_filters( 'foobar_polyfills_deps', array() );
    wp_enqueue_script(
        $handle,
        $src,
        $deps,
        FOOBAR_VERSION
    );
    do_action(
        'foobar_enqueue_polyfills',
        $handle,
        $src,
        $deps,
        FOOBAR_VERSION
    );
}

/**
 * Returns the registered bar type mappings
 *
 * @return array
 */
function foobar_registered_bar_types()
{
    $types = array(
        FOOBAR_BAR_TYPE_MESSAGE => array(
        'type'    => 'FooPlugins\\FooBar\\Objects\\Bars\\Message',
        'label'   => __( 'Announcement', 'foobar' ),
        'tooltip' => __( 'Shows a simple announcement message with an optional link', 'foobar' ),
        'blurb'   => array(
        'title'  => __( 'Announcement', 'foobar' ),
        'desc'   => __( 'This notification shows a simple message to your visitors.', 'foobar' ),
        'images' => array( array(
        'src'     => FOOBAR_URL . 'assets/admin/img/foobar-blurb-announcement.png',
        'caption' => __( 'Simple message to visitors.', 'foobar' ),
    ) ),
    ),
    ),
        FOOBAR_BAR_TYPE_CTA     => array(
        'type'         => 'FooPlugins\\FooBar\\Objects\\Bars\\CallToAction',
        'label'        => __( 'Call To Action', 'foobar' ),
        'tooltip'      => __( 'Shows a message with a call-to-action button', 'foobar' ),
        'capabilities' => array( 'has_button' ),
        'blurb'        => array(
        'title'  => __( 'Call To Action', 'foobar' ),
        'desc'   => __( 'This notification shows a message to your visitors accompanied by a customisable call-to-action button.', 'foobar' ),
        'images' => array( array(
        'src'     => FOOBAR_URL . 'assets/admin/img/foobar-blurb-call-to-action.png',
        'caption' => __( 'Simple message to visitors with an actionable button.', 'foobar' ),
    ) ),
    ),
    ),
        FOOBAR_BAR_TYPE_COOKIE  => array(
        'type'         => 'FooPlugins\\FooBar\\Objects\\Bars\\Cookie',
        'label'        => __( 'Cookie Notice', 'foobar' ),
        'tooltip'      => __( 'Shows a cookie notice with an accept button', 'foobar' ),
        'capabilities' => array( 'has_buttons' ),
        'blurb'        => array(
        'title'  => __( 'Cookie Notice', 'foobar' ),
        'desc'   => __( 'This notification shows a simple cookie notice to your visitors accompanied by an accept and/or decline button.', 'foobar' ),
        'images' => array( array(
        'src'     => FOOBAR_URL . 'assets/admin/img/foobar-blurb-cookie.png',
        'caption' => __( 'A simple cookie notice with only an accept button.', 'foobar' ),
    ) ),
    ),
    ),
    );
    return apply_filters( 'foobar_registered_bar_types', $types );
}

/**
 * Gets the current foobar instance in the admin
 *
 * @return bool|Bar
 */
function foobar_get_instance_admin()
{
    global  $post ;
    global  $foobar_admin_instance ;
    
    if ( is_admin() ) {
        //check if we have already created an instance
        if ( is_subclass_of( $foobar_admin_instance, 'FooPlugins\\FooBar\\Objects\\Bars\\Bar' ) ) {
            return $foobar_admin_instance;
        }
        
        if ( $post instanceof \WP_Post ) {
            $foobar_admin_instance = foobar_get_instance( $post );
            return $foobar_admin_instance;
        }
    
    }
    
    return false;
}

/**
 * Gets an instance of a notification bar from a post object
 *
 * @param $post
 *
 * @param null $args
 *
 * @return Bar|bool
 */
function foobar_get_instance( $post, $args = null )
{
    global  $foobar_cached_instances ;
    if ( !isset( $foobar_cached_instances ) || !is_array( $foobar_cached_instances ) ) {
        $foobar_cached_instances = array();
    }
    //first check if we already have a proper instance and get out early
    if ( is_subclass_of( $post, 'FooPlugins\\FooBar\\Objects\\Bars\\Bar' ) ) {
        return $post;
    }
    //set a default
    $bar_id = 0;
    //next, check if the post is not a WP_Post object, but rather a post ID
    
    if ( !$post instanceof WP_Post && intval( $post ) > 0 ) {
        $bar_id = intval( $post );
        //if we have an instance in the cache, then return it early
        if ( array_key_exists( $bar_id, $foobar_cached_instances ) ) {
            return $foobar_cached_instances[$bar_id];
        }
        //get the post
        $post = get_post( $bar_id );
    }
    
    // Check that we actually have a post.
    
    if ( null === $post ) {
        $foobar_cached_instances[$bar_id] = null;
        // Cache null so that we do not continually try to get the post from the database.
        return false;
    }
    
    //try and get a type if passed in via the args
    $type = foobar_safe_get_from_array( 'type', $args, null );
    //fallback to get the type from the post meta
    if ( $type === null && $post instanceof WP_Post ) {
        $type = get_post_meta( $post->ID, FOOBAR_NOTIFICATION_META_TYPE, true );
    }
    
    if ( !empty($type) && !is_array( $type ) ) {
        $registered_bar_types = foobar_registered_bar_types();
        //set a default type
        $class_type = 'FooPlugins\\FooBar\\Objects\\Bars\\Message';
        if ( array_key_exists( $type, $registered_bar_types ) ) {
            $class_type = $registered_bar_types[$type]['type'];
        }
        //try and get meta if it was passed in via args
        $meta = foobar_safe_get_from_array( 'meta', $args, null );
        //instantiate a new instance
        $instance = new $class_type( $post, $meta );
        //if we know a bar_id then try to cache it for another call
        if ( $bar_id > 0 ) {
            $foobar_cached_instances[$bar_id] = $instance;
        }
        //return our instance
        return $instance;
    }
    
    return false;
}

/**
 * Based on a bar object, return a bar renderer instance
 *
 * @param $bar
 *
 * @return bool|Renderer
 */
function foobar_locate_bar_renderer( $bar, $args = null )
{
    
    if ( is_object( $bar ) && $bar instanceof Bar ) {
        $registered_renderers = foobar_registered_renderers();
        $type = get_class( $bar );
        $renderer_type = 'FooPlugins\\FooBar\\Renderers\\Bars\\Bar';
        if ( array_key_exists( $type, $registered_renderers ) ) {
            $renderer_type = $registered_renderers[$type];
        }
        return new $renderer_type( $bar, $args );
    }
    
    return false;
}

/**
 * Based on an item object, return a item renderer instance
 *
 * @param $item
 *
 * @return bool|Renderer
 */
function foobar_locate_item_renderer( $item, $bar_renderer )
{
    
    if ( is_object( $item ) && $item instanceof Item ) {
        $registered_renderers = foobar_registered_renderers();
        $type = get_class( $item );
        $renderer_type = 'FooPlugins\\FooBar\\Renderers\\Items\\Message';
        if ( array_key_exists( $type, $registered_renderers ) ) {
            $renderer_type = $registered_renderers[$type];
        }
        return new $renderer_type( $item, $bar_renderer );
    }
    
    return false;
}

/**
 * returns all registered notification renderers
 *
 * @return array
 */
function foobar_registered_renderers()
{
    $renderers = array(
        'FooPlugins\\FooBar\\Objects\\Bars\\Message'       => 'FooPlugins\\FooBar\\Renderers\\Bars\\Bar',
        'FooPlugins\\FooBar\\Objects\\Bars\\CallToAction'  => 'FooPlugins\\FooBar\\Renderers\\Bars\\Bar',
        'FooPlugins\\FooBar\\Objects\\Bars\\Cookie'        => 'FooPlugins\\FooBar\\Renderers\\Bars\\Bar',
        'FooPlugins\\FooBar\\Objects\\Items\\Message'      => 'FooPlugins\\FooBar\\Renderers\\Items\\Message',
        'FooPlugins\\FooBar\\Objects\\Items\\CallToAction' => 'FooPlugins\\FooBar\\Renderers\\Items\\CallToAction',
        'FooPlugins\\FooBar\\Objects\\Items\\Cookie'       => 'FooPlugins\\FooBar\\Renderers\\Items\\Cookie',
    );
    return apply_filters( 'foobar_registered_renderers', $renderers );
}

/**
 * Renders a FooBar
 *
 * @param WP_Post|int $post
 * @param array $args
 * @param string $force_status
 *
 * @return bool
 */
function foobar_render_bar( $post, $args = null, $force_status = null )
{
    global  $current_foobar ;
    $successful_render = false;
    $instance = foobar_get_instance( $post, $args, $force_status );
    
    if ( false !== $instance && !is_null( $instance ) ) {
        // Check that the bar is a specific status, if we are forcing the status.
        if ( null !== $force_status && $force_status !== $instance->status ) {
            return false;
        }
        // set the global.
        $current_foobar = $instance;
        // find the renderer.
        $renderer = foobar_locate_bar_renderer( $instance, $args );
        
        if ( false !== $renderer ) {
            $renderer->render();
            $successful_render = true;
        } else {
            echo  '<!-- FOOBAR_ERROR: could not render the bar -->' ;
        }
        
        // clear the global.
        $current_foobar = null;
    }
    
    return $successful_render;
}

/**
 * Returns the shortcode string for a foobar notification
 */
function foobar_shortcode()
{
    return apply_filters( 'foobar_shortcode', 'foobar' );
}

/**
 * Enqueues a FooBar for rendering
 *
 * @param $id
 * @param array $args
 */
function foobar_enqueue_bar( $id, $args = null )
{
    //fix up the args
    if ( isset( $args['id'] ) ) {
        unset( $args['id'] );
    }
    //check if we have a type
    
    if ( !isset( $args['type'] ) ) {
        //determine the type and set it in the args
        $instance = foobar_get_instance( $id );
        if ( $instance !== false ) {
            $args['type'] = $instance->type();
        }
    }
    
    Enqueue::instance()->enqueue( $id, $args );
}

/**
 * Returns an array of all published bars that have been saved
 *
 * @return Bar[]
 */
function foobar_get_all_bars()
{
    $args = array(
        'post_type'     => FOOBAR_CPT_NOTIFICATION,
        'post_status'   => array( 'publish' ),
        'cache_results' => false,
        'nopaging'      => true,
    );
    $posts = get_posts( $args );
    $bars = array();
    foreach ( $posts as $post ) {
        $bars[$post->ID] = foobar_get_instance( $post );
    }
    return $bars;
}

/**
 * Returns a friendly version of the visibility set for a bar
 *
 * @param $visibility
 *
 * @return mixed|string|void
 */
function foobar_visibility_get_friendly_name( $visibility )
{
    $friendly_name = $visibility;
    switch ( $visibility ) {
        case 'all':
            $friendly_name = __( 'Everywhere', 'foobar' );
            break;
        case 'never':
            $friendly_name = __( 'Nowhere', 'foobar' );
            break;
        case '':
            $friendly_name = __( 'Shortcode', 'foobar' );
            break;
        default:
            $friendly_name = $visibility;
    }
    return apply_filters( 'foobar_visibility_get_friendly_name', $friendly_name, $visibility );
}

/**
 * Get the FooBar admin menu parent slug
 * @return string
 */
function foobar_admin_menu_parent_slug()
{
    return apply_filters( 'foobar_admin_menu_parent_slug', FOOBAR_ADMIN_MENU_PARENT_SLUG );
}

/**
 * Returns the FooBar settings page Url within the admin
 *
 * @return string The Url to the FooBar settings page in admin
 */
function foobar_admin_settings_url()
{
    return admin_url( add_query_arg( array(
        'page' => FOOBAR_ADMIN_MENU_SETTINGS_SLUG,
    ), foobar_admin_menu_parent_slug() ) );
}

/**
 * Returns the FooBar pricing page Url within the admin
 *
 * @return string The Url to the FooBar pricing page in admin
 */
function foobar_admin_pricing_url()
{
    return admin_url( add_query_arg( array(
        'page' => FOOBAR_ADMIN_MENU_PRICING_SLUG,
    ), foobar_admin_menu_parent_slug() ) );
}

/**
 * Returns the FooBar free trial pricing page Url within the admin
 *
 * @return string The Url to the FooBar free trial page in admin
 */
function foobar_admin_freetrial_url()
{
    return add_query_arg( 'trial', 'true', foobar_admin_pricing_url() );
}

/**
 * Returns the array of demo content
 *
 * @return array
 */
function foobar_get_admin_demo_content()
{
    $demo_content = (include FOOBAR_PATH . 'includes/admin/demo_content.php');
    return apply_filters( 'foobar_get_admin_demo_content', $demo_content );
}

/**
 * Returns true if the current admin foobar has a specific capability
 *
 * @param $capability
 *
 * @return bool
 */
function foobar_check_capability_admin( $capability )
{
    $foobar = foobar_get_instance_admin();
    return foobar_check_capability( $foobar, $capability );
}

/**
 * Returns true if the foobar has a specific capability
 *
 * @param $foobar
 * @param $capability
 *
 * @return bool
 */
function foobar_check_capability( $foobar, $capability )
{
    if ( $foobar === false ) {
        //if there is no type set, then always show the field
        return true;
    }
    $type = $foobar->type();
    $type_config = foobar_registered_bar_types()[$type];
    $capabilities = foobar_safe_get_from_array( 'capabilities', $type_config, array() );
    if ( is_array( $capability ) ) {
        return count( array_intersect( $capabilities, $capability ) ) !== 0;
    }
    return in_array( $capability, $capabilities );
}

/**
 * Returns the type of the current bar in admin
 * @return string
 */
function foobar_get_instance_admin_type()
{
    $foobar = foobar_get_instance_admin();
    if ( $foobar === false ) {
        return '';
    }
    return $foobar->type();
}

/**
 * Returns true if the PRO version is running
 */
function foobar_is_pro()
{
    global  $foobar_pro ;
    if ( isset( $foobar_pro ) ) {
        return $foobar_pro;
    }
    $foobar_pro = false;
    return $foobar_pro;
}

/**
 * Returns the admin post type currently being viewed/edited
 *
 * @return string|null
 */
function foobar_admin_current_post_type()
{
    global 
        $post,
        $typenow,
        $current_screen,
        $pagenow
    ;
    $post_type = null;
    if ( $post && (property_exists( $post, 'post_type' ) || method_exists( $post, 'post_type' )) ) {
        $post_type = $post->post_type;
    }
    if ( empty($post_type) && !empty($current_screen) && (property_exists( $current_screen, 'post_type' ) || method_exists( $current_screen, 'post_type' )) && !empty($current_screen->post_type) ) {
        $post_type = $current_screen->post_type;
    }
    if ( empty($post_type) && !empty($typenow) ) {
        $post_type = $typenow;
    }
    
    if ( empty($post_type) && function_exists( 'get_current_screen' ) ) {
        $get_current_screen = get_current_screen();
        if ( is_object( $get_current_screen ) && property_exists( $get_current_screen, 'post_type' ) && !empty($get_current_screen->post_type) ) {
            $post_type = $get_current_screen->post_type;
        }
    }
    
    if ( empty($post_type) && isset( $_REQUEST['post'] ) && !empty($_REQUEST['post']) && function_exists( 'get_post_type' ) && ($get_post_type = get_post_type( (int) $_REQUEST['post'] )) ) {
        $post_type = $get_post_type;
    }
    if ( empty($post_type) && isset( $_REQUEST['post_type'] ) && !empty($_REQUEST['post_type']) ) {
        $post_type = sanitize_key( $_REQUEST['post_type'] );
    }
    if ( empty($post_type) && 'edit.php' == $pagenow ) {
        $post_type = 'post';
    }
    return $post_type;
}

/**
 * Returns true if current admin page is an edit page
 * @return bool
 */
function foobar_admin_is_edit_mode()
{
    global  $pagenow ;
    return in_array( $pagenow, array( 'post.php', 'post-new.php' ) );
}

/**
 * Returns true if current admin page is the listing page
 * @return bool
 */
function foobar_admin_is_list_mode()
{
    global  $pagenow ;
    return $pagenow === 'edit.php';
}

function foobar_admin_is_notification_list()
{
    if ( wp_doing_ajax() && isset( $_REQUEST['action'] ) ) {
        return $_REQUEST['action'] === 'foobar_admin_preview' || $_REQUEST['action'] === 'foobar_admin_clone';
    }
    return foobar_admin_current_post_type() === FOOBAR_CPT_NOTIFICATION && foobar_admin_is_list_mode();
}

function foobar_admin_is_notification_edit()
{
    
    if ( foobar_admin_current_post_type() === FOOBAR_CPT_NOTIFICATION && foobar_admin_is_edit_mode() ) {
        return true;
    } else {
        
        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            $action = foobar_safe_get_from_request( 'action' );
            if ( $action === 'heartbeat' ) {
                return false;
            }
            $post_type = foobar_container_manager()->get_post_type_from_ajax_request();
            return FOOBAR_CPT_NOTIFICATION === $post_type;
        }
    
    }
    
    return false;
}

function foobar_container_manager()
{
    return ContainerManager::get_manager( FOOBAR_SLUG );
}

/**
 * Gets the post_type from the ajax request within the admin
 *
 * @return false|string
 */
function foobar_admin_get_post_type_from_ajax_request()
{
    global  $foofields_post_type_from_ajax_request ;
    if ( isset( $foofields_post_type_from_ajax_request ) ) {
        return $foofields_post_type_from_ajax_request;
    }
    $referrer = wp_get_raw_referer();
    parse_str( parse_url( $referrer, PHP_URL_QUERY ), $query );
    //we know we came from an edit post page
    
    if ( isset( $query['post'] ) && isset( $query['action'] ) && $query['action'] === 'edit' ) {
        $post_id = intval( $query['post'] );
        if ( $post_id > 0 ) {
            return $foofields_post_type_from_ajax_request = get_post_type( $post_id );
        }
    }
    
    return false;
}

/**
 * Returns the layout/position choices
 *
 * @return mixed|void
 */
function foobar_layout_choices()
{
    return apply_filters( 'foobar_admin_notification_metaboxsettings_layout_choices', array(
        'fbr-layout-top'        => array(
        'label'   => __( 'Top', 'foobar' ),
        'tooltip' => __( 'Shows a sticky bar at the top of the page', 'foobar' ),
    ),
        'fbr-layout-top-inline' => array(
        'label'   => __( 'Top (Scrolls)', 'foobar' ),
        'tooltip' => __( 'Shows a top bar that will scroll with the page', 'foobar' ),
    ),
        'fbr-layout-bottom'     => array(
        'label'   => __( 'Bottom', 'foobar' ),
        'tooltip' => __( 'Shows a sticky bar along the bottom of the page', 'foobar' ),
    ),
        'fbr-layout-inline'     => array(
        'label'   => __( 'Inline', 'foobar' ),
        'tooltip' => __( 'Shows the bar inline in the page where the shortcode was placed', 'foobar' ),
    ),
    ) );
}

/**
 * Returns a formatted date
 *
 * @param        $timestamp
 * @param string $format
 *
 * @return string
 */
function foobar_date_formatted( $timestamp, $format = 'j M Y, g:i a' )
{
    
    if ( function_exists( 'wp_date' ) ) {
        return wp_date( $format, $timestamp );
    } else {
        $datetime = date_create( '@' . $timestamp );
        $timezone = wp_timezone();
        $datetime->setTimezone( $timezone );
        return $datetime->format( $format );
    }

}

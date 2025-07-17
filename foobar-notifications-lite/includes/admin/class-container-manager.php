<?php
namespace FooPlugins\FooBar\Admin;

use FooPlugins\FooBar\Admin\FooFields\Manager;

/**
 * FooBar FooFields Manager Class
 */

if ( !class_exists( 'FooPlugins\FooBar\Admin\ContainerManager' ) ) {

	class ContainerManager extends Manager {

		public function __construct() {
			parent::__construct( array(
				'id'             => FOOBAR_SLUG,
				'text_domain'    => FOOBAR_SLUG,
				'plugin_url'     => FOOBAR_URL,
				'plugin_version' => FOOBAR_VERSION
			) );
		}
	}
}

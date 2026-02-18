<?php

namespace FooPlugins\FooBar\Admin\FooFields\Custom;

use FooPlugins\FooBar\Admin\FooFields\Metabox;
use FooPlugins\FooBar\Admin\FooFields\Custom\Conditions\Field as Conditions;

if ( ! class_exists( __NAMESPACE__ . '\FoobarMetabox' ) ) {

	abstract class FoobarMetabox extends Metabox {
		function __construct( $config ) {
			parent::__construct( $config );

			$this->add_filter( 'field_type_mappings', array( $this, 'foobar_field_type_mappings' ) );
		}

		function foobar_field_type_mappings( $mappings ) {
			$mappings['icon-picker'] = __NAMESPACE__ . '\IconPicker';
			$mappings['time-selector'] = __NAMESPACE__ . '\TimeSelector';
			$mappings['numeric'] = __NAMESPACE__ . '\Numeric';
			$mappings['unit'] = __NAMESPACE__ . '\Unit';
			$mappings['blurb'] = __NAMESPACE__ . '\Blurb';
			$mappings['button'] = __NAMESPACE__ . '\Button';

			$mappings = Conditions::register_mappings( $mappings );

			return $mappings;
		}

		abstract function get_metabox_title();
	}
}

<?php

namespace FooPlugins\FooBar\Admin\FooFields\Custom;

use FooPlugins\FooBar\Admin\FooFields\Fields\Field;

if ( ! class_exists( __NAMESPACE__ . '\Unit' ) ) {

	class Unit extends Field {
		private $_default_units = array(
			'px' => array(
				'min' => 0,
				'max' => 10000,
				'step' => 1
			),
			'%' => array(
				'min' => 0,
				'max' => 100,
				'step' => 1
			)
		);

		public $units;
		public $default_unit;

		public function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );
			$this->units = isset( $field_config['units'] ) && is_array( $field_config['units'] ) ? $this->normalize_units( $field_config['units'] ) : $this->normalize_units( $this->_default_units );

			if ( count( $this->units ) === 0 ) {
				$this->units = $this->normalize_units( $this->_default_units );
			}

			$default_unit = isset( $field_config['default_unit'] ) && is_string( $field_config['default_unit'] ) ? trim( $field_config['default_unit'] ) : '';
			if ( $default_unit !== '' && array_key_exists( $default_unit, $this->units ) ) {
				$this->default_unit = $default_unit;
			} else {
				$this->default_unit = array_key_first( $this->units );
			}
		}

		private function normalize_units( $units ) {
			$normalized = array();

			if ( ! is_array( $units ) ) {
				return $normalized;
			}

			foreach ( $units as $key => $config ) {
				$unit = is_int( $key ) ? $config : $key;

				if ( ! is_string( $unit ) || trim( $unit ) === '' ) {
					continue;
				}

				$unit = trim( $unit );
				$rules = $this->_default_units['px'];
				$rules['label'] = $unit;

				// Support: 'px' => 'Pixels'
				if ( is_string( $config ) ) {
					$rules['label'] = trim( $config ) !== '' ? trim( $config ) : $unit;
				}

				// Support: 'px' => array( 'min' => 0, 'max' => 10, 'step' => 1, 'label' => 'Pixels' )
				if ( is_array( $config ) ) {
					$default_for_unit = array_key_exists( $unit, $this->_default_units ) ? $this->_default_units[ $unit ] : $this->_default_units['px'];
					$rules['min'] = array_key_exists( 'min', $config ) && is_numeric( $config['min'] ) ? 0 + $config['min'] : $default_for_unit['min'];
					$rules['max'] = array_key_exists( 'max', $config ) && is_numeric( $config['max'] ) ? 0 + $config['max'] : $default_for_unit['max'];
					$rules['step'] = array_key_exists( 'step', $config ) && is_numeric( $config['step'] ) && floatval( $config['step'] ) > 0 ? 0 + $config['step'] : $default_for_unit['step'];
					$rules['label'] = array_key_exists( 'label', $config ) && is_string( $config['label'] ) && trim( $config['label'] ) !== '' ? trim( $config['label'] ) : $unit;
				}

				$normalized[ $unit ] = $rules;
			}

			return $normalized;
		}

		private function get_unit_rules( $unit ) {
			if ( is_string( $unit ) && array_key_exists( $unit, $this->units ) ) {
				return $this->units[ $unit ];
			}

			return $this->units[ $this->default_unit ];
		}

		function parse_unit_value( $value ) {
			$result = array(
				'value' => '',
				'unit' => $this->default_unit
			);

			if ( ! is_scalar( $value ) ) {
				return $result;
			}

			$value = trim( (string) $value );
			if ( $value === '' ) {
				return $result;
			}

			if ( preg_match( '/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*([a-z%]*)\s*$/i', $value, $matches ) === 1 ) {
				$parsed_value = isset( $matches[1] ) ? trim( $matches[1] ) : '';
				$parsed_unit = isset( $matches[2] ) ? trim( strtolower( $matches[2] ) ) : '';

				if ( $parsed_unit === '' || ! array_key_exists( $parsed_unit, $this->units ) ) {
					$parsed_unit = $this->default_unit;
				}

				$result['value'] = $parsed_value;
				$result['unit'] = $parsed_unit;
			}

			return $result;
		}

		public function get_posted_value( $sanitized_form_data ) {
			$values = parent::get_posted_value( $sanitized_form_data );

			if ( is_array( $values ) ) {
				$numeric_value = array_key_exists( 'value', $values ) ? trim( (string) $values['value'] ) : '';
				$unit = array_key_exists( 'unit', $values ) ? trim( (string) $values['unit'] ) : $this->default_unit;
				$unit = array_key_exists( $unit, $this->units ) ? $unit : $this->default_unit;

				if ( $numeric_value === '' ) {
					return '';
				}

				return $numeric_value . $unit;
			}

			if ( is_scalar( $values ) ) {
				$parsed = $this->parse_unit_value( $values );
				if ( $parsed['value'] === '' ) {
					return '';
				}

				return $parsed['value'] . $parsed['unit'];
			}

			return $values;
		}

		public function validate( $posted_value ) {
			if ( ! parent::validate( $posted_value ) ) {
				return false;
			}

			if ( $posted_value === '' || $posted_value === null ) {
				return true;
			}

			$parsed = $this->parse_unit_value( $posted_value );
			$value = $parsed['value'];
			$unit = $parsed['unit'];

			if ( $value === '' || ! is_numeric( $value ) ) {
				$this->error = sprintf( __( 'Please enter a valid number for %s.', $this->container->manager->text_domain ), $this->label );
				return false;
			}

			$numeric_value = floatval( $value );
			$rules = $this->get_unit_rules( $unit );

			if ( array_key_exists( 'min', $rules ) && is_numeric( $rules['min'] ) && $numeric_value < floatval( $rules['min'] ) ) {
				$this->error = sprintf( __( 'Please enter a value greater than or equal to %1$s for %2$s.', $this->container->manager->text_domain ), $rules['min'], $this->label );
				return false;
			}

			if ( array_key_exists( 'max', $rules ) && is_numeric( $rules['max'] ) && $numeric_value > floatval( $rules['max'] ) ) {
				$this->error = sprintf( __( 'Please enter a value less than or equal to %1$s for %2$s.', $this->container->manager->text_domain ), $rules['max'], $this->label );
				return false;
			}

			if ( array_key_exists( 'step', $rules ) && is_numeric( $rules['step'] ) && floatval( $rules['step'] ) > 0 ) {
				$min = array_key_exists( 'min', $rules ) && is_numeric( $rules['min'] ) ? floatval( $rules['min'] ) : 0.0;
				$step = floatval( $rules['step'] );
				$steps = ( $numeric_value - $min ) / $step;
				$delta = abs( $steps - round( $steps ) );

				if ( $delta > 0.000001 ) {
					$this->error = sprintf( __( 'Please enter a valid increment of %1$s for %2$s.', $this->container->manager->text_domain ), $rules['step'], $this->label );
					return false;
				}
			}

			return true;
		}

		function render_input( $override_attributes = false ) {
			$parsed = $this->parse_unit_value( $this->value() );
			$numeric_value = $parsed['value'];
			$current_unit = $parsed['unit'];
			$current_rules = $this->get_unit_rules( $current_unit );
			$is_multi_unit = count( $this->units ) > 1;
			$value_id = $this->unique_id . '_value';
			$unit_id = $this->unique_id . '_unit';

			$this->render_html_tag( 'label', array(
				'class' => 'foofields-unit-input',
				'for' => $value_id
			), null, false );

			$input_attributes = array(
				'name' => $this->name . '[value]',
				'id' => $value_id,
				'type' => 'number',
				'value' => $numeric_value,
				'min' => $current_rules['min'],
				'step' => $current_rules['step']
			);

			if ( isset( $current_rules['max'] ) && is_numeric( $current_rules['max'] ) ) {
				$input_attributes['max'] = $current_rules['max'];
			}

			$this->render_html_tag( 'input', $input_attributes );

			if ( $is_multi_unit ) {
				$this->render_html_tag( 'select', array(
					'name' => $this->name . '[unit]',
					'id' => $unit_id,
					'class' => 'foofields-unit-select'
				), null, false );

				foreach ( $this->units as $unit => $config ) {
					$option_attributes = array(
						'value' => $unit,
						'data-min' => $config['min'],
						'data-max' => $config['max'],
						'data-step' => $config['step']
					);

					if ( $unit === $current_unit ) {
						$option_attributes['selected'] = 'selected';
					}

					$option_label = array_key_exists( 'label', $config ) ? $config['label'] : $unit;
					$this->render_html_tag( 'option', $option_attributes, $option_label );
				}

				echo '</select>';
			} else {
				$this->render_html_tag( 'span', array(
					'class' => 'foofields-unit-suffix'
				), $current_unit );

				$this->render_html_tag( 'input', array(
					'type' => 'hidden',
					'name' => $this->name . '[unit]',
					'id' => $unit_id,
					'value' => $current_unit
				) );
			}

			echo '</label>';
		}
	}
}

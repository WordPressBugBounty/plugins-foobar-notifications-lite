<?php

namespace FooPlugins\FooBar;

if ( !class_exists( __NAMESPACE__ . '\Utils' ) ){

	class Utils {
		/**
		 * @param string $needle
		 * @param array|object $haystack
		 * @param mixed $default
		 * @return mixed|null
		 */
		public static function get_value( $needle, $haystack, $default = null ) {
			if ( is_array( $haystack ) && array_key_exists( $needle, $haystack ) ) {
				return $haystack[ $needle ];
			} else if ( is_object( $haystack ) && property_exists( $haystack, $needle ) ) {
				return $haystack->{$needle};
			}
			return $default;
		}

		/**
		 * @param string $needle
		 * @param array|object $haystack
		 * @param array $default
		 * @return array|null
		 */
		public static function get_array( $needle, $haystack, $default = null ) {
			$value = self::get_value( $needle, $haystack );
			return is_array( $value ) ? $value : $default;
		}

		/**
		 * @param string $needle
		 * @param array|object $haystack
		 * @param bool $default
		 * @return bool|null
		 */
		public static function get_bool( $needle, $haystack, $default = null ) {
			$value = self::get_value( $needle, $haystack );
			return is_bool( $value ) ? $value : $default;
		}

		/**
		 * @param string $needle
		 * @param array|object $haystack
		 * @param float $default
		 * @param float $min
		 * @param float $max
		 * @return float|null
		 */
		public static function get_float( $needle, $haystack, $default = null, $min = null, $max = null ) {
			$value = self::get_value( $needle, $haystack );
			if ( is_float( $value ) ) {
				if ( is_float( $min ) && $value < $min ) {
					return $default;
				}
				if ( is_float( $max ) && $value > $max ) {
					return $default;
				}
				return $value;
			}
			return $default;
		}

		/**
		 * @param string $needle
		 * @param array|object $haystack
		 * @param int $default
		 * @param int $min
		 * @param int $max
		 * @return int|null
		 */
		public static function get_int( $needle, $haystack, $default = null, $min = null, $max = null ) {
			$value = self::get_value( $needle, $haystack );
			if ( is_int( $value ) ) {
				if ( is_int( $min ) && $value < $min ) {
					return $default;
				}
				if ( is_int( $max ) && $value > $max ) {
					return $default;
				}
				return $value;
			}
			return $default;
		}

		/**
		 * @param string $needle
		 * @param array|object $haystack
		 * @param string $default
		 * @param array $allowed_values
		 * @return string|null
		 */
		public static function get_string( $needle, $haystack, $default = null, $allowed_values = array() ) {
			$value = self::get_value( $needle, $haystack );
			if ( is_string( $value ) ) {
				if ( !empty( $allowed_values ) ) {
					return in_array( $value, $allowed_values, true ) ? $value : $default;
				}
				return $value;
			}
			return $default;
		}
	}

}

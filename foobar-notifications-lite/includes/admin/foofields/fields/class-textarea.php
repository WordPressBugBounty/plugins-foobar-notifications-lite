<?php

namespace FooPlugins\FooBar\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\Textarea' ) ) {

	class Textarea extends Field {

		function render_input( $override_attributes = false ) {
			$attributes = array(
				'id' => $this->unique_id,
				'name' => $this->name
			);

			if ( isset( $this->config['placeholder'] ) ) {
				$attributes['placeholder'] = $this->config['placeholder'];
			}
			if ( isset( $this->config['spellcheck'] ) ) {
				$attributes['spellcheck'] = $this->config['spellcheck'] ? 'true' : 'false';
			}
			self::render_html_tag( 'textarea', $attributes, esc_textarea( $this->value() ), true, false );
		}

		/**
		 * Textareas need some special sanitization
		 *
		 * @param $unsanitized_value
		 *
		 * @return array|string
		 */
		function process_posted_value( $unsanitized_value ) {
			// Check for custom sanitize_callback in field config
			// This allows field configuration to specify custom sanitization (e.g., wp_kses_post for HTML content)
			if ( isset( $this->config['sanitize_callback'] ) && is_callable( $this->config['sanitize_callback'] ) ) {
				return call_user_func( $this->config['sanitize_callback'], $unsanitized_value );
			}

			return $this->sanitize_textarea( $unsanitized_value );
		}
	}
}

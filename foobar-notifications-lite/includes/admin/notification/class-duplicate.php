<?php
namespace FooPlugins\FooBar\Admin\Notification;

/**
 * FooBar Notification Admin Duplicate Class
 */

if ( !class_exists( 'FooPlugins\FooBar\Admin\Notification\Duplicate' ) ) {

	class Duplicate {
		function __construct() {
			//add a clone action for each row
			add_filter( 'post_row_actions', array( $this, 'modify_list_row_actions' ), 20, 2 );

			//ajax call for cloning a foobar
			add_action( 'wp_ajax_foobar_admin_clone', array( $this, 'ajax_clone' ) );
		}

		/**
		 * Creates a clone of an existing FooBar via ajax.
		 */
		public function ajax_clone() {
			if ( check_admin_referer( 'foobar_admin_clone' ) ) {
				$id = intval( $_POST['id'] );

				if ( $id > 0 ) {
					$post_id = $this->clone_post( $id );
					if ( $post_id > 0 ) {
						wp_send_json_success($post_id);
						return;
					}
				}
				wp_send_json_error();
				return;
			}
			die();
		}

		/**
		 * Add a clone link to each notification
		 *
		 * @param $actions
		 * @param $post
		 *
		 * @return array
		 */
		function modify_list_row_actions( $actions, $post ) {
			if ( $post->post_type === FOOBAR_CPT_NOTIFICATION  ) {
				$actions['foobar-clone'] = sprintf( '<a class="foobar-admin-clone" data-post-id="%s" data-nonce="%s" href="#duplicate">%s</a>',
					$post->ID,
					wp_create_nonce( 'foobar_admin_clone' ),
					__( 'Duplicate', 'foobar' )
				);
			}

			return $actions;
		}

		/**
		 * Clone a FooBar post, including all post meta.
		 *
		 * @param $id
		 * @return bool
		 */
		function clone_post( $id ) {

			$p = get_post($id);
			if (null === $p) {
				return false;
			}

			$newpost = array(
				'post_name' => $p->post_name,
				'post_type' => $p->post_type,
				'post_parent' => $p->post_parent,
				'menu_order' => $p->menu_order,
				'post_title' => sprintf(__('%s - Copy', 'foobar'), $p->post_title),
				'post_content' => $p->post_content,
				'post_author' => $p->post_author,
				'post_category' => $p->post_category,
				'tags_input' => $p->tags_input,
				'page_template' => $p->page_template,
				'post_status' => apply_filters('foobar_clone_post_status', 'draft'),
			);

			// Create the new FooBar!
			$new_id = wp_insert_post($newpost);

			if ( !is_wp_error( $new_id ) ) {

				// Migrate the meta data across.
				$meta = get_post_meta( $id );

				foreach ( $meta as $key => $val ) {
					update_post_meta( $new_id, $key, maybe_unserialize( $val[0] ) );
				}

				return $new_id;
			}

			return 0;
		}
	}
}

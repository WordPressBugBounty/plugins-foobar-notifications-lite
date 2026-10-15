<?php return array(
    'root' => array(
        'name' => 'fooplugins/foobar',
        'pretty_version' => 'dev-develop',
        'version' => 'dev-develop',
        'reference' => '4de1d515885b83c6a3bd123ed8fa189cbfd7247c',
        'type' => 'wordpress-plugin',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => false,
    ),
    'versions' => array(
        'composer/installers' => array(
            'pretty_version' => 'v1.12.0',
            'version' => '1.12.0.0',
            'reference' => 'd20a64ed3c94748397ff5973488761b22f6d3f19',
            'type' => 'composer-plugin',
            'install_path' => __DIR__ . '/./installers',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'fooplugins/foobar' => array(
            'pretty_version' => 'dev-develop',
            'version' => 'dev-develop',
            'reference' => '4de1d515885b83c6a3bd123ed8fa189cbfd7247c',
            'type' => 'wordpress-plugin',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'roundcube/plugin-installer' => array(
            'dev_requirement' => false,
            'replaced' => array(
                0 => '*',
            ),
        ),
        'shama/baton' => array(
            'dev_requirement' => false,
            'replaced' => array(
                0 => '*',
            ),
        ),
    ),
);

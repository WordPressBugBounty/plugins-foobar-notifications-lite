<?php return array(
    'root' => array(
        'name' => 'fooplugins/foobar',
        'pretty_version' => 'dev-develop',
        'version' => 'dev-develop',
        'reference' => '8033edc2a7da5329cc3d390623a0483d2574b379',
        'type' => 'library',
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
            'reference' => '8033edc2a7da5329cc3d390623a0483d2574b379',
            'type' => 'library',
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

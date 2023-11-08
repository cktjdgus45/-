module.exports = {
    extends: 'react-app',
    overrides: [{
        files: ['*.js', '*.ts'],
        rules: {
            'no-unused-expressions': 'off',
        },
    }],
    rules: {
        "no-unused-expressions": "off"
        // Add or override other rules as needed

    },

};

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  rules: {
    // due to dynamic code, param reassignment is unavoidable
    // and 'Object.assign' is NOT an actual replacement
    'no-param-reassign': 'warn',

    // <button /> tags don't require explicit "type" attribute
    // unless used inside forms
    'react/button-has-type': 'off',

    // destructuring forces bad looking code
    'prefer-destructuring': 'off',
    'react/destructuring-assignment': 'off',

    // we use ".js" as the only file extension
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js'],
      },
    ],

    'import/no-extraneous-dependencies': 'warn',

    // since 'prevProps' is not provided in 'getDerivedStateFromProps',
    // it is not possible to diff current & old props for state update there
    // and 'componentDidUpdate' must be used
    'react/no-did-update-set-state': 'off',

    /* following rules are disabled for smooth development */

    // debugger must be removed, eventually
    'no-debugger': 'warn',

    // unused vars must be removed, eventually
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],

    // unused prop-types must be removed, eventually
    'react/no-unused-prop-types': 'warn',

    // props-types must be added for all props, eventually
    'react/prop-types': 'warn',

    // "object" & "array" prop-types must be replaced, eventually
    'react/forbid-prop-types': 'off',
    'react/no-array-index-key': 'warn',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-nested-ternary': 'warn',
    'jsx-a11y/no-autofocus': 'off',
    "react/no-access-state-in-setstate": 'off'
  },
}

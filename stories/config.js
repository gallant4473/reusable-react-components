import { configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { addDecorator } from '@storybook/react/dist/client/preview'
import { withKnobs } from '@storybook/addon-knobs'
import { withTests } from '@storybook/addon-jest'

import results from '../.jest-test-results.json';

addDecorator(withInfo({ inline: false, header: false }))

addDecorator(withKnobs)

addDecorator(
  withTests({
    results,
  })
);


const req = require.context('./components', true, /.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)

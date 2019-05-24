import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state'

import RadioGroup from '../../src/components/RadioGroup'
import '../../src/components/RadioGroup/index.scss'

const optionsStrings = [
  'John Doe',
  'Meghan Curtis',
  'Rickey Day',
  'Joey Wilson',
  'Pablo Harmon'
]

const optionsNumber = [
  1, 2, 3, 4, 5
]

const optionsObjects = [
  {
    display: 'John Doe',
    value: '1',
  },
  {
    display: 'Meghan Curtis',
    value: '2',
  },
  {
    display: 'Rickey Day',
    value: '3',
  },
  {
    display: 'Joey Wilson',
    value: '4',
  },
  {
    display: 'Pablo Harmon',
    value: '5',
  }
]

const optionsObjectsWithDifferent = [
  {
    name: 'John Doe',
    id: '1',
  },
  {
    name: 'Meghan Curtis',
    id: '2',
  },
  {
    name: 'Rickey Day',
    id: '3',
  },
  {
    name: 'Joey Wilson',
    id: '4',
  },
  {
    name: 'Pablo Harmon',
    id: '5',
  }
]

const storeString = new Store({
  active: 'John Doe'
})

const storeNumber = new Store({
  active: 3
})

const storeObject = new Store({
  active: {
    display: 'John Doe',
    value: '1',
  }
})

const storeObjectDifferent = new Store({
  active: {
    name: 'Pablo Harmon',
    id: '5',
  }
})

storiesOf('Radio Group', module)
  .addParameters({ jest: [] })
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ padding: 10 }}>{story()}</div>)
  .add('Array of strings', () => (
    <State store={storeString}>
      <RadioGroup
        id='example-reusable-radio-group-string'
        active={storeString.get('active')}
        options={optionsStrings}
        onChange={active => storeString.set({ active })}
        inline={boolean('Inline', false)}
      />
    </State>
  ))
  .add('Array of numbers', () => (
    <State store={storeNumber}>
      <RadioGroup
        id='example-reusable-radio-group-number'
        active={storeNumber.get('active')}
        options={optionsNumber}
        onChange={active => storeNumber.set({ active })}
        inline={boolean('Inline', false)}
      />
    </State>
  ))
  .add('Array of objects (Simple)', () => (
    <State store={storeObject}>
      <RadioGroup
        id='example-reusable-radio-group-object'
        active={storeObject.get('active')}
        options={optionsObjects}
        onChange={active => storeObject.set({ active })}
        inline={boolean('Inline', false)}
      />
    </State>
  ))
  .add('Array of objects (with different display and value key)', () => (
    <State store={storeObjectDifferent}>
      <RadioGroup
        id='example-reusable-radio-group-different'
        active={storeObjectDifferent.get('active')}
        options={optionsObjectsWithDifferent}
        onChange={active => storeObjectDifferent.set({ active })}
        inline={boolean('Inline', false)}
        displayKey='name'
        valueKey='id'
      />
    </State>
  ))
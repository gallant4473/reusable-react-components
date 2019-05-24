import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state'
import MultiSelectDropdown from '../../src/components/MultiSelectDropdown'
import '../../src/components/MultiSelectDropdown/index.scss'

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
  active: ['John Doe']
})

const storeNumber = new Store({
  active: [3]
})

const storeObject = new Store({
  active: [{
    display: 'John Doe',
    value: '1',
  }]
})

const storeObjectDifferent = new Store({
  active: [{
    name: 'Pablo Harmon',
    id: '5',
  }]
})

const storeCustomSearch = new Store({
  active: ['John Doe'],
  searchOptions: []
})

const storeCustomSearchApi = new Store({
  active: ['John Doe'],
  searchOptions: [],
  loading: false
})

const onSearch = (text) => {
  const searchOptions = []
  optionsStrings.forEach((item) => {
    if (item.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
      searchOptions.push(item)
    }
  })
  return searchOptions
}

const customApi = (storeAPi, text) => {
  storeAPi.set({ searchOptions: onSearch(text), loading: true })
  setTimeout(() => {
    storeAPi.set({ loading: false })
  }, 1000)
}

storiesOf('MultiSelectDropdown', module)
  .addParameters({ jest: [] })
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ padding: 10, display: 'flex' }}>{story()}</div>)
  .add('Array of strings', () => (
    <State store={storeString}>
      <MultiSelectDropdown
        active={storeString.get('active')}
        options={optionsStrings}
        onChange={active => storeString.set({ active })}
        clear={boolean('Clear', false)}
        open={boolean('Open', false)}
        search={boolean('Search', false)}
        loading={boolean('Loading', false)}
      />
    </State>
  ))
  .add('Array of numbers', () => (
    <State store={storeNumber}>
      <MultiSelectDropdown
        active={storeNumber.get('active')}
        options={optionsNumber}
        onChange={active => storeNumber.set({ active })}
        open={boolean('Open', false)}
        clear={boolean('Clear', false)}
        search={boolean('Search', false)}
        loading={boolean('Loading', false)}
      />
    </State>
  ))
  .add('Array of objects (simple)', () => (
    <State store={storeObject}>
      <MultiSelectDropdown
        active={storeObject.get('active')}
        options={optionsObjects}
        onChange={active => storeObject.set({ active })}
        open={boolean('Open', false)}
        clear={boolean('Clear', false)}
        search={boolean('Search', false)}
        loading={boolean('Loading', false)}
      />
    </State>
  ))
  .add('Array of objects (with different display and value key)', () => (
    <State store={storeObjectDifferent}>
      <MultiSelectDropdown
        active={storeObjectDifferent.get('active')}
        options={optionsObjectsWithDifferent}
        onChange={active => storeObjectDifferent.set({ active })}
        open={boolean('Open', false)}
        clear={boolean('Clear', false)}
        displayKey='name'
        valueKey='id'
        search={boolean('Search', true)}
        loading={boolean('Loading', false)}
      />
    </State>
  ))
  .add('Custom search', () => (
    <State store={storeCustomSearch}>
      <MultiSelectDropdown
        active={storeCustomSearch.get('active')}
        options={optionsStrings}
        onChange={active => storeCustomSearch.set({ active })}
        clear={boolean('Clear', false)}
        open={boolean('Open', false)}
        search
        loading={boolean('Loading', false)}
        searchOptions={storeCustomSearch.get('searchOptions')}
        onSearch={text => storeCustomSearch.set({ searchOptions: onSearch(text) })}
      />
    </State>
  ))
  .add('mock search with api', () => (
    <State store={storeCustomSearchApi}>
      <MultiSelectDropdown
        active={storeCustomSearchApi.get('active')}
        options={optionsStrings}
        onChange={active => storeCustomSearchApi.set({ active })}
        clear={boolean('Clear', false)}
        open={boolean('Open', false)}
        search
        loading={storeCustomSearchApi.get('loading')}
        searchOptions={storeCustomSearchApi.get('searchOptions')}
        onSearch={text => customApi(storeCustomSearchApi, text)}
      />
    </State>
  ))
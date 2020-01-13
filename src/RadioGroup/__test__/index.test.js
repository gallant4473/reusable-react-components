import React from 'react'
import { shallow } from 'enzyme'
import { existsByTestAtrr, findByTestAttr } from '../../testUtils'
import RadioGroup from '../index'

let wrapped

const obj = [
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


describe('Render should be empty', () => {
  beforeEach(() => {
    wrapped = shallow(<RadioGroup id='' />)
  })
  it("Shouldn't render anything when id is empty", () => {
    expect(existsByTestAtrr(wrapped, 'reusable-radio-group')).toBeFalsy()
  })
  it("Should render component properly when id is present and options is not given", () => {
    wrapped.setProps({ id: 'testing' })
    wrapped.update()
    expect(existsByTestAtrr(wrapped, 'reusable-radio-group')).toBeTruthy()
  })
  it("Shouldn't render component properly when id is present and Wrong options type is given", () => {
    wrapped.setProps({ options: {} })
    wrapped.update()
    expect(existsByTestAtrr(wrapped, 'reusable-radio-group')).toBeFalsy()
  })
})

describe('Render should be empty', () => {
  beforeEach(() => {
    wrapped = shallow(<RadioGroup id='testing' options={[1, 2, 3, { display: 'kishore', value: '1' }]} />)
  })
  it("Shouldn't render anything when options- Arrays(with objects and (numbers or strings))", () => {
    expect(existsByTestAtrr(wrapped, 'reusable-radio-group')).toBeFalsy()
  })
  it("Shouldn't render anything when options- Arrays(with objects and arrays)", () => {
    wrapped.setProps({ options: [{ display: 'kishore', value: '1' }, [1, 2, 3]] })
    wrapped.update()
    expect(existsByTestAtrr(wrapped, 'reusable-radio-group')).toBeFalsy()
  })
})

describe('Render should return valid component with options having numbers or strings', () => {
  beforeEach(() => {
    wrapped = shallow(<RadioGroup id='testing' options={[1, 2, 3, 4]} active={1} />)
  })
  it("Should render inline", () => {
    wrapped.setProps({ inline: true })
    wrapped.update()
    expect(findByTestAttr(wrapped, 'reusable-radio-group').hasClass('inline')).toBeTruthy()
  })
  // tests for options containing array of numbers or strings
  it("Should render 4 items", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item').length).toBe(4)
  })
  it("Should render 1st item input checked", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item-input').at(0).props().checked).toBeTruthy()
  })
  it("Should render 2nd item input not checked", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item-input').at(1).props().checked).toBeFalsy()
  })
  it("Shouldn't render object items", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item-object').length).toBe(0)
  })
})

describe('Render should return valid component with options having Objects', () => {
  beforeEach(() => {
    wrapped = shallow(<RadioGroup id='testing-1' options={obj} active={{ display: 'John Doe', value: '1' }} />)
  })
  // tests for options containing array of Objects with keys display and value
  it("Should render 4 items", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item-object').length).toBe(5)
  })
  it("Should render 1st item input checked", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item-object-input').at(0).props().checked).toBeTruthy()
  })
  it("Should render 2nd item input not checked", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item-object-input').at(1).props().checked).toBeFalsy()
  })
  it("Shouldn't render number and string items", () => {
    expect(findByTestAttr(wrapped, 'reusable-radio-group-item').length).toBe(0)
  })
})

// Functional testing
describe('Render should return valid component with options having Objects', () => {
  beforeEach(() => {
    wrapped = shallow(<RadioGroup id='testing' options={[1, 2, 3, 4]} active={1} />)
  })
})
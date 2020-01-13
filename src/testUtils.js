
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`)

export const existsByTestAtrr = (wrapper, val) => wrapper.exists(`[data-test="${val}"]`)
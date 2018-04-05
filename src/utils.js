export const checkSelected = (value = [], selected = []) => {
  const mapping = {}
  for (let i = 0; i < value.length; i += 1) {
    mapping[value[i]] = false
    if (selected.indexOf(value[i]) > -1) {
      mapping[value[i]] = true
    }
  }
  return mapping
}

export const getSelected = (value = {}) => {
  const selected = []
  Object.keys(value).forEach((key) => {
    if (value[key]) {
      selected.push(key)
    }
  })
  return selected
}

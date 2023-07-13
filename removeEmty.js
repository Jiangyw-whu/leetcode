const removeEmpty = (obj) => {
  return Object.entries(obj)
    .filter(([_, v]) => !!v)
    .reduce((a, [k, v]) => ({
      ...a,
      [k]: typeof v === 'object' ? removeEmpty(v) : v,
    }))
}

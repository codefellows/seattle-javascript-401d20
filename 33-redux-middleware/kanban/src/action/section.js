export const create = ({title}) => {
  return {
    type: 'SECTION_CREATE',
    payload: {
      title,
      id: btoa(Math.random()),
      created: new Date(),
    },
  }
}

export const update = (section) => ({
  type: 'SECTION_UPDATE',
  payload: section,
})

export const remove = (section) => ({
  type: 'SECTION_REMOVE',
  payload: section,
})

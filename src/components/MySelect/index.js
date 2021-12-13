import Select from 'react-select'

import './index.css'

const MySelect = props => {
  const {selected, options, userClicksState} = props
  return (
    <Select
      value={selected}
      options={options}
      className="search_input_style"
      onChange={userClicksState}
      placeholder="hi"
    />
  )
}

export default MySelect

import { useTheme } from '~/providers/Theme'

import { MaterialUISwitch } from './style'

const Switch = () => {
  const { changeTheme, currentTheme } = useTheme()
  return (
    <MaterialUISwitch
      sx={{ m: 1 }}
      defaultChecked={currentTheme === 'dark'}
      onChange={changeTheme}
    />
  )
}

export default Switch

import NiceModal from '@ebay/nice-modal-react'

import CropImage from '~/components/Modals/CropImage'
import ImgModal from '~/components/Modals/ImgModal'
import SignIn from '~/components/Modals/SignIn'
import SignUp from '~/components/Modals/SignUp'

NiceModal.register('SignUp', SignUp)
NiceModal.register('SignIn', SignIn)
NiceModal.register('ImgModal', ImgModal)
NiceModal.register('CropImage', CropImage)

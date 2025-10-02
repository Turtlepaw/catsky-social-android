import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {RemoveScrollBar} from 'react-remove-scroll-bar'

import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'
import {type Modal as ModalIface} from '#/state/modals'
import {useModalControls, useModals} from '#/state/modals'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import * as DeleteAccountModal from './DeleteAccount'
import * as ContentLanguagesSettingsModal from './lang-settings/ContentLanguagesSettings'
import * as UserAddRemoveLists from './UserAddRemoveLists'

export function ModalsContainer() {
  const {isModalActive, activeModals} = useModals()

  if (!isModalActive) {
    return null
  }

  return (
    <>
      <RemoveScrollBar />
      {activeModals.map((modal, i) => (
        <Modal key={`modal-${i}`} modal={modal} />
      ))}
    </>
  )
}

function Modal({modal}: {modal: ModalIface}) {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const {isModalActive} = useModals()
  const {closeModal} = useModalControls()
  const {isMobile} = useWebMediaQueries()

  if (!isModalActive) {
    return null
  }

  const onPressMask = () => {
    closeModal()
  }
  const onInnerPress = () => {
    // TODO: can we use prevent default?
    // do nothing, we just want to stop it from bubbling
  }

  let element
  if (modal.name === 'user-add-remove-lists') {
    element = <UserAddRemoveLists.Component {...modal} />
  } else if (modal.name === 'delete-account') {
    element = <DeleteAccountModal.Component />
  } else if (modal.name === 'content-languages-settings') {
    element = <ContentLanguagesSettingsModal.Component />
  } else {
    return null
  }

  return (
    // eslint-disable-next-line react-native-a11y/has-valid-accessibility-descriptors
    <TouchableWithoutFeedback onPress={onPressMask}>
      <Animated.View
        style={styles.mask}
        entering={FadeIn.duration(150)}
        exiting={FadeOut}>
        {/* eslint-disable-next-line react-native-a11y/has-valid-accessibility-descriptors */}
        <TouchableWithoutFeedback onPress={onInnerPress}>
          <View
            style={[
              styles.container,
              isMobile && styles.containerMobile,
              {
                backgroundColor:
                  colorMode === 'light'
                    ? theme.palette.white
                    : theme.palette.black,
                borderColor: theme.palette.contrast_100,
              },
            ]}>
            {element}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mask: {
    // @ts-ignore
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 600,
    // @ts-ignore web only
    maxWidth: '100vw',
    // @ts-ignore web only
    maxHeight: '90vh',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  containerMobile: {
    borderRadius: 0,
    paddingHorizontal: 0,
  },
})

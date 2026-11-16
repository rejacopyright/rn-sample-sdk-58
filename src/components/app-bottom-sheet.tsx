import {
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
  type BottomSheetHandleProps,
} from '@gorhom/bottom-sheet'
import { useCallback, useState, type ReactNode, type Ref } from 'react'
import { Text, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { SHEET_MARGIN, SHEET_RADIUS, styles } from './app-bottom-sheet.styles'

type Props = {
  ref?: Ref<BottomSheetModal>
  title?: string
  children: ReactNode
  /** Pinned to the bottom of the sheet, does not scroll with the content */
  footer?: ReactNode
  onDismiss?: () => void
}

// Standard wrapper for every bottom sheet in this project (do not use BottomSheetModal directly):
// - floats with a 16 margin and rounded corners
// - height follows the content, capped slightly below the status bar
// - content scrolls, the footer stays pinned at the bottom
// - can be closed by dragging down or tapping the backdrop
//
// Usage:
//   const ref = useRef<BottomSheetModal>(null)
//   ref.current?.present()
//   <AppBottomSheet ref={ref} title='Title'>...</AppBottomSheet>
export function AppBottomSheet({ ref, title, children, footer, onDismiss }: Props) {
  const { theme, rt } = useUnistyles()
  const [footerHeight, setFooterHeight] = useState(0)

  const bottomGap = rt.insets.bottom + SHEET_MARGIN
  const maxHeight = rt.screen.height - rt.insets.top - SHEET_MARGIN - bottomGap

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  )

  // The title lives in the handle, so it stays pinned like the drag indicator
  const renderHandle = useCallback(
    (props: BottomSheetHandleProps) => (
      <BottomSheetHandle {...props} indicatorStyle={{ backgroundColor: theme.colors.border }}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </BottomSheetHandle>
    ),
    [title, theme.colors.border],
  )

  return (
    <BottomSheetModal
      ref={ref}
      detached
      bottomInset={bottomGap}
      style={styles.sheet}
      enableDynamicSizing
      maxDynamicContentSize={maxHeight}
      enablePanDownToClose
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      android_keyboardInputMode='adjustResize'
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      backgroundStyle={{ backgroundColor: theme.colors.card, borderRadius: SHEET_RADIUS }}
      onDismiss={onDismiss}
    >
      <BottomSheetScrollView>
        <View style={[styles.body, { paddingBottom: footer ? footerHeight + 16 : 16 }]}>
          {children}
        </View>
      </BottomSheetScrollView>
      {/* Not BottomSheetFooter: that one is anchored to the screen edge and stays behind while the
          sheet is dragged down. This one is inside the sheet, so it moves together with it. */}
      {footer ? (
        <View style={styles.footer} onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}>
          {footer}
        </View>
      ) : null}
    </BottomSheetModal>
  )
}

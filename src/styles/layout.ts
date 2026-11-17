// Single source of truth for the space the native tab bar takes at the bottom of a screen.
// Screen content extends underneath the tab bar, so anything scrollable (or pinned to the bottom)
// must leave this much room. Change it here and every screen follows.

// Default iOS tab bar height
export const TAB_BAR_HEIGHT = 49

const CONTENT_GAP = 16

type Runtime = { insets: { bottom: number } }

// Bottom padding for scrollable content so the last item clears the tab bar
export const tabContentInset = (rt: Runtime) => TAB_BAR_HEIGHT + rt.insets.bottom + CONTENT_GAP

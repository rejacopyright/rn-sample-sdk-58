# React Native learning TODO

Practice project: Expo SDK 58, React Native 0.88 (New Architecture), Expo Router.

## Done

### Basic setup
- [x] Expo Router with native tabs (`NativeTabs`): Home, Product, Profile
- [x] Light/dark theming with Unistyles
- [x] React Query provider with a cache persisted to AsyncStorage
- [x] iOS simulator build via GitHub Actions and EAS local build

### API integration (dummyjson products)
- [x] Axios instance with interceptors (`src/lib/axios.ts`): token on requests, automatic logout on 401
- [x] Separate `src/api` folder, function names without the `use` prefix (`getProducts`, `createProduct`, etc.)
- [x] Queries: product list (infinite scroll with `limit`/`skip`, search), detail, categories
- [x] Mutations: create, update, delete product (dummyjson only simulates them)
- [x] Product types in `src/types`
- [x] Turn off the `rules-of-hooks` ESLint rule for `src/api` only

### State (zustand, persisted on the device)
- [x] `src/store` folder, store names without the `use` prefix (`authStore`, `favoriteStore`)
- [x] Persist to AsyncStorage through `src/lib/storage.ts`
- [x] Product favorites using `favoriteStore`
- [x] Turn off React Compiler (`reactCompiler: false`) because it conflicts with names without `use`

### Product list UI
- [x] 2-column grid
- [x] Compare FlatList, FlashList v2, and LegendList with the same card
- [x] Hidden headers, solid tab bar, tidier search field
- [x] Clear button (FAB) to clear the product cache, page size 8
- [x] Styles separated from views: per-component `*.styles.ts` and `src/styles/common.ts` for global styles
- [x] Bottom sheet with `@gorhom/bottom-sheet` (`AppBottomSheet`) and a category filter sheet
- [x] All project content (code, comments, UI text, docs) written in English

### Product detail
- [x] Product detail screen (`product/[id].tsx`) with `getProduct` and `useLocalSearchParams`
- [x] Product cards open the detail screen: image carousel, price/discount, stock, tags, favorite toggle
- [x] Full-screen image viewer (`ImageViewer`): swipe between images, pinch and double tap to zoom, drag down to close

## Not done yet

### Priority 1: core exercises
- [ ] Login against `dummyjson.com/auth/login` that fills `authStore`
- [ ] Protected routes (`Stack.Protected`) and logout from the Profile screen
- [ ] Store the token in `expo-secure-store` instead of AsyncStorage
- [ ] Create/edit product form with `react-hook-form` and `zod`
- [ ] Use `createProduct`, `updateProduct`, `deleteProduct` in the UI, with a delete confirmation

### Priority 2: going deeper
- [ ] Choose one list library (FlatList / FlashList / LegendList), then remove the other two and the version switcher
- [ ] Mixed item types in a list (`getItemType`) and sticky headers
- [ ] Save and restore scroll position (`scrollStore`)
- [ ] Verify the category filter flow end to end (open sheet, pick a category, list updates, clear filter)
- [ ] Optimistic updates for mutations
- [ ] Tune `partialize` in the zustand persist
- [ ] Animations and gestures with `reanimated` and `gesture-handler`
- [ ] Keyboard handling on screens with forms (and a bottom sheet with a text input)

### Priority 3: quality and release
- [ ] Neat loading, empty, error, offline, and retry states on every screen
- [ ] Try it on Android (shadow vs elevation, tab bar behavior, FAB position)
- [ ] Replace the fixed tab bar height (49) in the FAB with an approach that does not depend on a number
- [ ] Validate API responses with `zod`
- [ ] Profile unnecessary re-renders with React DevTools and the Perf Monitor
- [ ] Testing: `jest-expo` and React Native Testing Library, then Maestro for end-to-end
- [ ] Accessibility: `accessibilityLabel`, minimum touch target size
- [ ] Rename `ResetCacheFab` to `ClearCacheFab` to match its label
- [ ] `eas build` and `eas update` for releases
- [ ] Device features: camera, location, notifications

## Notes
- Function names in `src/api` and `src/store` intentionally have no `use` prefix so they are not confused with pure hooks, but they are still real hooks: only call them inside a component or hook, never inside a condition or loop.
- After changing `app.json`, restart Metro with `-c` and fully kill the app in the simulator, do not just reload.
- All project content (code, comments, UI text, docs) is written in English. Only the chat with Claude is in Indonesian.

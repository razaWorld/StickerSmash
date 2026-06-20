# StickerSmash — Local Experiences

A React Native (Expo) app for browsing and joining local experiences — built with TypeScript, Redux Toolkit, RTK Query, and React Navigation.



## Features

- **Home** — search bar, category filter chips, and a scrollable feed of experience cards (image, title, location, date, rating)
- **Experience Details** — cover image, full description, date, location, and a "Join" button
- **Favorites** — saved experiences with an empty-state when nothing is saved yet
- **Profile** — user avatar/name, joined experiences (horizontal list), and interests
- **Dark / Light theme** — toggle from the Home or Profile header; every screen and component reads colors from the active theme
- **Search & filtering** — combined text search + category filter, computed with a memoized selector
- **Loading / error / success states** — handled consistently across every screen via reusable `LoadingState` / `ErrorState` / `EmptyState` components

## Tech Stack

| Requirement | Implementation |
|---|---|
| React Native (Expo) | Expo SDK 54, managed workflow |
| TypeScript | Strict mode enabled (`tsconfig.json`) |
| Redux Toolkit | `configureStore`, 3 slices (`user`, `favorites`, `experiences`) |
| RTK Query | `experiencesApi` — `getExperiences`, `getExperienceById`, `getUserProfile` with caching/tags |
| React Navigation | Native Stack (root) + Bottom Tabs (Home / Favorites / Profile) |
| Axios | `apiClient` instance with interceptors, wrapped by RTK Query `queryFn` |
| Functional Components | 100% functional components + hooks, no classes |

## Folder Structure

```
src/
├── api/              # axios client + mock data (acts as the backend)
├── components/        # reusable UI: Button, SearchBar, Header, ExperienceCard, states
├── hooks/             # useTheme, useFavorites, useFilteredExperiences
├── navigation/        # RootNavigator (stack) + MainTabNavigator (tabs)
├── redux/
│   ├── api/            # experiencesApiSlice (RTK Query)
│   ├── slices/         # experienceSlice, favoritesSlice, userSlice
│   └── store.ts
├── screens/           # HomeScreen, ExperienceDetailsScreen, FavoritesScreen, ProfileScreen
├── types/             # shared TS types (Experience, User, navigation param lists, theme)
├── utils/             # theme tokens, formatDate/formatRating, filterExperiences
└── App.tsx            # Redux Provider + SafeAreaProvider + RootNavigator
```

The root `App.tsx` (at the project root, required by Expo's default entry point) simply re-exports `src/App.tsx`.

## State Management

- **`experienceSlice`** — search query + selected category (UI/filter state)
- **`favoritesSlice`** — array of favorited experience IDs, with selectors (`selectIsFavorite`, `selectFavoriteExperiences`)
- **`userSlice`** — user profile, joined experiences, and `themeMode` (`light` | `dark`)
- **`experiencesApi`** (RTK Query) — owns all server data (experiences list, experience by id, user profile), with caching, tags, and automatic loading/error states exposed via `useGetExperiencesQuery()` etc.

Filtering is derived with `useFilteredExperiences()`, which combines the RTK Query cache with the Redux filter state through a memoized selector — no duplicate copies of server data are kept in Redux.

## API Integration

`src/api/experiencesApi.ts` wraps an Axios instance with a response interceptor for consistent error messages, and falls back to local mock data (`src/api/mockData.ts`) when the mock endpoint is unreachable — so the app always has data to render, while still exercising real network/error-handling code paths. RTK Query's `queryFn` wraps each Axios call and reports `isLoading` / `isFetching` / `error` to the UI automatically.

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)
- Expo Go app on your phone, or an Android/iOS simulator

### Install & run

```bash
npm install
npx expo start
```

Then:
- Press `a` for Android emulator, `i` for iOS simulator, `w` for web, or scan the QR code with Expo Go.

### Type-check / test / lint

```bash
npx tsc --noEmit   # TypeScript check
npx jest           # unit tests (utils + favoritesSlice)
npm run lint       # ESLint
```

### Building an APK

Using EAS Build (recommended):

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

This produces a downloadable `.apk` link once the build completes on Expo's servers.

Alternatively, for a local build (requires Android SDK installed):

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

The APK will be at `android/app/build/outputs/apk/release/app-release.apk`.

## Design Notes

- All colors/spacing/typography are centralized in `src/utils/theme.ts` (`lightColors`, `darkColors`, `SPACING`, `BORDER_RADIUS`, `FONT_SIZE`) — no hard-coded hex values inside components.
- `useTheme()` reads `themeMode` from Redux and resolves it to the active color palette, so toggling dark mode updates every screen instantly, including the navigation header/tab bar colors.
- Reusable primitives (`Button`, `SearchBar`, `Header`, `ExperienceCard`) accept style overrides via props rather than being screen-specific.

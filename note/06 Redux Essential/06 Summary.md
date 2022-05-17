# Summary

## Redux Toolkit 

### APIs

- `configureStore()`
- `createReducer()`
- `createAction()`
- `createSlice()`
- `createSelector()`
- `createAsyncThunk()`
- `createEntityAdapter()`

### Basic Concepts

- State Management
- Immutability
- One Way Data Flow

### Advanced Concepts

- Request Status Handling: `createAsyncThunk()`
- Memorizing Selector Functions: `createSelector()`
- Normalized State Structure: `createEntityAdapter()`

## RTK Query

### APIs

- `createApi()`
- `fetchBaseQuery()`
- `setupListeners()`

### Basic Concepts

- Queries
- Mutations

### Advanced Concepts

- Cache Data Subscription Lifetimes
- Automated Re-fetching by Tag Invalidation:
  - `tagTypes`
  - `providesTags`
  - `invalidateTags`
- Code Splitting by Injecting Endpoints
- Modifying Received Data
  - `transformResponse` after query for all consumers
  - `selectFromResult` during selection for some consumers
  - `useMemo` before rendering for specific consumer
- Optimistic Updates
  - `async onQueryStarted()`
  - `apiSlice.util.updateQueryData()`
  - `await queryFulfilled`
  - `patchResult.undo()`
- Streaming Cache Updates
  - `async onCacheEntryAdded()`
  - `await cacheDataLoaded`
  - `updateCachedData()`
  - `await cacheEntryRemoved`
- Tracking Client-Side State
import { createSelector } from "reselect";

export const selectEvents = (state) => state.event.events;
export const selectEventsByArgument = createSelector(
  [
    // Usual first input - extract value from `state`
    (state) => state.event.events,
    // Take the second arg, `category`, and forward to the output selector
    (events, args) => args,
  ],
  // Output selector gets (`items, category)` as args
  (events, args) =>
    events.filter((event) =>
      event.mutualGenres.length >= args.mutualGenres &&
      event.mutualArtists.length >= args.mutualArtists
        ? 1
        : 0
    )
);

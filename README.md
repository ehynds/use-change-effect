# `useChangeEffect`

![build status](https://github.com/ehynds/use-change-effect/workflows/Build/badge.svg)

Run an effect when a value changes. Useful when you want to:

* Know when a prop, state, or other value changes.
* Know what the previous value was.
* Avoid running the effect on mount.

## Installation

```bash
$ npm install --save @ehynds/use-change-effect

# or

$ yarn add @ehynds/use-change-effect
```

## Usage

```js
import { useChangeEffect } from '@ehynds/use-change-effect';

const Component = ({ loading }) => {
  useChangeEffect(
    (prevLoading) => {
      console.log(`loading changed from ${prevLoading} to ${loading}`);
    },
    [loading]
  );

  ...
}
```

If the `dependencies` array contains multiple values, each previous value is passed to the effect as separate arguments:

```js
useChangeEffect(
  (prevLoading, prevError) => {
    console.log('loading and/or error changed', { prevLoading, prevError });
  },
  [loading, error]
);
```
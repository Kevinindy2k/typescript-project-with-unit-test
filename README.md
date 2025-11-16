## Setup

Install dependencies:
```bash
npm install
```

## Usage

Build:
```bash
npm run build
```

Run tests:
```bash
npm test
```

Example:
```typescript
import { merge } from './src/merge';

const arr1 = [9, 7, 5, 3, 1];  // descending
const arr2 = [2, 4, 6, 8];
const arr3 = [0, 10];

const result = merge(arr1, arr2, arr3);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## How it works

Since collection_1 is sorted backwards (max to min), I reverse it first. Then just merge all three arrays by comparing values and picking the smallest one each time. Pretty straightforward implementation.

## Tests

Includes unit tests for:
- Basic merging
- Duplicate values
- Negative numbers
- Empty arrays
- Different array sizes

Run `npm test` to see all tests pass.

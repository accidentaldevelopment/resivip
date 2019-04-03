import { Guest } from '../../Guest';

export const duplicateGuestError = {
  path: 'guests',
  kind: 'DuplicateGuestWithinDocument',

  message: (dupes: Partial<Guest>[]) => `Path \`guests\` cannot contain duplicates: [${dupes.join(',')}]`
};

export const invalidGuestLengthError = {
  path: 'guests',
  kind: 'InvalidGuestLength',

  message: (maxSize: number) => `Path \`guests\` cannot be longer than \`maxSize\` (${maxSize})`
};

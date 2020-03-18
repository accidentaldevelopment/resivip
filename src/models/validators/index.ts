import { invalidGuestLengthError, duplicateGuestError } from './errors';
import { Party } from '../Party';
import { Guest } from '../Guest';
import { MongooseDocument } from 'mongoose';

// Defined, but unexported, by Typegoose/Mongoose. Define here for typeness.
type NextFn = (err?: Error) => void;
type TypegooseDoc<T> = T & MongooseDocument;

export function validateGuestLength(this: TypegooseDoc<Party>, next: NextFn) {
  if (this.guests.length > this.maxSize) {
    this.invalidate(
      invalidGuestLengthError.path,
      invalidGuestLengthError.message(this.maxSize),
      undefined,
      invalidGuestLengthError.kind
    );
  }
  next();
}

export function validateGuestUniqueness(
  this: TypegooseDoc<Party>,
  next: NextFn
) {
  const names = new Set();
  const dupes: Partial<Guest>[] = [];
  this.guests.forEach(guest => {
    if (names.has(guest.name)) {
      dupes.push({ name: guest.name });
    } else {
      names.add(guest.name);
    }
  });
  if (dupes.length > 0) {
    this.invalidate(
      duplicateGuestError.path,
      duplicateGuestError.message(dupes),
      undefined,
      duplicateGuestError.kind
    );
  }
  next();
}

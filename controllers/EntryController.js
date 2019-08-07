import axios from 'axios';
import defaultEntryOptions from '../models/Entry';

export async function createEntry(options) {
  // 0. Merge options
  const mergedOptions = { ...defaultEntryOptions, ...options };

  // 1. TODO: Validate submission

  // 2. Hit endpoint
  const { data } = await axios({
    method: 'post',
    url: '/api/entries/new',
    data: mergedOptions,
  });

  // 3. Validate response
  if (data.error) {
    throw new Error(data.message);
  }

  if (!data.entry) {
    return {};
  }

  // 4. Return result
  return data.entry;
}

export async function deleteEntry({ id, userId }) {
  // 1. Validate submission
  if (!userId || !userId.length) {
    throw new Error("User id is missing or doesn't match.");
  }

  if (!id || !id.length) {
    throw new Error('Please submit an id.');
  }

  // 2. Hit endpoint
  const { data } = await axios({
    method: 'post',
    url: `/api/entries/${id}/delete`,
    data: {
      id,
      userId,
    },
  });

  // 3. Validate response
  if (data.error) {
    throw new Error(data.message);
  }

  if (!data.entry) {
    return {};
  }

  // 4. Return result
  return data.entry;
}

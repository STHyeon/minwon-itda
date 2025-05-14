import { v4 as uuidv4 } from 'uuid';

import type { SimilarInfoResponse, StorageItem } from '@/typings/complaint';

//
//
//

/**
 * Saves an array of items to localStorage
 */
function saveToLocalStorage(key: string, items: StorageItem[]): void {
  try {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Creates a new storage item with generated UUID
 */
function createStorageItem(
  title: string,
  description: string,
  data: SimilarInfoResponse[] = []
): StorageItem {
  return {
    id: uuidv4(),
    title,
    description,
    data,
  };
}

/**
 * Retrieves array of items from localStorage
 */
export function getFromLocalStorage(key: string): StorageItem[] {
  try {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return [];
    }

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return [];
  }
}

/**
 * Adds a new item to a localStorage array
 * Maintains a maximum of 3 items, with newest items at the beginning
 */
export function addItemToLocalStorage(
  key: string,
  title: string,
  description: string,
  data: SimilarInfoResponse[] = []
): StorageItem[] {
  const items = getFromLocalStorage(key);
  const newItem = createStorageItem(title, description, data);
  const updatedItems = [newItem, ...items].slice(0, 3);

  saveToLocalStorage(key, updatedItems);

  return updatedItems;
}

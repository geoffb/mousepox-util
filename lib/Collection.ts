import { Signal } from "./Signal";

/** A function which filters a collection by evaluating a thing */
export type CollectionFilter<T> = (thing: T) => boolean;

/** A function which operators on a given thing */
export type CollectionIterator<K, T> = (thing: T, key: K) => void;

/** A collection of things */
export class Collection<K, T> {

  /** Emitted when a thing has been added to this collection */
  public readonly onAdd = new Signal<(thing: T) => void>();

  /** Emitted when a thing has been removed from this collection */
  public readonly onRemove = new Signal<(thing: T) => void>();

  /** Managed things */
  protected readonly things: Map<K, T> = new Map();

  /** Number of things in this collection */
  public get size(): number {
    return this.things.size;
  }

  /** Clear all things */
  public clear(): void {
    this.things.clear();
  }

  /** Dispose of this collection */
  public dispose(): void {
    this.onAdd.purge();
    this.onRemove.purge();
    this.clear();
  }

  /** Add a thing to the collection */
  public add(key: K, thing: T): void {
    this.things.set(key, thing);
    this.onAdd.emit(thing);
  }

  /** Remove a thing from the collection */
  public remove(key: K): void {
    const thing = this.things.get(key);
    if (thing !== undefined) {
      this.things.delete(key);
      this.onRemove.emit(thing);
    }
  }

  /** Get a thing by its key */
  public get(key: K): T | undefined {
    return this.things.get(key);
  }

  /** Execute a function for each thing */
  public each(fn: CollectionIterator<K, T>, filter?: CollectionFilter<T>): void {
    for (const [key, thing] of this.things) {
      if (filter === undefined || filter(thing)) {
        fn(thing, key);
      }
    }
  }

  /** Count things which pass a given filter */
  public count(filter: CollectionFilter<T>): number {
    let count = 0;
    for (const [, thing] of this.things) {
      if (filter(thing)) {
        count++;
      }
    }
    return count;
  }

  /** Get a list of things passing a given filter */
  public filter(filter?: CollectionFilter<T>): T[] {
    const things: T[] = [];
    for (const [, thing] of this.things) {
      if (filter === undefined || filter(thing)) {
        things.push(thing);
      }
    }
    return things;
  }

  /** Get the first thing which passes a given filter */
  public first(filter: CollectionFilter<T>): T | undefined {
    for (const [, thing] of this.things) {
      if (filter(thing)) {
        return thing;
      }
    }
  }

}

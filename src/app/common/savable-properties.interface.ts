import { ImageElement, TagElement } from './final-object.interface';

export interface SavableProperties {
  addTags: TagElement[];      // tags to add
  removeTags: TagElement[];   // tags to remove
  images: ImageElement[];
}

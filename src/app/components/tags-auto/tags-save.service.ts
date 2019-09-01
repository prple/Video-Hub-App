import { Injectable } from '@angular/core';
import { TagElement } from '../../common/final-object.interface';

@Injectable()
export class AutoTagsSaveService {

  addTags: TagElement[] = [];
  removeTags: TagElement[] = [];

  needToSaveTags: boolean = false;

  /**
   * Return `true` if tags have been updated
   */
  public needToSave(): boolean {
    return this.needToSaveTags;
  }

  /**
   * Add an `add` tag
   * @param tag
   */
  public addAddTag(tag: TagElement): void {
    this.needToSaveTags = true;

    const index = this.removeTags.indexOf(tag);

    if (index > -1) {
      this.removeTags.splice(index, 1);
    }

    if (this.addTags.indexOf(tag) === -1) {
      this.addTags.push(tag);
    }

    console.log(this.addTags);
  }

  /**
   * Add a `remove` tag
   * @param tag
   */
  public addRemoveTag(tag: TagElement): void {
    this.needToSaveTags = true;

    const index = this.addTags.indexOf(tag);

    if (index > -1) {
      this.addTags.splice(index, 1);
    }

    if (this.removeTags.indexOf(tag) === -1) {
      this.removeTags.push(tag);
    }

    console.log(this.removeTags);
  }

  /**
   * Get current add tags
   */
  public getAddTags(): TagElement[] {
    return this.addTags;
  }

  /**
   * get current remove tags
   */
  public getRemoveTags(): TagElement[] {
    return this.removeTags;
  }

  /**
   * Load `addTags` and `removeTags` from the .vha file
   * @param savedAddTags
   * @param savedRemoveTags
   */
  public restoreSavedTags(savedAddTags: TagElement[], savedRemoveTags: TagElement[]): void {
    this.addTags = savedAddTags;
    this.removeTags = savedRemoveTags;
    this.needToSaveTags = false;
  }

}

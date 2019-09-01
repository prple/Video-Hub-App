import { Pipe, PipeTransform } from '@angular/core';

import { ManualTagsService } from '../components/tags-manual/manual-tags.service';
import { TagElement } from '../common/final-object.interface';

@Pipe({
  name: 'manualTagSortPipe'
})
export class ManualTagSortPipe implements PipeTransform {

  constructor(
    public manualTagService: ManualTagsService
  ) {}

  /**
   * Return all the tags by frequency or in alphabetical order
   * @param allTags
   * @param filterString    - remove all tags that do not contain this string
   * @param sortByFrequency - if false, will sort alphabetically
   * @param forceUpdateHack - boolean that is toggled manually to force updating the list
   */
  transform(allTags: TagElement[], filterString: string, sortByFrequency: boolean, forceUpdateHack: boolean): TagElement[] {

    if (filterString !== '') {
      allTags = allTags.filter(tag => tag.name.includes(filterString));
    }

    let sortedTags: TagElement[];

    if (sortByFrequency) {

      // console.log('SORTING BY FREQUENCY !!!');

      sortedTags = allTags.sort((a, b): any => {
        return this.manualTagService.tagsMap.get(a) < this.manualTagService.tagsMap.get(b) ? 1 : -1;
      }).slice();
    } else {
      // Sortint alphabetically
      sortedTags = allTags.sort((a, b): any => {
        return a.name < b.name ? 1 : -1;
      }).slice();
    }

    return sortedTags;
  }

}

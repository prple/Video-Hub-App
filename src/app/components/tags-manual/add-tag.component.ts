import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ManualTagsService } from './manual-tags.service';
import { TagElement } from '../../common/final-object.interface';

@Component({
  selector: 'app-add-tag-component',
  templateUrl: 'add-tag.component.html',
  styleUrls: ['add-tag.component.scss']
})
export class AddTagComponent {

  @Input() darkMode: boolean;

  @Output() tag = new EventEmitter<TagElement>();

  currentText: string = '';
  typeAhead: string = '';

  constructor(
    public manualTagsService: ManualTagsService
  ) { }

  emitTag(text: string) {
    if (text.trim()) { // if not empty
      this.tag.emit({
        name: text.trim(),
        type: ''
      });
      this.currentText = '';
      this.typeAhead = '';
    }
  }

  checkTypeahead(text: string) {
    this.typeAhead = this.manualTagsService.getTypeahead(text);
  }

  tabPressed($event): void {
    if (this.typeAhead !== '') {
      this.emitTag(this.typeAhead);
      $event.preventDefault();
    }
  }

  /**
   * User pressed the `esc` key
   */
  escape(): void {
    this.currentText = '';
    this.typeAhead = '';
  }

}

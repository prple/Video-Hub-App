import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TagElement } from '../../common/final-object.interface';
import { ManualTagsService } from '../tags-manual/manual-tags.service';

@Component({
  selector: 'app-add-actor-component',
  templateUrl: 'add-actor.component.html',
  styleUrls: ['add-actor.component.scss']
})
export class AddActorComponent {

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
        type: 'actor'
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

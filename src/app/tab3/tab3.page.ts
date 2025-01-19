import { Component } from '@angular/core';
import { gv } from 'src/global_variables';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  deleteAfterCopy: boolean = gv.deleteAfterCopy;
  includeSignature: boolean = gv.includeSignature;

  constructor() {}

  updateSettings() {
    gv.deleteAfterCopy = this.deleteAfterCopy;
    gv.includeSignature = this.includeSignature;
  }
}
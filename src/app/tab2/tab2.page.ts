import { Component } from "@angular/core";
import { AppStorageService } from "../app-storage.service";
import { CLIPBOARD_HISTORY } from "../app.constants";
import { ClipboardObj } from "../model/clipboard";
import { Router } from "@angular/router";
import { Clipboard } from '@capacitor/clipboard';
import { gv } from 'src/global_variables';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  clipboardArray: ClipboardObj[] = [];

  constructor(
    private appStorage: AppStorageService,
    private router: Router
  ) {}

  async ionViewDidEnter() {
    const data = await this.appStorage.get(CLIPBOARD_HISTORY);

    if (data) {
      this.clipboardArray = data;
    }
  }

  deleteClipboardItem(clipboardObj: ClipboardObj) {
    const index = this.clipboardArray.indexOf(clipboardObj);

    if (index > -1) {
      this.clipboardArray.splice(index, 1);
      this.appStorage.set(CLIPBOARD_HISTORY, this.clipboardArray);
    }
  }

  goToDetail(clipboardString: string) {
    this.router.navigate(["/tabs/history-detail"], { queryParams: { clipboardString } });
  }
  async copyToClipboard(item: ClipboardObj) {
    console.log("Copying to Clipboard");

    try {
        let content = item.code;
        if (gv.includeSignature)
        {
          content = content + "\n\nThis content has been saved and copied thanks to ClipboardSaver. Install ClipboardSaver from the Play Store."
        }
        await Clipboard.write({ string: content });
        console.log("Content copied to clipboard:", content);
        if (gv.deleteAfterCopy) {
          this.deleteClipboardItem(item);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || "Unknown error occurred";
        console.error("Clipboard Copy Error:", errorMessage);
    }
}
}

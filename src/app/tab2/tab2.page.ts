import { Component } from "@angular/core";
import { AppStorageService } from "../app-storage.service";
import { BARCODE_HISTORY } from "../app.constants";
import { Barcode } from "../model/barcode";
import { Router } from "@angular/router";
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  barcodeArray: Barcode[] = [];

  constructor(
    private appStorage: AppStorageService,
    private router: Router
  ) {}

  async ionViewDidEnter() {
    const data = await this.appStorage.get(BARCODE_HISTORY);

    if (data) {
      this.barcodeArray = data;
    }
  }

  deleteBarcode(barcode: Barcode) {
    const index = this.barcodeArray.indexOf(barcode);

    if (index > -1) {
      this.barcodeArray.splice(index, 1);
      this.appStorage.set(BARCODE_HISTORY, this.barcodeArray);
    }
  }

  goToDetail(barcode: string) {
    this.router.navigate(["/tabs/history-detail"], { queryParams: { barcode } });
  }
  async copyToClipboard(item: Barcode) {
    console.log("Copying to Clipboard");

    try {
        let content = item.code;
        await Clipboard.write({ string: content });
        console.log("Content copied to clipboard:", content);
    } catch (error) {
        const errorMessage = (error as Error).message || "Unknown error occurred";
        console.error("Clipboard Copy Error:", errorMessage);
    }
}
}

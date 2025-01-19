import { Component, runInInjectionContext } from "@angular/core";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";
import { Clipboard } from '@capacitor/clipboard';
import { Platform } from "@ionic/angular";
import { AppStorageService } from "../app-storage.service";
import { BARCODE_HISTORY } from "../app.constants";
import { Barcode } from "../model/barcode";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  
  clipboardResult = "";
  clipboardArray: Barcode[] = [];

  constructor(
    private platform: Platform,
    private appStorage: AppStorageService,
  ) {}

  async ionViewDidEnter() {
    const data = await this.appStorage.get(BARCODE_HISTORY);

    if (data) {
      this.clipboardArray = data;
    } else {
      // generate some mock data
      this.generateMockData();
    }
  }

  private generateMockData() {
    const now = new Date();

    for (let index = 0; index < 10; index++) {
      const date = new Date(now.getTime() - index * 24 * 60 * 60 * 1000);
      const barcode = new Barcode(this.generateRandomCode(), date);

      this.clipboardArray.push(barcode);
    }
  }

  private generateRandomCode() {
    return "0062639348571";
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  async getClipboardContent() {
    console.log("Getting Clipboard Content");

    try {
      let { value } = await Clipboard.read();

      if (!value) {
        value = "Empty clipboard"
      }

      console.log("Clipboard Result: ", value);
      this.clipboardResult = value;

      const clipboardData = new Barcode(value);
      this.clipboardArray.unshift(clipboardData);

      this.appStorage.set(BARCODE_HISTORY, this.clipboardArray);
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";
      console.error("Clipboard Error: ", errorMessage);
      this.clipboardResult = "Clipboard Error: " + errorMessage;
    }
  }
}

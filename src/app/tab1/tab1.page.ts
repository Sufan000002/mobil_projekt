import { Component, runInInjectionContext } from "@angular/core";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";

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
  scanResult = "";
  //barcodeArray: Array<Barcode> = []
  barcodeArray: Barcode[] = [];

  constructor(
    private platform: Platform,
    private appStorage: AppStorageService,
  ) {}

  async ionViewDidEnter() {
    const data = await this.appStorage.get(BARCODE_HISTORY);

    if (data) {
      this.barcodeArray = data;
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

      this.barcodeArray.push(barcode);
    }
  }

  private generateRandomCode() {
    return "0062639348571"; // not random, but testing code for https://upcdatabase.org
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  async scanBarcode() {
    console.log("scan");

    let scanResult = "";

    if (this.platform.is("android") || this.platform.is("ios")) {
      // native barcode scanner
      try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
          hint: CapacitorBarcodeScannerTypeHint.ALL,
        });
        console.log("Scan Result: ", result);
        scanResult = result.ScanResult;
      } catch (error) {
        const errorMessage = (error as Error).message || "Unknown error occurred";
        console.error("Scan Error: ", errorMessage);
        scanResult = "Error during scan";
      }
    } else {
      scanResult = this.generateRandomCode();
    }

    // display scan result on UI
    this.scanResult = scanResult;
    const barcode = new Barcode(scanResult);
    this.barcodeArray.unshift(barcode);

    this.appStorage.set(BARCODE_HISTORY, this.barcodeArray);
  }
}

import { Component, runInInjectionContext } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint} from '@capacitor/barcode-scanner'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  scanResult = ''

  constructor() {}

  async scanBarcode() {
    console.log('scan')

    const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    console.log(result);

    this.scanResult = result.ScanResult

  }

}

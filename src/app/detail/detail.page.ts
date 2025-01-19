import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UpcService } from "../api/upc.service";
import { UpcResponse } from "../model/upc-response";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"],
})
export class DetailPage implements OnInit {
  barcode: string | null = null;
  upcResponse?: UpcResponse;

  constructor(
    private route: ActivatedRoute,
    private upcService: UpcService,
  ) {}

  ngOnInit() {
    this.barcode = this.route.snapshot.paramMap.get("barcode");

    if (this.barcode) {
      let unwrappedBarcode = this.barcode;

      // API request
      this.upcService.getData(unwrappedBarcode).subscribe({
        next: (data) => {
          console.log(data);
          this.upcResponse = data;
        },
      });
    }
  }
}

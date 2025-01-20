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
  clipboard: string | null = null;
  upcResponse?: UpcResponse;

  constructor(
    private route: ActivatedRoute,
    private upcService: UpcService,
  ) {}

  ngOnInit() {
    this.clipboard = this.route.snapshot.paramMap.get("clipboard");

    if (this.clipboard) {
      let unwrappedClipboard = this.clipboard;

      // API request
      this.upcService.getData(unwrappedClipboard).subscribe({
        next: (data) => {
          console.log(data);
          this.upcResponse = data;
        },
      });
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-trebuchet",
  templateUrl: "./trebuchet.component.html",
  styleUrls: ["./trebuchet.component.scss"],
})
export class TrebuchetComponent implements OnInit {
  title = "advent_of_code";
  file = "app/fixtures/sample-input.txt";

  fileData = null;
  subs: Subscription | null = null;
  summedValue: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.subs = this.http
      .get("assets/sample-input.txt", { responseType: "text" })
      .subscribe({
        next: (data: any) => {
          this.parseFileData(data);
        },
        error: (error: any) => {},
      });
  }

  parseFileData = (fileData: string) => {
    const parsedCodes = fileData.split(/\r?\n/);
    const parsedNumbers: Array<number> = [];

    parsedCodes.map((code: string) => {
      const reversedCode = code.split("").reverse().join("");
      const firstDigitIndex: any = code.search(/\d+/);
      const lastDigitIndex: any = reversedCode.search(/\d+/);

      console.log("ho;a", code[firstDigitIndex]);

      const parsedNumber =
        "" +
        parseInt(code[firstDigitIndex][0], 10) +
        parseInt(reversedCode[lastDigitIndex][0], 10);
      parsedNumbers.push(parseInt(parsedNumber));
    });
    this.summedValue = parsedNumbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}

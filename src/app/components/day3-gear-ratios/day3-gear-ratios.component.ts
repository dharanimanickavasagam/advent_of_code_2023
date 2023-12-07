import { Component, OnInit } from "@angular/core";
import { FileReaderService } from "../../services/file-reader/file-reader.service";

@Component({
  selector: "app-day3-gear-ratios",
  templateUrl: "./day3-gear-ratios.component.html",
  styleUrls: ["./day3-gear-ratios.component.scss"],
})
export class Day3GearRatiosComponent implements OnInit {
  parsedCodes: any;
  partNumbers: any = [];
  result: number = 0;

  constructor(private fileReaderService: FileReaderService) {}

  ngOnInit(): void {
    this.fileReaderService
      .readFile("assets/gear-ratios.txt")
      .subscribe((data: any) => {
        this.parseData(data);
      });
  }

  parseData = (data: string) => {
    this.parsedCodes = data.split(/\r?\n/);
    this.parsedCodes.map((parsedCode: string, fileRow: number) => {
      this.findNumbers(parsedCode, fileRow);
    });

    console.log("PN", this.partNumbers);
    this.result = this.partNumbers.reduce(
      (a: number, b: number) => a + b,
      this.result
    );

    console.log("result is", this.result);
  };

  findNumbers = (parsedCode: string, fileRow: number) => {
    const numbersInRow = [];
    const numberInSequence = [];

    let startingIndex = -1;
    for (let i = 0; i < parsedCode.length; i++) {
      if (!isNaN(Number(parsedCode[i]))) {
        numberInSequence.push(parsedCode[i]);
        if (startingIndex === -1) {
          startingIndex = i;
        }
      } else {
        if (numberInSequence.length != 0) {
          numbersInRow.push({ [startingIndex]: numberInSequence.join("") });
          numberInSequence.length = 0;
        }
        startingIndex = -1;
      }
    }

    numbersInRow.map((number) => {
      this.isPartNumber(number, fileRow, parsedCode);
    });
  };

  isPartNumber = (number: any, fileRow: number, parsedCode: string) => {
    console.log("FR", fileRow);
    const startingIndex = parseInt(Object.keys(number)[0]);
    const wholeNumber = number[startingIndex];
    const numberLength = wholeNumber.length;

    // look for symbols on left side
    // if the number starts at index 0, then there will be no symbols on the left
    if (startingIndex !== 0) {
      if (parsedCode[startingIndex - 1] != ".") {
        this.partNumbers.push(parseInt(wholeNumber));
        return;
      }
    }

    // look for symbols on right side
    if (parsedCode[startingIndex + numberLength] != ".") {
      this.partNumbers.push(parseInt(wholeNumber));
      return;
    }

    // look for symbols right above the number
    if (fileRow !== 0) {
      const previousRow = this.parsedCodes[fileRow - 1];
      for (let i = startingIndex; i < startingIndex + numberLength; i++) {
        if (previousRow[i] != ".") {
          console.log("choosing number", wholeNumber);
          this.partNumbers.push(parseInt(wholeNumber));
          return;
        }
      }
    }

    // look for symbols right below the number
    if (fileRow !== this.parsedCodes.length - 1) {
      const nextRow = this.parsedCodes[fileRow + 1];
      for (let i = startingIndex; i < startingIndex + numberLength; i++) {
        if (nextRow[i] != ".") {
          this.partNumbers.push(parseInt(wholeNumber));
          return;
        }
      }
    }

    // look for symbols diagonally on previous row
    if (fileRow !== 0) {
      const previousRow = this.parsedCodes[fileRow - 1];

      // left diagonal
      if (
        previousRow[startingIndex - 1] &&
        previousRow[startingIndex - 1] != "."
      ) {
        this.partNumbers.push(parseInt(wholeNumber));
        return;
      }

      // right diagonal
      if (
        previousRow[startingIndex + numberLength] &&
        previousRow[startingIndex + numberLength] != "."
      ) {
        this.partNumbers.push(parseInt(wholeNumber));
        return;
      }
    }

    // look for symbols diagonally on next row
    if (fileRow !== this.parsedCodes.length - 1) {
      const nextRow = this.parsedCodes[fileRow + 1];

      // left diagonal
      if (nextRow[startingIndex - 1] && nextRow[startingIndex - 1] != ".") {
        this.partNumbers.push(parseInt(wholeNumber));
        return;
      }

      // right diagonal
      if (
        nextRow[startingIndex + numberLength] &&
        nextRow[startingIndex + numberLength] != "."
      ) {
        this.partNumbers.push(parseInt(wholeNumber));
        return;
      }
    }
  };
}

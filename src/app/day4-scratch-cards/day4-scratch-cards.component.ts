import { Component, OnInit } from "@angular/core";
import { FileReaderService } from "../services/file-reader/file-reader.service";

@Component({
  selector: "app-day4-scratch-cards",
  templateUrl: "./day4-scratch-cards.component.html",
  styleUrls: ["./day4-scratch-cards.component.scss"],
})
export class Day4ScratchCardsComponent implements OnInit {
  parsedData: any;
  earnedPoints: number = 0;

  constructor(private fileReaderService: FileReaderService) {}

  ngOnInit(): void {
    this.fileReaderService.readFile("assets/scratch-cards.txt").subscribe({
      next: (data: string) => {
        this.parseFileData(data);
      },
    });
  }

  parseFileData = (data: any) => {
    this.parsedData = data.split(/\r?\n/);
    this.parsedData.map((data: any) => {
      let [card, scratchCards] = data.split(":");
      scratchCards = scratchCards.trimStart();

      let [winningCards, myCards] = scratchCards.split("|");

      winningCards = winningCards.trimEnd();
      myCards = myCards.trimStart();

      winningCards = winningCards
        .split(" ")
        .filter((card: string) => card != "");
      myCards = myCards.split(" ").filter((card: string) => card != "");

      this.determinePoints(winningCards, myCards);
    });
  };

  determinePoints = (winningCards: Array<string>, myCards: Array<string>) => {
    const matchingCards: Array<number> = [];

    winningCards.map((winningCard: string) => {
      myCards.map((myCard: string) => {
        if (winningCard === myCard) {
          matchingCards.push(parseInt(winningCard));
        }
      });
    });

    this.computeCardPoints(matchingCards.length);
  };

  computeCardPoints = (matchingCardsLength: number) => {
    if (matchingCardsLength === 0) {
      return;
    } else if (matchingCardsLength === 1) {
      this.earnedPoints += 1;
    } else {
      this.earnedPoints += Math.pow(2, matchingCardsLength - 1);
    }
  };
}

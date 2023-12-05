import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FileReaderService } from "src/app/services/file-reader/file-reader.service";

@Component({
  selector: "app-cube-conundrum",
  templateUrl: "./cube-conundrum.component.html",
  styleUrls: ["./cube-conundrum.component.scss"],
})
export class CubeConundrumComponent implements OnInit {
  subs: Subscription | null = null;

  allGames: any = {};
  possibleGames: Array<number> = [];

  isGamePossible: Array<boolean> = [];

  result = 0;

  // problem expectation
  redCubes = 12;
  greenCubes = 13;
  blueCubes = 14;

  constructor(private fileReaderService: FileReaderService) {}

  ngOnInit(): void {
    this.subs = this.fileReaderService
      .readFile("assets/cube-conundrum.txt")
      .subscribe({
        next: (data) => {
          this.parseInputFile(data);
        },
        error: () => {},
      });
  }

  parseInputFile = (fileData: string) => {
    const parsedGames = fileData.split(/\r?\n/);
    parsedGames.map((game: string) => {
      const words = game.split(" ");
      const [gameConstant, gameIndex, ...rest] = words;
      this.allGames[parseInt(gameIndex)] = rest.join(" ");
    });

    this.computePossibilities();
  };

  computePossibilities = () => {
    // breaking all the games into smaller sub games
    Object.values(this.allGames).map((game: any, index: number) => {
      const subGames = this.findSubGames(game);
      this.findCubesInSubGame(subGames, index);
      const res = this.isGamePossible.every((item) => item === true);

      if (res) {
        this.possibleGames.push(index + 1);
      }
      this.isGamePossible.length = 0;
      this.result = this.possibleGames.reduce((a, b) => a + b, 0);
    });
  };

  findSubGames = (game: string) => {
    return game.split(";").map((subGame: string) => subGame.trimStart());
  };

  findCubesInSubGame = (subGames: string[], index: number) => {
    let redCubes = 0;
    let greenCubes = 0;
    let blueCubes = 0;
    const isCubePossible: Array<boolean> = [];

    // all subgames in a game
    subGames.map((subGame: string) => {
      // each subgame
      const cubes = subGame.split(",");

      cubes.map((cubes: string) => {
        const cube = cubes.trimStart();
        if (cube.includes("red")) {
          redCubes = parseInt(cube);
        } else if (cube.includes("blue")) {
          blueCubes = parseInt(cube);
        } else if (cube.includes("green")) {
          greenCubes = parseInt(cube);
        }

        // for each cube draw in a sub game compute the possibility
        if (
          redCubes <= this.redCubes &&
          greenCubes <= this.greenCubes &&
          blueCubes <= this.blueCubes
        ) {
          isCubePossible.push(true);
        } else {
          isCubePossible.push(false);
        }
      });

      // reset the count for the next draw in the sub game
      redCubes = 0;
      blueCubes = 0;
      greenCubes = 0;

      const isSubGamePossible = isCubePossible.every((item) => item === true);
      this.isGamePossible.push(isSubGamePossible);
    });
  };

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}

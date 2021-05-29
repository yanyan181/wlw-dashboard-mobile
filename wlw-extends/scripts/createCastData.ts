import { CastData } from "./util";

export function createCastData(
  document: Document,
  id: string,
  name: string,
  rank: string,
  image: string,
  roll: number
): CastData {
  const playResultsDoc = document.getElementsByClassName(
    "block_playdata_01_text"
  );
  const playEvalsDoc = document.getElementsByClassName(
    "block_playdata_02_text"
  );
  const useRate = playResultsDoc[0].textContent
    ? domParcer(playResultsDoc[0].textContent)
    : 0;
  const winCount = playResultsDoc[1].textContent
    ? domParcer(playResultsDoc[1].textContent)
    : 0;
  const killCount = playResultsDoc[2].textContent
    ? domParcer(playResultsDoc[2].textContent)
    : 0;
  const deathCount = playResultsDoc[3].textContent
    ? domParcer(playResultsDoc[3].textContent)
    : 0;
  const averageEval = playEvalsDoc[0].textContent
    ? domParcer(playEvalsDoc[0].textContent)
    : 0;
  const winEval = playEvalsDoc[1].textContent
    ? domParcer(playEvalsDoc[1].textContent)
    : 0;
  const loseEval = playEvalsDoc[2].textContent
    ? domParcer(playEvalsDoc[2].textContent)
    : 0;
  const averageNice = playEvalsDoc[3].textContent
    ? domParcer(playEvalsDoc[3].textContent)
    : 0;
  const winNice = playEvalsDoc[4].textContent
    ? domParcer(playEvalsDoc[4].textContent)
    : 0;
  const loseNice = playEvalsDoc[5].textContent
    ? domParcer(playEvalsDoc[5].textContent)
    : 0;

  const loseCount: number = ((): number => {
    if (averageEval - loseEval === 0) return 0;
    return Math.round(
      ((winEval - averageEval) * winCount) / (averageEval - loseEval)
    );
  })();

  const winRate: number = ((): number => {
    if (winCount === 0) return 0;
    return Math.round((winCount / (winCount + loseCount)) * 100 * 10) / 10;
  })();

  const killRate: number = ((): number => {
    if (winCount === 0) return 0;
    if (deathCount === 0) return killCount;
    return Math.round((killCount / deathCount) * 100) / 100;
  })();

  const castData: CastData = {
    name: name,
    id: +id,
    rank: +rank,
    image: image,
    useRate: useRate,
    winCount: winCount,
    killCount: killRate,
    deathCount: deathCount,
    averageEval: averageEval,
    winEval: winEval,
    loseEval: loseEval,
    averageNice: averageNice,
    winNice: winNice,
    loseNice: loseNice,
    loseCount: loseCount,
    winRate: winRate,
    killRate: killRate,
    roll: roll,
    timestamp: Date.now(),
  };
  return castData;
}

function domParcer(str: string): number {
  if (str.match("p")) return +str.split("p")[0];
  if (str.match("％")) return +str.split("％")[0];
  if (str.match("勝")) return +str.split("勝")[0];
  return +str;
}

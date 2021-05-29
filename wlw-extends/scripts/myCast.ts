import { mycast, castDetail, CastData } from "./util";
import { createCastData } from "./createCastData";
let isLoading = false;

alert("てすとてすとてすとてすと");
insertLoadButtonDOM(document);

export async function createCastList(doc: Document) {
  const castList: any = await mycast();
  const castDataList: CastData[] = [];
  isLoading = true;
  if (castList.status === "OK") {
    for (const cast of castList.cast) {
      const castDom: Document = await castDetail(cast.id);
      castDataList.push(
        await createCastData(
          castDom,
          cast.id,
          cast.na,
          cast.crc >= 4 ? String(+cast.cr + 100) : String(+cast.cr),
          cast.ci,
          cast.rt
        )
      );
      const sleep = (msec: number) =>
        new Promise((resolve) => setTimeout(resolve, msec));
      await sleep(1000);
    }
  }
  isLoading = false;
  localStorage.castDataList = JSON.stringify(castDataList);
  const dateTime = new Date();
  localStorage.lastGetDate = dateTime.toLocaleDateString();
}

export function insertLoadButtonDOM(doc: Document) {
  const innerDom = document.getElementById("inner");
  if (innerDom?.parentNode) {
    const polyfill = document.createElement("script");
    polyfill.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
    innerDom.parentNode.insertBefore(polyfill, innerDom.nextSibling);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/yanyan181/wlw-dashboard-mobile@main/wlw-extends/dist/dashboardPage.js";
    innerDom.parentNode.insertBefore(script, innerDom.nextSibling);

    const div = document.createElement("div");
    div.id = "load_button";
    innerDom.parentNode.insertBefore(div, innerDom);
    alert("💩💩💩💩");
  }
}

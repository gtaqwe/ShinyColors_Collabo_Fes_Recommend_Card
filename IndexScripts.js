var NOW_SELECT = 0;
var JSON_DATA;

$().ready(function () {
  init();
});

// document.body.addEventListener("onload", init());

async function init() {
  await getJSON("json/data.json").then(function (resp) {
    JSON_DATA = JSON.parse(resp);
  });

  NOW_SELECT = 0;
}

/**
 * JSON 데이터 읽기
 */
function getJSON(jsonFile) {
  try {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open("GET", jsonFile, true);
      request.onload = function () {
        if (request.status == 200) {
          resolve(request.responseText);
        } else {
          reject(Error(request.statusText));
        }
      };

      request.onerror = function () {
        reject(Error("Error fetching data."));
      };
      request.send();
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * 0 : undefined
 * 1 : P
 * 2 : S
 * 3 : ALL
 */
function updateDate(nowSelect) {
  if (nowSelect == 1) {
    ShowPCard();
  } else if (nowSelect == 2) {
    ShowSCard();
  } else if (nowSelect == 3) {
    ShowAllCard();
  }
}

/**
 * P 표시
 */
function ShowPCard() {
  var cardData = mergeCardData("P", true, false);
  buildTable(cardData);
  NOW_SELECT = 1;
}

/**
 * S 표시
 */
function ShowSCard() {
  var cardData = mergeCardData("S", false, true);
  buildTable(cardData);
  NOW_SELECT = 2;
}

/**
 * 모든 카드 표시
 */
function ShowAllCard() {
  var cardData = mergeCardData("All", true, true);
  buildTable(cardData);
  NOW_SELECT = 3;
}

/**
 * 전체 카드의 데이터를 추출, 재가공
 */
function mergeCardData(tableTitle, pCard, sCard) {
  var totalList = [];

  if (pCard) totalList = totalList.concat([...JSON_DATA.P]);
  if (sCard) totalList = totalList.concat([...JSON_DATA.S]);

  var selectedData = {
    Title: tableTitle,
    Data: totalList,
  };

  return selectedData;
}

function getImgSrc(path, addr) {
  return `./img/${path}/${addr}.png`;
}

//////////////////////////////////////////////////

/**
 * 표 생성
 * cardData : IndexScripts.js의 function cardDataProcess참조
 */
function buildTable(cardData) {
  runBuildTable(cardData); // 메인표
}

/**
 * 메인표 작성
 */
function runBuildTable(cardData) {
  var tableTitle = cardData.Title;
  var rowLength = cardData.Data.length;

  var table = '<table id="date-table">';

  table += "<thead>";
  table += `<tr>`;

  table += tableHeader(tableTitle);

  table += "</tr>";
  table += "</thead>";
  table += "<tbody>";

  console.log(rowLength);

  for (var row = 0; row < rowLength; row++) {
    table += setCardData(cardData.Data[row], row == rowLength - 1);
  }

  table += "</tbody>";
  table += "</table>";

  $("#MAIN").html(table);
}

function tableHeader(title) {
  var resContent = `<th class="th-header th-right" id="table-type">${title}</th>`;

  resContent += `<th class="th-header th-right">카드명</th>`;
  resContent += `<th class="th-header">속성</th>`;
  resContent += `<th class="th-header">체인 가능</th>`;
  resContent += `<th class="th-header">특훈</th>`;
  resContent += `<th class="th-header">효과</th>`;
  resContent += `<th class="th-header">지속 턴</th>`;

  return resContent;
}

function setCardData(totalData, isLastRow) {
  var resContent = "";

  var imgPath = "card_normal";

  for (var idx = 0; idx < totalData.Card_Skill.length; idx++) {
    resContent += `<tr>`;

    let bottomLineClass = "";
    if (isLastRow == false) {
      bottomLineClass = `td-bottom`;
    }

    if (idx == 0) {
      resContent += `<td class="td-right ${bottomLineClass}" rowspan="${
        totalData.Card_Skill.length
      }"><img src="${getImgSrc(imgPath, totalData.File_Name)}"></td>`;

      resContent += `<td class=" td-right ${bottomLineClass}" rowspan="${totalData.Card_Skill.length}">${totalData.Card_Name}</td>`;
    }

    bottomLineClass = "";
    if (idx == totalData.Card_Skill.length - 1 && isLastRow == false) {
      bottomLineClass = `td-bottom`;
    }

    let attr = totalData.Card_Skill[idx].Appeal_Attr;
    let attrClass = "";
    if (attr == "Vo") {
      attrClass = "vo-cell";
    } else if (attr == "Da") {
      attrClass = "da-cell";
    } else if (attr == "Vi") {
      attrClass = "vi-cell";
    }

    resContent += `<td class = "${attrClass} ${bottomLineClass}">${totalData.Card_Skill[idx].Appeal_Attr}</td>`;

    let chainStr = "";
    if (totalData.Card_Skill[idx].Chain == "True") {
      chainStr = "○";
    } else if (totalData.Card_Skill[idx].Chain == "False") {
      chainStr = "×";
    }
    resContent += `<td class = "${attrClass} ${bottomLineClass}">${chainStr}</td>`;
    resContent += `<td class = "${attrClass} ${bottomLineClass}">${totalData.Card_Skill[idx].Training}</td>`;
    resContent += `<td class = "${attrClass} ${bottomLineClass}">${totalData.Card_Skill[idx].Skill}</td>`;

    let turn = totalData.Card_Skill[idx].Turn;
    if (turn == "") turn = "-";
    resContent += `<td class = "${attrClass} ${bottomLineClass}">${turn}</td>`;
    resContent += `</tr>`;
  }

  return resContent;
}

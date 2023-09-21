// 숫자를 한글로 바꿔주는 함수
function convertToKoreannum(num:number) {
  const unitWords = ['', '만 ', '억 ', '조 ', '경 '];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount;) {
    let unitResult = (num % (splitUnit ** (i + 1))) / (splitUnit ** i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
    i += 1;
  }

  for (let i = 0; i < resultArray.length;) {
    if (resultArray[i]) {
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    i += 1;
  }

  return resultString;
}

export default convertToKoreannum;

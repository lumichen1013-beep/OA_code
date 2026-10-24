//  -- 說明 --  //
//  請想想看要如何組合和調整程式碼，
//  執行後才能讓網頁上的顯示文字與下方相同。

//  -- 提示 --  //
//  let len = array.length;
//  let swapped;
//  swapped = false;
//  let temp = array[i];
//  array[i] = array[i + 1];
//  array[i + 1] = temp;
//  for (let i = 0; i < len - 1; i++) {}
//  swapped = true;
//  if (array[i] > array[i + 1]) {}
//  do {} while (swapped);

function bubbleSort(array) {
  return array;
}

const friends = [
  { name: "Alice", height: 165 },
  { name: "Bob", height: 178 },
  { name: "Charlie", height: 155 },
  { name: "David", height: 170 },
  { name: "Eve", height: 190 }
];

const heights = friends.map(friend => friend.height);
const sortedHeights = bubbleSort(heights);
console.log("按身高排隊：");

sortedHeights.forEach(height => {
  const friend = friends.find(friend => friend.height === height);
  console.log(`${friend.name} - ${friend.height} cm`);
});

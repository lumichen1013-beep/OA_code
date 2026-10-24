//  -- 說明 --  //
//  請想想看要如何組合和調整程式碼，
//  執行後才能讓網頁上的顯示文字與下方相同。

//  -- 提示 --  //
//  let len = animals.length;
//  let temp = animals[i];
//  animals[i] = animals[i + 1];
//  animals[i + 1] = temp;
//  swapped = true;
//  for (let i = 0; i < len - 1; i++) {}
//  swapped = false;
//  let swapped;
//  if (animals[i].age > animals[i + 1].age) {}
//  do {} while (swapped);

function bubbleSortAnimals(animals) {
  return animals;
}

const animals = [
  { name: "狗", age: 5 },
  { name: "猫", age: 3 },
  { name: "兔子", age: 2 },
  { name: "狮子", age: 7 },
  { name: "老虎", age: 4 }
];

console.log("排序前:");

for (let i = 0; i < animals.length; i++) {
    let { name, age } = animals[i]
    console.log(age + " 歲的" + name);
}

const sortedAnimals = bubbleSortAnimals(animals);

console.log("排序後:");

for (let i = 0; i < sortedAnimals.length; i++) {
    let { name, age } = sortedAnimals[i]
    console.log(age + " 歲的" + name);
}


var data = [
    { name: '雙效防蛀護齒牙膏', price: 299, like: 4 },
    { name: '旅充式行動電源', price: 1980, like: 300 },
    { name: '幫寶適一級幫紙尿褲', price: 1239, like: 798 },
    { name: '任天堂Switch豪華防摔旅行收納包', price: 650, like: 201 },
    { name: '抗敏系列空氣清淨機', price: 24900, like: 9 },
    { name: '麥香奶茶300ml (24入)', price: 240, like: 22 },
    { name: '德國護色去汙超濃縮洗衣精', price: 199, like: 79 },
    { name: '純萃柔感抽取式衛生紙', price: 869, like: 53 },
    { name: 'LOTTE 小熊餅乾-巧克力', price: 149, like: 102 },
    { name: 'Apple iPhone 11 (64G)', price: 24900, like: 2 },
];

// 價格由低到高
function order_by_price_asc () {
    data.sort(function (a, b) {
        return a.price - b.price;});
}

// 價格由高到低
function order_by_price_desc () {
    data.sort(function (a, b) {
        return b.price - a.price;});
}

// 評價由低到高
function order_by_like_asc () {
    data.sort(function (a, b) {
        return a.like - b.like;});
}

// 評價由高到低
function order_by_like_desc () {
    data.sort(function (a, b) {
        return b.like - a.like;});
}

//  -- 說明 --  //
//  請想想看要如何組合和調整程式碼，
//  執行後才能讓網頁上的顯示文字與下方相同。

//  -- 提示 --  //
//  visited.add(start);
//  const neighbors = graph[start];
//  for (const neighbor of neighbors) {}
//  if (!visited.has(neighbor)) {}
//  depthFirstSearch(graph, neighbor, visited);

function depthFirstSearch(graph, start, visited = new Set()) {
  console.log(start);
}

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

depthFirstSearch(graph, "A");

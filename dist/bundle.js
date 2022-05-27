/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;\r\n\r\nconst cellsHorizontal = 6;\r\nconst cellsVertical = 4;\r\nconst width = window.innerWidth;\r\nconst height = window.innerHeight;\r\n\r\nconst unitLengthX = width / cellsHorizontal;\r\nconst unitLengthY = height / cellsVertical;\r\n\r\nconst engine = Engine.create();\r\nengine.world.gravity.y = 0;\r\nconst { world } = engine;\r\nconst render = Render.create({\r\n  element: document.body,\r\n  engine: engine,\r\n  options: {\r\n    wireframes: false,\r\n    width,\r\n    height,\r\n  },\r\n});\r\n\r\nRender.run(render);\r\nRunner.run(Runner.create(), engine);\r\n\r\n// Walls\r\nconst bounds = [\r\n  // up\r\n  Bodies.rectangle(width / 2, 0, width, 2, {\r\n    isStatic: true,\r\n  }),\r\n  // down\r\n  Bodies.rectangle(width / 2, height, width, 2, {\r\n    isStatic: true,\r\n  }),\r\n  // left\r\n  Bodies.rectangle(0, height / 2, 2, height, {\r\n    isStatic: true,\r\n  }),\r\n  // right\r\n  Bodies.rectangle(width, height / 2, 2, height, {\r\n    isStatic: true,\r\n  }),\r\n];\r\n\r\nWorld.add(world, bounds);\r\n\r\n// maze generation\r\n\r\nshuffle = (arr) => {\r\n  let counter = arr.length;\r\n\r\n  while (counter > 0) {\r\n    const index = Math.floor(Math.random() * counter);\r\n\r\n    counter--;\r\n\r\n    const temp = arr[counter];\r\n    arr[counter] = arr[index];\r\n    arr[index] = temp;\r\n  }\r\n  return arr;\r\n};\r\n\r\nconst grid = Array(cellsVertical)\r\n  .fill(null)\r\n  .map(() => Array(cellsHorizontal).fill(false));\r\n\r\nconst verticals = Array(cellsVertical)\r\n  .fill(null)\r\n  .map(() => Array(cellsHorizontal - 1).fill(false));\r\n\r\nconst horizontals = Array(cellsVertical - 1)\r\n  .fill(null)\r\n  .map(() => Array(cellsHorizontal).fill(false));\r\n\r\nconst startRow = Math.floor(Math.random() * cellsVertical);\r\nconst startColumn = Math.floor(Math.random() * cellsHorizontal);\r\n\r\nstepThroughCell = (row, column) => {\r\n  // if visited the cell at [row, column], then returh\r\n  if (grid[row][column]) {\r\n    return;\r\n  }\r\n\r\n  // mark this cell as been visited\r\n  grid[row][column] = true;\r\n\r\n  // assemble randomly-ordered list of neighbours\r\n  const neighbours = shuffle([\r\n    [row - 1, column, 'up'],\r\n    [row, column + 1, 'right'],\r\n    [row + 1, column, 'down'],\r\n    [row, column - 1, 'left'],\r\n  ]);\r\n\r\n  // for each neighbour\r\n  for (let neighbour of neighbours) {\r\n    const [nextRow, nextColumn, direction] = neighbour;\r\n\r\n    // see if that neighbour is out of bounds\r\n    if (\r\n      nextRow < 0 ||\r\n      nextRow >= cellsVertical ||\r\n      nextColumn < 0 ||\r\n      nextColumn >= cellsHorizontal\r\n    ) {\r\n      continue;\r\n    }\r\n\r\n    // if visited the neigbour, continue to next neighbour\r\n    if (grid[nextRow][nextColumn]) {\r\n      continue;\r\n    }\r\n\r\n    switch (direction) {\r\n      case 'left':\r\n        verticals[row][column - 1] = true;\r\n        break;\r\n      case 'right':\r\n        verticals[row][column] = true;\r\n        break;\r\n      case 'up':\r\n        horizontals[row - 1][column] = true;\r\n        break;\r\n      case 'down':\r\n        horizontals[row][column] = true;\r\n        break;\r\n    }\r\n\r\n    stepThroughCell(nextRow, nextColumn);\r\n  }\r\n  // visit next cell\r\n};\r\n\r\nstepThroughCell(startRow, startColumn);\r\n\r\nhorizontals.forEach((row, rowIndex) => {\r\n  row.forEach((open, columnIndex) => {\r\n    if (open) {\r\n      return;\r\n    }\r\n    const wall = Bodies.rectangle(\r\n      columnIndex * unitLengthX + unitLengthX / 2,\r\n      rowIndex * unitLengthY + unitLengthY,\r\n      unitLengthX,\r\n      5,\r\n      {\r\n        label: 'wall',\r\n        isStatic: true,\r\n        render: {\r\n          fillStyle: 'red',\r\n        },\r\n      }\r\n    );\r\n    World.add(world, wall);\r\n  });\r\n});\r\n\r\nverticals.forEach((row, rowIndex) => {\r\n  row.forEach((open, columnIndex) => {\r\n    if (open) {\r\n      return;\r\n    }\r\n\r\n    const wall = Bodies.rectangle(\r\n      columnIndex * unitLengthX + unitLengthX,\r\n      rowIndex * unitLengthY + unitLengthY / 2,\r\n      5,\r\n      unitLengthY,\r\n      {\r\n        label: 'wall',\r\n        isStatic: true,\r\n        render: {\r\n          fillStyle: 'red',\r\n        },\r\n      }\r\n    );\r\n    World.add(world, wall);\r\n  });\r\n});\r\n\r\n// goal\r\n\r\nconst goal = Bodies.rectangle(\r\n  width - unitLengthX / 2,\r\n  height - unitLengthY / 2,\r\n  unitLengthX * 0.6,\r\n  unitLengthY * 0.6,\r\n  {\r\n    label: 'goal',\r\n    isStatic: true,\r\n    render: {\r\n      fillStyle: '#42f545',\r\n    },\r\n  }\r\n);\r\nWorld.add(world, goal);\r\n\r\n// ball\r\nconst ballRadius = Math.min(unitLengthX, unitLengthY) / 4;\r\nconst ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {\r\n  label: 'ball',\r\n  render: {\r\n    fillStyle: 'purple',\r\n  },\r\n});\r\nWorld.add(world, ball);\r\n\r\n// ball movement\r\n\r\ndocument.addEventListener('keydown', (e) => {\r\n  const { x, y } = ball.velocity;\r\n\r\n  switch (e.keyCode) {\r\n    case 87:\r\n      Body.setVelocity(ball, { x, y: y - 5 });\r\n      break;\r\n    case 68:\r\n      Body.setVelocity(ball, { x: x + 5, y });\r\n      break;\r\n    case 83:\r\n      Body.setVelocity(ball, { x, y: y + 5 });\r\n      break;\r\n    case 65:\r\n      Body.setVelocity(ball, { x: x - 5, y });\r\n      break;\r\n  }\r\n});\r\n\r\n// win condition\r\n\r\nEvents.on(engine, 'collisionStart', (e) => {\r\n  e.pairs.forEach((collision) => {\r\n    const labels = ['ball', 'goal'];\r\n    if (\r\n      labels.includes(collision.bodyA.label) &&\r\n      labels.includes(collision.bodyB.label)\r\n    ) {\r\n      document.querySelector('.winner').classList.remove('hidden');\r\n      world.gravity.y = 1;\r\n      world.bodies.forEach((body) => {\r\n        if (body.label === 'wall') {\r\n          Body.setStatic(body, false);\r\n        }\r\n      });\r\n    }\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://the-js-maze/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;
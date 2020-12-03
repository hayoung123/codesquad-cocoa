export class TetrisShape {
  constructor() {
    // prettier-ignore
    this.shape = [
        {
          id: 1,
          name: "I",
          width: 4,
          height: 1,
          color: "red",
          location: [
            [[0, 0],[1, 0],[2, 0],[3, 0]],
            [[0, 0],[0, 1],[0, 2],[0, 3]],
          ],
        },
        {
          id: 2,
          name: "O",
          width: 2,
          height: 2,
          color: 'orange',
          location: [
            [[0, 0], [1, 0], [0, 1], [1, 1]],
          ],
        },
        {
          id: 3,
          name: "T",
          width: 3,
          height: 2,
          color: 'yellow',
          location: [
            [[1, 0],[0, 1],[1, 1],[2, 1]],
            [[1, 0],[1, 1],[1, 2],[2, 1]],
            [[0, 1],[1, 1],[1, 2],[2, 1]],
            [[1, 0],[0, 1],[1, 1],[1, 2]],
          ],
        },
        {
          id: 4,
          name: "L",
          width: 2,
          height: 3,
          color: 'green',
          location: [
            [[0, 0],[0, 1],[0, 2],[1, 2]],
            [[0, 0],[0, 1],[1, 0],[2, 0]],
            [[0, 0],[1, 0],[1, 1],[1, 2]],
            [[0, 1],[1, 1],[2, 1],[2, 0]],
          ],
        },
        {
          id: 5,
          name: "J",
          width: 2,
          height: 3,
          color: 'blue',
          location: [
            [[1, 0],[1, 1],[1, 2],[0, 2]],
            [[0, 0],[0, 1],[1, 1],[2, 1]],
            [[1, 0],[1, 1],[1, 2],[2, 0]],
            [[0, 1],[1, 1],[2, 1],[2, 2]],
          ],
        },
        {
          id: 6,
          name: "S",
          width: 3,
          height: 2,
          color: 'navy',
          location: [
            [[1, 0],[2, 0],[0, 1],[1, 1]],
            [[0, 0],[0, 1],[1, 1],[1, 2]],
          ],
        },
        {
          id: 7,
          name: "Z",
          width: 3,
          height: 2,
          color: 'purple',
          location: [
            [[0, 0],[1, 0],[1, 1],[2, 1]],
            [[1, 0],[0, 1],[1, 1],[0, 2]],
          ],
        },
      ];
  }
  getShapeList() {
    return this.shape;
  }
  //시작 ID가 1이기 때문에 1번 index부터 시작하게 만들기
  getColor() {
    const colors = this.shape.map((v) => v.color);
    const colorList = ["", ...colors];
    return colorList;
  }
}

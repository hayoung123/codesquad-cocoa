# 테트리스

캔버스를 이용해 테트리스 게임을 구현했다.

## 게임화면

![tetris](https://user-images.githubusercontent.com/67357426/101119646-22caa200-362f-11eb-93f4-013580c856f6.PNG)
![tetris-end](https://user-images.githubusercontent.com/67357426/101119652-24946580-362f-11eb-9b95-a772b6e1b4d8.PNG)

## 클래스 설명

- TetrisModel : 가상의 테트리스 판(배열), 점수, 레벨(난이도)의 데이터를 관리
- TetrisShapeModel : block모양 data와 reboard()에 사용될 colorList 관리
- ScoreLevelView : 점수 , 레벨 관리
- TetrisView : tetris 게임 canvas, 다음 모형 canvas 관리

## 게임 흐름

한칸이 30*30인 칸에서 300*600의 크기에 canvas에 테트리스 게임을 한다. 캔버스로 10\*20의 격자판을 그려 놓는다.

- play button 클릭 - 모든 데이터들이 초기화되고 게임이 시작된다.
- reset button 클릭 - 게임이 초기화 된다.

---

- `setNextShape()` next shape shape를 생성해 저장.
  - 현재 shape는 next shape로 저장하고, next shape는 랜덤으로 미리 설정해 놓는다.
- `autoMove()` setTimeout을 이용해 일정 시간마다 아래로 한칸 이동하게 한다.
- space bar을 이용해 block을 drop해준다.

  - canvas의 애니메이션함수인 requestAnimationFrame을 이용해 아래로 이동시킨다.

- `move()` 화살표를 이용해 이동, 모양바꾸기를 한다.

  - `checkBlock()` 충돌방지 : 움직이는 위치를 미리 충돌하는지 check한다.
    캔버스의 높이와 테트리스 모델(쌓인블럭 데이터)을 이용해서 충돌을 체크
  - `move()` 이동 : 충돌방지를 한 뒤 가능한 것만 이동시킨다.
  - `change()` 모양 바꾸기 : 충돌방지를 한뒤 가능한 위치로 변경시켜서 모양을 변경시킨다. (좌우만 체크)

- 모양이 바닥에 떨어질 시 :

  1. `fixBlock()` 떨어진 좌표값으로 그 block의 id를 테트리스 모델에 입력한다.
  2. `deleteLine()` 한 줄이 채워졌을 경우 그 줄을 모델에서 splice로 지워주고 한줄을 추가해준다.
  3. `play()` 새로운 블럭 play.

- `checkGameOver()` 새로운 block이 render되고 gameover됐는지 체크한다.
  - 테트리스 모델의 1번줄에 0이 아닌것이 있으면 게임이 끝난다.
  - 1번줄이 맨 위 칸이다. 시작과 동시에 autoMove 때문에 한칸 아래로 내려오기
    때문에 보이지 않는 위에 칸을 만들어 놨다.
  - 이 이유 때문에 START_POINT의 top도 -30이다.

위의 과정을 반복한다.

---

### `class ScoreLevelView`

- 레벨 : 레벨에 따라서 `autoMove`의 시간 간격이 줄어들게해 빨리 떨어진다.
- 점수 : 한 줄이 지워 질 때 마다 100 씩 모델에 더해주고 tetrisModel에서 score 데이터를 업데이트 시키고 데이터를 받아와 render한다.

### `class TetrisShapeModel`

- block 모형 : 4개의 cell로 이루어진 7가지의 모형을 시계방향을 돌 때 (left,top) 값을
  배열에 저장해 놓았다.
- color-list : 테트리스 모델에 고정된 블럭이 저장될 때 각자의 id값으로 저장하기 때문에
  그에 맞는 색깔을 render하기위해 block모형 데이터의 아이디와 같은 index로
  color-list를 구성했다.

### `class TetrisView`

next shape도 테트리스 게임의 일부라고 생각 해서 TetrisView에 구현했다.

- next shape view : block모형 데이터에(`TetrisShapeModel`) default 모양의 width, height를 작성해 놓고 이용했다.
  - next canvas의 넓이와 next shape의 가로, 세로 길이를 비교해 `start-left`,`top`을 설정해 중앙에 위치하게 해주었다.

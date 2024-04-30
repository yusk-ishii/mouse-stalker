import { gsap } from 'gsap';

const cursor = '#cursor';
const cursorCircle = '.cursor-circle';

gsap.defaults({
  duration: 0.4,
  ease: 'power3',
});

// マウスカーソルの中央になるように指定
gsap.set(cursor, { xPercent: -50, yPercent: -50 });
// 初期位置を画面外にする
const mouse = { x: -100, y: -100 };
const pos = { x: 0, y: 0 };

const xPositionTo = gsap.quickTo(cursor, 'x');
const yPositionTo = gsap.quickTo(cursor, 'y');
const angleTo = gsap.quickSetter(cursorCircle, 'rotate', 'deg');
const xScaleTo = gsap.quickSetter(cursorCircle, 'scaleX');
const yScaleTo = gsap.quickSetter(cursorCircle, 'scaleY');

// マウスカーソル座標を取得する
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function render() {
  const dx = Math.round(mouse.x - pos.x);
  const dy = Math.round(mouse.y - pos.y);
  pos.x += 0.2 * dx;
  pos.y += 0.2 * dy;

  // 進行方向の角度計算
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  // 移動距離の角度計算
  const distanse = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  // 移動距離を用いたスケーリングを計算
  const scale = Math.min(distanse / 400, 0.3);

  // cursorの更新
  xPositionTo(mouse.x);
  yPositionTo(mouse.y);

  // cursorCircleの更新
  angleTo(angle);
  xScaleTo(1 + scale);
  yScaleTo(1 - scale);
}

gsap.ticker.add(function () {
  render();
});

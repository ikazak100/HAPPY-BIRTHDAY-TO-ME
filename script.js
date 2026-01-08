(function () {
  const stickerBtn = document.getElementById('stickerBtn'); // 贴贴按钮
  const cursorDot = document.getElementById('cursorDot');   // 跟随光标的红点
  const stickerLayer = document.getElementById('stickerLayer'); // 贴纸图层

  let placing = false; // 是否处于“贴纸模式”

  // 从 localStorage 读取历史贴纸位置
  let stickers = JSON.parse(localStorage.getItem('stickers')) || [];

  // 页面加载时，把历史贴纸贴出来
  stickers.forEach(s => createSticker(s.x, s.y));
  

  // 点击按钮 → 开/关 贴纸模式
  stickerBtn.addEventListener('click', function (e) {
    e.stopPropagation();  // 防止点击按钮时也触发“页面点击”事件

    placing = !placing;

    if (placing) {
      cursorDot.style.display = 'block';  // 显示红点
    } else {
      cursorDot.style.display = 'none';   // 隐藏红点
    }
  });

  // 鼠标移动 → 红点跟随
  document.addEventListener('mousemove', function (e) {
    if (!placing) return;

    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  // 点击页面任意位置 → 贴上红点
  document.addEventListener('click', function (e) {
    if (!placing) return;

    // 如果点击的是按钮，就不贴
    if (e.target === stickerBtn) return;

    const x = e.pageX;  // ✅ 相对页面的 X
    const y = e.pageY;  // ✅ 相对页面的 Y

    createSticker(x, y);  // 创建贴纸

    // 将新贴纸的坐标添加到本地存储
    stickers.push({ x, y });
    localStorage.setItem('stickers', JSON.stringify(stickers));  // 保存数据

    placing = false;  // 退出贴纸模式
    cursorDot.style.display = 'none';  // 隐藏光标红点
  });

  // 创建贴纸（一个小红点）
  function createSticker(x, y) {
    const dot = document.createElement('div');
    dot.className = 'mini-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.transform = 'translate(-50%, -50%)';  // 中心对齐

    stickerLayer.appendChild(dot);
  }
   // =======================
  //  独立橡皮擦模式（不影响贴贴逻辑）
  // =======================
  const eraserBtn = document.getElementById('eraserBtn');
  let erasing = false;

  eraserBtn.addEventListener('click', function (e) {
    console.log("橡皮擦按钮被点击");
    e.stopPropagation();
    erasing = !erasing;
    eraserBtn.classList.toggle('on', erasing);

    // 开启橡皮擦时，顺便关掉贴贴模式
    if (erasing) {
      placing = false;
      cursorDot.style.display = 'none';
    }
  });

  // 在“橡皮擦模式”下点击某个贴纸 → 删除它
  document.addEventListener('click', function (e) {
    if (!erasing) return;

    // 只处理贴纸元素
    const dot = e.target.closest('.mini-dot');
    if (!dot) return;

    const left = parseFloat(dot.style.left);
    const top  = parseFloat(dot.style.top);

    // 1) 从页面上删掉这颗贴纸
    dot.remove();

    // 2) 从 stickers 数组里删除对应那一条
    stickers = stickers.filter(s => !(s.x === left && s.y === top));
    localStorage.setItem('stickers', JSON.stringify(stickers));

    console.log('已删除一个贴纸，剩余数量：', stickers.length);
  });

  const riddleImg = document.getElementById('riddleImg');
const riddleText = document.getElementById('riddleText');

if (riddleImg && riddleText) {
  riddleImg.addEventListener('click', function (e) {
    e.stopPropagation();

    // 隐藏图片
    riddleImg.style.display = 'none';

    // 显示文字
    riddleText.style.display = 'block';
    
  });
  // 点击文字 → 隐藏文字，恢复图片
  riddleText.addEventListener('click', function (e) {
    e.stopPropagation();
    riddleText.style.display = 'none';
    riddleImg.style.display = 'block';
  });
}
})();

const bgm = document.getElementById('bgm');  // 获取音频元素
const musicBtn = document.getElementById('musicBtn');  // 获取按钮
const musicImg = musicBtn.querySelector('img');  // 获取按钮内的图片元素

let isPlaying = false;  // 控制音乐状态

// 播放/暂停音乐按钮点击事件
musicBtn.addEventListener('click', function () {
  if (!isPlaying) {
    // 播放音乐
    bgm.play();
    isPlaying = true;
    musicImg.src = 'assets/Music.gif';  // 切换为播放状态的GIF
  } else {
    // 暂停音乐
    bgm.pause();
    isPlaying = false;
    musicImg.src = '/assets/music.png';  // 切换为暂停状态的PNG
  }
});



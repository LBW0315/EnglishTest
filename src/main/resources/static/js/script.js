// 変数の初期化
let untyped = "";
let typed = "";
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById("untyped");
const typedfield = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");

// 複数のテキストを格納する配列
const textLists = ["Hello World", "This is my App", "How are you?"];

//JPAインターフェースを継承してMySQLから取得したデータを渡したい！（オリジナルアプリ）
//const wordPage = /*[[${wordPage}]]*/"wordPage";
/*console.log(wordPage);
wordPage.content.map((page) => {
	console.log(page.word);
})
*/


const createText = () => {
  // 正タイプした文字列をクリア
  //スコアのインクリメント
  score++;
  typed = "";
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = (e) => {
  // 誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add("mistyped");
    setTimeout(() => {
      wrap.classList.remove("mistyped");
    }, 100);
    return;
  }
  //正タイプの場合
  wrap.classList.remove("mistyped");
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  //入力確認
  console.log(e.key);
  console.log(typed);
  console.log(untyped);

  // テキストがなくなったら新しいテキストを表示
  if (untyped === "") {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = (score) => {
  // テストの結果を返す
  return `${score}文字打てました\n【OK】ボタンでもう一度チャレンジ`;
};

// ゲームを終了
const gameOver = (id) => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  //OKボタンをクリックされたらリロードする
  window.location.reload();
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    //カウントダウンをする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if (time <= 0) {
      clearInterval(id);
      gameOver(id);
    }
  }, 1000);
};

//スタートボタンを押してゲームをスタートした後の処理
start.addEventListener("click", () => {
  //ランダムなテキストを表示する
  createText();

  //カウントダウンタイマーを開始する
  timer();

  //スタートボタンを非表示にする
  start.style.display = "none";

  //キーボードのイベント処理(キーボード押したらkeyPressメソッドを開始しますよ)
  document.addEventListener("keypress", keyPress);
});

//スタートボタンを押していない時のテキスト
untypedfield.textContent = "スタートボタンで開始";

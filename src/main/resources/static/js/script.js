// 変数の初期化
let question = ""; //問題（日本語）
let answer = ""; //答え（英単語）
let typed = ""; //答案（入力したもの）
let questioncount = 0; //問題数
let score = 0; //正当数

// 必要なHTML要素の取得
//questionと
//typedのそれぞれの役割を分析
const questionfield = document.getElementById("question");
const typedfield = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");

// 複数のテキストを格納する配列
//const wordPage = ["Hello World", "This is my App", "How are you?"];








const createText = () => {
	// 正タイプした文字列をクリア
	//スコアのインクリメント
	score++;
	typed = "";
	typedfield.textContent = typed;

	// 配列のインデックス数からランダムな数値を生成する
	let random = Math.floor(Math.random() * wordPage.length);

//questionに意味（日本語）を代入している
	question = wordPage[random].mean;
	questionfield.textContent = question;
};

// キー入力の判定
const keyPress = (e) => {
	// 誤タイプの場合
	if (e.key !== question.substring(0, 1)) {
		wrap.classList.add("mistyped");
		setTimeout(() => {
			wrap.classList.remove("mistyped");
		}, 200);
		return;
	}
	//正タイプの場合
	wrap.classList.remove("mistyped");
	typed += question.substring(0, 1);
	question = question.substring(1);
	typedfield.textContent = typed;
	questionfield.textContent = question;

	//入力確認
	console.log(e.key);
	console.log(typed);
	console.log(question);

	// テキストがなくなったら新しいテキストを表示
	if (question === "") {
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
questionfield.textContent = "スタートボタンで開始";

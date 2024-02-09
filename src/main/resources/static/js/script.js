// 変数の初期化
let question = ""; //問題（日本語）
let answer = ""; //答え（英単語）
let typed = ""; //答案（入力したもの）
let questioncount = -1; //問題数
let clear = 0; //正当数

// 必要なHTML要素の取得
//questionと
//typedのそれぞれの役割を分析
const questionfield = document.getElementById("question");
const typedfield = document.getElementById("typed");

const wrap = document.getElementById("wrap");
const select = document.getElementById("select");
const start = document.getElementById("start");
const countselect = document.getElementById("countselect");
const count = document.getElementById("count");
const challenge = document.getElementById("challenge");
const pass = document.getElementById("pass");
const range = document.getElementById("range");
const cheat = document.getElementById("cheat");
//const cleartime = document.getElementById("clear");
//const misstime = document.getElementById("miss");

//
const schoolyear1 = ["unit1", "unit2"];

// 複数のテキストを格納する配列
//const wordPage = ["Hello World", "This is my App", "How are you?"];



const createText = () => {

	//問題数のインクリメント
	questioncount++;

	//解答をリセット
	typed = "";
	typedfield.textContent = typed;

	// 配列のインデックス数からランダムな数値を生成する
	let random = Math.floor(Math.random() * wordPage.length);

	//questionに意味（日本語）を代入している
	question = wordPage[random].mean;
	console.log(question);
	questionfield.textContent = question;
	//answerに答え（英単語）を代入している
	answer = wordPage[random].word;
	console.log(answer);
};

const getUnit = () => {

	const schoolyear = document.getElementById("schoolyear");
	const param = { schoolyear: schoolyear.value };
	const queryParam = new URLSearchParams(param);
	fetch(`/getunit?${queryParam}`)
		.then((response) => response.text())
		.then((data) => {
			console.log(data);
			document.getElementById("unitselect").innerHTML = data;
		})

	/*
	console.log("yes");
	document.getElementById("unitselect").innerHTML= "<option>aaa</option>";
	const select = document.getElementById("schoolyear");
	 fetch("/getunit")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		}
	*/
}


const challengeOneMore = () => {
	//解答をリセット
	typed = "";
	typedfield.textContent = typed;
}

// キー入力の判定
const keyDown = (e) => {
	const key = e.key;
	if (e.key === 'Enter') {
		//何もしない
	} else if (e.key === 'Backspace') {
		//文字を1つ消す
		typed = typed.slice(0, -1);
		typedfield.textContent = typed;
	} else if (e.key === 'Escape') {
		//何もしない
	} else if (e.key === 'Control') {

	} else if (e.key === 'Shift') {

	} else if (e.key === 'Alt') {

	} else if (e.key === 'Eisu') {

	} else if (e.key === 'F1') {

	} else if (e.key === 'Tab') {

	} else if (e.key === 'ArrowDown') {

	} else if (e.key === 'ArrowUp') {

	} else if (e.key === 'ArrowRight') {

	} else if (e.key === 'ArrowLeft') {

	} else if (e.key === 'Delete') {

	} else if (e.key === 'End') {

	} else if (e.key === 'Home') {

	} else if (e.key === 'PageUp') {

	} else if (e.key === 'PageDown') {

	} else if (e.key === 'Clear') {

	} else {

		typed += key;
		typedfield.textContent = typed;
	}





	console.log(e.key);
	console.log(key);
};

// カンニングボタンに機能（入力しているものを空にして答えを挿入する）
const kanning = () => {
	typedfield.textContent = "";
	typedfield.textContent = answer;
	setTimeout(() => {
		typedfield.textContent = "";
	}, 1500);
}



//答え合わせ（答え合わせボタンを押したら）(Enterkeyを押したら)
const scoring = () => {
	//間違っていた場合
	if (typed !== answer) {
		//赤くなって0.2秒で消える
		wrap.style.backgroundImage = 'url("../storage/B76F27D8-3939-4AF7-B1F0-DA7769689696_4_5005_c.jpeg"),url("../storage/blackbord2.png")';
		wrap.style.backgroundSize = 'contain';

		wrap.style.backgroundRepeat = 'no-repeat';
		setTimeout(() => {
			wrap.style.backgroundImage = 'url("../storage/blackbord2.png")';
		}, 1500);
		//解答欄をリセットする
		challengeOneMore();

		return;
	}
	//正しい場合
	//新しい問題を作る
	wrap.style.backgroundImage = 'url("../storage/E141E295-8DF3-4529-84AF-BF0E04D1CE6B.png"),url("../storage/blackbord2.png")';
	wrap.style.backgroundSize = 'contain';

	wrap.style.backgroundRepeat = 'no-repeat';
	setTimeout(() => {
		wrap.style.backgroundImage = 'url("../storage/blackbord2.png")';
	}, 1500);
	createText();
	//正解数を足す
	clear++;
}

// タイピングスキルのランクを判定
const rankCheck = (clear) => {
	// テストの結果を返す
	return `${questioncount}問中${clear}問解けましたね！\n【OK】ボタンでもう一度チャレンジ`;
};

// ゲームを終了
const gameOver = (id) => {
	clearInterval(id);

	const result = confirm(rankCheck(clear));

	//OKボタンをクリックされたらリロードする
	window.location.reload();
};

// カウントダウンタイマーを作成
const createCount = () => {
	const selectedValue = countselect.value;
	count.textContent = selectedValue;
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

	//選択したカウントダウンの秒数を代入する
	createCount();

	//カウントダウンタイマーを開始する
	timer();

	//余分なものを消します
	//スタートボタンを非表示にする
	//選択範囲
	//題名
	start.classList.add('hidden');
	title.classList.add('hidden');
	countselect.classList.add('hidden');
	range.classList.add('hidden');



	//パスボタン、カンニングボタン、解答ボタンを表示する(リタイアボタンもいずれ・・・)
	challenge.style.display = "flex";
	cheat.style.display = "flex";
	pass.style.display = "flex";

	document.addEventListener("keydown", keyDown);

	//クリックのイベント処理(解答ボタンを押したらscoringメソッドを開始する)
	challenge.addEventListener("click", scoring);

	//クリックのイベント処理（パスボタンを押したら）
	pass.addEventListener("click", createText);

	//クリックのイベント処理（カンニングボタンを押したら）
	cheat.addEventListener("click", kanning);

	//条件付きのキーボードイベントのリスナー追加
	document.addEventListener('keydown', function(e) {
		//Enterキーを押すとscoringメソッドを開始する
		if (e.key === 'Enter') {
			scoring();
		}

		if (e.key === 'Escape') {
			createText();
		}

		if (e.key === ' ') {
			kanning();

		}

	});
});




//スタートボタンを押していない時のテキスト
questionfield.innerHTML = "①学年と範囲を選びます！<br>②選択完了を押します！<br>③頑張る時間を選びます！";

# CafeOrderingSystem
## 概要
* ファイル構成
	* server: pythonのwebブラウザ間をつなげる。Hubの役割。
	* webapp: html,css,jsを用いたWebページ。index.htmlを開けば良い。
* その他の注意事項
	* pythonは、localhost:7777をWebSocketで開いている。

## インストールの仕方
インストールの方法なので一回行えば良い
* serverのインストール
```
$ cd CafeOrderingSystem/server
$ python setup.py install
```

* webappのインストール
	* 特にない

## 使い方
* server
```
$ cd CafeOrderingSystem/server
$ python src/__main__.py
Listening on port 7777 for clients..
```
これで7777番ポートを開いてブラウザがWebソケットで接続してくるのを待つ。

```
何かしらの方法で CafeOrderingSystem/webapp/index.html を開く
(ex. index.htmlをChromeにドラッグアンドドロップする)
```
Webブラウザからの接続がくると

```
hello clinet
add client(id=0)
```

と表示される。
試しにWebブラウザの`注文!`ボタンを押してみると、
注文が追加される。(はず)
されなければ、何回かWebブラウザのページをリロードしてみる。

## 現在までの実装
* 注文ボタンを押すと
	* テンプレートが送信される
	* 内容が同じ
	* 現在は人数や個数を変更させることはできない

* 状態ボタンが機能する
	* 機能している用に見えるが、サーバに変化を通知していない
	* ボタン押して変わるのを見るのを楽しむだけ

* Clear, Fix, Deleteは未実装

## pythonサーバの振る舞い
* server/__main__.py
	* handle_message(message, send)
		* ここでサーバの振る舞いを記述できるはず。
		* messageはブラウザから何かしらの通知がある場合にJSON(Pythonではdic型に変換している)で受け取る。
		send(dict型のオブジェクト)と指定することで(pythonサーバに接続されているすべての)Webブラウザに(同時に)通知を送ることができる。

## Future Works
* 各機能を最低限機能できるようにする。
* 状態を集計し、表にして出力する機能を追加する。
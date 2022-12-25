# 辞典の作り方

## puzz.link

[パズルの種類のリスト](https://puzz.link/list.html)からURLとパズル名を取り出す。
ただし、パズル名を動的に埋め込んでいるようで、スクレイピングが難しい。

上のリンクにアクセスしてページを保存する。
英語名・日本語名を両方とも取りたいので、設定を変えてそれぞれでhtmlファイルを保存する。
保存したhtmlファイルを`make.py`に入力すると、JSON形式の辞典が出てくる。

```
python data/make.py --pzprv3 pzprv3.html --puzzlink-ja puzzlink.html --puzzlink-en puzzlink-en.html | jq . > data/dict.json
```

## ぱずぷれv3

[トップページ](http://pzv.jp/)からURLとパズル名を取り出す。
種類がかぶっているのでpuzz.linkと同時に加工する。

## pzprRT

数が少なく、ぱずぷれv3かpuzz.linkにあるパズルだけなので、puzz.linkで辞典を作ってから追加する。

## kudamono-editor

[サイト](https://pedros.works/paper-puzzle.html)を見て手作業でJSONを作る。
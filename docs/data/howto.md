# 辞典の作り方

puzz.link、ぱずぷれv3、Kudamono Editorは多種のエディタが含まれるので、機械的に辞典（JSONファイル）を作る。

下の手順で作成したファイルを`make.py`に入力するとJSONファイルが作成される。

```shell
python data/make.py --pzprv3 pzprv3.html --puzzlink-ja puzzlink.html --puzzlink-en puzzlink-en.html --kudamono kudamono.txt | jq . > data/dict.json
```

それ以外のエディタは、手でJSONファイルに追加する。
エディタは[ペンシルパズル百科の記事](https://scrapbox.io/puzzle-pedia/%E3%83%91%E3%82%BA%E3%83%AB%E4%BD%9C%E6%88%90%E3%83%84%E3%83%BC%E3%83%AB)などから探す。

## puzz.link

[パズルの種類のリスト](https://puzz.link/list.html)からURLとパズル名を取り出す。
ただし、パズル名を動的に埋め込んでいるようで、スクレイピングが難しい。

[パズルの種類のリスト](https://puzz.link/list.html)にアクセスしてページを保存する。
英語名・日本語名を両方とも取りたいので、設定を変えてそれぞれでhtmlファイルを保存する。

## ぱずぷれv3

puzz.linkと同様に、[トップページ](http://pzv.jp/)を保存する（日本語だけで良い）。

## kudamono-editor

[サイト](https://pedros.works/paper-puzzle.html)を見て、手作業で各パズルのURLとパズル名を取る。
URLのパズル名の部分、パズル名（、別名１、別名２、、、）をカンマ区切りでファイルに書く。

```text
ice-dance-pair, アイスダンス・ペア, Ice Dance Pair
```

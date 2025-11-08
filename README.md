# hazime kintone Plugin Template

kintone プラグインの開発用テンプレートプロジェクトです。
メインカスタマイズと設定画面を別々に開発でき、dev/pro/svr 環境ごとのビルド・パッケージングをサポートします。

## 依存パッケージインストール

```bash
npm install
```

## .gitignoreの編集

プラグインIDとパッケージファイルを管理するため、プラグイン開発で使用する場合は、.gitignoreのplugin-package/をコメントアウトして下さい

## manifest.jsonの編集

manifest配下の以下のファイルをプロジェクト用に編集してください。

- manifest-dev.json（開発用プラグインのマニフェストファイル）
- manifest-pro.json（本番用プラグインのマニフェストファイル）
- manifest-svr.json（開発作業用プラグインのマニフェストファイル）

## コーディング

src配下でコーディングします。

- main: メインのカスタマイズ用
- config: 設定画面用
- common: 共通関数など

## 環境ごとのビルド

ビルドコマンドを実行するとdist配下にビルドしたファイルを生成後、plugin-src配下にプラグインをパッケージするために構成をつくります。

- dev 環境（開発用、ソースマップあり）

```bash
npm run build:dev
```

- pro 環境（本番用、ソースマップなし）

```bash
npm run build:pro
```

- svr 環境（開発作業用、ソースマップあり）

```bash
npm run build:svr
```

## 環境ごとのパッケージング

パッケージコマンドを実行すると、plugin-src配下のファイルをもとにプラグインのパッケージファイルを生成します。
plugin-package配下に生成されたzipファイルをkintoneに読み込ませてプラグインを適用させてください。

なお、svrモードでは、ローカルサーバーを起動しておくことで、一度kintoneにプラグインを読み込ませれば、毎回パッケージングをすることなく、変更したコードを適用することができます。

- dev 環境

```bash
npm run pack:dev
```

- pro 環境

```bash
npm run pack:pro
```

- svr 環境

```bash
npm run pack:svr
```

## 使用ライブラリ

- [@kintone/rest-api-client](https://github.com/kintone/js-sdk) (MIT License)
- [DOMPurify](https://github.com/cure53/DOMPurify) (Apache-2.0 OR MPL-2.0)
- [kintone-ui-component](https://github.com/kintone-labs/kintone-ui-component) (MIT License)

## 免責事項

本ソフトウェアを利用したことにより生じたいかなる損害についても、作者は一切の責任を負いません。  
自己責任にてご利用ください。

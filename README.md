# hazime-plugin-template-for-ktn

kintone プラグインの開発用テンプレートプロジェクトです。
メインカスタマイズと設定画面を別々に開発でき、dev/pro/svr 環境ごとのビルド・パッケージングをサポートします。

本プロジェクトはkintoneの非公式ツールです。サイボウズ株式会社とは関係ありません。
「kintone」はサイボウズ株式会社の登録商標です。

## 更新履歴

### v1.2.0 (2025-12-30)

- ウォッチモードを追加
  - `npm run watch` でファイル変更を自動検出してビルド（svrモード専用）

### v1.1.1 (2025-11-23)

- manifestファイルの誤編集を修正

### v1.1.0 (2025-11-23)

- SCSS対応を追加
  - `src/main/styles.scss` と `src/config/styles.scss` でスタイル管理が可能に
  - ViteがSCSSを自動コンパイルし、CSSファイルとして出力
  - 変数、ミックスイン、ネストなどSCSSの機能が利用可能

### v1.0.0 (2025-11-08)

- 初回リリース
- dev/pro/svr環境ごとのビルド・パッケージングをサポート

## 依存パッケージインストール

```bash
npm install
```

## .gitignoreの編集

プラグインIDとパッケージファイルを管理するときは、.gitignoreのplugin-package/をコメントアウトして下さい

## manifest.jsonの編集

manifest配下の以下のファイルをプロジェクト用に編集してください。

- manifest-dev.json（開発用プラグインのマニフェストファイル）
- manifest-pro.json（本番用プラグインのマニフェストファイル）
- manifest-svr.json（開発作業用プラグインのマニフェストファイル）

## コーディング

src配下でコーディングします。

- main: メインのカスタマイズ用（デスクトップとモバイル共通）
- config: 設定画面用
- common: 共通関数など

**デスクトップ・モバイル対応について:**

このテンプレートでは、デスクトップとモバイルのカスタマイズファイル（JS/CSS）は共通のファイルを使用します。
デスクトップとモバイルで処理を切り分ける場合は、kintoneのイベント名を使って適宜分岐してください。

```typescript
// デスクトップ用イベント
kintone.events.on('app.record.detail.show', (event) => {
  // デスクトップのみの処理
});

// モバイル用イベント
kintone.events.on('mobile.app.record.detail.show', (event) => {
  // モバイルのみの処理
});

// デスクトップとモバイル両方に適用する場合
kintone.events.on(['app.record.detail.show', 'mobile.app.record.detail.show'], (event) => {
  // 共通処理
});
```

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

## ウォッチモード（svrモード専用）

**ウォッチモードはsvrモードでのみ使用できます。** devモードやproモードでは使用できません。

ファイルの変更を自動で検出してビルドし、plugin-src/svrに反映します。ローカルサーバーと組み合わせることで、コード変更が即座にkintoneに反映されます。

**注意:**

- ウォッチモードはJS/CSSファイルのみを監視します
- マニフェストファイル、アイコンファイル、config.htmlを変更した場合は、ウォッチモードを一旦終了し、ビルド・パッケージングを実行してください

```bash
npm run watch
```

**初回セットアップ手順:**

1. `npm run build:svr` でビルド
2. `npm run pack:svr` でプラグインをパッケージング
3. kintoneにプラグインをインストール
4. ローカルサーバー（Live Serverなど）を起動
5. `npm run watch` でウォッチモードを起動
6. 以降、TypeScript/SCSSファイルを編集すると自動でビルド・反映されます
7. 終了するには `Ctrl+C` を押してください

**マニフェストファイル、アイコンファイル、config.htmlを変更した場合:**

1. ウォッチモードを終了（`Ctrl+C`）
2. `npm run build:svr` でビルド
3. `npm run pack:svr` でパッケージング
4. kintoneでプラグインを再インストール
5. `npm run watch` でウォッチモード再開

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

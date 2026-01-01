/*
kintone UI Componentを使ったtemplateを用意してあります。適宜コピーして実装してください。

tmplate_simple_config.ts -> シンプルな設定画面のサンプル
template_use_tooltip_config.ts -> Tooltipコンポーネントを利用した設定画面のサンプル
template_use_tabs_config.ts -> Tabsコンポーネントを利用した設定画面のサンプル
template_use_appform_config.ts -> アプリフォーム情報を利用した設定画面のサンプル
template_use_proxy_config.ts -> Proxy設定を使用したプラグイン設定画面のサンプル

サニタイズ処理が必要な場合は、escapeHtml, unescapeHtml, DOMPurify.sanitizeを適宜使うこと。
import { escapeHtml, unescapeHtml } from '../common/func';
import DOMPurify from 'dompurify';

*/

import './config.scss';

(async (PLUGIN_ID: string) => {
  'use strict';

  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  console.log(config);
})(kintone.$PLUGIN_ID);

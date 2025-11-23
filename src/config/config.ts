import { Text, Button, Notification, Spinner } from 'kintone-ui-component';
import './config.scss';
// import { escapeHtml, unescapeHtml } from '../common/func';
// import DOMPurify from 'dompurify';
// サニタイズ処理が必要な場合は、escapeHtml, unescapeHtml, DOMPurify.sanitizeを適宜使うこと。

(async (PLUGIN_ID: string) => {
  'use strict';

  /** サンプルコードのコメントアウトを外して利用してください。
  try {
    //設定情報の取得
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    console.log(config);

    if (!config) {
      alert('プラグインの設定を取得できませんでした。');
      location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
    }
    const div = document.getElementById('settings');
    const divContent = document.createElement('div');
    const divFooter = document.createElement('div');
    div?.appendChild(divContent);
    div?.appendChild(divFooter);

    // textフィールド
    const text1 = new Text({
      label: 'text1',
      value: config.text1,
      placeholder: '値を入れてください。'
    });
    divContent?.appendChild(text1);

    // 保存ボタン
    const saveButton = new Button({
      text: '保存',
      type: 'submit',
      className: 'my-custom-button'
    });
    saveButton.style.marginTop = '10px';
    saveButton.style.marginBottom = '10px';
    saveButton.style.marginLeft = '10px';

    divFooter?.appendChild(saveButton);

    saveButton.addEventListener('click', (e) => {
      const spinner = new Spinner({
        text: '設定を保存中...'
      });
      try {
        const newConfig = {
          // ここに保存する設定を追加
          text1: text1.value
        };

        kintone.plugin.app.setConfig(newConfig, () => {
          const notification = new Notification({
            text: '設定を保存しました。',
            type: 'success',
            duration: 1000
          });
          notification.open();
          notification.addEventListener('close', () => {
            notification.close();
            spinner.close();
            location.href = location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
          });
        });
      } catch (err) {
        console.error('err:' + err);
        alert('設定の保存に失敗しました。');
        spinner.close();
      }
    });
  } catch (err) {
    console.error('err:' + err);
    alert('アプリのフォーム情報を取得できませんでした。管理者へ連絡してください。');
  }
  */
})(kintone.$PLUGIN_ID);

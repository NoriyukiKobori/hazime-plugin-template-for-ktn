/* 
テンプレート：Proxy設定を使用したプラグイン設定画面のサンプルコード

概要：
kintone.plugin.app.getProxyConfig()およびkintone.plugin.app.setProxyConfig()を使用して
外部APIのProxy設定情報を取得・保存するサンプルコードです。
外部APIのURL、HTTPメソッド、ヘッダー、ボディは適宜変更してください。

// 呼び出し側では、以下のように使用します。
// 例:
const apiUrl = 'https://xxxxxxxx/xxxxxx/xxxxxxx'; // 外部APIのURLを設定
const method = 'POST'; // 外部APIのHTTPメソッドを設定
const body = {
  // 必要に応じてリクエストボディを設定
}; 
const response = await kintone.plugin.app.proxy(PLUGIN_ID, apiUrl, method, {}, body);
const [responseBody, status, headers] = response;

console.log('Status:', status);
console.log('Headers:', headers);
console.log('Body:', responseBody);

*/

import { Text, Button, Notification, Spinner } from 'kintone-ui-component';
import './config.scss';
import { createMarginTopElement, createHorizontalLineElement } from './func';

(async (PLUGIN_ID: string) => {
  'use strict';

  const apiUrl = 'https://xxxxxxxx/xxxxxx/xxxxxxx'; // 外部APIのURLを設定
  const method = 'POST'; // 外部APIのHTTPメソッドを設定

  try {
    //設定情報の取得
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    // console.log('config', config);

    // Proxy設定情報の取得
    const proxyConfig = kintone.plugin.app.getProxyConfig(apiUrl, method);
    const apiKeyValue = proxyConfig?.headers['hogehoge'] ? proxyConfig.headers['hogehoge'] : '';

    if (!config) {
      new Notification({
        text: 'プラグインの設定を取得できませんでした。',
        type: 'danger'
      }).open();
      location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
    }

    const div = document.getElementById('settings');
    const divContent = document.createElement('div');
    const divFooter = document.createElement('div');
    divFooter.style.marginTop = '20px';
    div?.appendChild(divContent);
    div?.appendChild(divFooter);

    const apiKey = new Text({
      label: 'API Key',
      value: apiKeyValue,
      visible: false,
      className: '',
      requiredIcon: true
    });
    // apiKey.valueが空文字の場合は表示にする
    if (apiKey.value === '') {
      apiKey.visible = true;
    }
    divContent?.appendChild(apiKey);
    // apiKeyの表示・非表示を切り替えるボタン
    const toggleApiKeyButton = new Button({
      text: apiKey.value === '' ? 'API Keyを非表示にする' : 'API Keyを編集する',
      className: ''
    });
    toggleApiKeyButton.style.marginTop = '33px';
    divContent?.appendChild(toggleApiKeyButton);
    toggleApiKeyButton.addEventListener('click', () => {
      apiKey.visible = !apiKey.visible;
      toggleApiKeyButton.text = apiKey.visible ? 'API Keyを非表示にする' : 'API Keyを編集する';
    });

    divContent?.appendChild(createMarginTopElement());

    const text1 = new Text({
      label: 'Text1',
      value: config.text1,
      requiredIcon: true,
      placeholder: '値を入れてください.',
      className: 'hazime-config-text1'
    });
    divContent.appendChild(text1);

    // ==================================
    // Footerコンテンツ
    // ==================================

    divFooter.appendChild(createHorizontalLineElement()); // 水平線
    // === キャンセルボタン ===
    const cancelButton = new Button({
      text: 'キャンセル',
      type: 'normal',
      className: 'hazime-config-cancel-button'
    });
    cancelButton.style.marginTop = '10px';
    cancelButton.style.marginBottom = '10px';
    cancelButton.style.marginLeft = '10px';
    divFooter?.appendChild(cancelButton);

    cancelButton.addEventListener('click', (e) => {
      if (confirm('キャンセルしてよいですか？')) {
        location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
      }
    });

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
      spinner.open();
      try {
        e.preventDefault();

        const successCallback = () => {
          try {
            // =================================
            // 設定情報の保存
            // =================================
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
            new Notification({
              text: `設定の保存に失敗しました。\n${err}`,
              type: 'danger'
            }).open();
            spinner.close();
          }
        };

        // === 必須項目のチェック ===
        const errorMessageArray: string[] = [];

        if (!apiKey.value) errorMessageArray.push('・API Keyが未設定です');
        if (!text1.value) errorMessageArray.push('・Text1が未設定です');

        if (errorMessageArray.length > 0) {
          new Notification({
            text: errorMessageArray.join('\n'),
            type: 'danger'
          }).open();
          spinner.close();
          return;
        }

        // 外部APIの情報を定義
        const apiHeader = { hogehoge: apiKey.value, 'Content-Type': 'application/json' };
        const apiBody = {};
        kintone.plugin.app.setProxyConfig(apiUrl, method, apiHeader, apiBody, successCallback);
      } catch (err) {
        console.error('err:' + err);
        new Notification({
          text: `設定の保存に失敗しました。\n${err}`,
          type: 'danger'
        }).open();
      } finally {
        spinner.close();
      }
    });
  } catch (err) {
    console.error('err:' + err);
    new Notification({
      text: `アプリのフォーム情報を取得できませんでした。管理者へ連絡してください。\n${err}`,
      type: 'danger'
    }).open();
    location.href = `/k/admin/app/${kintone.app.getId()}/plugin/`;
  }
})(kintone.$PLUGIN_ID);

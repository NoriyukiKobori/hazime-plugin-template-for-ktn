import { Button, Spinner, Notification } from 'kintone-ui-component';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import './main.scss';
// import { escapeHtml, unescapeHtml } from '../common/func';
// import DOMPurify from 'dompurify';
// サニタイズ処理が必要な場合は、escapeHtml, unescapeHtml, DOMPurify.sanitizeを適宜使うこと。

((PLUGIN_ID) => {
  'use strict';

  /** サンプルコードのコメントアウトを外して利用してください。
  console.log(PLUGIN_ID);

  kintone.events.on('app.record.index.show', async (event) => {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    new Notification({
      text: config.text1,
      type: 'info'
    }).open();

    const button = new Button({
      text: 'test',
      className: 'my-custom-button'
    });
    button.addEventListener('click', async (e) => {
      const spinner = new Spinner({
        text: '...'
      });
      try {
        const appId = kintone.app.getId();
        if (!appId) {
          throw new Error('アプリIDが取得できませんでした。');
        }
        const client = new KintoneRestAPIClient();
        const res = await client.record.getAllRecords({ app: appId });
        console.log(res);
      } catch (err) {
        console.error('err:' + err);
        alert('error');
        spinner.close();
      }
    });

    kintone.app.getHeaderMenuSpaceElement()?.appendChild(button);
    return event;
  });
  */
})(kintone.$PLUGIN_ID);

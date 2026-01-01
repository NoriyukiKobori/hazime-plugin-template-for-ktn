import './main.scss';
// import { Button, Spinner, Notification } from 'kintone-ui-component';

// Kintone REST API Clientを使用する場合パッケージを追加でインストールし、コメントアウトを外して利用する。
// READMEも参照のこと。
// import { KintoneRestAPIClient } from '@kintone/rest-api-client';

// サニタイズ処理が必要な場合は、escapeHtml, unescapeHtml, DOMPurify.sanitizeを適宜使うこと。
// import { escapeHtml, unescapeHtml } from '../common/func';
// DomPurifyを使う場合は、パッケージを追加でインストールし、コメントアウトを外して利用する。
// READMEも参照のこと。
// import DOMPurify from 'dompurify';

((PLUGIN_ID) => {
  'use strict';

  /** サンプルコードのコメントアウトを外して利用してください。
  // console.log(PLUGIN_ID);

  kintone.events.on(['app.record.index.show', 'mobile.app.record.index.show'], async (event) => {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    // console.log('config:', config);

    // desktop / mobile 判定
    // @ts-ignore
    const isMobile = await kintone.isMobilePage();
    console.log('isMobile:', isMobile);

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
        new Notification({
          text: 'エラーが発生しました。' + err,
          type: 'danger'
        }).open();
      } finally {
        spinner.close();
      }
    });

    kintone.app.getHeaderMenuSpaceElement()?.appendChild(button);
    return event;
  });
  */
})(kintone.$PLUGIN_ID);

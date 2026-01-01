import { Text, Button, Combobox, Dropdown, Table, Notification, Spinner } from 'kintone-ui-component';
import { createMarginTopElement, createHorizontalLineElement } from './func';
import './config.scss';

(async (PLUGIN_ID: string) => {
  'use strict';

  try {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    console.log(config);

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
    div?.appendChild(divContent);
    div?.appendChild(divFooter);

    // このアプリの設計情報を取得して、フィールドコード一覧を作成するサンプルコード
    const appForm = await kintone.api(kintone.api.url('/k/v1/form.json', true), 'GET', { app: kintone.app.getId() });
    console.log(appForm.properties);

    // スペースフィールドの選択リストを作成するサンプルコード
    const targetType = 'SPACER';
    const items1 = appForm.properties
      .filter((prop: any) => prop.type === targetType)
      .map((prop: any) => {
        return { label: prop.code, value: prop.elementId };
      });
    console.log(items1);

    const dropDown = new Dropdown({
      label: 'スペースフィールド',
      items: items1,
      value: config.dropdownValue,
      requiredIcon: true,
      className: 'hazime-config-dropdown'
    });
    divContent.appendChild(dropDown);
    divContent.appendChild(createMarginTopElement()); // 改行

    // テーブルコンポーネントのサンプルコード

    const targetTypes = [
      // Conmboxで利用しないフィールドタイプはコメントアウトすること
      'RECORD_NUMBER',
      '__ID__',
      '__REVISION__',
      'CREATOR',
      'CREATED_TIME',
      'MODIFIER',
      'UPDATED_TIME',
      'SINGLE_LINE_TEXT',
      'MULTI_LINE_TEXT',
      'RICH_TEXT',
      'NUMBER',
      'CALC',
      'CHECK_BOX',
      'RADIO_BUTTON',
      'MULTI_SELECT',
      'DROP_DOWN',
      'USER_SELECT',
      'USER_SELECT',
      'ORGANIZATION_SELECT',
      'GROUP_SELECT',
      'DATE',
      'TIME',
      'DATETIME',
      'LINK',
      'FILE',
      'SINGLE_LINE_TEXT',
      'NUMBER',
      'SUBTABLE',
      'CATEGORY',
      'STATUS',
      'STATUS_ASSIGNEE'
    ];
    const items2 = appForm.properties
      .filter((prop: any) => targetTypes.includes(prop.type))
      .map((prop: any) => {
        return { label: prop.code, value: prop.code };
      });
    console.log(items2);
    const renderCombobox = (rowCombobox: string) => {
      {
        const combobox = new Combobox({
          value: rowCombobox || '',
          placeholder: '値を入れてください.',
          requiredIcon: true,
          items: items2,
          className: 'hazime-config-row-combobox'
        });
        return combobox;
      }
    };

    const renderText = (rowText: string) => {
      {
        const text = new Text({
          value: rowText || '',
          disabled: true,
          requiredIcon: true,
          placeholder: '値を入れてください。',
          className: 'hazime-config-row-text'
        });
        return text;
      }
    };

    const table = new Table({
      label: 'Table',
      columns: [
        {
          title: 'フィールドコード',
          field: 'combobox',
          requiredIcon: true,
          render: renderCombobox
        },
        {
          title: 'フィールドタイプ',
          field: 'text',
          requiredIcon: true,
          render: renderText
        }
      ],
      data: config.tableData ? JSON.parse(config.tableData) : [{ combobox: '', text: '' }],
      className: 'hazime-config-table',
      actionButton: true,
      actionButtonPosition: 'left'
    });
    table.addEventListener('change', (e: any) => {
      // フィールドコードに応じて、フィールドタイプをText欄に表示するサンプルコード
      // console.log(e);
      const rowIndex = e.detail.rowIndex;
      const targetFieldCode = e.detail.data[rowIndex].combobox;
      const targetFieldType = appForm.properties.find((prop: any) => prop.code === targetFieldCode)?.type || '';
      const newData = [...table.data];
      newData[rowIndex] = { ...newData[rowIndex], text: targetFieldType };
      table.data = newData;
    });
    divContent.appendChild(table);

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

    // === 保存ボタン ===
    const saveButton = new Button({
      text: '保存',
      type: 'submit',
      className: 'hazime-config-save-button'
    });
    saveButton.style.marginTop = '10px';
    saveButton.style.marginBottom = '10px';
    saveButton.style.marginLeft = '10px';

    divFooter?.appendChild(saveButton);

    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const spinner = new Spinner({
        text: '設定を保存中...'
      });
      spinner.open();
      try {
        // === 必須項目のチェック ===
        const errorMessageArray: string[] = [];

        if (!dropDown.value) errorMessageArray.push('・スペースフィールドが未選択です');

        (table.data as Array<{ combobox?: string; text?: string }>).forEach((row, index) => {
          if (!row.combobox) errorMessageArray.push(`・Tableの${index + 1}行目: フィールドコードが未選択です`);
          if (!row.text) errorMessageArray.push(`・Tableの${index + 1}行目: Textが未入力です`);
        });

        if (errorMessageArray.length > 0) {
          new Notification({
            text: errorMessageArray.join('\n'),
            type: 'danger'
          }).open();
          spinner.close();
          return;
        }

        // =================================
        // 設定情報の保存
        // =================================
        const newConfig = {
          // ここに保存する設定を追加
          dropdownValue: dropDown.value,
          tableData: JSON.stringify(table.data)
        };

        kintone.plugin.app.setConfig(newConfig, () => {
          const notification = new Notification({
            text: '設定を保存しました。',
            type: 'success',
            duration: 1000
          });
          notification.open();
          notification.addEventListener('close', () => {
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
  }
})(kintone.$PLUGIN_ID);

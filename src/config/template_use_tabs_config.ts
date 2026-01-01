import { Text, Dropdown, Button, RadioButton, TextArea, Checkbox, Table, Tabs, Notification, Spinner } from 'kintone-ui-component';
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

    // ===================================
    // Tabsコンポーネント
    // ===================================
    const tabsPaddingStyle = '30px';

    // === タブAの内容 ===
    const divTabA = document.createElement('div');
    divTabA.style.padding = tabsPaddingStyle;

    const text1 = new Text({
      label: 'Text1',
      value: config.text1,
      placeholder: '値を入れてください。',
      className: 'hazime-config-text1'
    });
    divTabA.appendChild(text1);

    const text2 = new Text({
      label: 'Text2',
      value: config.text2,
      placeholder: '値を入れてください.',
      className: 'hazime-config-text2'
    });
    text2.style.marginLeft = '10px';
    divTabA.appendChild(text2);

    const text3 = new Text({
      label: 'Text3',
      value: config.text3,
      placeholder: '値を入れてください。',
      className: 'hazime-config-text3'
    });
    text3.style.marginLeft = '10px';
    divTabA.appendChild(text3);
    divTabA.appendChild(createMarginTopElement()); // 改行

    const textArea = new TextArea({
      label: 'TextArea',
      value: config.textArea,
      placeholder: '値を入れてください。',
      className: 'hazime-config-textarea'
    });
    divTabA.appendChild(textArea);

    // === タブBの内容 ===
    const divTabB = document.createElement('div');
    divTabB.style.padding = tabsPaddingStyle;

    const dropDown = new Dropdown({
      label: 'Dropdown',
      items: [
        { label: '選択肢1', value: 'option1' },
        { label: '選択肢2', value: 'option2' },
        { label: '選択肢3', value: 'option3' }
      ],
      value: config.dropDown || '',
      className: 'hazime-config-dropdown'
    });
    divTabB.appendChild(dropDown);

    const radioButton = new RadioButton({
      label: 'RadioButton',
      items: [
        { label: '選択肢1', value: 'option1' },
        { label: '選択肢2', value: 'option2' },
        { label: '選択肢3', value: 'option3' }
      ],
      value: config.radioButton || '',
      className: 'hazime-config-radiobutton'
    });
    radioButton.style.marginLeft = '10px';
    divTabB.appendChild(radioButton);

    const checkBox = new Checkbox({
      label: 'Checkbox',
      items: [
        { label: '選択肢1', value: 'option1' },
        { label: '選択肢2', value: 'option2' },
        { label: '選択肢3', value: 'option3' }
      ],
      value: config.checkBox ? JSON.parse(config.checkBox) : [],
      className: 'hazime-config-checkbox'
    });
    checkBox.style.marginLeft = '10px';
    divTabB.appendChild(checkBox);
    divTabB.appendChild(createMarginTopElement()); // 改行

    const renderText = (rowText: string) => {
      {
        const text = new Text({
          value: rowText || '',
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
          title: 'Text',
          field: 'text',
          render: renderText
        }
      ],
      data: config.tableData ? JSON.parse(config.tableData) : [{ text: '' }],
      className: 'hazime-config-table',
      actionButton: true,
      actionButtonPosition: 'left'
    });
    divTabB.appendChild(table);

    // === Tabsコンポーネント ===
    const tabs = new Tabs({
      items: [
        {
          label: 'A',
          content: divTabA,
          value: 'a',
          disabled: false
        },
        {
          label: 'B',
          content: divTabB,
          value: 'b',
          disabled: false
        }
      ],
      value: 'a',
      visible: true,
      borderVisible: true,
      scrollButtons: false
    });
    divContent?.appendChild(tabs);

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
        const errorMessageArray = [];
        if (!text1.value) errorMessageArray.push('・Text1が未設定です');

        (table.data as Array<{ text?: string }>).forEach((row, index) => {
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
          text1: text1.value,
          text2: text2.value,
          text3: text3.value,
          dropDown: dropDown.value,
          radioButton: radioButton.value,
          checkBox: JSON.stringify(checkBox.value),
          textArea: textArea.value,
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

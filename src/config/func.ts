// 改行して、topにマージンをつける関数
export const createMarginTopElement = (height: number = 16): HTMLDivElement => {
  const div = document.createElement('div');
  div.style.marginTop = `${height}px`;
  return div;
};

// 水平線の要素を作成する関数
export const createHorizontalLineElement = (): HTMLHRElement => {
  const hr = document.createElement('hr');
  hr.style.border = 'none';
  hr.style.borderTop = '1px solid #ccc';
  hr.style.marginTop = '20px';
  hr.style.marginBottom = '20px';
  return hr;
};

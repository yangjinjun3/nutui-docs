export const Hover = {
  mounted(el: HTMLElement) {
    //绑定事件
    el.addEventListener('mouseover', () => {
      // 后期考虑动态主题
      el.style.color = '#fa2c19';
    });
    el.addEventListener('mouseleave', () => {
      el.style.color = '';
    });
  }
};

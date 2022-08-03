const ua = navigator.userAgent.toLowerCase();
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua);

const arrayGroup = (arr: any[], num: number): any[] => {
  const arrSlice = [];
  for (let i = 0; i < arr.length; i += num) {
    arrSlice.push(arr.slice(i, i + num));
  }
  return arrSlice;
};
const isJDT = () => {
  return location.href.includes('jdt');
};
const isJDB = () => {
  return location.href.includes('jdb');
};
export { isMobile, arrayGroup, isJDT, isJDB };

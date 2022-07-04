import { ref, computed, onMounted } from 'vue';

const currentLang = ref('zh-CN');
export const useLocale = () => {
  const isEn = computed(() => currentLang.value == 'en-US');
  const isZh = computed(() => currentLang.value == 'zh-CN');
  onMounted(() => {
    if (location.href.includes('en-US')) {
      currentLang.value = 'en-US';
    }
  });
  return { currentLang, isEn, isZh };
};

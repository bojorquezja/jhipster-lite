import { ThemeRepository } from '@/module/domain/ThemeRepository';
import { ThemePreference as Theme } from '@/module/secondary/GetMediaPreference';
import { defineComponent, ref, onMounted, inject } from 'vue';

/**
 * ThemeSwitchButton
 *
 * 1. use localStorage saved theme first.
 * 2. if no value set, use `prefer-color-scheme` defined.
 * 3. can change theme by toggle button.
 * 4. the change must be saved in localStorage for later theme decision.
 */
export default defineComponent({
  name: 'ThemeButton',

  setup() {
    const isDarkTheme = ref<boolean>(true);

    const theme = ref<Theme>('dark-theme');

    const themeRepository = inject('themeRepository') as ThemeRepository;

    onMounted(() => {
      const initUserTheme = themeRepository.get();
      isDarkTheme.value = initUserTheme === 'dark-theme';
      theme.value = initUserTheme;
      themeRepository.choose(initUserTheme);
    });

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      theme.value = isDarkTheme.value ? 'dark-theme' : 'light-theme';
      themeRepository.choose(theme.value);
    };

    return {
      isDarkTheme,
      toggleTheme,
      theme,
    };
  },
});

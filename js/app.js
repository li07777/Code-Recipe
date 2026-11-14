
import {
  loadAllRecipes,
  CATEGORY_NAMES,
  createElement
} from './data.js';

const state = {
  recipes: [],
  language: 'all',
  category: 'all',
  difficulty: 'all',
  keyword: ''
};

const grid = document.getElementById('recipe-grid');
const status = document.getElementById('status');
const resultCount = document.getElementById('results-count');

document.getElementById('year').textContent =
  new Date().getFullYear();

// 建立每張食譜卡片
function buildCard(recipe) {
  const card = createElement('article', 'recipe-card');

  const url = `recipe.html?id=${encodeURIComponent(recipe.id)}`;

  const top = createElement('div', 'card-top');

  const icons = {
    sorting: '↕',
    searching: '⌕',
    'data-structures': '≡',
    algorithms: 'ƒ',
    basics: '{}',
    'file-io': '↗'
  };

  const symbol = createElement(
    'div',
    'card-icon',
    icons[recipe.category] || '{}'
  );

  symbol.setAttribute('aria-hidden', 'true');

  const language = createElement(
    'span',
    'lang-pill',
    recipe.language
  );

  top.append(symbol, language);

  // 食譜標題連結
  const heading = createElement('h3');

  const link = createElement(
    'a',
    'card-main-link',
    recipe.title
  );

  link.href = url;
  link.setAttribute('aria-label', `查看 ${recipe.title} 食譜`);

  heading.append(link);

  // 食譜簡介
  const summary = createElement(
    'p',
    null,
    recipe.summary
  );

  // 卡片底部
  const foot = createElement('div', 'card-foot');

  const category = createElement(
    'span',
    null,
    `${CATEGORY_NAMES[recipe.category]} · ${recipe.difficulty}`
  );

  const action = createElement(
    'span',
    'card-action',
    '查看食譜 ↗'
  );

  foot.append(category, action);
  card.append(top, heading, summary, foot);

  return card;
}

// 搜尋與篩選食譜
function render() {
  const q = state.keyword.toLocaleLowerCase();

  const matches = state.recipes.filter(recipe => {
    const matchLanguage =
      state.language === 'all' ||
      recipe.language === state.language;

    const matchCategory =
      state.category === 'all' ||
      recipe.category === state.category;

    const matchDifficulty =
      state.difficulty === 'all' ||
      recipe.difficulty === state.difficulty;

    const searchableText = [
      recipe.title,
      recipe.summary,
      recipe.language,
      CATEGORY_NAMES[recipe.category],
      recipe.topic,
      ...recipe.tags
    ].join(' ').toLocaleLowerCase();

    const matchKeyword =
      !q || searchableText.includes(q);

    return (
      matchLanguage &&
      matchCategory &&
      matchDifficulty &&
      matchKeyword
    );
  });

  grid.replaceChildren(...matches.map(buildCard));

  resultCount.textContent =
    `找到 ${matches.length} / ${state.recipes.length} 道食譜`;

  status.hidden = matches.length > 0;

  if (!matches.length) {
    status.textContent =
      '沒有找到符合條件的食譜，試著調整關鍵字或篩選條件。';
  }
}

// 關鍵字搜尋
document.getElementById('search-input')
  .addEventListener('input', event => {
    state.keyword = event.target.value.trim();
    render();
  });

// 程式語言篩選
document.getElementById('language-filters')
  .addEventListener('click', event => {
    const button = event.target.closest('button[data-language]');

    if (!button) return;

    state.language = button.dataset.language;

    document.querySelectorAll('[data-language]')
      .forEach(item => {
        const selected = item === button;

        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

    render();
  });

// 主題分類
document.getElementById('category-filter')
  .addEventListener('change', event => {
    state.category = event.target.value;
    render();
  });

// 難度篩選
document.getElementById('difficulty-filter')
  .addEventListener('change', event => {
    state.difficulty = event.target.value;
    render();
  });

// 載入 JSON 食譜資料
try {
  state.recipes = await loadAllRecipes();

  document.getElementById('hero-count').textContent =
    String(state.recipes.length).padStart(2, '0');

  render();

} catch (error) {
  console.error(error);

  resultCount.textContent = '資料載入失敗';

  status.hidden = false;

  status.textContent =
    `無法載入食譜：${error.message}。請確認 GitHub Pages 的檔案位置。`;
}

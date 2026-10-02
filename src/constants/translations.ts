export type AppLanguage = 'uz' | 'ru' | 'en';

export interface Translations {
  // Splash & Onboarding
  splashTitle: string;
  splashSubtitle: string;
  chooseLangTitle: string;
  
  // Login / Signup
  loginTitle: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  loginButton: string;
  loginWithEmail: string;
  orDivider: string;
  needHelp: string;
  guestLoginSuccess: string;
  
  // Navigation Tabs
  tabMarket: string;
  tabMap: string;
  tabHome: string;
  tabSaved: string;
  tabProfile: string;

  // Home Screen
  searchPlaceholder: string;
  categorySearchPlaceholder: string;
  selectRegion: string;
  categories: {
    cats: string;
    dogs: string;
    birds: string;
    poultry: string;
    livestock: string;
  };
  urgent: string;
  vaccinated: string;
  adoption: string;
  allListings: string;
  similarListings: string;
  seeAll: string;
  loadMore: string;

  // Detail
  callSeller: string;
  writeChat: string;
  haveComplaint: string;
  rateReview: string;
  makeDeal: string;
  orderProduct: string;
  description: string;
  specifications: string;

  // Profile & Settings
  personalInfo: string;
  balance: string;
  myListings: string;
  rejectedListings: string;
  logout: string;
  settingsTitle: string;
  languageSetting: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  uz: {
    splashTitle: 'ZOO BOZOR',
    splashSubtitle: 'Hayvonlar savdosi e’lonlar',
    chooseLangTitle: 'Tilni tanlang!',
    
    loginTitle: 'Kirishni tasdiqlang!',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Parol',
    loginButton: 'Kirish',
    loginWithEmail: 'Email orqali kirish',
    orDivider: 'Or',
    needHelp: 'Yordam kerakmi?',
    guestLoginSuccess: 'Mehmon sifatida xush kelibsiz!',

    tabMarket: 'Market',
    tabMap: 'Karta',
    tabHome: 'Asosiy',
    tabSaved: 'Saqlangan',
    tabProfile: 'Profil',

    searchPlaceholder: 'Qidiruv',
    categorySearchPlaceholder: 'Kategoriya bo’yicha..',
    selectRegion: 'Hududni tanlang',
    categories: {
      cats: 'Mushug',
      dogs: 'Kuchug',
      birds: 'Qush',
      poultry: 'Parranda',
      livestock: 'Chorva',
    },
    urgent: 'Shoshilinch',
    vaccinated: 'Emlangan',
    adoption: 'Asrab olish (0 so’m)',
    allListings: 'Barcha e’lonlar',
    similarListings: 'O’xshash e’lonlar',
    seeAll: 'Barchasi',
    loadMore: 'Ko’proq',

    callSeller: 'Sotuvchi bilan bog’lanish',
    writeChat: 'Chatda yozish',
    haveComplaint: 'Shikoyat bormi?',
    rateReview: 'Baholash',
    makeDeal: 'Kelishamiz!',
    orderProduct: 'Buyurtma',
    description: 'Qo’shimcha',
    specifications: 'Xususiyatlar',

    personalInfo: 'Shaxsiy Ma’lumot',
    balance: 'BALANS',
    myListings: 'E’lonlarim',
    rejectedListings: 'Rad Etilgan',
    logout: 'Chiqish',
    settingsTitle: 'Sozlama',
    languageSetting: 'Tilni o’zgartirish',
  },

  ru: {
    splashTitle: 'ZOO BOZOR',
    splashSubtitle: 'Объявления о животных и товарах',
    chooseLangTitle: 'Выберите язык!',
    
    loginTitle: 'Подтвердите вход!',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Пароль',
    loginButton: 'Войти',
    loginWithEmail: 'Войти через Email',
    orDivider: 'Или',
    needHelp: 'Нужна помощь?',
    guestLoginSuccess: 'Добро пожаловать в качестве гостя!',

    tabMarket: 'Маркет',
    tabMap: 'Карта',
    tabHome: 'Главная',
    tabSaved: 'Избранное',
    tabProfile: 'Профиль',

    searchPlaceholder: 'Поиск животных и товаров...',
    categorySearchPlaceholder: 'Поиск по категории...',
    selectRegion: 'Выберите регион',
    categories: {
      cats: 'Кошки',
      dogs: 'Собаки',
      birds: 'Птицы',
      poultry: 'Дом. птица',
      livestock: 'Скот',
    },
    urgent: 'Срочно',
    vaccinated: 'Привит',
    adoption: 'В добрые руки (0 сум)',
    allListings: 'Все объявления',
    similarListings: 'Похожие объявления',
    seeAll: 'Все',
    loadMore: 'Показать еще',

    callSeller: 'Связаться с продавцом',
    writeChat: 'Написать в чат',
    haveComplaint: 'Есть жалоба?',
    rateReview: 'Оценить',
    makeDeal: 'Договоримся!',
    orderProduct: 'Заказать',
    description: 'Описание',
    specifications: 'Характеристики',

    personalInfo: 'Личные данные',
    balance: 'БАЛАНС',
    myListings: 'Мои объявления',
    rejectedListings: 'Отклоненные',
    logout: 'Выйти',
    settingsTitle: 'Настройки',
    languageSetting: 'Сменить язык',
  },

  en: {
    splashTitle: 'ZOO BOZOR',
    splashSubtitle: 'Pet & Animal Marketplace Ads',
    chooseLangTitle: 'Choose language!',
    
    loginTitle: 'Confirm login!',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    loginButton: 'Sign In',
    loginWithEmail: 'Sign in with Email',
    orDivider: 'Or',
    needHelp: 'Need help?',
    guestLoginSuccess: 'Welcome as a guest!',

    tabMarket: 'Market',
    tabMap: 'Map',
    tabHome: 'Home',
    tabSaved: 'Saved',
    tabProfile: 'Profile',

    searchPlaceholder: 'Search pets and pet food...',
    categorySearchPlaceholder: 'Search by category...',
    selectRegion: 'Select region',
    categories: {
      cats: 'Cats',
      dogs: 'Dogs',
      birds: 'Birds',
      poultry: 'Poultry',
      livestock: 'Livestock',
    },
    urgent: 'Urgent',
    vaccinated: 'Vaccinated',
    adoption: 'Adoption (Free)',
    allListings: 'All listings',
    similarListings: 'Similar listings',
    seeAll: 'See all',
    loadMore: 'Load more',

    callSeller: 'Contact seller',
    writeChat: 'Send message',
    haveComplaint: 'Report listing',
    rateReview: 'Rate & Review',
    makeDeal: 'Negotiable!',
    orderProduct: 'Order now',
    description: 'Description',
    specifications: 'Specifications',

    personalInfo: 'Personal Info',
    balance: 'BALANCE',
    myListings: 'My Listings',
    rejectedListings: 'Rejected',
    logout: 'Log out',
    settingsTitle: 'Settings',
    languageSetting: 'Change language',
  },
};

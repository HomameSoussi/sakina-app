import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    features: 'Features',
    scienceFaith: 'Science & Faith',
    pricing: 'Pricing',
    crisisHelp: 'Crisis Help',
    prayerTimes: 'Prayer Times',
    downloadApp: 'Download App',
    
    // Hero Section
    heroTitle: 'Find Your',
    heroSubtitle: 'Inner Peace',
    heroDescription: 'Panic first-aid and CBT tools with an Islamic lens. Inclusive, optional, and designed for everyone seeking calm and mental wellness.',
    downloadFree: 'Download Free',
    watchDemo: 'Watch Demo',
    
    // Features
    panicRelief: 'Panic Relief Button',
    panicReliefDesc: 'One-tap access to guided panic relief with grounding, breathing, and dhikr exercises.',
    cbtTools: 'CBT Tools',
    cbtToolsDesc: 'Evidence-based cognitive behavioral therapy techniques for reframing anxious thoughts.',
    islamicIntegration: 'Islamic Integration',
    islamicIntegrationDesc: 'Optional Islamic content including dhikr, duas, and Quranic verses for spiritual comfort.',
    privacyFirst: 'Privacy First',
    privacyFirstDesc: 'Your data stays private. Offline-first design with optional encrypted cloud sync.',
    
    // Stats
    usersHelped: 'Users Helped',
    appRating: 'App Rating',
    languages: 'Languages',
    crisisSupport: 'Crisis Support',
    
    // Pricing
    free: 'Free',
    pro: 'Pro',
    family: 'Family',
    getStartedFree: 'Get Started Free',
    startProTrial: 'Start Pro Trial',
    startFamilyPlan: 'Start Family Plan',
    
    // Crisis
    youAreNotAlone: 'You Are Not Alone',
    crisisDescription: 'If you\'re experiencing a mental health crisis, immediate help is available. These resources provide professional support when you need it most.',
    
    // Prayer Times
    prayerTimesTitle: 'Prayer Times',
    todaysDate: 'Today\'s Date',
    qiblaDirection: 'Qibla Direction',
    nextPrayer: 'Next Prayer',
    
    // Common
    loading: 'Loading...',
    tryAgain: 'Try Again',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    
    // Freemium Features
    tryPanicButton: 'Try the Panic Relief Button',
    experienceGuided: 'Experience our guided 4-step panic relief process',
    unlockAllFeatures: 'Unlock All Features',
    limitedAccess: 'Limited Access',
    upgradeForMore: 'Upgrade for unlimited access',
    
    // Donation
    supportCause: 'Support Our Cause',
    donateDescription: 'Help us provide free mental health support to those who need it most.',
    donate: 'Donate',
    makeADifference: 'Make a Difference'
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    features: 'Fonctionnalités',
    scienceFaith: 'Science et Foi',
    pricing: 'Tarifs',
    crisisHelp: 'Aide d\'Urgence',
    prayerTimes: 'Heures de Prière',
    downloadApp: 'Télécharger l\'App',
    
    // Hero Section
    heroTitle: 'Trouvez Votre',
    heroSubtitle: 'Paix Intérieure',
    heroDescription: 'Premiers secours contre la panique et outils TCC avec une perspective islamique. Inclusif, optionnel, et conçu pour tous ceux qui cherchent le calme et le bien-être mental.',
    downloadFree: 'Télécharger Gratuitement',
    watchDemo: 'Voir la Démo',
    
    // Features
    panicRelief: 'Bouton Anti-Panique',
    panicReliefDesc: 'Accès en un clic à un soulagement guidé avec exercices d\'ancrage, de respiration et dhikr.',
    cbtTools: 'Outils TCC',
    cbtToolsDesc: 'Techniques de thérapie cognitivo-comportementale basées sur des preuves pour recadrer les pensées anxieuses.',
    islamicIntegration: 'Intégration Islamique',
    islamicIntegrationDesc: 'Contenu islamique optionnel incluant dhikr, duas et versets coraniques pour le réconfort spirituel.',
    privacyFirst: 'Confidentialité d\'Abord',
    privacyFirstDesc: 'Vos données restent privées. Conception hors ligne avec synchronisation cloud cryptée optionnelle.',
    
    // Stats
    usersHelped: 'Utilisateurs Aidés',
    appRating: 'Note de l\'App',
    languages: 'Langues',
    crisisSupport: 'Support de Crise',
    
    // Pricing
    free: 'Gratuit',
    pro: 'Pro',
    family: 'Famille',
    getStartedFree: 'Commencer Gratuitement',
    startProTrial: 'Essai Pro',
    startFamilyPlan: 'Plan Famille',
    
    // Crisis
    youAreNotAlone: 'Vous N\'Êtes Pas Seul(e)',
    crisisDescription: 'Si vous vivez une crise de santé mentale, une aide immédiate est disponible. Ces ressources fournissent un soutien professionnel quand vous en avez le plus besoin.',
    
    // Prayer Times
    prayerTimesTitle: 'Heures de Prière',
    todaysDate: 'Date d\'Aujourd\'hui',
    qiblaDirection: 'Direction de la Qibla',
    nextPrayer: 'Prochaine Prière',
    
    // Common
    loading: 'Chargement...',
    tryAgain: 'Réessayer',
    learnMore: 'En Savoir Plus',
    getStarted: 'Commencer',
    
    // Freemium Features
    tryPanicButton: 'Essayez le Bouton Anti-Panique',
    experienceGuided: 'Découvrez notre processus guidé de soulagement de la panique en 4 étapes',
    unlockAllFeatures: 'Débloquer Toutes les Fonctionnalités',
    limitedAccess: 'Accès Limité',
    upgradeForMore: 'Mettez à niveau pour un accès illimité',
    
    // Donation
    supportCause: 'Soutenez Notre Cause',
    donateDescription: 'Aidez-nous à fournir un soutien gratuit en santé mentale à ceux qui en ont le plus besoin.',
    donate: 'Faire un Don',
    makeADifference: 'Faire la Différence'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    features: 'المميزات',
    scienceFaith: 'العلم والإيمان',
    pricing: 'الأسعار',
    crisisHelp: 'المساعدة الطارئة',
    prayerTimes: 'أوقات الصلاة',
    downloadApp: 'تحميل التطبيق',
    
    // Hero Section
    heroTitle: 'اعثر على',
    heroSubtitle: 'سكينتك الداخلية',
    heroDescription: 'الإسعافات الأولية للهلع وأدوات العلاج المعرفي السلوكي بمنظور إسلامي. شامل واختياري ومصمم لكل من يسعى للهدوء والعافية النفسية.',
    downloadFree: 'تحميل مجاني',
    watchDemo: 'مشاهدة العرض',
    
    // Features
    panicRelief: 'زر تخفيف الهلع',
    panicReliefDesc: 'وصول بنقرة واحدة لتخفيف الهلع الموجه مع تمارين التأريض والتنفس والذكر.',
    cbtTools: 'أدوات العلاج المعرفي السلوكي',
    cbtToolsDesc: 'تقنيات العلاج المعرفي السلوكي المبنية على الأدلة لإعادة تأطير الأفكار القلقة.',
    islamicIntegration: 'التكامل الإسلامي',
    islamicIntegrationDesc: 'محتوى إسلامي اختياري يشمل الذكر والأدعية والآيات القرآنية للراحة الروحية.',
    privacyFirst: 'الخصوصية أولاً',
    privacyFirstDesc: 'بياناتك تبقى خاصة. تصميم يعمل بدون إنترنت مع مزامنة سحابية مشفرة اختيارية.',
    
    // Stats
    usersHelped: 'المستخدمون المساعدون',
    appRating: 'تقييم التطبيق',
    languages: 'اللغات',
    crisisSupport: 'دعم الأزمات',
    
    // Pricing
    free: 'مجاني',
    pro: 'احترافي',
    family: 'عائلي',
    getStartedFree: 'ابدأ مجاناً',
    startProTrial: 'تجربة احترافية',
    startFamilyPlan: 'خطة عائلية',
    
    // Crisis
    youAreNotAlone: 'لست وحدك',
    crisisDescription: 'إذا كنت تواجه أزمة صحة نفسية، فالمساعدة الفورية متاحة. هذه الموارد توفر الدعم المهني عندما تحتاجه أكثر.',
    
    // Tools page
    tools: 'الأدوات',
    freeToolsTitle: 'أدوات العافية النفسية المجانية',
    freeToolsDescription: 'جرب أدوات تخفيف القلق المبنية على الأدلة مجاناً. اختبر قوة سكينة قبل تحميل التطبيق الكامل.',
    freeUsageToday: 'الاستخدام المجاني اليوم',
    sessionsUsed: 'جلسة مستخدمة',
    resetsDaily: 'يتجدد يومياً',
    unlimitedWithPro: 'غير محدود مع الخطة الاحترافية',
    breathingExercises: 'تمارين التنفس',
    breathingExercisesDesc: 'تقنيات التنفس 4-7-8 والتنفس المربع',
    moodCheckIn: 'فحص المزاج',
    moodCheckInDesc: 'تتبع حالتك العاطفية',
    cbtThoughtRecord: 'سجل الأفكار المعرفي السلوكي',
    cbtThoughtRecordDesc: 'تحدي الأفكار السلبية',
    guidedMeditations: 'التأملات الموجهة',
    guidedMeditationsDesc: 'جلسات صوتية مهدئة',
    immediateRelief: 'راحة فورية لنوبات الهلع',
    readyForMore: 'مستعد للمزيد؟',
    getUnlimitedAccess: 'احصل على وصول غير محدود لجميع الأدوات، وأوراق عمل العلاج المعرفي السلوكي المتقدمة، والتأملات الموجهة، والمحتوى الإسلامي، والمزيد مع سكينة الاحترافية.',
    supportMission: 'تريد دعم مهمتنا؟',
    makeADonation: 'تبرع',
    
    // Prayer Times
    prayerTimesTitle: 'أوقات الصلاة',
    todaysDate: 'تاريخ اليوم',
    qiblaDirection: 'اتجاه القبلة',
    nextPrayer: 'الصلاة القادمة',
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    
    // Common
    loading: 'جاري التحميل...',
    tryAgain: 'حاول مرة أخرى',
    learnMore: 'اعرف المزيد',
    getStarted: 'ابدأ الآن',
    
    // Islamic greetings
    assalamuAlaikum: 'السلام عليكم ورحمة الله وبركاته',
    barakAllahuFeek: 'بارك الله فيك',
    jazakAllahuKhairan: 'جزاك الله خيراً',
    
    // Freemium Features
    tryPanicButton: 'جرب زر تخفيف الهلع',
    experienceGuided: 'اختبر عملية تخفيف الهلع الموجهة من 4 خطوات',
    unlockAllFeatures: 'افتح جميع المميزات',
    limitedAccess: 'وصول محدود',
    upgradeForMore: 'ترقية للوصول غير المحدود',
    
    // Homepage features
    freeToUse: 'مجاني للاستخدام',
    noAds: 'بدون إعلانات',
    privacyFirst: 'الخصوصية أولاً',
    tryPanicReliefButton: 'جرب زر تخفيف الهلع',
    experienceGuidedProcess: 'اختبر عملية تخفيف الهلع الموجهة من 4 خطوات',
    feelingOverwhelmed: 'تشعر بالإرهاق؟ هذا التمرين الموجه سيساعدك خلال نوبة الهلع في 4 خطوات بسيطة.',
    iNeedHelp: 'أحتاج مساعدة',
    tapForRelief: 'اضغط للراحة',
    everythingYouNeed: 'كل ما تحتاجه للعافية النفسية',
    sakinaCombines: 'تجمع سكينة بين أدوات الصحة النفسية المبنية على الأدلة والممارسات الإسلامية الاختيارية لتوفير دعم شامل للقلق والتوتر.',
    
    // Features page
    featuresThatHelp: 'مميزات تساعد فعلاً',
    tryThisFeature: 'جرب هذه الميزة',
    instantAccessToCalm: 'وصول فوري للهدوء',
    reframeYourThoughts: 'أعد تأطير أفكارك',
    findYourPeace: 'اعثر على سلامك',
    stayPrivate: 'ابق خاصاً',
    worksOffline: 'يعمل بدون إنترنت بنسبة 100% بعد التحميل',
    groundingTechnique: 'تقنية التأريض 5-4-3-2-1',
    breathingPatterns: 'أنماط التنفس المربع و4-7-8',
    islamicDhikrIntegration: 'تكامل الذكر الإسلامي الاختياري',
    emergencyContactQuickDial: 'اتصال سريع بجهات الاتصال الطارئة',
    thoughtRecordWorksheets: 'أوراق عمل سجل الأفكار',
    cognitiveRestructuring: 'إعادة الهيكلة المعرفية',
    behavioralActivation: 'التفعيل السلوكي',
    mindfulnessIntegration: 'تكامل اليقظة الذهنية',
    islamicPerspectives: 'منظورات إسلامية اختيارية',
    calmAudioLibrary: 'مكتبة الصوت الهادئ',
    guidedMeditations: 'التأملات الموجهة',
    quranRecitations: 'تلاوات القرآن',
    naturesSounds: 'أصوات الطبيعة',
    sleepStories: 'قصص النوم',
    dhikrSessions: 'جلسات الذكر',
    privacyFirstDesc: 'بياناتك تبقى خاصة. تصميم يعمل بدون إنترنت مع مزامنة سحابية مشفرة اختيارية.',
    endToEndEncryption: 'تشفير من طرف إلى طرف',
    offlineFirst: 'يعمل بدون إنترنت أولاً',
    noDataCollection: 'لا جمع للبيانات',
    openSource: 'مفتوح المصدر',
    hipaaCompliant: 'متوافق مع HIPAA',
    soothingSoundsRecitations: 'أصوات وتلاوات مهدئة',
    curatedCollection: 'مجموعة منتقاة من التلاوات القرآنية والرقية وقصص النوم وأصوات الطبيعة والتأملات الموجهة للاسترخاء.',
    highQualityAudio: 'محتوى صوتي عالي الجودة',
    offlineDownload: 'إمكانية التحميل للاستخدام بدون إنترنت',
    multipleReciters: 'عدة قراء متاحين',
    sleepStoriesNature: 'قصص النوم وأصوات الطبيعة',
    guidedDhikrMeditations: 'تأملات الذكر الموجهة',
    moodJournal: 'سجل المزاج',
    trackWellnessJourney: 'تتبع رحلة العافية الخاصة بك',
    dailyMoodCheckins: 'فحوصات المزاج اليومية مع تتبع التكافؤ والإثارة والعلامات والملاحظات الصوتية والرؤى لفهم أنماطك.',
    simpleMoodRating: 'نظام تقييم مزاج بسيط',
    customizableMoodTags: 'علامات مزاج قابلة للتخصيص',
    voiceToTextJournaling: 'كتابة اليوميات بالصوت إلى النص',
    weeklyMonthlyInsights: 'رؤى أسبوعية وشهرية',
    privacyFirstStorage: 'تخزين البيانات مع الخصوصية أولاً',
    
    // Pricing page
    chooseYourPath: 'اختر طريقك إلى سَكِينَة',
    startMentalWellness: 'ابدأ رحلة العافية النفسية مع خطتنا المجانية، أو افتح الإمكانات الكاملة لتخفيف القلق المستوحى من الإسلام مع المميزات الاحترافية.',
    monthly: 'شهرياً',
    yearly: 'سنوياً',
    save17: 'وفر 17%',
    mostPopular: 'الأكثر شعبية',
    bestValue: 'أفضل قيمة',
    essentialPanicRelief: 'تخفيف الهلع الأساسي وأدوات العلاج المعرفي السلوكي الأساسية',
    completeMentalWellness: 'مجموعة أدوات العافية النفسية الكاملة مع المميزات المتقدمة',
    proFeaturesFamily: 'مميزات احترافية لما يصل إلى 6 أفراد من العائلة',
    
    // Donation
    supportCause: 'ادعم قضيتنا',
    donateDescription: 'ساعدنا في توفير الدعم المجاني للصحة النفسية لمن يحتاجونه أكثر.',
    donate: 'تبرع',
    makeADifference: 'اصنع فرقاً'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    return localStorage.getItem('sakina-language') || 'en'
  })

  const [direction, setDirection] = useState(() => {
    return language === 'ar' ? 'rtl' : 'ltr'
  })

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = direction
    document.documentElement.lang = language
    
    // Save to localStorage
    localStorage.setItem('sakina-language', language)
    
    // Update body class for RTL styling
    if (direction === 'rtl') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [language, direction])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr')
  }

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  const value = {
    language,
    direction,
    changeLanguage,
    t,
    isRTL: direction === 'rtl'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

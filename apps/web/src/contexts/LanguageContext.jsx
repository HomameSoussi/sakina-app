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
    tools: 'Tools',
    
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
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
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
    
    // Homepage features
    freeToUse: 'Free to Use',
    noAds: 'No Ads',
    tryPanicReliefButton: 'Try the Panic Relief Button',
    experienceGuidedProcess: 'Experience our guided 4-step panic relief process',
    feelingOverwhelmed: 'Feeling overwhelmed? This guided exercise will help you through a panic attack in 4 simple steps.',
    iNeedHelp: 'I Need Help',
    tapForRelief: 'Tap for Relief',
    everythingYouNeed: 'Everything You Need for Mental Wellness',
    sakinaCombines: 'Sakina combines evidence-based mental health tools with optional Islamic practices to provide comprehensive support for anxiety and stress.',
    
    // Features page
    featuresThatHelp: 'Features That Actually Help',
    tryThisFeature: 'Try This Feature',
    instantAccessToCalm: 'Instant Access to Calm',
    reframeYourThoughts: 'Reframe Your Thoughts',
    findYourPeace: 'Find Your Peace',
    stayPrivate: 'Stay Private',
    worksOffline: 'Works 100% offline after download',
    groundingTechnique: '5-4-3-2-1 grounding technique',
    breathingPatterns: 'Square and 4-7-8 breathing patterns',
    islamicDhikrIntegration: 'Optional Islamic dhikr integration',
    emergencyContactQuickDial: 'Emergency contact quick dial',
    thoughtRecordWorksheets: 'Thought record worksheets',
    cognitiveRestructuring: 'Cognitive restructuring',
    behavioralActivation: 'Behavioral activation',
    mindfulnessIntegration: 'Mindfulness integration',
    islamicPerspectives: 'Optional Islamic perspectives',
    calmAudioLibrary: 'Calm audio library',
    quranRecitations: 'Quran recitations',
    naturesSounds: 'Nature\'s sounds',
    sleepStories: 'Sleep stories',
    dhikrSessions: 'Dhikr sessions',
    endToEndEncryption: 'End-to-end encryption',
    offlineFirst: 'Offline first',
    noDataCollection: 'No data collection',
    openSource: 'Open source',
    hipaaCompliant: 'HIPAA compliant',
    soothingSoundsRecitations: 'Soothing sounds & recitations',
    curatedCollection: 'Curated collection of Quranic recitations, ruqyah, sleep stories, nature sounds, and guided meditations for relaxation.',
    highQualityAudio: 'High-quality audio content',
    offlineDownload: 'Offline download available',
    multipleReciters: 'Multiple reciters available',
    sleepStoriesNature: 'Sleep stories & nature sounds',
    guidedDhikrMeditations: 'Guided dhikr meditations',
    moodJournal: 'Mood Journal',
    trackWellnessJourney: 'Track your wellness journey',
    dailyMoodCheckins: 'Daily mood check-ins with valence, arousal, tags, and voice notes tracking, plus insights to understand your patterns.',
    simpleMoodRating: 'Simple mood rating system',
    customizableMoodTags: 'Customizable mood tags',
    voiceToTextJournaling: 'Voice-to-text journaling',
    weeklyMonthlyInsights: 'Weekly & monthly insights',
    privacyFirstStorage: 'Privacy-first data storage',
    
    // Pricing page
    chooseYourPath: 'Choose Your Path to Peace',
    startMentalWellness: 'Start your mental wellness journey with our free plan, or unlock the full potential of Islamic-inspired anxiety relief with Pro features.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    save17: 'Save 17%',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    essentialPanicRelief: 'Essential panic relief and basic CBT tools',
    completeMentalWellness: 'Complete mental wellness toolkit with advanced features',
    proFeaturesFamily: 'Pro features for up to 6 family members',
    
    // Tools page
    freeToolsTitle: 'Free Mental Wellness Tools',
    freeToolsDescription: 'Try our evidence-based anxiety relief tools for free. Test the power of Sakina before downloading the full app.',
    freeUsageToday: 'Free usage today',
    sessionsUsed: 'session used',
    resetsDaily: 'resets daily',
    unlimitedWithPro: 'Unlimited with Pro',
    breathingExercises: 'Breathing Exercises',
    breathingExercisesDesc: '4-7-8 and square breathing techniques',
    moodCheckIn: 'Mood Check-in',
    moodCheckInDesc: 'Track your emotional state',
    cbtThoughtRecord: 'CBT Thought Record',
    cbtThoughtRecordDesc: 'Challenge negative thoughts',
    guidedMeditations: 'Guided Meditations',
    guidedMeditationsDesc: 'Soothing audio sessions',
    immediateRelief: 'Immediate relief for panic attacks',
    readyForMore: 'Ready for More?',
    getUnlimitedAccess: 'Get unlimited access to all tools, advanced CBT worksheets, guided meditations, Islamic content, and more with Sakina Pro.',
    supportMission: 'Want to support our mission?',
    makeADonation: 'Make a Donation',
    
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
    tools: 'Outils',
    
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
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
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
    
    // Homepage features
    freeToUse: 'Gratuit à utiliser',
    noAds: 'Sans publicité',
    tryPanicReliefButton: 'Essayez le Bouton Anti-Panique',
    experienceGuidedProcess: 'Découvrez notre processus guidé de soulagement de la panique en 4 étapes',
    feelingOverwhelmed: 'Vous vous sentez dépassé(e) ? Cet exercice guidé vous aidera à traverser une crise de panique en 4 étapes simples.',
    iNeedHelp: 'J\'ai besoin d\'aide',
    tapForRelief: 'Appuyez pour soulagement',
    everythingYouNeed: 'Tout ce dont vous avez besoin',
    sakinaCombines: 'Sakina combine des outils de santé mentale basés sur des preuves avec des pratiques islamiques optionnelles pour fournir un soutien complet et culturellement sensible pour l\'anxiété et le stress.',
    
    // Email Collection
    stayUpdated: 'Restez Informé',
    getNotifiedWhenAppLaunches: 'Soyez averti quand l\'application sera lancée',
    notifyMe: 'Me Notifier',
    joinThousands: 'Rejoignez des Milliers d\'Utilisateurs',
    beFirstToKnow: 'Soyez le premier à savoir quand Sakina sera disponible',
    getEarlyAccess: 'Obtenir un Accès Anticipé',
    downloadReminder: 'Rappel de Téléchargement',
    remindMeWhenReady: 'Rappelez-moi quand c\'est prêt',
    remindMe: 'Me Rappeler',
    enterYourEmail: 'Entrez votre email',
    pleaseEnterValidEmail: 'Veuillez entrer un email valide',
    somethingWentWrong: 'Quelque chose s\'est mal passé',
    submitting: 'Envoi en cours...',
    thankYouForJoining: 'Merci de nous avoir rejoint !',
    wellKeepYouUpdated: 'Nous vous tiendrons au courant des dernières nouvelles',
    earlyAccess: 'Accès anticipé',
    exclusiveContent: 'Contenu exclusif',
    communityUpdates: 'Mises à jour communautaires',
    mentalWellnessTips: 'Conseils de bien-être mental',
    freeResources: 'Ressources gratuites',
    betaAccess: 'Accès bêta',
    whatYouGet: 'Ce que vous obtenez :',
    noSpamPromise: 'Pas de spam, promis',
    unsubscribeAnytime: 'Désabonnement à tout moment',
    
    // Interactive Features
    panicReliefDemo: 'Démo Anti-Panique',
    experienceInstantCalm: 'Découvrez un soulagement instantané de l\'anxiété',
    cbtToolsDemo: 'Démo Outils TCC',
    reframeNegativeThoughts: 'Recadrez vos pensées négatives',
    islamicIntegrationDemo: 'Démo Intégration Islamique',
    connectWithFaith: 'Connectez-vous avec votre foi',
    recognizePanic: 'Reconnaître la Panique',
    identifyPanicSymptoms: 'Identifiez les symptômes de panique',
    breatheSlowly: 'Respirez lentement',
    groundYourself: 'Ancrez-vous',
    use54321Technique: 'Utilisez la technique 5-4-3-2-1',
    lookAround: 'Regardez autour de vous',
    breatheWithUs: 'Respirez avec nous',
    followBreathingPattern: 'Suivez le rythme de respiration',
    inhaleExhale: 'Inspirez... Expirez...',
    findCalm: 'Trouvez le Calme',
    feelPeaceReturning: 'Sentez la paix revenir',
    youAreStrong: 'Vous êtes fort(e)',
    identifyThought: 'Identifier la Pensée',
    whatAreYouThinking: 'À quoi pensez-vous ?',
    writeItDown: 'Écrivez-le',
    challengeThought: 'Défier la Pensée',
    isThisThoughtHelpful: 'Cette pensée est-elle utile ?',
    questionIt: 'Questionnez-la',
    replaceThought: 'Remplacer la Pensée',
    findBalancedPerspective: 'Trouvez une perspective équilibrée',
    reframe: 'Recadrez',
    practiceNew: 'Pratiquer le Nouveau',
    reinforcePositiveThinking: 'Renforcez la pensée positive',
    believeIt: 'Croyez-y',
    rememberAllah: 'Se Souvenir d\'Allah',
    turnToAllahInDifficulty: 'Tournez-vous vers Allah dans la difficulté',
    reciteDhikr: 'Réciter le Dhikr',
    calmHeartWithRemembrance: 'Calmez votre cœur avec le rappel',
    seekComfort: 'Chercher le Réconfort',
    findPeaceInQuran: 'Trouvez la paix dans le Coran',
    reciteAyah: 'Récitez un verset',
    trustAllah: 'Faire Confiance à Allah',
    surrenderToAllahsWill: 'Abandonnez-vous à la volonté d\'Allah',
    congratulations: 'Félicitations !',
    youCompletedFeature: 'Vous avez terminé cette fonctionnalité !',
    downloadFullApp: 'Télécharger l\'App Complète',
    likedThisFeature: 'Vous avez aimé cette fonctionnalité ?',
    downloadSakinaApp: 'Téléchargez l\'application Sakina',
    forFullExperience: 'pour l\'expérience complète',
    startDemo: 'Commencer la Démo',
    interactive: 'Interactif',
    evidenceBased: 'Basé sur des Preuves',
    step: 'Étape',
    of: 'sur',
    complete: 'Terminé',
    restart: 'Redémarrer',
    thisFeatureHelps: 'Cette fonctionnalité aide à :',
    reduceAnxietyFast: 'Réduire l\'anxiété rapidement',
    groundInPresent: 'S\'ancrer dans le présent',
    calmNervousSystem: 'Calmer le système nerveux',
    identifyNegativePatterns: 'Identifier les schémas négatifs',
    developHealthyThinking: 'Développer une pensée saine',
    buildResilienceSkills: 'Construire des compétences de résilience',
    strengthenFaithConnection: 'Renforcer la connexion à la foi',
    findSpiritualComfort: 'Trouver le réconfort spirituel',
    integrateIslamicPractices: 'Intégrer les pratiques islamiques',
    tryOurFeatures: 'Essayez Nos Fonctionnalités',
    experienceInteractiveDemo: 'Découvrez nos outils interactifs et voyez comment Sakina peut vous aider à gérer l\'anxiété et le stress.',
    
    // Features page
    featuresThatHelp: 'Des fonctionnalités qui aident vraiment',
    tryThisFeature: 'Essayez cette fonctionnalité',
    instantAccessToCalm: 'Accès instantané au calme',
    reframeYourThoughts: 'Recadrez vos pensées',
    findYourPeace: 'Trouvez votre paix',
    stayPrivate: 'Restez privé',
    worksOffline: 'Fonctionne 100% hors ligne après téléchargement',
    groundingTechnique: 'Technique d\'ancrage 5-4-3-2-1',
    breathingPatterns: 'Modèles de respiration carrée et 4-7-8',
    islamicDhikrIntegration: 'Intégration optionnelle du dhikr islamique',
    emergencyContactQuickDial: 'Numérotation rapide des contacts d\'urgence',
    thoughtRecordWorksheets: 'Feuilles de travail d\'enregistrement des pensées',
    cognitiveRestructuring: 'Restructuration cognitive',
    behavioralActivation: 'Activation comportementale',
    mindfulnessIntegration: 'Intégration de la pleine conscience',
    islamicPerspectives: 'Perspectives islamiques optionnelles',
    calmAudioLibrary: 'Bibliothèque audio apaisante',
    quranRecitations: 'Récitations du Coran',
    naturesSounds: 'Sons de la nature',
    sleepStories: 'Histoires pour dormir',
    dhikrSessions: 'Sessions de dhikr',
    endToEndEncryption: 'Chiffrement de bout en bout',
    offlineFirst: 'Hors ligne d\'abord',
    noDataCollection: 'Aucune collecte de données',
    openSource: 'Open source',
    hipaaCompliant: 'Conforme HIPAA',
    soothingSoundsRecitations: 'Sons et récitations apaisants',
    curatedCollection: 'Collection organisée de récitations coraniques, ruqyah, histoires pour dormir, sons de la nature et méditations guidées pour la relaxation.',
    highQualityAudio: 'Contenu audio de haute qualité',
    offlineDownload: 'Téléchargement hors ligne disponible',
    multipleReciters: 'Plusieurs récitateurs disponibles',
    sleepStoriesNature: 'Histoires pour dormir et sons de la nature',
    guidedDhikrMeditations: 'Méditations guidées de dhikr',
    moodJournal: 'Journal d\'humeur',
    trackWellnessJourney: 'Suivez votre parcours de bien-être',
    dailyMoodCheckins: 'Vérifications d\'humeur quotidiennes avec suivi de la valence, de l\'excitation, des étiquettes et des notes vocales, plus des insights pour comprendre vos modèles.',
    simpleMoodRating: 'Système de notation d\'humeur simple',
    customizableMoodTags: 'Étiquettes d\'humeur personnalisables',
    voiceToTextJournaling: 'Journalisation vocale vers texte',
    weeklyMonthlyInsights: 'Insights hebdomadaires et mensuels',
    privacyFirstStorage: 'Stockage de données axé sur la confidentialité',
    
    // Pricing page
    chooseYourPath: 'Choisissez Votre Chemin vers la Sérénité',
    startMentalWellness: 'Commencez votre parcours de bien-être mental avec notre plan gratuit, ou débloquez le plein potentiel du soulagement de l\'anxiété inspiré de l\'Islam avec les fonctionnalités Pro.',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    save17: 'Économisez 17%',
    mostPopular: 'Plus Populaire',
    bestValue: 'Meilleure Valeur',
    essentialPanicRelief: 'Soulagement essentiel de la panique et outils TCC de base',
    completeMentalWellness: 'Boîte à outils complète de bien-être mental avec fonctionnalités avancées',
    proFeaturesFamily: 'Fonctionnalités Pro pour jusqu\'à 6 membres de la famille',
    
    // Tools page
    freeToolsTitle: 'Outils de Bien-être Mental Gratuits',
    freeToolsDescription: 'Essayez nos outils de soulagement de l\'anxiété basés sur des preuves gratuitement. Testez la puissance de Sakina avant de télécharger l\'application complète.',
    freeUsageToday: 'Utilisation gratuite aujourd\'hui',
    sessionsUsed: 'session utilisée',
    resetsDaily: 'se remet à zéro quotidiennement',
    unlimitedWithPro: 'Illimité avec Pro',
    breathingExercises: 'Exercices de respiration',
    breathingExercisesDesc: 'Techniques de respiration 4-7-8 et respiration carrée',
    moodCheckIn: 'Vérification d\'humeur',
    moodCheckInDesc: 'Suivez votre état émotionnel',
    cbtThoughtRecord: 'Enregistrement de pensées TCC',
    cbtThoughtRecordDesc: 'Défiez les pensées négatives',
    guidedMeditations: 'Méditations guidées',
    guidedMeditationsDesc: 'Sessions audio apaisantes',
    immediateRelief: 'Soulagement immédiat pour les crises de panique',
    readyForMore: 'Prêt pour plus ?',
    getUnlimitedAccess: 'Obtenez un accès illimité à tous les outils, feuilles de travail TCC avancées, méditations guidées, contenu islamique, et plus avec Sakina Pro.',
    supportMission: 'Vous voulez soutenir notre mission ?',
    makeADonation: 'Faire un don',
    
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
    tryPanicReliefButton: 'جرب زر تخفيف الهلع',
    experienceGuidedProcess: 'اختبر عملية تخفيف الهلع الموجهة من 4 خطوات',
    feelingOverwhelmed: 'تشعر بالإرهاق؟ هذا التمرين الموجه سيساعدك خلال نوبة الهلع في 4 خطوات بسيطة.',
    iNeedHelp: 'أحتاج مساعدة',
    tapForRelief: 'اضغط للراحة',
    everythingYouNeed: 'كل ما تحتاجه للعافية النفسية',
    sakinaCombines: 'تجمع سكينة بين أدوات الصحة النفسية المبنية على الأدلة والممارسات الإسلامية الاختيارية لتوفير دعم شامل للقلق والتوتر.',
    
    // Email Collection
    stayUpdated: 'ابق على اطلاع',
    getNotifiedWhenAppLaunches: 'احصل على إشعار عند إطلاق التطبيق',
    notifyMe: 'أشعرني',
    joinThousands: 'انضم إلى آلاف المستخدمين',
    beFirstToKnow: 'كن أول من يعرف عندما تصبح سكينة متاحة',
    getEarlyAccess: 'احصل على وصول مبكر',
    downloadReminder: 'تذكير التحميل',
    remindMeWhenReady: 'ذكرني عندما يصبح جاهزاً',
    remindMe: 'ذكرني',
    enterYourEmail: 'أدخل بريدك الإلكتروني',
    pleaseEnterValidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    somethingWentWrong: 'حدث خطأ ما',
    submitting: 'جاري الإرسال...',
    thankYouForJoining: 'شكراً لانضمامك إلينا!',
    wellKeepYouUpdated: 'سنبقيك على اطلاع بآخر الأخبار',
    earlyAccess: 'وصول مبكر',
    exclusiveContent: 'محتوى حصري',
    communityUpdates: 'تحديثات المجتمع',
    mentalWellnessTips: 'نصائح العافية النفسية',
    freeResources: 'موارد مجانية',
    betaAccess: 'وصول تجريبي',
    whatYouGet: 'ما ستحصل عليه:',
    noSpamPromise: 'لا رسائل مزعجة، وعد',
    unsubscribeAnytime: 'إلغاء الاشتراك في أي وقت',
    
    // Interactive Features
    panicReliefDemo: 'عرض تخفيف الهلع',
    experienceInstantCalm: 'اختبر الهدوء الفوري من القلق',
    cbtToolsDemo: 'عرض أدوات العلاج المعرفي السلوكي',
    reframeNegativeThoughts: 'أعد تأطير أفكارك السلبية',
    islamicIntegrationDemo: 'عرض التكامل الإسلامي',
    connectWithFaith: 'تواصل مع إيمانك',
    recognizePanic: 'التعرف على الهلع',
    identifyPanicSymptoms: 'تحديد أعراض الهلع',
    breatheSlowly: 'تنفس ببطء',
    groundYourself: 'اربط نفسك بالواقع',
    use54321Technique: 'استخدم تقنية 5-4-3-2-1',
    lookAround: 'انظر حولك',
    breatheWithUs: 'تنفس معنا',
    followBreathingPattern: 'اتبع نمط التنفس',
    inhaleExhale: 'استنشق... ازفر...',
    findCalm: 'اعثر على الهدوء',
    feelPeaceReturning: 'اشعر بعودة السلام',
    youAreStrong: 'أنت قوي',
    identifyThought: 'تحديد الفكرة',
    whatAreYouThinking: 'بماذا تفكر؟',
    writeItDown: 'اكتبها',
    challengeThought: 'تحدي الفكرة',
    isThisThoughtHelpful: 'هل هذه الفكرة مفيدة؟',
    questionIt: 'اسألها',
    replaceThought: 'استبدال الفكرة',
    findBalancedPerspective: 'اعثر على منظور متوازن',
    reframe: 'أعد التأطير',
    practiceNew: 'مارس الجديد',
    reinforcePositiveThinking: 'عزز التفكير الإيجابي',
    believeIt: 'آمن به',
    rememberAllah: 'تذكر الله',
    turnToAllahInDifficulty: 'توجه إلى الله في الصعوبة',
    reciteDhikr: 'اتل الذكر',
    calmHeartWithRemembrance: 'اهدئ قلبك بالذكر',
    seekComfort: 'اطلب الراحة',
    findPeaceInQuran: 'اعثر على السلام في القرآن',
    reciteAyah: 'اتل آية',
    trustAllah: 'ثق بالله',
    surrenderToAllahsWill: 'استسلم لإرادة الله',
    congratulations: 'تهانينا!',
    youCompletedFeature: 'لقد أكملت هذه الميزة!',
    downloadFullApp: 'حمل التطبيق الكامل',
    likedThisFeature: 'أعجبتك هذه الميزة؟',
    downloadSakinaApp: 'حمل تطبيق سكينة',
    forFullExperience: 'للحصول على التجربة الكاملة',
    startDemo: 'ابدأ العرض',
    interactive: 'تفاعلي',
    evidenceBased: 'مبني على الأدلة',
    step: 'خطوة',
    of: 'من',
    complete: 'مكتمل',
    restart: 'إعادة البدء',
    thisFeatureHelps: 'هذه الميزة تساعد في:',
    reduceAnxietyFast: 'تقليل القلق بسرعة',
    groundInPresent: 'الارتباط بالحاضر',
    calmNervousSystem: 'تهدئة الجهاز العصبي',
    identifyNegativePatterns: 'تحديد الأنماط السلبية',
    developHealthyThinking: 'تطوير التفكير الصحي',
    buildResilienceSkills: 'بناء مهارات المرونة',
    strengthenFaithConnection: 'تقوية الاتصال بالإيمان',
    findSpiritualComfort: 'العثور على الراحة الروحية',
    integrateIslamicPractices: 'دمج الممارسات الإسلامية',
    tryOurFeatures: 'جرب مميزاتنا',
    experienceInteractiveDemo: 'اكتشف أدواتنا التفاعلية وشاهد كيف يمكن لسكينة أن تساعدك في إدارة القلق والتوتر.',
    
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
    quranRecitations: 'تلاوات القرآن',
    naturesSounds: 'أصوات الطبيعة',
    sleepStories: 'قصص النوم',
    dhikrSessions: 'جلسات الذكر',
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
    // Get language from localStorage or default to 'ar' (Arabic)
    return localStorage.getItem('sakina-language') || 'ar'
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

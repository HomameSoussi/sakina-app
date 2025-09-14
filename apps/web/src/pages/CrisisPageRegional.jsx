import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Alert, AlertDescription } from '../components/ui/alert'
import { AlertTriangle, Phone, MessageCircle, Globe, Heart, Shield, Users, Clock } from 'lucide-react'

const CrisisPageRegional = () => {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">
              {language === 'ar' 
                ? 'في حالة الخطر الفوري، اتصل بخدمات الطوارئ: 999 (السعودية)، 15 (المغرب)، 911 (أمريكا)، 999 (بريطانيا)'
                : "If you're in immediate danger, call emergency services: 999 (KSA), 15 (Morocco), 911 (US), 999 (UK)"
              }
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            {language === 'ar' ? 'دعم الأزمات • متاح 24/7' : 'Crisis Support • Available 24/7'}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'ar' ? 'لست وحدك' : 'You Are Not Alone'}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'إذا كنت تواجه أزمة صحة نفسية، فالمساعدة الفورية متاحة. هذه الموارد توفر الدعم المهني عندما تحتاجه أكثر.'
              : "If you're experiencing a mental health crisis, immediate help is available. These resources provide professional support when you need it most."
            }
          </p>
          
          <Alert className="mt-6 max-w-2xl mx-auto">
            <Heart className="h-4 w-4" />
            <AlertDescription className="text-left">
              <strong>{language === 'ar' ? 'تذكر:' : 'Remember:'}</strong>{' '}
              {language === 'ar' 
                ? 'طلب المساعدة علامة قوة وليس ضعف. الدعم المهني يمكن أن يوفر الراحة الفورية واستراتيجيات طويلة المدى للتعافي.'
                : "Seeking help is a sign of strength, not weakness. Professional support can provide immediate relief and long-term strategies for recovery."
              }
            </AlertDescription>
          </Alert>
        </div>

        {/* Regional Crisis Resources */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Saudi Arabia */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">🇸🇦</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Emergency Services */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'خدمات الطوارئ' : 'Emergency Services'}
                </h3>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Phone className="h-4 w-4" />
                  <span className="font-mono text-lg">999</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? '24/7' : '24/7'}
                  </span>
                </div>
              </div>

              {/* Mental Health Helpline */}
              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'خط المساعدة للصحة النفسية' : 'Mental Health Helpline'}
                </h3>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <Phone className="h-4 w-4" />
                  <span className="font-mono text-lg">937</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? '24/7' : '24/7'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'وزارة الصحة - خدمة الاستشارة النفسية' : 'Ministry of Health - Psychological Consultation Service'}
                </p>
              </div>

              {/* National Center for Mental Health */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'المركز الوطني للصحة النفسية' : 'National Center for Mental Health'}
                </h3>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">ncmh.gov.sa</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'موارد وخدمات الصحة النفسية' : 'Mental health resources and services'}
                </p>
              </div>

              {/* Islamic Counseling */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'الإرشاد الإسلامي' : 'Islamic Counseling'}
                </h3>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">
                    {language === 'ar' ? 'مراكز الإرشاد الأسري' : 'Family Counseling Centers'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'إرشاد نفسي متوافق مع القيم الإسلامية' : 'Psychological counseling compatible with Islamic values'}
                </p>
              </div>
            </div>
          </div>

          {/* Morocco */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">🇲🇦</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'المملكة المغربية' : 'Morocco'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Emergency Services */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'خدمات الطوارئ' : 'Emergency Services'}
                </h3>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Phone className="h-4 w-4" />
                  <span className="font-mono text-lg">15</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? '24/7' : '24/7'}
                  </span>
                </div>
              </div>

              {/* SOS Amitié Maroc */}
              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'خط الاستماع والدعم النفسي' : 'SOS Amitié Maroc'}
                </h3>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <Phone className="h-4 w-4" />
                  <span className="font-mono text-lg">0801 000 180</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'مجاني' : 'Free'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'خدمة الاستماع والدعم النفسي' : 'Listening and psychological support service'}
                </p>
              </div>

              {/* Ministry of Health */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'وزارة الصحة' : 'Ministry of Health'}
                </h3>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">sante.gov.ma</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'خدمات الصحة النفسية والعقلية' : 'Mental health and psychiatric services'}
                </p>
              </div>

              {/* Islamic Guidance */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'الإرشاد الديني' : 'Religious Guidance'}
                </h3>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">
                    {language === 'ar' ? 'المجلس العلمي المحلي' : 'Local Scientific Council'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'إرشاد روحي ونفسي متوافق مع التعاليم الإسلامية' : 'Spiritual and psychological guidance compatible with Islamic teachings'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* International Islamic Mental Health Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="text-2xl">🕌</div>
            {language === 'ar' ? 'موارد الصحة النفسية الإسلامية' : 'Islamic Mental Health Resources'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Khalil Center */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Khalil Center</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'علم النفس الإسلامي وخدمات الصحة النفسية' : 'Islamic psychology and mental health services'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'خدمات العلاج' : 'Therapy Services'}
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'علم النفس الإسلامي' : 'Islamic Psychology'}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'دعم الأزمات' : 'Crisis Support'}
                </span>
              </div>
            </div>

            {/* Maristan */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Maristan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'منصة الصحة النفسية للمجتمع المسلم' : 'Mental health platform for Muslim community'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'علاج عبر الإنترنت' : 'Online Therapy'}
                </span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'الإرشاد الإسلامي' : 'Islamic Counseling'}
                </span>
                <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'مجموعات الدعم' : 'Support Groups'}
                </span>
              </div>
            </div>

            {/* ISNA Mental Health */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ISNA Mental Health</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'موارد الصحة النفسية ودليل المستشارين' : 'Mental health resources and counselor directory'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'دليل المستشارين' : 'Counselor Directory'}
                </span>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'موارد تعليمية' : 'Educational Resources'}
                </span>
                <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'دعم المجتمع' : 'Community Support'}
                </span>
              </div>
            </div>

            {/* Naseeha Mental Health */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Naseeha Mental Health</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'خط المساعدة للأزمات للشباب المسلم' : 'Crisis helpline for Muslim youth'}
              </p>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-3">
                <Phone className="h-4 w-4" />
                <span className="font-mono">1-866-627-3342</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'خط المساعدة للأزمات' : 'Crisis Helpline'}
                </span>
                <span className="bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'دعم الأقران' : 'Peer Support'}
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded text-xs">
                  {language === 'ar' ? 'الإرشاد الإسلامي' : 'Islamic Guidance'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* When to Seek Help */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            {language === 'ar' ? 'متى تطلب المساعدة' : 'When to Seek Help'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3">
                {language === 'ar' ? 'علامات الخطر الفوري' : 'Immediate Danger Signs'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• {language === 'ar' ? 'أفكار الانتحار أو إيذاء النفس' : 'Thoughts of suicide or self-harm'}</li>
                <li>• {language === 'ar' ? 'خطط لإيذاء النفس أو الآخرين' : 'Plans to hurt yourself or others'}</li>
                <li>• {language === 'ar' ? 'الشعور بالانحصار أو اليأس' : 'Feeling trapped or hopeless'}</li>
                <li>• {language === 'ar' ? 'التحدث عن الموت أو الوفاة' : 'Talking about death or dying'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-3">
                {language === 'ar' ? 'أعراض شديدة' : 'Severe Symptoms'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• {language === 'ar' ? 'نوبات هلع شديدة' : 'Severe panic attacks'}</li>
                <li>• {language === 'ar' ? 'عدم القدرة على العمل يومياً' : 'Inability to function daily'}</li>
                <li>• {language === 'ar' ? 'تقلبات مزاجية شديدة' : 'Extreme mood swings'}</li>
                <li>• {language === 'ar' ? 'سماع أو رؤية أشياء' : 'Hearing or seeing things'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
                {language === 'ar' ? 'تغييرات مقلقة' : 'Concerning Changes'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• {language === 'ar' ? 'تغييرات شخصية جذرية' : 'Dramatic personality changes'}</li>
                <li>• {language === 'ar' ? 'زيادة استخدام المواد' : 'Increased substance use'}</li>
                <li>• {language === 'ar' ? 'إهمال المسؤوليات' : 'Neglecting responsibilities'}</li>
                <li>• {language === 'ar' ? 'فقدان الاهتمام بكل شيء' : 'Loss of interest in everything'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Immediate Self-Care with Islamic Elements */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Heart className="h-6 w-6 text-teal-600" />
            {language === 'ar' ? 'استراتيجيات الرعاية الذاتية الفورية' : 'Immediate Self-Care Strategies'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Breathing Exercise */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {language === 'ar' ? 'تمرين التنفس' : 'Breathing Exercise'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'تنفس 4-7-8 لتهدئة الجهاز العصبي' : '4-7-8 breathing to calm your nervous system'}
              </p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>1. {language === 'ar' ? 'استنشق لمدة 4 عدات' : 'Inhale for 4 counts'}</li>
                <li>2. {language === 'ar' ? 'احبس لمدة 7 عدات' : 'Hold for 7 counts'}</li>
                <li>3. {language === 'ar' ? 'ازفر لمدة 8 عدات' : 'Exhale for 8 counts'}</li>
                <li>4. {language === 'ar' ? 'كرر 4 مرات' : 'Repeat 4 times'}</li>
              </ol>
            </div>

            {/* Grounding Technique */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {language === 'ar' ? 'تقنية التأريض' : 'Grounding Technique'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'طريقة 5-4-3-2-1 للعودة للحاضر' : '5-4-3-2-1 method to reconnect with the present'}
              </p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>1. {language === 'ar' ? '5 أشياء تراها' : '5 things you can see'}</li>
                <li>2. {language === 'ar' ? '4 أشياء تلمسها' : '4 things you can touch'}</li>
                <li>3. {language === 'ar' ? '3 أشياء تسمعها' : '3 things you can hear'}</li>
                <li>4. {language === 'ar' ? '2 أشياء تشمها' : '2 things you can smell'}</li>
                <li>5. {language === 'ar' ? 'شيء واحد تتذوقه' : '1 thing you can taste'}</li>
              </ol>
            </div>

            {/* Islamic Dhikr */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {language === 'ar' ? 'الذكر الإسلامي' : 'Islamic Dhikr'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'ذكر الله للراحة الروحية' : 'Remembrance of Allah for spiritual comfort'}
              </p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>1. {language === 'ar' ? 'لا حول ولا قوة إلا بالله' : 'La hawla wa la quwwata illa billah'}</li>
                <li>2. {language === 'ar' ? 'أستغفر الله' : 'Astaghfirullah'}</li>
                <li>3. {language === 'ar' ? 'سبحان الله' : 'Subhan Allah'}</li>
                <li>4. {language === 'ar' ? 'الحمد لله رب العالمين' : 'Alhamdulillahi rabbil alameen'}</li>
              </ol>
            </div>

            {/* Safety Planning */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {language === 'ar' ? 'تخطيط الأمان' : 'Safety Planning'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language === 'ar' ? 'إنشاء خطة للحظات الأزمة' : 'Create a plan for crisis moments'}
              </p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>1. {language === 'ar' ? 'حدد علامات الإنذار' : 'Identify warning signs'}</li>
                <li>2. {language === 'ar' ? 'اكتب استراتيجيات التأقلم' : 'List coping strategies'}</li>
                <li>3. {language === 'ar' ? 'اتصل بأشخاص موثوقين' : 'Contact trusted people'}</li>
                <li>4. {language === 'ar' ? 'أزل الأشياء الضارة' : 'Remove harmful items'}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'المساعدة متاحة دائماً' : 'Help is Always Available'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {language === 'ar' 
              ? 'لا يجب أن تواجه هذا وحدك. المساعدة المهنية على بعد مكالمة أو رسالة نصية فقط.'
              : "You don't have to face this alone. Professional help is just a call or text away."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              {language === 'ar' ? 'اتصل بخط الأزمات' : 'Call Crisis Line'}
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              {language === 'ar' ? 'أرسل رسالة للمساعدة' : 'Text for Help'}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {language === 'ar' 
              ? 'متاح 24/7 • سري • مجاني • دعم مهني'
              : 'Available 24/7 • Confidential • Free • Professional support'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CrisisPageRegional

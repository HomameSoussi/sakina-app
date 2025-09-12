-- Insert initial crisis resources
INSERT INTO crisis_resources (country_code, organization_name, phone_number, sms_number, chat_url, website_url, description, languages, is_24_7) VALUES
('US', '988 Suicide & Crisis Lifeline', '988', '988', 'https://suicidepreventionlifeline.org/chat/', 'https://suicidepreventionlifeline.org/', 'Free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week, across the United States.', ARRAY['en', 'es'], true),
('US', 'Crisis Text Line', '', '741741', 'https://www.crisistextline.org/', 'https://www.crisistextline.org/', 'Free, 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US.', ARRAY['en', 'es'], true),
('CA', 'Talk Suicide Canada', '1-833-456-4566', '', 'https://talksuicide.ca/', 'https://talksuicide.ca/', '24/7 bilingual support for anyone having thoughts of suicide.', ARRAY['en', 'fr'], true),
('GB', 'Samaritans', '116123', '', 'https://www.samaritans.org/how-we-can-help/contact-samaritan/', 'https://www.samaritans.org/', 'Free support for anyone in emotional distress, struggling to cope, or at risk of suicide.', ARRAY['en'], true),
('AU', 'Lifeline', '13-11-14', '', 'https://www.lifeline.org.au/crisis-chat/', 'https://www.lifeline.org.au/', '24-hour crisis support and suicide prevention services.', ARRAY['en'], true),
('FR', 'SOS Amitié', '09-72-39-40-50', '', '', 'https://www.sos-amitie.org/', 'Emotional support and suicide prevention in France.', ARRAY['fr'], true),
('MA', 'SOS Détresse', '0801-000-180', '', '', '', 'Crisis support line in Morocco.', ARRAY['ar', 'fr'], true);

-- Insert initial Quranic content for anxiety relief
INSERT INTO quranic_content (type, arabic_text, transliteration, translation_en, translation_ar, translation_fr, surah_number, ayah_number, category, is_featured) VALUES
('ayah', 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا', 'Wa man yatawakkal ''ala Allahi fahuwa hasbuhu inna Allaha baligu amrihi qad ja''ala Allahu likulli shay''in qadra', 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set for everything a [decreed] extent.', 'ومن يتوكل على الله فهو حسبه إن الله بالغ أمره قد جعل الله لكل شيء قدرا', 'Et quiconque place sa confiance en Allah, Il [Allah] lui suffit. Allah atteint ce qu''Il Se propose. Allah a assigné une mesure à chaque chose.', 65, 3, 'anxiety', true),
('ayah', 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', 'Alladhina amanu wa tatma''innu qulubuhum bidhikri Allahi ala bidhikri Allahi tatma''innu alqulubu', 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.', 'الذين آمنوا وتطمئن قلوبهم بذكر الله ألا بذكر الله تطمئن القلوب', 'Ceux qui ont cru, et dont les cœurs se tranquillisent à l''évocation d''Allah. N''est-ce point par l''évocation d''Allah que se tranquillisent les cœurs?', 13, 28, 'peace', true),
('ayah', 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', 'Wa la tahinu wa la tahzanu wa antumu al-a''lawna in kuntum mu''minina', 'So do not weaken and do not grieve, and you will be superior if you are [true] believers.', 'ولا تهنوا ولا تحزنوا وأنتم الأعلون إن كنتم مؤمنين', 'Ne faiblissez donc pas et ne vous attristez pas alors que vous êtes les supérieurs, si vous êtes croyants.', 3, 139, 'strength', true),
('dua', 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ', 'Allahumma inni a''udhu bika minal-hammi wal-hazan', 'O Allah, I seek refuge in You from anxiety and sorrow', 'اللهم إني أعوذ بك من الهم والحزن', 'Ô Allah, je cherche refuge auprès de Toi contre l''anxiété et la tristesse', NULL, NULL, 'anxiety', true),
('dua', 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', 'Hasbuna Allahu wa ni''mal-wakeel', 'Allah is sufficient for us, and He is the best Disposer of affairs', 'حسبنا الله ونعم الوكيل', 'Allah nous suffit; Il est notre meilleur garant', NULL, NULL, 'trust', true),
('dhikr', 'سُبْحَانَ اللَّهِ', 'Subhan Allah', 'Glory be to Allah', 'سبحان الله', 'Gloire à Allah', NULL, NULL, 'peace', false),
('dhikr', 'الْحَمْدُ لِلَّهِ', 'Alhamdulillah', 'Praise be to Allah', 'الحمد لله', 'Louange à Allah', NULL, NULL, 'gratitude', false),
('dhikr', 'اللَّهُ أَكْبَرُ', 'Allahu Akbar', 'Allah is the Greatest', 'الله أكبر', 'Allah est le plus grand', NULL, NULL, 'strength', false),
('dhikr', 'لَا إِلَٰهَ إِلَّا اللَّهُ', 'La ilaha illa Allah', 'There is no god but Allah', 'لا إله إلا الله', 'Il n''y a de divinité qu''Allah', NULL, NULL, 'faith', false);

-- Insert initial lessons
INSERT INTO content_lessons (slug, title, description, body_md, lang, category, difficulty_level, estimated_read_time_min, is_premium, sort_order, published_at) VALUES
('understanding-anxiety', 'Understanding Anxiety', 'Learn what anxiety is and how it affects your mind and body', '# Understanding Anxiety

Anxiety is a natural human emotion that everyone experiences from time to time. It''s your body''s way of responding to stress and alerting you to potential danger. However, when anxiety becomes overwhelming or persistent, it can interfere with your daily life.

## What Happens in Your Body

When you feel anxious, your body activates its "fight-or-flight" response:
- Your heart rate increases
- Your breathing becomes faster and shallower
- Your muscles tense up
- Your mind races with worried thoughts

## Types of Anxiety

There are several types of anxiety disorders:
- **Generalized Anxiety Disorder (GAD)**: Persistent worry about various aspects of life
- **Panic Disorder**: Sudden, intense episodes of fear
- **Social Anxiety**: Fear of social situations and judgment
- **Specific Phobias**: Intense fear of specific objects or situations

## The Islamic Perspective

In Islam, we understand that tests and difficulties are part of life''s journey. The Quran reminds us:

> "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose." (Quran 65:3)

Remember that seeking help for anxiety is not a sign of weak faith, but rather taking care of the body and mind that Allah has entrusted to you.

## When to Seek Help

Consider seeking professional help if:
- Anxiety interferes with your daily activities
- You avoid situations due to anxiety
- Physical symptoms are severe or persistent
- You have thoughts of self-harm

Remember, there is no shame in seeking help. Taking care of your mental health is part of taking care of yourself as a whole person.', 'en', 'basics', 1, 5, false, 1, NOW()),

('breathing-techniques', 'Breathing Techniques for Calm', 'Master simple breathing exercises to reduce anxiety and find peace', '# Breathing Techniques for Calm

Breathing is one of the most powerful tools you have to manage anxiety. When we''re anxious, our breathing often becomes shallow and rapid, which can make anxiety worse. By learning to control your breath, you can activate your body''s relaxation response.

## Box Breathing (4-4-4-4)

This technique is simple yet effective:
1. Inhale for 4 counts
2. Hold for 4 counts
3. Exhale for 4 counts
4. Hold for 4 counts
5. Repeat for 5-10 cycles

## 4-7-8 Breathing

This technique is particularly good for sleep and deep relaxation:
1. Inhale for 4 counts
2. Hold for 7 counts
3. Exhale for 8 counts
4. Repeat for 4-8 cycles

## Breathing with Dhikr

You can combine breathing exercises with Islamic remembrance:
- **Inhale**: "La" (لا)
- **Exhale**: "ilaha illa Allah" (إله إلا الله)

Or simply repeat "Subhan Allah" (سبحان الله) with each breath.

## Tips for Success

- Practice regularly, not just when anxious
- Find a quiet, comfortable place
- Focus on the sensation of breathing
- Be patient with yourself as you learn

## The Science Behind It

Deep breathing activates the parasympathetic nervous system, which:
- Slows your heart rate
- Lowers blood pressure
- Reduces stress hormones
- Promotes feelings of calm

Remember, these techniques take practice. Start with just a few minutes each day and gradually increase as you become more comfortable.', 'en', 'techniques', 1, 4, false, 2, NOW()),

('grounding-exercises', '5-4-3-2-1 Grounding Technique', 'Use your senses to stay present and calm during anxiety', '# 5-4-3-2-1 Grounding Technique

Grounding techniques help you stay connected to the present moment when anxiety makes your mind race. The 5-4-3-2-1 technique uses your five senses to anchor you in the here and now.

## How It Works

When you feel anxious or overwhelmed, slowly work through each step:

### 5 Things You Can See
Look around and name 5 things you can see. Be specific:
- "I see a blue pen on the desk"
- "I see sunlight coming through the window"
- "I see a plant with green leaves"

### 4 Things You Can Touch
Notice 4 different textures or sensations:
- The smooth surface of your phone
- The soft fabric of your clothes
- The cool air on your skin
- The texture of a nearby object

### 3 Things You Can Hear
Listen carefully and identify 3 sounds:
- Birds singing outside
- The hum of air conditioning
- Distant traffic sounds

### 2 Things You Can Smell
Take a moment to notice scents around you:
- Coffee brewing
- Fresh air
- A subtle perfume

### 1 Thing You Can Taste
Notice any taste in your mouth:
- The lingering taste of tea
- Mint from gum
- Simply the neutral taste in your mouth

## Islamic Reflection

As you practice grounding, remember that Allah has blessed you with these senses. The Quran says:

> "And Allah has extracted you from the wombs of your mothers not knowing a thing, and He made for you hearing and vision and intellect that perhaps you would be grateful." (Quran 16:78)

Use this technique as a moment of gratitude for the gifts Allah has given you.

## When to Use This Technique

- During panic attacks
- When feeling overwhelmed
- Before important events
- Anytime you need to feel more present

## Making It Your Own

You can adapt this technique:
- Use it in any order
- Spend more time on senses that work best for you
- Combine it with gentle movement
- Practice it regularly, not just during anxiety

Remember, the goal is not to eliminate all anxiety, but to help you feel more grounded and in control.', 'en', 'techniques', 1, 3, false, 3, NOW()),

('islamic-perspective-anxiety', 'Islamic Perspective on Mental Health', 'Understanding anxiety and mental health through an Islamic lens', '# Islamic Perspective on Mental Health

Islam provides a comprehensive framework for understanding and addressing mental health challenges, including anxiety. This perspective emphasizes both spiritual and practical approaches to healing.

## Mental Health in Islamic Teaching

The Prophet Muhammad (peace be upon him) said: "Allah has not created a disease without creating a cure for it." This hadith reminds us that seeking treatment for mental health conditions is not only permissible but encouraged.

## Key Islamic Concepts for Mental Wellness

### Tawakkul (Trust in Allah)
Tawakkul means placing your trust in Allah while taking practical steps. For anxiety, this means:
- Making dua and seeking Allah''s help
- Also taking practical steps like therapy or medication
- Understanding that both spiritual and medical help come from Allah

### Sabr (Patience)
Sabr is not passive waiting, but active perseverance through difficulties:
- Accepting that healing takes time
- Continuing treatment even when progress seems slow
- Finding strength in Allah during difficult moments

### Qadar (Divine Decree)
Understanding that Allah''s wisdom encompasses all experiences:
- Difficulties can lead to spiritual growth
- Tests are opportunities for increased faith
- Allah does not burden a soul beyond its capacity

## Practical Islamic Approaches

### Regular Dhikr (Remembrance)
The Quran states: "Unquestionably, by the remembrance of Allah hearts are assured." (13:28)

Simple dhikr practices:
- "Subhan Allah" (Glory be to Allah)
- "Alhamdulillah" (Praise be to Allah)
- "Allahu Akbar" (Allah is Greatest)
- "La hawla wa la quwwata illa billah" (There is no power except with Allah)

### Salah (Prayer)
Regular prayer provides:
- Structure and routine
- Moments of peace and reflection
- Connection with Allah
- Community support (when praying in congregation)

### Seeking Knowledge
The Prophet (peace be upon him) encouraged seeking knowledge. This includes:
- Learning about mental health
- Understanding your condition
- Seeking qualified help

## Addressing Common Misconceptions

### "Mental illness means weak faith"
This is incorrect. Many righteous people throughout history experienced mental health challenges. The Prophet Yunus (Jonah) experienced deep distress, and Allah responded with mercy.

### "Medication shows lack of trust in Allah"
Taking medication is a form of seeking the cure that Allah has provided. Just as we take medicine for physical ailments, mental health treatment is equally valid.

### "Just pray more and it will go away"
While prayer is powerful and important, Allah has also given us medical knowledge and professionals to help. Combining spiritual and medical approaches is ideal.

## Finding Balance

The Islamic approach to mental health emphasizes:
- **Holistic care**: Addressing spiritual, emotional, and physical needs
- **Community support**: Seeking help from family, friends, and professionals
- **Continuous growth**: Using challenges as opportunities for spiritual development
- **Hope and mercy**: Remembering Allah''s infinite mercy and forgiveness

## Duas for Anxiety

The Prophet (peace be upon him) taught us specific duas for anxiety:

**For general anxiety:**
"Allahumma inni a''udhu bika minal-hammi wal-hazan"
(O Allah, I seek refuge in You from anxiety and sorrow)

**For trust in Allah:**
"Hasbuna Allahu wa ni''mal-wakeel"
(Allah is sufficient for us, and He is the best Disposer of affairs)

Remember, seeking help for mental health is a sign of wisdom and self-care, not weakness. Allah has provided both spiritual and practical means for healing, and using both is part of following His guidance.', 'en', 'islamic', 2, 8, false, 4, NOW()),

('cbt-basics', 'Introduction to Cognitive Behavioral Therapy', 'Learn how your thoughts, feelings, and behaviors are connected', '# Introduction to Cognitive Behavioral Therapy (CBT)

Cognitive Behavioral Therapy (CBT) is one of the most effective treatments for anxiety. It''s based on the idea that our thoughts, feelings, and behaviors are all connected and influence each other.

## The CBT Triangle

```
    THOUGHTS
       /\
      /  \
     /    \
    /      \
FEELINGS ---- BEHAVIORS
```

When you change one part of this triangle, the other parts change too.

## Common Thinking Patterns in Anxiety

### Catastrophizing
Imagining the worst possible outcome:
- "If I fail this test, my life is ruined"
- "This headache must be something serious"

### All-or-Nothing Thinking
Seeing things in black and white:
- "I''m either perfect or a complete failure"
- "If I make one mistake, I''m terrible at this"

### Mind Reading
Assuming you know what others are thinking:
- "Everyone thinks I''m weird"
- "They''re judging me"

### Fortune Telling
Predicting negative outcomes without evidence:
- "I know this won''t work out"
- "Something bad is going to happen"

## The CBT Process

### 1. Identify the Thought
When you feel anxious, ask: "What am I thinking right now?"

### 2. Examine the Evidence
- What evidence supports this thought?
- What evidence contradicts it?
- Am I using any thinking traps?

### 3. Develop a Balanced Thought
Create a more realistic, balanced perspective:
- Instead of: "I''ll definitely fail"
- Try: "I''m prepared, and even if I don''t do perfectly, I can learn from it"

### 4. Test the New Thought
Notice how the balanced thought affects your feelings and behaviors.

## Islamic Integration with CBT

CBT principles align well with Islamic teachings:

### Examining Thoughts
The Quran encourages reflection: "And it is He who created the heavens and earth in truth. And the day He says, ''Be,'' and it is, His word is the truth." (6:73)

### Balanced Thinking
Islam teaches moderation: "And thus we have made you a just community" (2:143)

### Hope and Trust
Replacing catastrophic thoughts with trust in Allah: "And whoever relies upon Allah - then He is sufficient for him" (65:3)

## Practical Exercise: Thought Record

When you notice anxiety, try this:

1. **Situation**: What happened?
2. **Emotion**: What did you feel? (Rate 1-10)
3. **Automatic Thought**: What went through your mind?
4. **Evidence For**: What supports this thought?
5. **Evidence Against**: What contradicts it?
6. **Balanced Thought**: What''s a more realistic view?
7. **New Emotion**: How do you feel now? (Rate 1-10)

## Remember

- CBT takes practice - be patient with yourself
- Start with small situations before tackling bigger fears
- Combine CBT techniques with your spiritual practices
- Consider working with a qualified therapist for guidance

The goal isn''t to eliminate all negative thoughts, but to develop a more balanced and realistic way of thinking that reduces unnecessary anxiety and helps you cope more effectively with life''s challenges.', 'en', 'cbt', 2, 7, true, 5, NOW()),

('sleep-anxiety', 'Managing Nighttime Anxiety', 'Techniques for better sleep when anxiety keeps you awake', '# Managing Nighttime Anxiety

Many people with anxiety find that their symptoms worsen at night. When the day''s distractions fade away, anxious thoughts can feel overwhelming. Here are strategies to help you find peace and rest.

## Why Anxiety Gets Worse at Night

- Fewer distractions allow worried thoughts to surface
- Fatigue makes it harder to cope with stress
- Lying in bed gives your mind time to race
- Fear of not sleeping can create more anxiety

## Creating a Calming Bedtime Routine

### 1 Hour Before Bed
- Dim the lights in your home
- Avoid screens or use blue light filters
- Do gentle stretching or light reading
- Practice gratitude by listing 3 good things from your day

### 30 Minutes Before Bed
- Take a warm shower or bath
- Practice breathing exercises
- Read Quran or make dua
- Write in a journal to "download" your thoughts

### In Bed
- Use progressive muscle relaxation
- Practice the 4-7-8 breathing technique
- Listen to calming recitation or nature sounds
- Visualize peaceful scenes

## Islamic Practices for Better Sleep

### Bedtime Duas
The Prophet (peace be upon him) taught us specific duas for sleep:

**Before sleeping:**
"Bismika Allahumma amutu wa ahya"
(In Your name, O Allah, I die and I live)

**For protection:**
"A''udhu bikalimatillahi at-tammati min sharri ma khalaq"
(I seek refuge in the perfect words of Allah from the evil of what He has created)

### Reciting Quran
- Surah Al-Fatiha (The Opening)
- Ayat al-Kursi (Quran 2:255)
- The last three surahs (Al-Ikhlas, Al-Falaq, An-Nas)

### Dhikr for Sleep
Repeat quietly:
- "Subhan Allah" (33 times)
- "Alhamdulillah" (33 times)
- "Allahu Akbar" (34 times)

## Dealing with Racing Thoughts

### The "Worry Window"
- Set aside 15 minutes earlier in the day for worrying
- Write down your concerns and potential solutions
- When worries arise at night, remind yourself: "I''ll think about this during my worry window tomorrow"

### Thought Stopping
- When anxious thoughts start, say "Stop" (mentally or aloud)
- Immediately redirect to something calming
- Count backwards from 100
- Recite a familiar surah or dua

### The 3-3-3 Rule
If you can''t sleep after 20 minutes:
- Name 3 things you can see in the dark
- Name 3 sounds you can hear
- Move 3 parts of your body (wiggle toes, stretch arms, etc.)

## Sleep Hygiene Basics

### Your Sleep Environment
- Keep your room cool (65-68°F/18-20°C)
- Make it as dark as possible
- Use comfortable bedding
- Remove or silence electronic devices

### Daily Habits
- Get sunlight exposure in the morning
- Avoid caffeine after 2 PM
- Exercise regularly, but not close to bedtime
- Keep a consistent sleep schedule

## When Anxiety Strikes at Night

### Don''t Fight It
- Accept that you''re feeling anxious
- Remind yourself: "This feeling will pass"
- Use it as an opportunity for extra dhikr or dua

### Get Up If Needed
If you''ve been lying awake for more than 20 minutes:
- Get up and do a quiet, calming activity
- Read something light or spiritual
- Practice breathing exercises in a chair
- Return to bed when you feel sleepy

### Remember Allah''s Mercy
The Quran reminds us: "And it is He who sends down rain after [people] have despaired and spreads His mercy" (42:28)

Just as Allah sends relief after difficulty, your anxiety will also pass.

## Professional Help

Consider seeing a doctor or therapist if:
- Sleep problems persist for more than a few weeks
- Anxiety significantly impacts your daily life
- You have thoughts of self-harm
- Physical symptoms are severe

Remember, seeking help is taking care of the body and mind Allah has entrusted to you.

## Final Thoughts

Sleep is a blessing from Allah. The Quran says: "And We made your sleep [a means for] rest" (78:9). 

Be patient with yourself as you develop these new habits. Some nights will be better than others, and that''s normal. Trust in Allah''s plan and take practical steps to care for yourself.

May Allah grant you peaceful sleep and relief from anxiety. Ameen.', 'en', 'techniques', 2, 6, true, 6, NOW());

-- Insert initial audio tracks (placeholder URLs - these would be replaced with actual audio files)
INSERT INTO audio_tracks (slug, title, description, kind, url, duration_sec, lang, is_premium, sort_order, published_at) VALUES
('surah-fatiha-recitation', 'Surah Al-Fatiha - Peaceful Recitation', 'Beautiful, slow recitation of Surah Al-Fatiha for meditation and calm', 'quran', 'https://example.com/audio/fatiha.mp3', 120, 'ar', false, 1, NOW()),
('ayat-kursi-recitation', 'Ayat al-Kursi - Protective Recitation', 'Recitation of the Throne Verse for protection and peace', 'quran', 'https://example.com/audio/ayat-kursi.mp3', 180, 'ar', false, 2, NOW()),
('ruqyah-anxiety', 'Ruqyah for Anxiety Relief', 'Islamic spiritual healing recitation specifically for anxiety and worry', 'ruqyah', 'https://example.com/audio/ruqyah-anxiety.mp3', 900, 'ar', true, 3, NOW()),
('sleep-story-garden', 'The Peaceful Garden', 'A calming sleep story about walking through a beautiful Islamic garden', 'story', 'https://example.com/audio/garden-story.mp3', 1200, 'en', true, 4, NOW()),
('rain-sounds', 'Gentle Rain Sounds', 'Natural rain sounds for relaxation and sleep', 'nature', 'https://example.com/audio/rain.mp3', 3600, 'en', false, 5, NOW()),
('dhikr-meditation', 'Guided Dhikr Meditation', 'Gentle guidance through remembrance of Allah with breathing', 'dhikr', 'https://example.com/audio/dhikr-meditation.mp3', 600, 'en', true, 6, NOW());

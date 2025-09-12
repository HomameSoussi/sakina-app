-- Seed data for anxiety relief content
-- This includes CBT techniques, breathing exercises, grounding techniques, and Islamic content

-- CBT Techniques
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'cbt_technique',
    'Thought Record Worksheet',
    'A thought record helps you identify and challenge negative thoughts that contribute to anxiety.

**Step 1: Identify the Situation**
What happened? Where were you? Who was involved?

**Step 2: Notice Your Emotions**
What emotions did you feel? Rate their intensity (1-10).

**Step 3: Catch Your Thoughts**
What thoughts went through your mind? What were you telling yourself?

**Step 4: Examine the Evidence**
- What evidence supports this thought?
- What evidence contradicts it?
- What would you tell a friend in this situation?

**Step 5: Create a Balanced Thought**
Based on the evidence, what''s a more balanced way to think about this situation?

**Step 6: Notice the Change**
How do you feel now? Rate your emotions again (1-10).',
    ARRAY['cbt', 'thought-record', 'anxiety', 'cognitive'],
    'cbt',
    'beginner',
    10,
    false,
    '{"steps": 6, "worksheet": true, "interactive": true}'::jsonb
),
(
    gen_random_uuid(),
    'cbt_technique',
    'Cognitive Distortions Guide',
    'Learn to identify common thinking patterns that increase anxiety.

**All-or-Nothing Thinking**
Seeing things in black and white categories.
*Example*: "I''m a complete failure" instead of "I made a mistake"

**Catastrophizing**
Imagining the worst possible outcome.
*Example*: "This headache means I have a brain tumor"

**Mind Reading**
Assuming you know what others are thinking.
*Example*: "They think I''m stupid"

**Fortune Telling**
Predicting negative outcomes without evidence.
*Example*: "I''ll definitely fail the exam"

**Emotional Reasoning**
Believing your feelings reflect reality.
*Example*: "I feel anxious, so something bad will happen"

**Should Statements**
Using "should," "must," or "have to" creates pressure.
*Example*: "I should never make mistakes"

**Labeling**
Calling yourself names based on mistakes.
*Example*: "I''m an idiot" instead of "I made an error"

**Mental Filter**
Focusing only on negative details.
*Example*: Remembering only criticism from a mostly positive review',
    ARRAY['cbt', 'cognitive-distortions', 'thinking-patterns', 'awareness'],
    'cbt',
    'beginner',
    8,
    false,
    '{"distortions": 8, "examples": true, "educational": true}'::jsonb
),
(
    gen_random_uuid(),
    'cbt_technique',
    'Worry Time Technique',
    'Schedule specific time for worrying to reduce anxiety throughout the day.

**How It Works:**
Instead of worrying all day, set aside 15-20 minutes as your "worry time."

**Steps:**
1. **Choose a Time**: Pick the same time each day (not before bed)
2. **Write Down Worries**: Throughout the day, write worries on paper
3. **Postpone Worrying**: Tell yourself "I''ll think about this during worry time"
4. **During Worry Time**: 
   - Review your list
   - For each worry, ask: "Can I do something about this?"
   - If yes: Make an action plan
   - If no: Practice acceptance
5. **End on Time**: When time is up, stop worrying

**Benefits:**
- Reduces constant anxiety
- Helps distinguish between productive and unproductive worry
- Gives you control over anxious thoughts
- Improves focus during the day

**Islamic Perspective:**
Allah says: "And whoever relies upon Allah - then He is sufficient for him" (Quran 65:3). Use worry time to make du''a and practice tawakkul (trust in Allah).',
    ARRAY['cbt', 'worry', 'time-management', 'control', 'islamic'],
    'cbt',
    'intermediate',
    15,
    false,
    '{"daily_practice": true, "time_based": true, "islamic_integration": true}'::jsonb
);

-- Breathing Exercises
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'breathing_exercise',
    '4-7-8 Breathing Technique',
    'A powerful breathing technique to calm anxiety and promote relaxation.

**How to Practice:**
1. **Exhale completely** through your mouth
2. **Inhale through nose** for 4 counts
3. **Hold your breath** for 7 counts  
4. **Exhale through mouth** for 8 counts
5. **Repeat 3-4 cycles**

**Tips:**
- Keep the ratio 4:7:8, adjust speed as needed
- Place tongue tip against roof of mouth
- Make a "whoosh" sound when exhaling
- Practice twice daily for best results

**When to Use:**
- Before sleep
- During panic attacks
- Before stressful situations
- When feeling overwhelmed

**Islamic Integration:**
While breathing, you can silently recite:
- Inhale: "La" (4 counts)
- Hold: "ilaha illa" (7 counts)  
- Exhale: "Allah" (8 counts)

This combines the calming breath with dhikr (remembrance of Allah).',
    ARRAY['breathing', '4-7-8', 'relaxation', 'panic', 'dhikr'],
    'breathing',
    'beginner',
    5,
    false,
    '{"counts": [4, 7, 8], "cycles": 4, "islamic_dhikr": "La ilaha illa Allah"}'::jsonb
),
(
    gen_random_uuid(),
    'breathing_exercise',
    'Box Breathing (4-4-4-4)',
    'A simple, balanced breathing technique used by Navy SEALs and meditation practitioners.

**The Pattern:**
1. **Inhale** for 4 counts
2. **Hold** for 4 counts
3. **Exhale** for 4 counts
4. **Hold empty** for 4 counts
5. **Repeat 5-10 cycles**

**Visualization:**
Imagine drawing a box:
- Inhale up the left side
- Hold across the top
- Exhale down the right side
- Hold across the bottom

**Benefits:**
- Activates parasympathetic nervous system
- Reduces stress hormones
- Improves focus and concentration
- Lowers heart rate and blood pressure

**Progressive Practice:**
- Week 1: 4-4-4-4 pattern
- Week 2: 5-5-5-5 pattern
- Week 3: 6-6-6-6 pattern

**Islamic Variation:**
With each breath cycle, recite one of the 99 Names of Allah:
- Inhale: "Ar-Rahman" (The Compassionate)
- Hold: "Ar-Raheem" (The Merciful)
- Exhale: "As-Sabur" (The Patient)
- Hold: "Al-Hakeem" (The Wise)',
    ARRAY['breathing', 'box-breathing', 'navy-seals', 'focus', 'names-of-allah'],
    'breathing',
    'beginner',
    8,
    false,
    '{"pattern": [4, 4, 4, 4], "cycles": 10, "progressive": true, "names_of_allah": true}'::jsonb
),
(
    gen_random_uuid(),
    'breathing_exercise',
    'Coherent Breathing (5-5)',
    'A balanced breathing pattern that promotes heart rate variability and emotional regulation.

**The Technique:**
1. **Inhale slowly** for 5 counts
2. **Exhale slowly** for 5 counts
3. **Continue for 5-20 minutes**
4. **Breathe through nose** if possible

**Science Behind It:**
- Optimizes heart rate variability
- Balances autonomic nervous system
- Increases vagal tone
- Promotes emotional stability

**Getting Started:**
- Begin with 5 minutes daily
- Gradually increase duration
- Use a metronome or app for timing
- Practice at the same time each day

**Advanced Practice:**
- Extend to 6-6 or 7-7 pattern
- Add gentle retention between breaths
- Combine with meditation or prayer

**Islamic Integration:**
Use this breathing during:
- Salah (prayer) preparation
- Dhikr sessions
- Quran recitation
- Istighfar (seeking forgiveness)

The steady rhythm helps maintain focus during spiritual practices.',
    ARRAY['breathing', 'coherent', 'heart-rate-variability', 'meditation', 'salah'],
    'breathing',
    'intermediate',
    10,
    false,
    '{"pattern": [5, 5], "duration_minutes": 10, "hrv_benefits": true, "salah_integration": true}'::jsonb
);

-- Grounding Techniques
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'grounding_technique',
    '5-4-3-2-1 Grounding Technique',
    'Use your five senses to ground yourself in the present moment during anxiety or panic.

**The Technique:**
Look around and identify:

**5 things you can SEE**
- A book on the shelf
- The color of the wall
- A plant in the corner
- Your hands
- A picture frame

**4 things you can TOUCH**
- The texture of your clothes
- The temperature of your skin
- The surface you''re sitting on
- Your phone in your pocket

**3 things you can HEAR**
- Traffic outside
- Your breathing
- A clock ticking

**2 things you can SMELL**
- Coffee brewing
- Fresh air
- Perfume or soap

**1 thing you can TASTE**
- Gum or mint
- The taste in your mouth
- A sip of water

**Why It Works:**
- Interrupts panic spiral
- Brings attention to present moment
- Activates different parts of the brain
- Provides immediate relief

**Islamic Addition:**
After completing 5-4-3-2-1, recite:
"Alhamdulillahi rabbil alameen" (Praise be to Allah, Lord of all worlds)
Thank Allah for the gift of your senses.',
    ARRAY['grounding', '5-4-3-2-1', 'senses', 'panic', 'present-moment', 'gratitude'],
    'grounding',
    'beginner',
    3,
    false,
    '{"senses": 5, "immediate_relief": true, "panic_interruption": true, "islamic_gratitude": true}'::jsonb
),
(
    gen_random_uuid(),
    'grounding_technique',
    'Progressive Muscle Relaxation',
    'Systematically tense and relax muscle groups to release physical anxiety.

**Preparation:**
- Find a quiet, comfortable space
- Sit or lie down
- Close your eyes or soften your gaze
- Take three deep breaths

**The Process:**
Work through each muscle group:

1. **Feet and Toes** (5 seconds)
   - Curl toes tightly
   - Release and notice the relaxation

2. **Calves** (5 seconds)
   - Point toes toward shins
   - Release and feel the relief

3. **Thighs** (5 seconds)
   - Squeeze thigh muscles
   - Let go completely

4. **Glutes** (5 seconds)
   - Clench buttocks
   - Release tension

5. **Abdomen** (5 seconds)
   - Tighten stomach muscles
   - Relax and breathe deeply

6. **Hands and Arms** (5 seconds)
   - Make fists, tense arms
   - Open hands, let arms fall

7. **Shoulders** (5 seconds)
   - Lift shoulders to ears
   - Drop them down

8. **Face** (5 seconds)
   - Scrunch all facial muscles
   - Smooth out expression

**Finishing:**
- Take 5 deep breaths
- Notice the difference in your body
- Slowly open your eyes

**Islamic Integration:**
Before starting, make intention (niyyah) to care for the body Allah has given you.
End with: "Rabbana atina fi''d-dunya hasanatan wa fi''l-akhirati hasanatan wa qina adhab an-nar" (Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire).',
    ARRAY['grounding', 'progressive-muscle-relaxation', 'tension-release', 'body-awareness', 'niyyah'],
    'grounding',
    'intermediate',
    15,
    false,
    '{"muscle_groups": 8, "duration_per_group": 5, "full_body": true, "islamic_intention": true}'::jsonb
);

-- Islamic Content
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'islamic_content',
    'Dhikr for Anxiety Relief',
    'Powerful remembrances of Allah to calm the heart and mind during times of distress.

**Core Dhikr for Anxiety:**

**1. La hawla wa la quwwata illa billah**
"There is no power except with Allah"
- Recite 100 times
- Reminds us that Allah is in control
- Releases the burden of trying to control everything

**2. Hasbunallahu wa ni''mal wakeel**
"Allah is sufficient for us, and He is the best Disposer of affairs"
- Recite 70 times
- Builds trust in Allah''s plan
- Reduces worry about the future

**3. Allahumma inni a''udhu bika minal-hammi wal-hazan**
"O Allah, I seek refuge in You from anxiety and grief"
- Authentic du''a from Prophet Muhammad ﷺ
- Directly addresses anxiety
- Seeks Allah''s protection

**4. Subhanallahi wa bihamdihi**
"Glory be to Allah and praise be to Him"
- Recite 100 times
- Brings peace to the heart
- Easy to remember and repeat

**5. Astaghfirullah**
"I seek forgiveness from Allah"
- Recite continuously
- Cleanses the heart
- Opens doors to relief

**How to Practice:**
- Use prayer beads (tasbih) for counting
- Recite after each prayer
- During moments of anxiety
- While walking or doing daily tasks

**Benefits:**
- Calms the nervous system
- Redirects focus from worries to Allah
- Strengthens spiritual connection
- Provides immediate comfort',
    ARRAY['dhikr', 'anxiety', 'remembrance', 'dua', 'islamic', 'tasbih'],
    'islamic',
    'beginner',
    10,
    false,
    '{"dhikr_count": 5, "authentic_duas": true, "tasbih_compatible": true, "anxiety_specific": true}'::jsonb
),
(
    gen_random_uuid(),
    'islamic_content',
    'Quranic Verses for Comfort',
    'Carefully selected verses from the Quran that provide comfort and peace during anxiety.

**Verse 1: Quran 13:28**
"الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"

"Those who believe and whose hearts find peace in the remembrance of Allah. Verily, in the remembrance of Allah do hearts find peace."

*Reflection*: This verse directly tells us that remembering Allah brings peace to anxious hearts.

**Verse 2: Quran 2:286**
"لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا"

"Allah does not burden a soul beyond that it can bear."

*Reflection*: Whatever you''re facing, Allah knows you have the strength to handle it.

**Verse 3: Quran 65:3**
"وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ"

"And whoever relies upon Allah - then He is sufficient for him."

*Reflection*: When we truly trust Allah, He takes care of everything we need.

**Verse 4: Quran 94:5-6**
"فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا"

"So verily, with hardship comes ease. Verily, with hardship comes ease."

*Reflection*: This is repeated twice for emphasis - relief always follows difficulty.

**Verse 5: Quran 39:53**
"قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ"

"Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah."

*Reflection*: No matter what mistakes we''ve made, Allah''s mercy is always available.

**How to Use These Verses:**
- Memorize one verse at a time
- Recite during moments of anxiety
- Reflect on the meaning
- Write them down and keep them visible
- Listen to beautiful recitations',
    ARRAY['quran', 'verses', 'comfort', 'peace', 'memorization', 'reflection'],
    'islamic',
    'beginner',
    15,
    false,
    '{"verses": 5, "arabic_included": true, "reflections": true, "memorization_friendly": true}'::jsonb
),
(
    gen_random_uuid(),
    'islamic_content',
    'Islamic Perspective on Mental Health',
    'Understanding anxiety and mental health through the lens of Islamic teachings.

**Islam''s Holistic Approach:**

**1. Body, Mind, and Soul Connection**
Islam recognizes that humans are complex beings with physical, mental, and spiritual needs. Mental health affects all three dimensions.

**2. Seeking Treatment is Encouraged**
Prophet Muhammad ﷺ said: "Allah has not created a disease without creating a cure for it." This includes mental health conditions.

**3. Balance Between Spiritual and Medical Care**
- Make du''a AND see a therapist
- Practice dhikr AND take medication if needed
- Trust Allah AND take practical steps

**Common Misconceptions:**

**❌ "Anxiety means weak faith"**
✅ Many prophets and righteous people experienced distress. Prophet Yusuf (AS) felt sadness, Prophet Musa (AS) felt fear.

**❌ "Just pray more and it will go away"**
✅ Prayer is powerful, but Allah also gave us doctors, therapists, and medicine as means of healing.

**❌ "Mental illness is a punishment"**
✅ Illness can be a test, purification, or simply part of human experience.

**Islamic Coping Strategies:**

**Tawakkul (Trust in Allah)**
- Make effort, then trust Allah with the outcome
- Reduces the burden of trying to control everything

**Sabr (Patience)**
- Enduring difficulties with grace
- Knowing that this too shall pass

**Gratitude (Shukr)**
- Focusing on blessings, even during hardship
- Shifts perspective from lack to abundance

**Community Support (Ummah)**
- Seeking help from fellow Muslims
- Sharing burdens with trusted friends

**Regular Worship**
- Five daily prayers provide structure
- Quran recitation brings peace
- Dhikr calms the heart

**Remember:**
Taking care of your mental health is part of taking care of the amanah (trust) that Allah has given you - your body and mind.',
    ARRAY['islamic-perspective', 'mental-health', 'holistic', 'misconceptions', 'tawakkul', 'sabr'],
    'islamic',
    'intermediate',
    20,
    false,
    '{"holistic_approach": true, "misconceptions_addressed": true, "coping_strategies": 5, "prophetic_examples": true}'::jsonb
);

-- Guided Meditations
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'guided_meditation',
    'Body Scan Meditation',
    'A gentle meditation to release tension and anxiety from your body.

**Preparation:**
- Find a comfortable position lying down or sitting
- Close your eyes or soften your gaze
- Take three deep, cleansing breaths

**The Practice:**

**Starting at the Top of Your Head:**
Notice any sensations... tension, warmth, tingling, or nothing at all. Whatever you feel is perfect. Breathe into this area and imagine any tension melting away.

**Moving to Your Forehead:**
Release any furrows or tightness. Let your forehead become smooth and relaxed.

**Your Eyes and Cheeks:**
Allow your eyes to rest deeply in their sockets. Let your cheeks soften.

**Your Jaw:**
This is where many people hold stress. Let your jaw drop slightly, creating space between your teeth.

**Your Neck and Shoulders:**
Breathe into any tightness here. Imagine your shoulders melting away from your ears.

**Your Arms:**
From shoulders to fingertips, let your arms become heavy and relaxed.

**Your Chest:**
Notice your heartbeat. Thank your heart for working so faithfully.

**Your Abdomen:**
Let your belly rise and fall naturally with each breath.

**Your Back:**
Release any tension along your spine. Imagine roots growing from your back into the earth.

**Your Hips and Pelvis:**
Let this area soften and open.

**Your Legs:**
From hips to toes, allow your legs to become completely relaxed.

**Whole Body:**
Take a moment to notice your entire body. Send gratitude to every part for carrying you through life.

**Closing:**
Take three deep breaths. Wiggle your fingers and toes. When ready, slowly open your eyes.',
    ARRAY['meditation', 'body-scan', 'relaxation', 'tension-release', 'mindfulness'],
    'meditation',
    'beginner',
    15,
    false,
    '{"body_parts": 10, "progressive": true, "gratitude_element": true, "anxiety_relief": true}'::jsonb
),
(
    gen_random_uuid(),
    'guided_meditation',
    'Loving-Kindness Meditation (Islamic Version)',
    'A heart-opening meditation based on Islamic principles of compassion and mercy.

**Preparation:**
Begin with the intention (niyyah) to cultivate the mercy and compassion that Allah has placed in your heart.

**Opening:**
"Bismillahir-Rahmanir-Raheem" (In the name of Allah, the Most Gracious, the Most Merciful)

**For Yourself:**
Place your hand on your heart and silently repeat:
- "May Allah grant me peace and tranquility"
- "May Allah protect me from harm"
- "May Allah guide me to what is best"
- "May Allah forgive my shortcomings"
- "May I be among the grateful servants of Allah"

**For Your Loved Ones:**
Bring to mind family members, friends, and those dear to you:
- "May Allah grant them peace and tranquility"
- "May Allah protect them from harm"
- "May Allah guide them to what is best"
- "May Allah forgive their shortcomings"
- "May they be among the grateful servants of Allah"

**For Neutral People:**
Think of acquaintances, neighbors, or strangers:
- "May Allah grant them peace and tranquility"
- "May Allah protect them from harm"
- "May Allah guide them to what is best"

**For Difficult People:**
This is challenging but transformative. Think of someone you have conflict with:
- "May Allah guide them to the truth"
- "May Allah soften their heart and mine"
- "May Allah bring understanding between us"

**For All Creation:**
Expand your heart to include all of humanity:
- "May Allah grant peace to all His creation"
- "May Allah guide humanity to justice and mercy"
- "May we all be united in worship of Allah"

**Closing:**
"Rabbana atina fi''d-dunya hasanatan wa fi''l-akhirati hasanatan wa qina adhab an-nar"
(Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire)

**Benefits:**
- Softens the heart
- Reduces anger and resentment
- Increases empathy and compassion
- Aligns with Islamic values of mercy',
    ARRAY['meditation', 'loving-kindness', 'islamic', 'compassion', 'mercy', 'forgiveness'],
    'meditation',
    'intermediate',
    20,
    true,
    '{"islamic_adaptation": true, "progressive_circles": 4, "quranic_duas": true, "heart_opening": true}'::jsonb
);

-- Sleep Stories
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'sleep_story',
    'The Peaceful Garden',
    'A calming bedtime story inspired by descriptions of Paradise in Islamic tradition.

**Setting the Scene:**
Close your eyes and imagine yourself walking through a gate made of pearl and gold. You''ve entered a garden unlike any you''ve ever seen...

**The Garden Path:**
Your feet touch the softest grass, each blade perfectly green and cool beneath your feet. The path ahead winds gently through this peaceful paradise, lined with trees whose leaves rustle with the most soothing sound.

**The Flowing Stream:**
To your right, you hear the gentle babbling of a crystal-clear stream. The water flows over smooth stones, creating a melody that seems to wash away every worry from your mind. You kneel beside the stream and cup the pure water in your hands. It''s perfectly cool and refreshing.

**The Fragrant Flowers:**
As you continue walking, you notice flowers of every color imaginable. Their fragrance is unlike anything on earth - sweet, calming, and pure. You breathe deeply, and with each breath, you feel more peaceful, more relaxed.

**The Shade of the Trees:**
You come to a magnificent tree with wide, spreading branches. Its shade is perfectly cool, and you decide to rest here. As you lie down on the soft grass beneath the tree, you feel completely safe and protected.

**The Gentle Breeze:**
A warm, gentle breeze begins to blow, carrying with it the most beautiful, subtle fragrance. The leaves above you dance softly, creating patterns of light and shadow that are mesmerizing and peaceful.

**The Sounds of Peace:**
In the distance, you hear the most beautiful sounds - like gentle music, but more peaceful than any earthly melody. It fills your heart with tranquility and joy.

**Resting in Paradise:**
You close your eyes in this perfect place, feeling completely at peace. Every muscle in your body relaxes. Every worry fades away. You are safe, you are loved, and you are exactly where you need to be.

**Drifting to Sleep:**
As you rest in this beautiful garden, you feel yourself becoming drowsy. The peaceful sounds, the gentle breeze, and the perfect comfort of this place carry you gently toward sleep...

Let yourself drift now... peaceful... safe... loved...',
    ARRAY['sleep-story', 'paradise', 'islamic', 'peaceful', 'garden', 'bedtime'],
    'sleep',
    'beginner',
    25,
    true,
    '{"islamic_inspired": true, "paradise_imagery": true, "sensory_details": true, "sleep_induction": true}'::jsonb
);

-- Crisis Resources
INSERT INTO content (id, type, title, body, tags, category, difficulty_level, estimated_duration, is_premium, metadata) VALUES
(
    gen_random_uuid(),
    'crisis_resource',
    'Immediate Crisis Support',
    'If you''re having thoughts of self-harm or suicide, please reach out for help immediately.

**Emergency Numbers:**

**United States:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Emergency Services: 911

**United Kingdom:**
- Samaritans: 116 123 (free, 24/7)
- Crisis Text Line: Text SHOUT to 85258
- Emergency Services: 999

**Canada:**
- Talk Suicide Canada: 1-833-456-4566
- Crisis Text Line: Text TALK to 686868
- Emergency Services: 911

**Australia:**
- Lifeline: 13 11 14
- Crisis Text Line: Text HELLO to 0477 13 11 14
- Emergency Services: 000

**Islamic Crisis Support:**
- Khalil Center: Culturally sensitive mental health support
- Naseeha Youth Helpline: 1-866-627-3342
- Local mosque imam or counselor

**Immediate Safety Steps:**

1. **Remove means of harm** from your environment
2. **Call someone** - friend, family, crisis line
3. **Go to a safe place** - with other people
4. **Seek immediate medical attention** if needed

**Remember:**
- These feelings are temporary
- You are not alone
- Help is available
- Your life has value and meaning

**Islamic Perspective:**
Allah says: "And whoever saves a life, it is as if he has saved all of mankind" (Quran 5:32). This includes saving your own life. Seeking help is not only permissible but encouraged in Islam.

**After the Crisis:**
- Follow up with a mental health professional
- Create a safety plan
- Build a support network
- Consider ongoing therapy or counseling',
    ARRAY['crisis', 'suicide-prevention', 'emergency', 'safety', 'resources', 'islamic-support'],
    'crisis',
    'beginner',
    5,
    false,
    '{"emergency_numbers": true, "international": true, "islamic_resources": true, "safety_plan": true}'::jsonb
);

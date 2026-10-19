// ============================================================
// Authentic IELTS Mock Test Dataset
// ============================================================

export const mockListeningTest = {
  id: 'listening-01',
  title: 'Academic IELTS Listening Practice Test 1',
  durationMinutes: 30,
  totalQuestions: 10,
  audioUrl: `${import.meta.env.BASE_URL}audio/listening-test-1.mp3`,
  listeningScript: `You will hear a telephone conversation between a customer and an accommodation officer. First you have some time to look at questions 1 to 5.
Officer: Good morning, Student Accommodation Office. How can I help you?
Sarah: Hello, I'm looking for a place to stay starting this term. My name is Sarah Jenkins.
Officer: Could you spell your surname please?
Sarah: Yes, it is J-E-N-K-I-N-S.
Officer: Thank you, Sarah. And what date are you looking to move in?
Sarah: Preferably on the 15th of November.
Officer: And what is your weekly budget?
Sarah: My maximum weekly rent would be 180 pounds.
Officer: Any specific room preference?
Sarah: A single room with a balcony if possible.
Officer: And your contact telephone number?
Sarah: It's 07700 900456.`,
  sections: [
    {
      sectionNumber: 1,
      title: 'Section 1: Accommodation Inquiry',
      description: 'Questions 1–5: Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.',
      questions: [
        { id: 'q1', type: 'fill', question: 'Caller Name: Sarah _______', answer: 'jenkins', options: [] },
        { id: 'q2', type: 'fill', question: 'Preferred move-in date: 15th of _______', answer: 'november', options: [] },
        { id: 'q3', type: 'fill', question: 'Maximum weekly rent: £ _______', answer: '180', options: [] },
        { id: 'q4', type: 'fill', question: 'Required room type: Single room with a _______', answer: 'balcony', options: [] },
        { id: 'q5', type: 'fill', question: 'Contact telephone number: 07700 _______', answer: '900456', options: [] },
      ]
    },
    {
      sectionNumber: 2,
      title: 'Section 2: City Botanical Garden Tour',
      description: 'Questions 6–10: Choose the correct letter, A, B, or C.',
      questions: [
        {
          id: 'q6',
          type: 'mcq',
          question: 'The Botanical Gardens were first established in:',
          options: ['A) 1845', 'B) 1882', 'C) 1905'],
          answer: 'B'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the main attraction in the Tropical Greenhouse?',
          options: ['A) Carnivorous plants', 'B) Giant Amazonian water lilies', 'C) Rare orchids from Madagascar'],
          answer: 'B'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Visitors are advised NOT to:',
          options: ['A) Take photographs with flash', 'B) Touch the glass structures', 'C) Feed the wildlife'],
          answer: 'A'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Guided tours depart from the visitor centre every:',
          options: ['A) 15 minutes', 'B) 30 minutes', 'C) 60 minutes'],
          answer: 'B'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'Admission is free for children under the age of:',
          options: ['A) Five', 'B) Seven', 'C) Twelve'],
          answer: 'A'
        }
      ]
    }
  ]
};

export const mockReadingTest = {
  id: 'reading-01',
  title: 'Academic IELTS Reading — Passage 1',
  durationMinutes: 20,
  passageTitle: 'The Architecture of Smart & Sustainable Megacities',
  passageText: `
Paragraph A:
In the dawn of the twenty-first century, rapid urbanisation has transformed the landscape of human settlement. According to the United Nations, more than 68 percent of the world’s population is projected to live in urban areas by 2050. This unprecedented concentration of humanity presents colossal environmental, logistical, and social quandaries. In response, architectural theorists and urban engineers are pivoting towards "biophilic smart cities"—urban organisms that merge artificial intelligence with natural regenerative ecologies.

Paragraph B:
Pioneering projects in Singapore and Copenhagen exemplify this symbiotic ethos. In Singapore, vertical urban farming integrated into residential facades provides up to 15 percent of locally consumed leafy greens while simultaneously insulating buildings against tropical heat gain, drastically reducing energy demand for artificial air conditioning. Sensors embedded in municipal water systems monitor hydraulic pressure and turbidity in real time, anticipating pipeline fractures prior to catastrophic leaks.

Paragraph C:
However, techno-centric urbanization is not devoid of critique. Critics argue that hyper-digitized infrastructures create pervasive surveillance environments where citizen movement and civic habits are recorded without democratic oversight. Furthermore, the prohibitive capital cost of smart architectural retrofitting risks exacerbating socioeconomic stratification, creating pristine ecological enclaves for affluent citizens while outer peripheries contend with deteriorating legacy services.

Paragraph D:
Ultimately, the sustainability of the future metropolis will hinge not merely on algorithms, but on participatory urbanism. When civic populations actively collaborate in ecological design—such as communal rooftop solar arrays and localized circular waste economies—cities transition from fragile resource sinks into resilient, carbon-neutral sanctuaries.
  `,
  questions: [
    {
      id: 'r1',
      type: 'tfng',
      question: 'By 2050, more than two-thirds of humanity is expected to reside in cities.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      answer: 'TRUE',
      explanation: 'Paragraph A states that more than 68 percent (which is more than two-thirds) is projected to live in urban areas by 2050.'
    },
    {
      id: 'r2',
      type: 'tfng',
      question: 'Vertical farming in Singapore produces all the fruit required by the local population.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      answer: 'FALSE',
      explanation: 'Paragraph B explicitly states it provides "up to 15 percent of locally consumed leafy greens", not all fruit.'
    },
    {
      id: 'r3',
      type: 'tfng',
      question: 'Copenhagen uses satellite sensors to detect air pollution levels in suburban trains.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      answer: 'NOT GIVEN',
      explanation: 'The text mentions Copenhagen as an example of sustainable cities, but does not mention satellite sensors in suburban trains.'
    },
    {
      id: 'r4',
      type: 'mcq',
      question: 'According to Paragraph C, what is a primary concern regarding smart city retrofits?',
      options: [
        'A) They lack resilience during extreme weather occurrences',
        'B) They may widen the gap between affluent and poorer citizens',
        'C) They cause extensive damage to existing historical monuments',
        'D) They are rejected by young environmental activists'
      ],
      answer: 'B',
      explanation: 'Paragraph C states that the prohibitive capital cost risks exacerbating socioeconomic stratification.'
    },
    {
      id: 'r5',
      type: 'mcq',
      question: 'What is the main conclusion of the passage in Paragraph D?',
      options: [
        'A) Advanced algorithms alone cannot guarantee urban sustainability without civic involvement',
        'B) Solar arrays will completely replace traditional electricity grids by 2040',
        'C) Megacities should limit incoming migration through administrative policies',
        'D) Smart cities have proven economically unviable in developing nations'
      ],
      answer: 'A',
      explanation: 'Paragraph D argues sustainability hinges on participatory urbanism where citizens collaborate, not merely on algorithms.'
    }
  ]
};

export const mockWritingTest = {
  id: 'writing-01',
  task1: {
    title: 'Academic Writing Task 1',
    timeRecommended: '20 minutes',
    wordCountTarget: 150,
    prompt: 'The chart below shows global investment in renewable energy sources (Solar, Wind, Hydroelectric, and Biomass) between 2015 and 2024 in billions of USD. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    sampleModelBand9: `The bar chart delineates trends in worldwide financial investment across four renewable energy sectors between 2015 and 2024.

Overall, solar and wind energy experienced substantial upward trajectories, solidifying their dominance in clean energy financing, whereas hydroelectric and biomass investments exhibited modest, stagnant growth patterns.

In 2015, solar energy received approximately $120 billion, closely followed by wind power at $105 billion. Over the ensuing nine-year period, capital injection into solar expanded remarkably, peaking at over $310 billion in 2024. Similarly, wind energy registered a consistent upward surge, culminating at $230 billion by the end of the timeline.

Conversely, funding for hydroelectric initiatives remained relatively plateaued, fluctuating marginally between $40 and $48 billion throughout the decade. Biomass secured the lowest allocation, beginning at $25 billion in 2015 and marginally declining to $20 billion by 2024. Consequently, the disparity between mainstream renewables and secondary sources widened markedly over the period.`
  },
  task2: {
    title: 'Academic & General Writing Task 2',
    timeRecommended: '40 minutes',
    wordCountTarget: 250,
    prompt: 'Some people argue that tertiary education should be fully financed by governments for all eligible students, while others maintain that individuals should bear the cost of their own higher studies. Discuss both perspectives and articulate your reasoned viewpoint.',
    sampleModelBand9: `The question of whether university education should be publicly subsidised or funded privately by matriculated students remains a subject of contentious socio-economic debate. While proponents of self-funded tuition emphasize fiscal prudence and individual accountability, I contend that tertiary education is a fundamental public good that merits extensive state sponsorship.

Advocates of private funding often argue from an economic equity standpoint. Tertiary graduates typically command significantly higher career earnings than non-degree holders; hence, subsidising their degrees via general taxation—which includes contributions from low-income workers who never attended university—could be construed as regressive. Furthermore, when students invest their own financial capital into degree programmes, they often display heightened dedication, rigorous academic engagement, and judicious career planning, thereby reducing dropout rates and municipal waste.

Nevertheless, the societal dividends of tuition-free higher education profoundly eclipse individual financial gains. Universal access dismantles entrenched class barriers, fostering meritocracy and vertical social mobility for gifted students from underprivileged socio-demographic strata. Additionally, modern knowledge-based economies necessitate a continuous pipeline of physicians, research engineers, software architects, and educators. When high tuition fees create insurmountable debt burdens, prospective scholars are deterred from pursuing socially vital yet moderately compensated professions. Nations such as Germany and Norway demonstrate that publicly underwritten higher education cultivates innovation, bolsters productivity, and enhances global competitiveness without crippling the national exchequer.

In conclusion, although the argument for personal financial contribution possesses commercial logic, the collective societal benefits of an educated citizenry are far more consequential. Governments should prioritize state-funded university tuition to propel economic modernization and ensure egalitarian opportunity for all.`
  }
};

export const mockSpeakingTest = {
  id: 'speaking-01',
  parts: [
    {
      partNumber: 1,
      title: 'Part 1: Introduction & Everyday Topics',
      duration: '4-5 minutes',
      questions: [
        'Can you tell me about your hometown and what you like most about it?',
        'Do you prefer studying or working in the morning or evening?',
        'How often do you use public transportation, and how could it be improved in your city?'
      ]
    },
    {
      partNumber: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      duration: '3-4 minutes (1 min prep + 2 mins talk)',
      cueCard: {
        topic: 'Describe an occasion when you solved an unexpected problem.',
        bullets: [
          'What the problem was and when it occurred',
          'What steps you took to address it',
          'Who helped you, if anyone',
          'And explain how you felt after resolving the challenge.'
        ]
      }
    },
    {
      partNumber: 3,
      title: 'Part 3: Two-Way Analytical Discussion',
      duration: '4-5 minutes',
      questions: [
        'What personal qualities make someone an effective problem solver in the workplace?',
        'Do you think modern technology has made people more or less resourceful when facing difficulties?',
        'Should schools place more emphasis on teaching practical life skills rather than purely theoretical knowledge?'
      ]
    }
  ]
};

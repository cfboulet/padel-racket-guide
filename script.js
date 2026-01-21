// Store user answers
let userAnswers = {
    equipmentInterests: ['racket'] // Auto-select racket
};

let currentQuestion = 0;
let totalQuestions = 8; // Total number of questions
let questionHistory = []; // Track question flow for back button

// Get the quiz container
const quizContainer = document.getElementById('quiz-container');
const progressFill = document.getElementById('progress-fill');

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
}

// Increment question counter
function nextQuestion() {
    currentQuestion++;
    updateProgress();
}

// Go back to previous question
function goBack() {
    if (questionHistory.length > 0) {
        const previousQuestion = questionHistory.pop();
        currentQuestion = Math.max(0, currentQuestion - 1);
        updateProgress();
        previousQuestion();
    }
}

// Add back button HTML
function addBackButton() {
    if (questionHistory.length > 0) {
        return `<button class="back-btn" onclick="goBack()">← Back</button>`;
    }
    return '';
}

// Product database - All rackets with element properties (Shape, Weight, Surface)
const rackets = [
    // CONTROL-ORIENTED RACKETS (Round shapes, light weight, soft surfaces)
    {
        name: "Adidas Metalbone Carbon CTRL 2026",
        price: "$350-385",
        shape: "Round",
        weight: "Medium",
        surface: "Smooth",
        bestFor: "Players who prioritize precise placement and touch",
        features: "Centered balance, responsive carbon construction, exceptional accuracy",
        goodIf: "You play from the back, rely on consistent shots, value control over power",
        image: "Images/adidas-metalbone-hrd.webp",
        buyLink: "https://www.google.com/search?q=Adidas+Metalbone+Carbon+CTRL+2026+buy"
    },
    {
        name: "Nox ML10 Ventus Control 2026",
        price: "$310-350",
        shape: "Round",
        weight: "Light",
        surface: "Soft",
        bestFor: "Defensive players who react and counter-attack",
        features: "Soft touch, huge sweet spot, low balance for quick handling",
        goodIf: "You prefer positioning and patience over aggressive play",
        image: "Images/Nox AT10 Genius 18K Alum 2026 .webp",
        buyLink: "https://www.google.com/search?q=Nox+ML10+Ventus+Control+2026+buy"
    },
    {
        name: "Bullpadel Indiga CTR 2026",
        price: "$95-110",
        shape: "Round",
        weight: "Light",
        surface: "Soft",
        bestFor: "Budget-conscious players wanting maximum control",
        features: "Medium-soft feel, exceptional forgiveness, huge sweet spot",
        goodIf: "You're developing technique or prefer a softer touch",
        image: "Images/Bullpadel Indiga CTR 2026 .webp",
        buyLink: "https://www.google.com/search?q=Bullpadel+Indiga+CTR+2026+buy"
    },
    {
        name: "Nox Equation Soft Advanced 2026",
        price: "$130-155",
        shape: "Round",
        weight: "Light",
        surface: "Soft",
        bestFor: "Mobile players who cover a lot of court",
        features: "Outstanding maneuverability (9.0 rating), lightweight, excellent control",
        goodIf: "You move constantly and need quick racket handling",
        image: "Images/Nox Equation Soft Advanced 2026 .webp",
        buyLink: "https://www.google.com/search?q=Nox+Equation+Soft+Advanced+2026+buy"
    },
    {
        name: "Adidas RX Series 2026",
        price: "<$125",
        shape: "Round",
        weight: "Light",
        surface: "Soft",
        bestFor: "Entry-level budget with solid performance",
        features: "Great comfort, impressive control, excellent value",
        goodIf: "You want quality without spending much",
        image: "Images/Adidas RX Series 2026 .webp",
        buyLink: "https://www.google.com/search?q=Adidas+RX+Series+2026+buy"
    },
    {
        name: "Wilson Accent Series 2026",
        price: "$100-120",
        shape: "Round",
        weight: "Light",
        surface: "Soft",
        bestFor: "Comfort-focused players",
        features: "Lightweight, reduces arm fatigue, easy handling",
        goodIf: "You play long sessions or have arm concerns",
        image: "Images/Wilson Accent Series 2026 .jpg",
        buyLink: "https://www.google.com/search?q=Wilson+Accent+Series+2026+buy"
    },

    // BALANCED RACKETS (Teardrop shapes, medium weight, smooth/rough surfaces)
    {
        name: "Head Extreme Pro 2026",
        price: "$285-330",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Smooth",
        bestFor: "Complete players who do everything well",
        features: "Power 10, Control 9.4, best value at premium level",
        goodIf: "You want a racket that performs in all situations",
        image: "Images/Head Extreme Pro 2026 .webp",
        buyLink: "https://www.google.com/search?q=Head+Extreme+Pro+2026+buy"
    },
    {
        name: "Head Extreme Team 2026",
        price: "$210-240",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Smooth",
        bestFor: "Developing a complete game",
        features: "Control 9.3, exceptional balance, attacking potential",
        goodIf: "You're building an all-around skillset",
        image: "Images/Head Extreme Team 2026 .jpg",
        buyLink: "https://www.google.com/search?q=Head+Extreme+Team+2026+buy"
    },
    {
        name: "Nox AT10 Pro Cup Soft 2026",
        price: "$210-240",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Soft",
        bestFor: "Players wanting professional-level versatility",
        features: "Sophisticated blend of comfort and performance, tour-level quality",
        goodIf: "You adapt your game situation-to-situation",
        image: "Images/Nox AT10 Pro Cup Soft 2026 .webp",
        buyLink: "https://www.google.com/search?q=Nox+AT10+Pro+Cup+Soft+2026+buy"
    },
    {
        name: "Bullpadel Vertex 05 2026 (Juan Tello)",
        price: "$375-405",
        shape: "Diamond",
        weight: "Heavy",
        surface: "Rough",
        bestFor: "Advanced all-around players who want power with control",
        features: "Best balanced diamond (8.7 rating), sweet spot 9.1",
        goodIf: "You want diamond power but more forgiveness",
        image: "Images/Bullpadel Vertex 05 2026 (Juan Tello) .webp",
        buyLink: "https://www.google.com/search?q=Bullpadel+Vertex+05+2026+buy"
    },
    {
        name: "Nox AT10 Genius 18K Alum 2026",
        price: "$240-275",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Rough",
        bestFor: "Players valuing touch and feel",
        features: "18K aluminized carbon, livelier response, premium build",
        goodIf: "You want precision without sacrificing power",
        image: "Images/Nox AT10 Genius 18K Alum 2026 .webp",
        buyLink: "https://www.google.com/search?q=Nox+AT10+Genius+18K+Alum+2026+buy"
    },
    {
        name: "Siux Astra Hybrid 2026",
        price: "$110-145",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Smooth",
        bestFor: "Budget versatility",
        features: "Combines power and control characteristics, adaptable",
        goodIf: "You're still discovering your style",
        image: "Images/Siux Astra Hybrid 2026 .jpg",
        buyLink: "https://www.google.com/search?q=Siux+Astra+Hybrid+2026+buy"
    },

    // POWER RACKETS (Diamond shapes, heavy weight, rough surfaces)
    {
        name: "Bullpadel Hack 04 2026 (Paquito Navarro)",
        price: "$385-420",
        shape: "Diamond",
        weight: "Heavy",
        surface: "Rough",
        bestFor: "Pure attackers who dominate the net",
        features: "Power 10, ultra-rigid Tricarbon 18K, maximum smash power",
        goodIf: "You finish points at the net with aggressive volleys and smashes",
        image: "Images/Bullpadel Hack 04 2026 (Paquito Navarro) .png",
        buyLink: "https://www.google.com/search?q=Bullpadel+Hack+04+2026+buy"
    },
    {
        name: "Adidas Metalbone HRD+ 2026 (Ale Galan)",
        price: "$420-440",
        shape: "Diamond",
        weight: "Heavy",
        surface: "Rough",
        bestFor: "Explosive attacking play",
        features: "Power 9.9, Control 9.4, tour-level weapon",
        goodIf: "You have strong technique and want maximum firepower",
        image: "Images/Adidas Metalbone HRD+ 2026 (Ale Galan) .webp",
        buyLink: "https://www.google.com/search?q=Adidas+Metalbone+HRD+2026+buy"
    },
    {
        name: "Bullpadel Hack Hybrid 04 2026",
        price: "$220-255",
        shape: "Diamond",
        weight: "Medium",
        surface: "Rough",
        bestFor: "Developing power game without full diamond commitment",
        features: "Signature Hack power, easier handling than pure diamond",
        goodIf: "You're transitioning to more aggressive play",
        image: "Images/Bullpadel Hack Hybrid 04 2026 .webp",
        buyLink: "https://www.google.com/search?q=Bullpadel+Hack+Hybrid+04+2026+buy"
    },
    {
        name: "Wilson Ultra Series 2026",
        price: "$200-230",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Smooth",
        bestFor: "Offensive play with forgiveness",
        features: "Explosive power, Infinity Edge for bigger sweet spot",
        goodIf: "You attack but still want margin for error",
        image: "Images/Wilson Ultra Series 2026 .webp",
        buyLink: "https://www.google.com/search?q=Wilson+Ultra+Series+2026+buy"
    },
    {
        name: "Siux Pegasus Pro 2026",
        price: "$210-240",
        shape: "Teardrop",
        weight: "Medium",
        surface: "Smooth",
        bestFor: "Growing into power play",
        features: "Premium materials, enhanced ball output, offensive-leaning",
        goodIf: "You're building confidence in aggressive shots",
        image: "Images/Siux Pegasus Pro 2026 .webp",
        buyLink: "https://www.google.com/search?q=Siux+Pegasus+Pro+2026+buy"
    },
    {
        name: "Siux Fenix Pro Black 2026",
        price: "$220-265",
        shape: "Diamond",
        weight: "Heavy",
        surface: "Smooth",
        bestFor: "Net dominators",
        features: "Total power focus, designed for finishing smashes",
        goodIf: "You live at the net and love overhead shots",
        image: "Images/Siux Fenix Pro Black 2026 .webp",
        buyLink: "https://www.google.com/search?q=Siux+Fenix+Pro+Black+2026+buy"
    }
];

// INTRO PAGE: Explain how it works
function showQuestion0() {
    quizContainer.innerHTML = `
        <div style="max-width: 520px; margin: 0 auto;">
            <h2 style="font-size: clamp(1.5rem, 3vw, 1.875rem); margin-bottom: 24px; text-align: center;">Find Your Padel Racket</h2>

            <div style="margin-bottom: 32px;">
                <p style="font-size: 15px; line-height: 1.6; color: var(--gray-700); margin-bottom: 16px;">
                    Most players choose rackets based on skill level. We think that's backwards.
                </p>
                <p style="font-size: 15px; line-height: 1.6; color: var(--gray-700); margin-bottom: 16px;">
                    Your playing style, physical attributes, and goals matter more than whether you're a beginner or advanced player. Great equipment should grow with you, not hold you back.
                </p>
            </div>

            <div style="background: var(--gray-100); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <h3 style="font-size: 14px; font-weight: 500; margin-bottom: 16px; color: var(--gray-900);">What to expect</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="font-size: 14px; color: var(--gray-700); margin-bottom: 12px; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--gray-500);">→</span>
                        8 questions about your style and preferences
                    </li>
                    <li style="font-size: 14px; color: var(--gray-700); margin-bottom: 12px; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--gray-500);">→</span>
                        Takes about 2 minutes
                    </li>
                    <li style="font-size: 14px; color: var(--gray-700); margin-bottom: 12px; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--gray-500);">→</span>
                        Get budget and premium options matched to you
                    </li>
                    <li style="font-size: 14px; color: var(--gray-700); padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--gray-500);">→</span>
                        Based on 2026 equipment data
                    </li>
                </ul>
            </div>

            <button class="answer-btn" onclick="startQuiz()" style="background: var(--gray-900); color: white; border-color: var(--gray-900); font-weight: 500;">
                Get Started →
            </button>
        </div>
    `;
}

function startQuiz() {
    questionHistory.push(showQuestion0);
    nextQuestion();
    showQuestion1();
}

// QUESTION 1: Physical Concerns
function showQuestion1() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>Do you have any arm, elbow, or shoulder concerns?</h2>
        <button class="answer-btn" onclick="answerQ1('yes-concerns')">Yes, comfort is a priority<br><small>History of pain or injury</small></button>
        <button class="answer-btn" onclick="answerQ1('occasional')">Occasional discomfort<br><small>Sometimes feel fatigue</small></button>
        <button class="answer-btn" onclick="answerQ1('no-concerns')">No issues<br><small>Feel good physically</small></button>
    `;
}

function answerQ1(answer) {
    userAnswers.physicalConcerns = answer;
    questionHistory.push(showQuestion1);
    nextQuestion();
    showQuestion2();
}

// QUESTION 2: Height
function showQuestion2() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>What's your height?</h2>
        <button class="answer-btn" onclick="answerQ2('under-5-6')">Under 5'6" (168 cm)<br><small>Shorter stature</small></button>
        <button class="answer-btn" onclick="answerQ2('average')">5'6" - 6'0" (168-183 cm)<br><small>Average height</small></button>
        <button class="answer-btn" onclick="answerQ2('over-6-0')">Over 6'0" (183 cm)<br><small>Taller stature</small></button>
    `;
}

function answerQ2(answer) {
    userAnswers.height = answer;
    questionHistory.push(showQuestion2);
    nextQuestion();
    showQuestion3();
}

// QUESTION 3: Grip Strength
function showQuestion3() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>How would you describe your grip strength?</h2>
        <button class="answer-btn" onclick="answerQ3('strong')">Strong grip<br><small>Comfortable with heavier equipment</small></button>
        <button class="answer-btn" onclick="answerQ3('moderate')">Average/moderate grip<br><small>Standard strength</small></button>
        <button class="answer-btn" onclick="answerQ3('prefer-light')">Prefer lighter equipment<br><small>Lighter feels better</small></button>
    `;
}

function answerQ3(answer) {
    userAnswers.gripStrength = answer;
    questionHistory.push(showQuestion3);
    nextQuestion();
    showQuestion4();
}

// QUESTION 4: Overheads
function showQuestion4() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>How do you typically hit attacking overheads?</h2>
        <button class="answer-btn" onclick="answerQ4('kick-smashes')">Kick smashes<br><small>Lots of spin and kick</small></button>
        <button class="answer-btn" onclick="answerQ4('flat-smashes')">Flat smashes<br><small>Power and speed</small></button>
        <button class="answer-btn" onclick="answerQ4('viboras')">Viboras<br><small>Controlled, angled shots</small></button>
        <button class="answer-btn" onclick="answerQ4('placement')">Placement shots<br><small>Rulos, bajadas, precision shots</small></button>
        <button class="answer-btn" onclick="answerQ4('variety')">A variety of each<br><small>Mix depending on situation</small></button>
    `;
}

function answerQ4(answer) {
    userAnswers.overheads = answer;
    questionHistory.push(showQuestion4);
    nextQuestion();
    showQuestion5();
}

// QUESTION 5: Groundstrokes
function showQuestion5() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>Do you use slice on your groundstrokes?</h2>
        <button class="answer-btn" onclick="answerQ5('lots-of-slice')">Yes, frequently<br><small>Use slice often for control and spin</small></button>
        <button class="answer-btn" onclick="answerQ5('some-slice')">Sometimes<br><small>Use it in certain situations</small></button>
        <button class="answer-btn" onclick="answerQ5('mostly-flat')">Rarely or never<br><small>Mostly hit flat</small></button>
    `;
}

function answerQ5(answer) {
    userAnswers.groundstrokes = answer;
    questionHistory.push(showQuestion5);
    nextQuestion();
    showQuestion6();
}

// QUESTION 6: Net Control
function showQuestion6() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>What is your preferred shot to gain control of the net?</h2>
        <button class="answer-btn" onclick="answerQ6('lobs')">Lobs<br><small>Push them back</small></button>
        <button class="answer-btn" onclick="answerQ6('chiquitas')">Chiquitas<br><small>Soft drops at their feet</small></button>
        <button class="answer-btn" onclick="answerQ6('passing-shots')">Passing shots<br><small>Hit through them</small></button>
        <button class="answer-btn" onclick="answerQ6('variety')">Variety<br><small>Depends on the situation</small></button>
    `;
}

function answerQ6(answer) {
    userAnswers.netControl = answer;
    questionHistory.push(showQuestion6);
    nextQuestion();
    showQuestion7();
}

// QUESTION 7: Spin Importance
function showQuestion7() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>How important is spin in your game?</h2>
        <button class="answer-btn" onclick="answerQ7('essential')">Essential - I use lots of spin<br><small>Key part of my game</small></button>
        <button class="answer-btn" onclick="answerQ7('moderate')">Moderate - occasional spin shots<br><small>Use it sometimes</small></button>
        <button class="answer-btn" onclick="answerQ7('not-much')">Not much - prefer flat shots<br><small>Mostly hit flat</small></button>
    `;
}

function answerQ7(answer) {
    userAnswers.spinUsage = answer;
    questionHistory.push(showQuestion7);
    nextQuestion();
    showQuestion8();
}

// QUESTION 8: Goals
function showQuestion8() {
    quizContainer.innerHTML = `
        ${addBackButton()}
        <h2>What are your padel goals?</h2>
        <button class="answer-btn" onclick="answerQ8('competitive')">Competitive growth<br><small>Want to improve and compete</small></button>
        <button class="answer-btn" onclick="answerQ8('recreational')">Recreational fun<br><small>Playing for enjoyment</small></button>
        <button class="answer-btn" onclick="answerQ8('not-sure')">Just starting, not sure yet<br><small>Exploring the sport</small></button>
    `;
}

function answerQ8(answer) {
    userAnswers.commitment = answer;
    questionHistory.push(showQuestion8);
    nextQuestion();
    showResults();
}

// Element-Based Matching Algorithm
// Every answer votes for preferred Shape, Weight, and Surface
function matchRackets() {
    // Initialize element votes
    let elementVotes = {
        shape: { Round: 0, Teardrop: 0, Diamond: 0 },
        weight: { Light: 0, Medium: 0, Heavy: 0 },
        surface: { Soft: 0, Smooth: 0, Rough: 0 }
    };

    // Q1: Physical Concerns → Weight (light = comfort) & Surface (soft = comfort)
    if (userAnswers.physicalConcerns === 'yes-concerns') {
        elementVotes.weight.Light += 3;
        elementVotes.surface.Soft += 3;
    } else if (userAnswers.physicalConcerns === 'occasional') {
        elementVotes.weight.Light += 2;
        elementVotes.surface.Soft += 2;
    } else {
        // No concerns = can handle any weight/surface
        elementVotes.weight.Medium += 1;
    }

    // Q2: Height → Weight
    if (userAnswers.height === 'under-5-6') {
        elementVotes.weight.Light += 2;
    } else if (userAnswers.height === 'over-6-0') {
        elementVotes.weight.Heavy += 2;
        elementVotes.weight.Medium += 1;
    } else {
        elementVotes.weight.Medium += 2;
    }

    // Q3: Grip Strength → Weight
    if (userAnswers.gripStrength === 'prefer-light') {
        elementVotes.weight.Light += 3;
    } else if (userAnswers.gripStrength === 'strong') {
        elementVotes.weight.Heavy += 2;
        elementVotes.weight.Medium += 1;
    } else {
        elementVotes.weight.Medium += 2;
    }

    // Q4: Attacking Overheads → Shape + Weight
    if (userAnswers.overheads === 'flat-smashes') {
        // Power = diamond shape + heavy weight
        elementVotes.shape.Diamond += 3;
        elementVotes.weight.Heavy += 2;
    } else if (userAnswers.overheads === 'kick-smashes') {
        // Spin-heavy = smaller shape for whip + rough surface
        elementVotes.shape.Diamond += 2;
        elementVotes.shape.Teardrop += 1;
        elementVotes.surface.Rough += 3;
    } else if (userAnswers.overheads === 'viboras' || userAnswers.overheads === 'placement') {
        // Control and precision = round shape
        elementVotes.shape.Round += 3;
    } else {
        // Variety = teardrop (balanced)
        elementVotes.shape.Teardrop += 3;
    }

    // Q5: Slice Usage → Surface (rough surface grips ball for slice spin)
    if (userAnswers.groundstrokes === 'lots-of-slice') {
        elementVotes.surface.Rough += 4;
    } else if (userAnswers.groundstrokes === 'some-slice') {
        elementVotes.surface.Rough += 2;
        elementVotes.surface.Smooth += 1;
    } else {
        // Rarely use slice = smooth is fine
        elementVotes.surface.Smooth += 2;
    }

    // Q6: Net Control → Shape
    if (userAnswers.netControl === 'chiquitas') {
        // Touch shots = round (low balance, maneuverable)
        elementVotes.shape.Round += 3;
    } else if (userAnswers.netControl === 'passing-shots') {
        // Power through = diamond or teardrop
        elementVotes.shape.Diamond += 2;
        elementVotes.shape.Teardrop += 1;
    } else if (userAnswers.netControl === 'lobs') {
        // Defensive = round or teardrop
        elementVotes.shape.Round += 2;
        elementVotes.shape.Teardrop += 1;
    } else {
        // Variety = teardrop
        elementVotes.shape.Teardrop += 2;
    }

    // Q7: Spin Importance → Surface
    if (userAnswers.spinUsage === 'essential') {
        elementVotes.surface.Rough += 3;
    } else if (userAnswers.spinUsage === 'moderate') {
        elementVotes.surface.Rough += 1;
        elementVotes.surface.Smooth += 1;
    } else {
        // Not important = smooth is fine
        elementVotes.surface.Smooth += 2;
    }

    // Q8: Goals → affects quality tier but not elements
    // This will be used later for budget vs premium selection

    console.log('Element votes:', elementVotes);

    // Determine preferred elements (highest votes)
    const preferredShape = Object.keys(elementVotes.shape).reduce((a, b) =>
        elementVotes.shape[a] > elementVotes.shape[b] ? a : b
    );
    const preferredWeight = Object.keys(elementVotes.weight).reduce((a, b) =>
        elementVotes.weight[a] > elementVotes.weight[b] ? a : b
    );
    const preferredSurface = Object.keys(elementVotes.surface).reduce((a, b) =>
        elementVotes.surface[a] > elementVotes.surface[b] ? a : b
    );

    console.log('Preferred elements:', { shape: preferredShape, weight: preferredWeight, surface: preferredSurface });

    // Score each racket based on element match
    const scoredRackets = rackets.map(racket => {
        let score = 0;

        // Shape match (most important - 40 points)
        if (racket.shape === preferredShape) {
            score += 40;
        } else if (
            // Partial shape matches (teardrop is middle ground)
            (preferredShape === 'Teardrop' && (racket.shape === 'Round' || racket.shape === 'Diamond')) ||
            (racket.shape === 'Teardrop' && (preferredShape === 'Round' || preferredShape === 'Diamond'))
        ) {
            score += 20;
        }

        // Weight match (30 points)
        if (racket.weight === preferredWeight) {
            score += 30;
        } else if (
            // Partial weight matches (medium is middle ground)
            (preferredWeight === 'Medium' && (racket.weight === 'Light' || racket.weight === 'Heavy')) ||
            (racket.weight === 'Medium' && (preferredWeight === 'Light' || preferredWeight === 'Heavy'))
        ) {
            score += 15;
        }

        // Surface match (30 points)
        if (racket.surface === preferredSurface) {
            score += 30;
        } else if (
            // Smooth and Soft are more similar than Rough
            (preferredSurface === 'Smooth' && racket.surface === 'Soft') ||
            (preferredSurface === 'Soft' && racket.surface === 'Smooth')
        ) {
            score += 15;
        }

        return { ...racket, score };
    });

    // Sort by score
    scoredRackets.sort((a, b) => b.score - a.score);

    console.log('Top 5 scored rackets:', scoredRackets.slice(0, 5).map(r => ({ name: r.name, score: r.score, shape: r.shape, weight: r.weight, surface: r.surface })));

    // Get budget and premium options from top matches
    const budgetOption = scoredRackets.find(r => parseInt(r.price.replace(/[^0-9]/g, '')) < 150) || scoredRackets[scoredRackets.length - 1];
    const premiumOption = scoredRackets.find(r => parseInt(r.price.replace(/[^0-9]/g, '')) > 200) || scoredRackets[0];

    return { budget: budgetOption, premium: premiumOption };
}

// Generate personalized match description
function generateMatchDescription(racket, isFirstRecommendation) {
    let parts = [];

    // PART 1: Player profile understanding (2-3 sentences)
    let profileSummary = "Based on your answers, ";

    // Shot style summary
    if (userAnswers.overheads === 'kick-smashes') {
        profileSummary += "you play with a spin-oriented attacking style, using kick smashes to create difficult bounces. ";
    } else if (userAnswers.overheads === 'flat-smashes') {
        profileSummary += "you play an aggressive power game, finishing points with flat smashes. ";
    } else if (userAnswers.overheads === 'viboras' || userAnswers.overheads === 'placement') {
        profileSummary += "you prioritize control and precision over raw power, using placement to outmaneuver opponents. ";
    } else {
        profileSummary += "you adapt your overhead game to different situations, mixing power and placement. ";
    }

    // Groundstrokes and net play
    if (userAnswers.groundstrokes === 'lots-of-slice') {
        profileSummary += "Your frequent use of slice on groundstrokes shows you value spin and ball control. ";
    } else if (userAnswers.groundstrokes === 'mostly-flat') {
        profileSummary += "You hit mostly flat groundstrokes, keeping points direct and efficient. ";
    }

    if (userAnswers.netControl === 'chiquitas') {
        profileSummary += "You rely on soft hands and touch shots like chiquitas to gain control at the net. ";
    } else if (userAnswers.netControl === 'passing-shots') {
        profileSummary += "You prefer to hit through opponents with aggressive passing shots rather than playing delicate drops. ";
    } else if (userAnswers.netControl === 'lobs') {
        profileSummary += "You use lobs to push opponents back and reset positioning. ";
    }

    parts.push(profileSummary);

    // PART 2: Why this specific racket matches (3-4 sentences)
    let racketMatch = "";

    // Shape explanation
    if (racket.shape === 'Round') {
        racketMatch += `The ${racket.name} features a round shape with a low balance point, which means the weight is distributed closer to your hand. This gives you exceptional maneuverability and a massive sweet spot that's forgiving on off-center hits. `;

        if (userAnswers.netControl === 'chiquitas' || userAnswers.overheads === 'placement') {
            racketMatch += "For your precision-focused game, this shape excels at providing the control and feel you need for accurate shot placement. ";
        }
    } else if (racket.shape === 'Diamond') {
        racketMatch += `The ${racket.name} has a diamond shape with a high balance point, concentrating weight in the head of the racket. This head-heavy design acts like a hammer, generating maximum power on every overhead and volley. `;

        if (userAnswers.overheads === 'flat-smashes' || userAnswers.netControl === 'passing-shots') {
            racketMatch += "This perfectly complements your aggressive, power-oriented attacking style. ";
        }
    } else if (racket.shape.includes('Teardrop')) {
        racketMatch += `The ${racket.name} uses a teardrop shape that sits right between round and diamond, offering a medium balance point. This gives you power when you need it for finishing shots, while maintaining enough control for precise placement. `;

        if (userAnswers.overheads === 'variety') {
            racketMatch += "Since you adapt your game situationally, this versatile shape lets you play both offensively and defensively without compromise. ";
        }
    } else if (racket.shape.includes('Hybrid')) {
        racketMatch += `The ${racket.name} features a hybrid design that combines characteristics from multiple shapes, making it incredibly adaptable. `;
    }

    // Surface technology for spin
    if (racket.features.includes('18K')) {
        if (userAnswers.spinUsage === 'essential' || userAnswers.groundstrokes === 'lots-of-slice' || userAnswers.overheads === 'kick-smashes') {
            racketMatch += "The 18K carbon rough surface is crucial for your game - it grabs the ball on contact, letting you generate significantly more spin on both your sliced groundstrokes and kick smashes compared to a smooth surface. ";
        } else {
            racketMatch += "The 18K carbon surface provides extra grip on the ball, giving you spin options when you need them. ";
        }
    }

    // Physical comfort features
    if (userAnswers.physicalConcerns === 'yes-concerns' || userAnswers.physicalConcerns === 'occasional') {
        if (racket.features.includes('soft') || racket.features.includes('comfort') || racket.features.includes('Lightweight')) {
            racketMatch += "Equally important for you, this racket uses soft foam technology that absorbs vibrations before they reach your arm and shoulder. The lightweight construction further reduces strain during play, making it a smart choice given your physical concerns. ";
        }
    }

    // Weight and maneuverability
    if (racket.features.includes('lightweight') || racket.features.includes('Lightweight')) {
        if (userAnswers.gripStrength === 'prefer-light' || userAnswers.height === 'under-5-6') {
            racketMatch += "The lightweight design is particularly well-suited to your build and grip strength, allowing you to whip the racket through volleys and react quickly at the net without fatigue. ";
        }
    }

    // Touch and feel for net players
    if (racket.features.includes('touch') || racket.features.includes('maneuverability')) {
        if (userAnswers.netControl === 'chiquitas') {
            racketMatch += "The racket's exceptional touch and quick handling are perfect for your chiquita-heavy game, giving you the feel needed to drop balls precisely at opponents' feet. ";
        }
    }

    parts.push(racketMatch);

    // PART 3: Performance characteristics (1-2 sentences)
    let performance = "";
    if (racket.features.includes('sweet spot')) {
        performance += "The enlarged sweet spot means more of your shots will feel solid and go where you intend, even when you're stretched or off-balance. ";
    }

    if (racket.features.includes('Power 10') || racket.features.includes('Power 9.9')) {
        performance += "With a power rating at the top of the scale, this racket amplifies your attacking shots without requiring maximum effort. ";
    }

    if (racket.features.includes('Control 9')) {
        performance += "The high control rating means you can place the ball precisely without sacrificing your natural feel for the game. ";
    }

    if (performance) parts.push(performance);

    // PART 4: Level and value proposition (1-2 sentences)
    let value = "";
    if (userAnswers.commitment === 'competitive') {
        if (racket.features.includes('tour-level') || racket.features.includes('pro') || parseInt(racket.price.replace(/[^0-9]/g, '')) > 250) {
            value += "This is the same racket technology used by professional players - it's designed to perform at the highest level and will support your competitive goals as you improve. ";
        } else {
            value += "While this isn't tour-level equipment, it offers excellent performance that will grow with you as you develop your competitive game. ";
        }
    } else if (userAnswers.commitment === 'recreational') {
        value += "For recreational play, this racket provides high-quality performance without the premium price tag of pro-level equipment. ";
    }

    if (parseInt(racket.price.replace(/[^0-9]/g, '')) < 150) {
        value += `At ${racket.price}, you're getting remarkable value - this racket delivers performance that rivals much more expensive options.`;
    } else if (parseInt(racket.price.replace(/[^0-9]/g, '')) > 300) {
        value += `The ${racket.price} price reflects premium materials and construction quality that serious players can feel in every shot.`;
    } else {
        value += `At ${racket.price}, it sits in the mid-to-premium range, offering a strong balance of performance and value.`;
    }

    if (value) parts.push(value);

    return parts.join(' ');
}

// Calculate and show results
function showResults() {
    console.log('User answers:', userAnswers);
    currentQuestion = totalQuestions;
    updateProgress();

    const matches = matchRackets();
    const budgetScore = Math.round((matches.budget.score / 170) * 100);
    const premiumScore = Math.round((matches.premium.score / 170) * 100);

    quizContainer.innerHTML = `
        <h2>Your Perfect Racket Matches</h2>
        <p style="margin-bottom: 30px; text-align: center; color: var(--gray-500);">Based on your unique profile, we've found your ideal rackets</p>

        <div class="results-grid">
            <div class="racket-card budget">
                <div class="racket-header">
                    <h3>Budget Pick</h3>
                    <span class="price">${matches.budget.price}</span>
                </div>
                ${matches.budget.image ? `<img src="${matches.budget.image}" alt="${matches.budget.name}" class="racket-image">` : ''}
                <h4>${matches.budget.name}</h4>

                <div style="margin: 20px 0;">
                    <p style="font-size: 14px; line-height: 1.6; color: var(--gray-700);">
                        ${generateMatchDescription(matches.budget, true)}
                    </p>
                </div>
                ${matches.budget.buyLink ? `<a href="${matches.budget.buyLink}" target="_blank" class="buy-btn">Find Best Price →</a>` : ''}
            </div>

            <div class="racket-card premium">
                <div class="racket-header">
                    <h3>Premium Pick</h3>
                    <span class="price">${matches.premium.price}</span>
                </div>
                ${matches.premium.image ? `<img src="${matches.premium.image}" alt="${matches.premium.name}" class="racket-image">` : ''}
                <h4>${matches.premium.name}</h4>

                <div style="margin: 20px 0;">
                    <p style="font-size: 14px; line-height: 1.6; color: var(--gray-700);">
                        ${generateMatchDescription(matches.premium, false)}
                    </p>
                </div>
                ${matches.premium.buyLink ? `<a href="${matches.premium.buyLink}" target="_blank" class="buy-btn">Find Best Price →</a>` : ''}
            </div>
        </div>

        <button class="answer-btn" onclick="location.reload()" style="margin-top: 30px; background: var(--gray-900); color: white; border-color: var(--gray-900);">
            Start Over
        </button>
    `;
}

// Start the quiz when page loads
showQuestion0();

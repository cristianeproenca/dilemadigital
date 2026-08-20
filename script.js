/* =========================================================
   DILEMAS DIGITAIS
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });


    /* =====================================================
       QUIZ
    ===================================================== */

    const questions = [
        {
            question:
                "Qual comportamento representa um uso mais consciente da tecnologia?",

            answers: [
                "Verificar as notificações imediatamente ao acordar.",
                "Definir horários específicos para utilizar redes sociais.",
                "Manter todas as notificações ativadas durante o dia.",
                "Usar aplicativos sempre que surgir um momento de tédio."
            ],

            correct: 1
        },

        {
            question:
                "Por que as notificações podem prejudicar a concentração?",

            answers: [
                "Porque elas sempre desligam o dispositivo.",
                "Porque impedem completamente o acesso à internet.",
                "Porque podem interromper a atenção e incentivar novas verificações.",
                "Porque tornam automaticamente todos os aplicativos mais lentos."
            ],

            correct: 2
        },

        {
            question:
                "Qual é uma estratégia simples para diminuir interrupções digitais?",

            answers: [
                "Ativar todas as notificações.",
                "Desativar notificações que não são essenciais.",
                "Utilizar vários aplicativos simultaneamente.",
                "Manter o celular sempre desbloqueado."
            ],

            correct: 1
        },

        {
            question:
                "Qual pergunta pode ajudar alguém a perceber se está usando um aplicativo de forma automática?",

            answers: [
                "Quanto custa meu celular?",
                "Qual é a marca do meu dispositivo?",
                "Por que estou abrindo este aplicativo agora?",
                "Quantos aplicativos existem na loja?"
            ],

            correct: 2
        },

        {
            question:
                "Qual afirmação melhor representa a ideia de uso consciente da tecnologia?",

            answers: [
                "A tecnologia deve ser eliminada da rotina.",
                "Devemos estar conectados durante todo o dia.",
                "A tecnologia não influencia nossos comportamentos.",
                "Devemos escolher quando e por que utilizar a tecnologia."
            ],

            correct: 3
        }
    ];


    let currentQuestion = 0;
    let score = 0;
    let selectedAnswer = null;


    const questionText = document.getElementById("questionText");
    const answersContainer = document.getElementById("answers");
    const nextButton = document.getElementById("nextButton");

    const questionNumber = document.getElementById("questionNumber");
    const progressPercent = document.getElementById("progressPercent");
    const progressFill = document.getElementById("progressFill");

    const quizContent = document.getElementById("quizContent");
    const result = document.getElementById("result");

    const scoreValue = document.getElementById("scoreValue");
    const resultMessage = document.getElementById("resultMessage");

    const restartButton = document.getElementById("restartButton");


    function loadQuestion() {

        selectedAnswer = null;

        const question = questions[currentQuestion];

        questionText.textContent = question.question;

        questionNumber.textContent =
            `Pergunta ${currentQuestion + 1} de ${questions.length}`;

        const percentage =
            Math.round(
                ((currentQuestion + 1) / questions.length) * 100
            );

        progressPercent.textContent = `${percentage}%`;
        progressFill.style.width = `${percentage}%`;

        answersContainer.innerHTML = "";

        const letters = ["A", "B", "C", "D"];

        question.answers.forEach((answer, index) => {

            const button = document.createElement("button");

            button.classList.add("answer");

            button.innerHTML = `
                <span class="answer-letter">${letters[index]}</span>
                <span>${answer}</span>
            `;

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".answer")
                    .forEach(item => item.classList.remove("selected"));

                button.classList.add("selected");

                selectedAnswer = index;

                nextButton.disabled = false;
            });

            answersContainer.appendChild(button);
        });

        if (currentQuestion === questions.length - 1) {
            nextButton.innerHTML = "Ver resultado ✓";
        } else {
            nextButton.innerHTML = "Próxima pergunta →";
        }

        nextButton.disabled = true;
    }


    function showResult() {

        quizContent.classList.add("hidden");
        result.classList.remove("hidden");

        scoreValue.textContent = score;

        let message = "";

        if (score === 5) {
            message =
                "Excelente! Você demonstra uma ótima compreensão sobre o uso consciente da tecnologia.";
        } else if (score >= 3) {
            message =
                "Muito bem! Você já possui uma boa percepção sobre os desafios do mundo digital.";
        } else if (score >= 1) {
            message =
                "Você está no caminho certo. Reflita sobre seus hábitos digitais e experimente algumas das estratégias apresentadas.";
        } else {
            message =
                "Este é um ótimo momento para repensar sua relação com a tecnologia. Pequenas mudanças podem fazer diferença.";
        }

        resultMessage.textContent = message;
    }


    nextButton.addEventListener("click", () => {

        if (selectedAnswer === null) {
            return;
        }

        if (selectedAnswer === questions[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });


    restartButton.addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;
        selectedAnswer = null;

        result.classList.add("hidden");
        quizContent.classList.remove("hidden");

        loadQuestion();

        document
            .getElementById("quiz")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    });


    /* =====================================================
       ANIMAÇÃO DE ENTRADA
    ===================================================== */

    const observerOptions = {
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, observerOptions);


    document
        .querySelectorAll(".problem-card, .solution-card, .impact-item")
        .forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            observer.observe(element);
        });


    const style = document.createElement("style");

    style.textContent = `
        .problem-card.visible,
        .solution-card.visible,
        .impact-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    loadQuestion();

});
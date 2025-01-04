document.addEventListener('DOMContentLoaded', function() {

    const translations = {
        en: {
            title: 'Password Generator',
            switchTo: 'Switch to Spanish',
            lengthLabel: 'Length:',
            uppercase: 'Uppercase',
            lowercase: 'Lowercase',
            numbers: 'Numbers',
            symbols: 'Symbols',
            copy: 'Copy',
            generate: 'Generate',
            copied: 'Copied!'
        },
        es: {
            title: 'Generador de Contraseñas',
            switchTo: 'Cambiar a Ingles',
            lengthLabel: 'Longitud:',
            uppercase: 'Mayúsculas',
            lowercase: 'Minúsculas',
            numbers: 'Números',
            symbols: 'Símbolos',
            copy: 'Copiar',
            generate: 'Generar',
            copied: '¡Copiado!'
        }
    };

    let currentLanguage = 'en';

    const lenghSlider = document.getElementById('lenght');
    const lenghValue = document.getElementById('lenghtValue');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numberCheckbox = document.getElementById('numbers');
    const simbolsCheckbox = document.getElementById('simbols');
    const triggerBtn = document.getElementById('triggerBtn');
    const inputPassword = document.getElementById('password');
    const copyBtn = document.getElementById('copyBtn'); // Asegúrate de que el ID coincida
    const languageSwitcher = document.getElementById('languageSwitcher');

    const clipboard = new ClipboardJS('#copyBtn', {
        text: function() {
            return inputPassword.value;
        }
    });

    function translateUI() {
        const texts = translations[currentLanguage];

        document.getElementById('title').textContent = texts.title;
        languageSwitcher.textContent = texts.switchTo;
        document.getElementById('lengthLabel').textContent = texts.lengthLabel;
        document.querySelector('label[for="uppercase"]').innerHTML = `${texts.uppercase} <span>(A-Z)</span>`;
        document.querySelector('label[for="lowercase"]').innerHTML = `${texts.lowercase} <span>(a-z)</span>`;
        document.querySelector('label[for="numbers"]').innerHTML = `${texts.numbers} <span>(0-9)</span>`;
        document.querySelector('label[for="simbols"]').innerHTML = `${texts.symbols} <span>(!@%$#/()><;,.¡?[]{}+-*_)</span>`;
        copyBtn.innerHTML = `<i class="ri-clipboard-fill"></i> ${texts.copy}`;
        triggerBtn.innerHTML = `<i class="ri-lock-password-fill"></i> ${texts.generate}`;
    }

    function switchLanguage() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        translateUI();
    }

    languageSwitcher.addEventListener('click', switchLanguage);

    function generatePassword() {
        const length = parseInt(lenghSlider.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numberCheckbox.checked;
        const includeSymbols = simbolsCheckbox.checked;

        const lettersUppercase = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        const lettersLowercase = 'abcdefghijklmnñopqrstuvwxyz';
        const numbers = '1234567890';
        const symbols = '!¡@#$%&/()_+[]{}°|:;,.><?';

        let validCharacters = '';
        if (includeLowercase) validCharacters += lettersLowercase;
        if (includeUppercase) validCharacters += lettersUppercase;
        if (includeNumbers) validCharacters += numbers;
        if (includeSymbols) validCharacters += symbols;

        let password = '';

        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * validCharacters.length);
            password += validCharacters[index];
        }
        
        return password;
    }

    function updateValueLength() {
        lenghValue.textContent = lenghSlider.value;
    }

    clipboard.on('success', function (e) {
        copyBtn.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${translations[currentLanguage].copied}`;
        setTimeout(() => {
            copyBtn.innerHTML = `<i class="ri-clipboard-fill"></i> ${translations[currentLanguage].copy}`;
        }, 3000);
    });

    triggerBtn.addEventListener('click', function () {
        const password = generatePassword();
        inputPassword.value = password;
    });

    lenghSlider.addEventListener('input', updateValueLength);

    updateValueLength();
    translateUI();
});
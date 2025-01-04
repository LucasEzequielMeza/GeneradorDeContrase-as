document.addEventListener('DOMContentLoaded', function() {

    const lenghtSlider = document.getElementById('lenght');
    const lenghtValue = document.getElementById('lenghtValue');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numberCheckbox = document.getElementById('numbers');
    const simbolsCheckbox = document.getElementById('simbols');
    const triggerBtn = document.getElementById('triggerBtn');
    const inputPassword = document.getElementById('password');
    const copyBtn = document.getElementById('copyBtn');

    const clipboard = new ClipboardJS('#copyBtn', {
        text: function() {
            return inputPassword.value;
        }
    });

    function generatePassword () {
        const lenght = parseInt(lenghtSlider.value);
        const includeUppercase = uppercaseCheckbox.checked; 
        const includeLowercase = lowercaseCheckbox.checked; 
        const includeNumbers = numberCheckbox.checked; 
        const includeSimbols = simbolsCheckbox.checked

        const lettersUppercase = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        const lettersLowercase = 'abcdefghijklmnñopqrstuvwxyz';
        const numbers = '1234567890'
        const simbols = '!¡@#$%&/()_+[]{}°|:;,.><?';

        let validCharacters = "";
        if (includeLowercase) validCharacters += lettersLowercase;
        if (includeUppercase) validCharacters += lettersUppercase;
        if (includeNumbers) validCharacters += numbers;
        if (includeSimbols) validCharacters += simbols;

        let password = "";

        for (let i = 0; i < lenght; i++) {
            const index = Math.floor(Math.random() * validCharacters.length);
            password += validCharacters[index]
        }
        
        return password;
    }

    function updateValueLength () {
        lenghtValue.textContent = lenghtSlider.value;
    }

    clipboard.on('success', function (e) {
        copyBtn.innerHTML = '<i class="ri-checkbox-circle-fill"></i> ¡Coppied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="ri-clipboard-fill"></i> Copy'
        }, 3000);
    });

    triggerBtn.addEventListener('click', function () {
        const password = generatePassword();
        inputPassword.value = password;
    });

    lenghtSlider.addEventListener('input', updateValueLength);

    updateValueLength();

});
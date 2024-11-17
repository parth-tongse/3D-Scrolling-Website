document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.wrap').forEach(function (wrap, index) {
        const currentValueElement = wrap.querySelector('.currentValue');
        const maxValueElement = wrap.querySelector('.maxValue');
        const maxValue = parseInt(maxValueElement.textContent);

        const savedValue = localStorage.getItem('currentValue_' + index);
        if (savedValue !== null) {
            currentValueElement.textContent = savedValue;
            updateProgress(wrap, parseInt(savedValue), maxValue);
        }
    });
});

function updateValue(button) {
    const wrap = button.closest('.wrap');
    const input = wrap.querySelector('.inputValue');
    const currentValueElement = wrap.querySelector('.currentValue');
    const maxValueElement = wrap.querySelector('.maxValue');

    const value = parseInt(input.value);
    const currentValue = parseInt(currentValueElement.textContent);
    const maxValue = parseInt(maxValueElement.textContent);

    if (!isNaN(value) && currentValue + value <= maxValue) {
        const newValue = currentValue + value;
        currentValueElement.textContent = newValue;
        updateProgress(wrap, newValue, maxValue);

        const index = [...document.querySelectorAll('.wrap')].indexOf(wrap);
        localStorage.setItem('currentValue_' + index, newValue);
    } else {
        alert("Value exceeds limit or is invalid.");
    }
}

function updateProgress(wrap, currentValue, maxValue) {
    const progress = (currentValue / maxValue) * 100;
    const hrElement = wrap.querySelector('.hr');

    let progressElement = wrap.querySelector('.progress');
    if (!progressElement) {
        progressElement = document.createElement('div');
        progressElement.className = 'progress';
        hrElement.appendChild(progressElement);
    }
    progressElement.style.width = progress + '%';
}

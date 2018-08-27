document.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
        // Press Tab to insert four spaces
        e.preventDefault();

        const area = document.getElementById('area');
        const pos = area.selectionStart;

        area.value = area.value.substr(0, pos) + '    ' + area.value.substr(pos, area.value.length);
        area.setSelectionRange(pos + 4, pos + 4);
    }
    if (e.key === '(' || e.key === '{' || e.key === '[') {
        // Complement closing parenthesis
        e.preventDefault();

        const area = document.getElementById('area');
        const pos = area.selectionStart;

        const parenthesis = e.key === '(' ? '()' : e.key === '{' ? '{}' : e.key === '[' ? '[]' : '';

        area.value = area.value.substr(0, pos) + parenthesis + area.value.substr(pos, area.value.length);
        area.setSelectionRange(pos + 1, pos + 1);
    }
});
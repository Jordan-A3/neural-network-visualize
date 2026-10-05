export function formatToOnlyNumbers(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(',', '.');

    value = value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    input.value = value;
}
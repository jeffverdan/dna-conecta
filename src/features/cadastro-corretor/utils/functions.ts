export function formatDateToInput(dateString: string) {
    // dateString = "DD/MM/YYYY"
    if (!dateString) return "";
    dateString = dateString.replace(/\D/g, ""); //Substituí o que não é dígito por "", /g é [Global][1]
    dateString = dateString.replace(/(\d{2})(\d)/, "$1/$2");
    dateString = dateString.replace(/(\d{2})(\d)/, "$1/$2");
    dateString = dateString.replace(/(\d{4})(\d)/, "$1");
    const [day, month] = dateString.split("/").map(Number);
    if (day > 31) {
        dateString = dateString.replace(/(\d{2})/, "31");
    }
    else if (month > 12) {
        dateString = dateString.replace(/(\d{2}\/)(\d{2})/, "$112");
    }

    return dateString;
}

export function formatTelefoneToInput(telefoneString: string, ddi?: boolean) {
    // FORMATO DE SAIDA "+55 (21) 99999-9999"
    if (!telefoneString) return "";
    if (telefoneString.length > 19) return telefoneString.substring(0, 19);
    // telefoneString = telefoneString.replace(/\D/g, "");
    // telefoneString = telefoneString.replace(/(\d{2})(\d)/, "+$1 ($2");
    // telefoneString = telefoneString.replace(/(\d{2})(\d)/, "$1) $2");
    // telefoneString = telefoneString.replace(/(\d{5})(\d)/, "$1-$2");
    telefoneString = telefoneString.replace(/\D/g, "");
    if(ddi) {
        telefoneString = telefoneString.replace(/(\d{2})(\d)/, "+$1 ($2");
        telefoneString = telefoneString.replace(/(\d{2})(\d)/, "$1) $2");
    } else {
        telefoneString = telefoneString.replace(/(\d{2})(\d)/, "($1) $2");
    }
    telefoneString = telefoneString.replace(/(\d{5})(\d)/, "$1-$2");
    return telefoneString;
}

export function formatCPFToInput(cpfString: string) {
    // FORMATO DE SAIDA "000.000.000-00"
    if (!cpfString) return "";
    cpfString = cpfString.replace(/\D/g, "");
    cpfString = cpfString.replace(/(\d{3})(\d)/, "$1.$2");
    cpfString = cpfString.replace(/(\d{3})(\d)/, "$1.$2");
    cpfString = cpfString.replace(/(\d{3})(\d)/, "$1-$2");
    if (cpfString.length > 14) return cpfString.substring(0, 14);
    return cpfString;
}

export function formatCNPJToInput(cnpjString: string) {
    if(!cnpjString) return "";
    cnpjString = cnpjString.replace(/\D/g, "")
    cnpjString = cnpjString.replace(/(\d{2})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    cnpjString = cnpjString.replace(/(\d{3})(\d)/, "$1.$2")
    cnpjString = cnpjString.replace(/(\d{3})(\d)/, "$1/$2")
    cnpjString = cnpjString.replace(/(\d{4})(\d)/, "$1-$2")                //Remove tudo o que não é dígito
    //de novo (para o segundo bloco de números)
    // cnpjString = cnpjString.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/);

    return cnpjString
}

export function isCPFValid (cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    return rest === parseInt(cpf.charAt(10));
}

export function isCNPJValid(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;
    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    return result === parseInt(digits.charAt(1));
}
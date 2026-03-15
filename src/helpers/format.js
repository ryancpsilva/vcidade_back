export default function format(text) {
    return text
    .toLowerCase()
    .normalize("NFD")                // separa os acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .replace(/\s/g, "");             // remove todos os espaços
}

export const generateCode = (value) => {
    let output = ''
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').forEach(item => {
        output += item.charAt(1) + item.charAt(0)
    });
    return output.toUpperCase() + value.length

}// chuyển chữ thành không dấu không cách sau đó chỉ lấy 2 ký tự đầu tiên và thứ 2 sau đó + độ dài thành mã 
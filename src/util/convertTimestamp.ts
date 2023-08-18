export function formatTimestamp(timestamp:string) {
    // Se o timestamp parece estar em segundos, converta para milissegundos

    const monthsAbbreviated = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

     const date = new Date(parseInt(timestamp));
              
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses em JavaScript vão de 0 a 11
                const year = date.getFullYear();
            
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
            
                return `${hours}:${minutes} ${day}/${monthsAbbreviated[parseInt(month) -1]}/${year}`;
}

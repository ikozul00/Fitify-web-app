export const ParseDate = (date) => {
    let parts = date.split(' ');
    let month="";
    switch(parts[1]){
        case 'Jan':
            month="01";
            break;
        case 'Feb':
            month="02";
            break;
        case 'Mar':
            month="03";
            break;
        case 'Apr':
            month="04";
            break;
        case 'May':
            month="05";
            break;
        case 'Jun':
            month="06";
            break;
        case 'Jul':
            month="07";
            break;
        case "Aug":
            month="08";
            break;
        case "Sep":
            month="09";
            break;
        case "Oct":
            month="10";
            break;
        case "Nov":
            month="11";
            break;
        case "Dec":
            month="12";
            break;
        default:
            month="01";
            break;
    }
    return `${parts[2]} / ${month} / ${parts[3]}`;
}
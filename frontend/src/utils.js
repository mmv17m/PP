export function getDatetime(){
	const currentDateTime = new Date();
	const options = {   hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3};
	const formattedDateTime = currentDateTime.toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3-$1-$2T$4:$5:$6');
	return formattedDateTime
}
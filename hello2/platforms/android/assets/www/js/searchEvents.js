$( document ).ready(function() {
	var d = new Date();
	var month = d.getUTCMonth()+1;
	var day = d.getUTCDate();
	var year = d.getUTCFullYear();

	if(day<=9 && month <=9){
		today = year + "-0" + month + "-0" + day;
	} else if(day<=9){
		today = year + "-" + month + "-0" + day;
	} else if(month <=9){
		today = year + "-0" + month + "-" + day;
	} else{
		today = year + "-" + month + "-" + day;
	}
    $('#searchDate').attr('min',today);
});
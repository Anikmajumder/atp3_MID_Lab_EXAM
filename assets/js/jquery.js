jQuery($ => {
	$(document).ready(e => {
		$('input[name="sp"]').keyup(e => {
			const tbody = $('table>tbody');
			const formdata = {
				sp: $('input[name="sp"]').val()
			};
			
			$.post("/home/sp", formdata, (data, status) => {
				let response = data;
				if(status=="success") {
					tbody.html('');
					if(response.length>0) {
						response.forEach(row => {
							tbody.append($('<tr/>').append(
								$('<td/>').text(row.placename)
							).append(
								$('<td/>').text(row.cost)
							).append(
								$('<td/>').text(row.t_medium)
							));
						});
					} else {
						tbody.append($('<tr/>').append($('<td/>').attr({
							'colspan' : '6'
						}).text('No Data Found')));
					}
				}
			});			
		});
	});
});

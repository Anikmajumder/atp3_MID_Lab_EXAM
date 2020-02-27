jQuery($ => {
	$(document).ready(e => {
		$('input[name="search"]').keyup(e => {
			const tbody = $('table>tbody');
			const formdata = {
				search : $('input[name="search"]').val()
			};
			
			$.post("/home/search", formdata, (data, status) => {
				let response = $.parseJSON(data);
				if(status=="success") {
					tbody.html('');
					if(response.length>0) {
						response.forEach(row => {
							tbody.append($('<tr/>').append(
								$('<td/>').text(row.id)
							).append(
								$('<td/>').text(row.username)
							).append(
								$('<td/>').text(row.uname)
							).append(
								$('<td/>').text(row.password)
							).append(
								$('<td/>').text(row.type)
							).append(
								$('<td/>').text(row.contact)
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

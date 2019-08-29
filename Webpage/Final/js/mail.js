console.log('It works')

$(document).ready(function (){
	$('.submit').click(function(event){
		event.preventDefault()
		console.log('Click')
		var email = $('.senderEmail').val()
		var subject = $('.subject').val()
		var message = $('.message').val()

		if(email.length > 5 && email.includes('@') && email.includes('.')){
			statusElm.append('<div>Email is valid</div>')
			}else{
			statusElm.append('<div>Email is not valid</div>')	
			}

			if(subject.lenght > 2){
				statusElm.append('<div>Email is valid</div>')
			} else { 
				statusElm.append('<div>Email is not valid</div>')
			}

			if(message.length >15){
				statusElm.append('<div>Email is valid</div>')	
			} else {
				statusElm.append('<div>Email is not valid</div>')
			}
		})
})
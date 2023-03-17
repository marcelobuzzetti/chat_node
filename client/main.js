var socket = io.connect({'forceNew':true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(message, index){
		return (`
			<div class="message">
				<strong>${message.nickname}</strong>
				<p>${message.text}</p>
			</div>
		`);
	}).join(' ');

	var divs_msgs = document.getElementById('messages');
	divs_msgs.innerHTML = html;
	divs_msgs.scrollTop = divs_msgs.scrollHeight;
}

function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';
	document.getElementById('text').value = '';
		document.getElementById('text').focus();
	socket.emit('add-message', message);
	return false;
}

var input = document.getElementById('button');
input.addEventListener("keyup", function(event){
	event.preventDefault();
	if(event.keyCode === 13){
		document.getElementById("button").click();
	}
});
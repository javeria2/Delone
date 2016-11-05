$(document).ready(function(){
	//typeIt jquery plugin initialization
	$('.type-it').typeIt({
     speed: 50,
     autostart: false,
     loop: true
	}).tiType('New to some place?').tiPause(900).tiDelete()
	.tiType('Looking for someone to eat with?').tiPause(900).tiDelete()
	.tiType('<em>Delone</em> will come to your rescue.').tiPause(900).tiDelete()
	.tiType('With <em>Delone</em> you don\'t have to eat alone.').tiPause(900).tiDelete();
});
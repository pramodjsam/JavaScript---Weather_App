window.addEventListener("load",function(){
	let long;
	let lat;
	let temperatureDegree= document.querySelector(".temperature-degree");
	let temperatureDescription=document.querySelector(".temperature-description");
	let locationTimeZone= document.querySelector(".location-timezone");
	let temperatureSection= document.querySelector(".degree-section");
	let temperatureSpan= document.querySelector(".degree-section span")
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			long=position.coords.longitude;
			lat=position.coords.latitude;
			const proxy=`https://cors-anywhere.herokuapp.com/`;
			const api=`${proxy}https://api.darksky.net/forecast/9b0af02f1ad5f739d0fd7a754e459238/${lat},${long}`;
			fetch(api)
				.then(function(response){
					return response.json();
				}).then(function(data){
					console.log(data);
					const {temperature,summary,icon} = data.currently;
					// console.log(temperature,summary,icon)
					temperatureDegree.innerHTML= temperature;
					temperatureDescription.innerHTML=summary;
					locationTimeZone.innerHTML=data.timezone;
					let celcius = (temperature-32)*(5/9);
					setIcons(icon, document.getElementById("icon"))
					temperatureSection.addEventListener("click",function(){
						if(temperatureSpan.textContent==="F"){
							temperatureSpan.textContent="C"
							temperatureDegree.innerHTML= Math.floor(celcius)
						}else{
							temperatureSpan.textContent="F"
							temperatureDegree.innerHTML=temperature;
						}
					})
				})
		})
	}
	function setIcons(icon,iconID){
		const skycons = new Skycons({"color": "white"});
		const currentIcon= icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set("iconID", Skycons[currentIcon]);
	}
})
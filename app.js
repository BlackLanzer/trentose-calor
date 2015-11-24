/* your code should go here */

$(document).ready(function(){
  
  $("#summary").html("");
  controller.init();

  $("#btn-filter").click(function() {
  	controller.showSummary($("#city").val());
  });
});

var view = {
	dayTemplate : "<li><div class='icon'><img src='img/icons/ph_condition.png'></div><div class='stats'><h2>ph_day</h2><strong>min</strong> ph_min<strong>max</strong> ph_max</div></li> ",

	cityTemplate : "<option value='ph_city'>ph_city</option>",

	// imposta la combo box per le città
	setCities : function(cities) {
		$("#city").html("");
		for (var i = 0; i < cities.length; i++) {
			var cityOption = this.cityTemplate.replace("ph_city", cities[i])
							.replace("ph_city", cities[i]);
			$("#city").append(cityOption);
		}
	},

	// aggiunge il meteo del giorno
	addDay : function(day, min, max, condition) {
		var dayLi = this.dayTemplate.replace("ph_day",day)
					.replace("ph_min",min)
					.replace("ph_max",max)
					.replace("ph_condition",condition);
		$("#summary").append(dayLi);
	}
};

var model = {
	// ritorna un array con i dati di una certa città
	getCityData : function(city) {
		var cityData = [];
		var j=0;
		for (var i = 0; i < data.length; i++) {
			if(data[i].city == city && cityData.indexOf(data[i]) < 0)
			{
				cityData[j] = data[i];
				j++;
			}
		}

		return cityData;
	},

	getMaxTemp : function(day, city) {
		var max = 0;
		var data = this.getCityData(city);
		for (var i = 0; i < data.length; i++) {
			if (data[i].day == day)
				if (data[i].temperature > max)
					max = data[i].temperature;
		}
		return max;
	},

	getMinTemp : function(day, city) {
		var min = 500;
		var data = this.getCityData(city);
		for (var i = 0; i < data.length; i++) {
			if (data[i].day == day)
				if (data[i].temperature < min)
					min = data[i].temperature;
		}
		return min;
	},

	getCondition : function(day, city) {
		var data = this.getCityData(city);
		for (var i = 0; i < data.length; i++) {
			if (data[i].day == day)
			{
				return data[i].condition;
			}
		}
	},

	// ritorna un array con i giorni presenti nei dati
	getDays : function(city) {
		var data = this.getCityData(city);
		var days = [];
		var j = 0;
		for (var i = 0; i < data.length; i++) {
			if (days.indexOf(data[i].day) < 0)
			{
				days[j] = data[i].day;
				j++;
			}
		}
		return days;
	},

	// ritorna un array con le città presenti nei dati
	getCities : function() {
		var cities = [];
		var j = 0;
		for (var i = 0; i < data.length; i++) {
			if (cities.indexOf(data[i].city) < 0)
			{
				cities[j] = data[i].city;
				j++;
			}
		}
		return cities;
	}
};

var controller = {
	days : [],
	cities : [],

	init : function() {
		this.cities = model.getCities();
		view.setCities(this.cities);
		
	},

	// carica il meteo di una certa città
	showSummary : function(city) {
		this.days = model.getDays(city);
		$("#summary").html("");
		for (var i = 0; i < this.days.length; i++) {
			var min = model.getMinTemp(this.days[i], city);
			var max = model.getMaxTemp(this.days[i], city);
			var condition = model.getCondition(this.days[i], city);
			view.addDay(this.days[i], min, max, condition);
		};
	}
};


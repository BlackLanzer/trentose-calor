/* your code should go here */

$(document).ready(function(){
  
  $("#summary").html("");
  controller.init();
});

var view = {
	dayTemplate : "<li><div class='icon'><img src='img/icons/ph_condition.png'></div><div class='stats'><h2>ph_day</h2><strong>min</strong> ph_min<strong>max</strong> ph_max</div></li> ",

	addDay : function(day, min, max, condition) {
		var dayLi = this.dayTemplate.replace("ph_day",day)
					.replace("ph_min",min)
					.replace("ph_max",max)
					.replace("ph_condition",condition);
		$("#summary").append(dayLi);
	}
};

var model = {
	getMaxTemp : function(day) {
		var max = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].day == day)
				if (data[i].temperature > max)
					max = data[i].temperature;
		}
		return max;
	},

	getMinTemp : function(day) {
		var min = 500;
		for (var i = 0; i < data.length; i++) {
			if (data[i].day == day)
				if (data[i].temperature < min)
					min = data[i].temperature;
		}
		return min;
	},

	getCondition : function(day) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].day == day)
			{
				return data[i].condition;
			}
		}
	},

	getDays : function() {
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
	}
};

var controller = {
	init : function() {
		days = model.getDays();
		for (var i = 0; i < days.length; i++) {
			var min = model.getMinTemp(days[i]);
			var max = model.getMaxTemp(days[i]);
			var condition = model.getCondition(days[i]);
			view.addDay(days[i], min, max, condition);
		};
	}
};


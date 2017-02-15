
    // Provide month names
    Date.prototype.getMonthName = function(){
        var month_names = [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ];

        return month_names[this.getMonth()];
    }

    // Provide month abbreviation
    Date.prototype.getMonthAbbr = function(){
        var month_abbrs = [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ];

        return month_abbrs[this.getMonth()];
    }

    // Provide full day of week name
    Date.prototype.getDayFull = function(){
        var days_full = [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday'
                        ];
        return days_full[this.getDay()];
    };

    // Provide full day of week name
    Date.prototype.getDayAbbr = function(){
        var days_abbr = [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thur',
                            'Fri',
                            'Sat'
                        ];
        return days_abbr[this.getDay()];
    };

    // Provide the day of year 1-365
    Date.prototype.getDayOfYear = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((this - onejan) / 86400000);
    };

    // Provide the day suffix (st,nd,rd,th)
    Date.prototype.getDaySuffix = function() {
        var d = this.getDate();
        var sfx = ["th","st","nd","rd"];
        var val = d%100;

        return (sfx[(val-20)%10] || sfx[val] || sfx[0]);
    };

    // Provide Week of Year
    Date.prototype.getWeekOfYear = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
    } 

    // Provide if it is a leap year or not
    Date.prototype.isLeapYear = function(){
        var yr = this.getFullYear();

        if ((parseInt(yr)%4) == 0){
            if (parseInt(yr)%100 == 0){
                if (parseInt(yr)%400 != 0){
                    return false;
                }
                if (parseInt(yr)%400 == 0){
                    return true;
                }
            }
            if (parseInt(yr)%100 != 0){
                return true;
            }
        }
        if ((parseInt(yr)%4) != 0){
            return false;
        } 
    };

    // Provide Number of Days in a given month
    Date.prototype.getMonthDayCount = function() {
        var month_day_counts = [
                                    31,
                                    this.isLeapYear() ? 29 : 28,
                                    31,
                                    30,
                                    31,
                                    30,
                                    31,
                                    31,
                                    30,
                                    31,
                                    30,
                                    31
                                ];

        return month_day_counts[this.getMonth()];
    } 

    // format provided date into this.format format
    Date.prototype.format = function(dateFormat){
        // break apart format string into array of characters
        dateFormat = dateFormat.split("");

        var date = this.getDate(),
            month = this.getMonth(),
            hours = this.getHours(),
            minutes = this.getMinutes(),
            seconds = this.getSeconds();
        // get all date properties ( based on PHP date object functionality )
        var date_props = {
            d: date < 10 ? '0'+date : date,
            D: this.getDayAbbr(),
            j: this.getDate(),
            l: this.getDayFull(),
            S: this.getDaySuffix(),
            w: this.getDay(),
            z: this.getDayOfYear(),
            W: this.getWeekOfYear(),
            F: this.getMonthName(),
            m: month < 10 ? '0'+(month+1) : month+1,
            M: this.getMonthAbbr(),
            n: month+1,
            t: this.getMonthDayCount(),
            L: this.isLeapYear() ? '1' : '0',
            Y: this.getFullYear(),
            y: this.getFullYear()+''.substring(2,4),
            a: hours > 12 ? 'pm' : 'am',
            A: hours > 12 ? 'PM' : 'AM',
            g: hours % 12 > 0 ? hours % 12 : 12,
            G: hours > 0 ? hours : "12",
            h: hours % 12 > 0 ? hours % 12 : 12,
            H: hours,
            i: minutes < 10 ? '0' + minutes : minutes,
            s: seconds < 10 ? '0' + seconds : seconds           
        };

        // loop through format array of characters and add matching data else add the format character (:,/, etc.)
        var date_string = "";
        for(var i=0;i<dateFormat.length;i++){
            var f = dateFormat[i];
            if(f.match(/[a-zA-Z]/g)){
                date_string += date_props[f] ? date_props[f] : '';
            } else {
                date_string += f;
            }
        }

        return date_string;
    };






		Date.prototype.time_ago = function(time){
			
			

		switch (typeof time) {
		    case 'number': break;
		    case 'string': time = +new Date(time); break;
		    case 'object': if (time.constructor === Date) time = time.getTime(); break;
		    default: time = +new Date();
		}
		var time_formats = [
		    [60, 'seconds', 1], // 60
		    [120, '1 minute ago', '1 minute from now'], // 60*2
		    [3600, 'minutes', 60], // 60*60, 60
		    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
		    [86400, 'hours', 3600], // 60*60*24, 60*60
		    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
		    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
		    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
		    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
		    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
		    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
		    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
		    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
		    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
		    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		var seconds = (+new Date() - time) / 1000,
		    token = 'ago', list_choice = 1;
		
		if (seconds == 0) {
		    return 'Just now'
		}
		if (seconds < 0) {
		    seconds = Math.abs(seconds);
		    token = 'from now';
		    list_choice = 2;
		}
		var i = 0, format;
		while (format = time_formats[i++])
		    if (seconds < format[0]) {
		        if (typeof format[2] == 'string')
		            return format[list_choice];
		        else
		            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
		    }
		return time;
		}
		
		
		
		
	